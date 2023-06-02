<template>
  <div class="card_wrapper">
    <div class="header">
      <h3 class="main_title">{{ item.job_title }}</h3>
      <a role="button" @click="handleSharing(item)">
        <svg class="icon">
          <use xlink:href="~/static/sprite.svg#share"></use>
        </svg>
      </a>
    </div>
    <h5 class="name"><span>اسم الشركة: </span> {{ item.company_name }}</h5>

    <p class="desc">
      {{ item.desc }}
    </p>

    <!-- end::item -->
    <div class="item">
      <nuxt-link :to="`jobs/${item.id}`" class="btn btn-default">
        <span> التقديم</span>
      </nuxt-link>
    </div>
    <!-- end::item -->
    <b-modal id="share_modal" ref="share_modal" hide-footer hide-header>
      <div class="modal_wrapper">
        <div class="title_box">
          <h4 class="">قم بالمشاركة الأن</h4>
          <h6 class="">
            يمكنك مشاركة مع الاخرين عبر وسائل التواصل المتاحة بالأسفل
          </h6>
        </div>
        <div class="share_buttons">
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :style="{ backgroundColor: network.color }"
            :url="sharing.url"
            :title="selected_item.job_title"
            :description="selected_item.desc"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
          >
            <b-icon :icon="network.icon" variant="light"></b-icon>
          </ShareNetwork>
        </div>
      </div>
    </b-modal>
    <b-modal
      hide-footer
      hide-header
      id="add-previous-work"
      ref="add-previous-work"
    >
      <client-only>
        <div class="modal_wrapper" v-if="user">
          <div class="title_box">
            <h4 class="text-center">هل ترغب في التقديم للوظيفة</h4>
          </div>

          <div class="item text-center">
            <b-btn
              @click="$refs[`add-previous-work`].hide()"
              class="btn btn-default"
              color="error"
            >
              الغاء
            </b-btn>
            <b-btn @click="applyJob(item)" class="btn btn-default">
              التقديم
            </b-btn>
          </div>
        </div>
        <div class="modal_wrapper" v-else>
          <div class="title_box">
            <h4 class="text-center">رفع سابقة الاعمال</h4>
          </div>

          <form @submit.prevent="addPrevusWork">
            <b-form-file
              v-model="previous_work"
              :state="Boolean(previous_work)"
              placeholder="اختر ملف او اسحب ملف هنا"
              drop-placeholder="اسحب ملف هنا"
            ></b-form-file>
            <div class="item text-center">
              <b-btn @click="addPrevusWork()" class="btn btn-default">
                التقديم
              </b-btn>
            </div>
          </form>
        </div>
      </client-only>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "JobCard",
  props: ["item"],
  data() {
    return {
      loading: false,
      previous_work: null,
      selected_item: {
        id: null,
        title: null,
        desc: null,
      },
      sharing: {
        url: "",
        quote: "",
        hashtags: "",
        twitterUser: "zemna",
      },
      networks: [
        { network: "facebook", icon: "facebook", color: "#1877f2" },
        { network: "twitter", icon: "twitter", color: "#1da1f2" },
        { network: "telegram", icon: "telegram", color: "#0088cc" },
        { network: "whatsapp", icon: "whatsapp", color: "#25d366" },
      ],
    };
  },
  computed: {
    is_loggedIn() {
      return this.$store.getters["localStorage/is_loggedIn"];
    },
    user() {
      return this.$store.getters["localStorage/userData"];
    },
  },
  methods: {
    handleSharing(item) {
      this.selected_item = item;
      this.sharing.url = `https://mysupplyangel.com${this.$route.fullPath}/${item.id}`;
      this.$refs["share_modal"].show();
    },
    applyModal(item) {
      if (this.is_loggedIn) {
        this.selected_item = item;

        this.$refs["add-previous-work"].show();
      } else {
        this.$cookies.set("lastRoute", this.$route.fullPath);
        this.$router.push("/auth/login");
      }
    },
    applyJob(item) {
      this.loading = true;
      this.$axios
        .post(`/job/${item.id}/applayon`)
        .then(() => {
          this.loading = false;
          this.TriggerNotify("success", "تم  التقديم بنجاح");
          this.$refs["add-previous-work"].hide();
        })
        .catch((err) => {
          console.log(err);
          this.TriggerNotify("error", "حدث خطأ ما");
          this.loading = false;
        });
    },
    async toggleFav(id) {
      await this.$axios
        .post(`/agent/${id}/favorite`)
        .then((res) => {
          if (res.data.data.is_favorite == false) {
            this.TriggerNotify("success", "تم الأزالة من المفضلة بنجاح !");
          }
          if (res.data.data.is_favorite == true) {
            this.TriggerNotify("success", "تم الأضافة الي المفضلة بنجاح !");
          }
          this.item.is_favorite = res.data.data.is_favorite;
        })
        .catch((err) => {
          this.TriggerNotify("error", err.response.data.message);
        });
    },
    addPrevusWork() {
      if (this.previous_work) {
        const frmData = new FormData();
        frmData.append("file", this.previous_work);
        this.$axios
          .post(`profile/previous-work`, frmData)
          .then(() => {
            this.loading = false;
            this.applyModal(this.item);
          })
          .catch((err) => {
            console.log(err);
            this.TriggerNotify("error", "حدث خطأ ما");
            this.loading = false;
          });
      } else {
        this.TriggerNotify("error", "قم بارفاق سابقة الاعمال");
      }
      // if (!!this.is_loggedin) {
      //   if (this.user.previous_work) {
      //   }
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.card_wrapper {
  padding: 20px;
  border: 2px solid $base-color;
  border-radius: 10px;
  margin-bottom: 15px;
  .header {
    display: flex;
    justify-content: space-between;
    .main_title {
      margin-bottom: 8px !important;
      font-size: 22px;
      font-weight: 600;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    a {
      .icon {
        width: 20px;
        height: 20px;
        fill: $base-color;
      }
      span {
        font-size: 16px;
        font-weight: 500;
        color: $base-color;
      }
    }
  }
  .name {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
    @media (min-width: 992px) {
      font-size: 18px;
    }
    span {
      font-weight: 600;
    }
  }

  .desc {
    color: #808080;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .item {
    display: flex;
    align-items: center;

    .btn-default {
      background-color: $base-color;
      color: #fff;
      font-size: 15px;
      border-radius: 15px;
      padding: 8px 16px;
      font-weight: 500;
    }
  }
}
</style>

<style lang="scss">
#share_modal {
  .modal-content {
    border-radius: 15px;
    border: none;
  }
  .modal_wrapper {
    padding: 25px 20px;
    .title_box {
      text-align: center;
      margin-bottom: 25px;
      h4 {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
      }
      h6 {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color: #808080;
      }
    }
    .share_buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-inline-end: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.btn-default {
  margin-top: 10px;
  background-color: $base-color;
  color: #fff;
  font-size: 15px;
  border-radius: 25px;
  font-weight: 500;
}
.form-file-text {
  text-align: end;
}
</style>
