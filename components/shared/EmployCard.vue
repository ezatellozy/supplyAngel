<template>
  <div class="card_wrapper employ_card">
    <div class="header justify-content-start">
      <div class="avatar">
        <img
          width="80"
          height="80"
          class="rounded-circle"
          :src="item.avatar"
          :alt="item.name"
        />
      </div>
      <div class="text">
        <h3 class="main_title"><span>الاسم</span>: {{ item.name }}</h3>

        <h5 class="name">
          <span>رقم الهاتف</span>:
          <a :href="`tel:${item.phone_code}${item.phone}`">
            <bdi>{{ item.phone_code }}{{ item.phone }}</bdi>
          </a>
        </h5>
      </div>
    </div>

    <p class="desc">
      {{ item.desc }}
    </p>
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
  methods: {},
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
    align-items: end;
    .text {
      margin-inline-start: 20px;
    }
    .main_title {
      margin-bottom: 4px !important;
      font-size: 18px !important;
      span {
        font-size: 18px !important;
        font-weight: 600;
        @media (min-width: 992px) {
          font-size: 20px;
        }
        display: inline-flex;
        min-width: 100px;
      }
    }
    .name {
      span {
        font-size: 18px !important;
        font-weight: 600;
        @media (min-width: 992px) {
          font-size: 18px !important;
        }
        display: inline-flex;
        min-width: 100px;
      }
      a {
        color: #000 !important;
        font-size: 16px !important;
      }
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
