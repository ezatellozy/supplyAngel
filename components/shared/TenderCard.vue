<template>
  <div>
    <div class="card_wrapper">
      <div
        class="ribbon ribbon-top-left"
        :class="{ my_offer: item.added_offer }"
      >
        <span v-if="item.is_my_agent"> طلباتي </span>
        <span v-if="item.added_offer"> عروض اسعاري </span>
      </div>
      <div class="card_content">
        <div class="img_wrapper" @click="handleRoute">
          <img :src="item.tender_images[0].media" alt="tender_img" />
        </div>

        <!-- end::col -->

        <div class="info_wrapper">
          <h4 class="title">
            {{ item.title }}
            <span>
              {{ $moment(item.created_at).startOf("day").fromNow() }}
            </span>
            <nuxt-link
              :to="{ name: 'tender-id-edit', params: { id: item.id } }"
            >
              <img
                src="~/assets/images/edit.svg"
                alt="icon"
                width="40"
                height="40"
                v-if="item.is_my_agent"
              />
            </nuxt-link>
          </h4>
          <div class="flex_wrapper" @click="handleRoute">
            <div class="item">
              <p class="desc">{{ item.desc }}</p>
            </div>
            <!-- end::item -->
            <div class="item">
              <div class="line">
                <span>المستند :</span>
                <span class="rev_font">
                  {{
                    item.tender_specifications_value != null
                      ? item.tender_specifications_value
                      : "غير محدد"
                  }}
                </span>
              </div>
              <!-- end::line -->

              <div class="line">
                <span>التأمين :</span>
                <span class="rev_font">
                  {{
                    item.insurance_value != null
                      ? item.insurance_value
                      : "غير محدد"
                  }}
                </span>
              </div>
              <!-- end::line -->

              <div class="line">
                <span>تاريخ الانتهاء :</span>
                <span class="rev_font">
                  {{ item.expiry_date }}
                </span>
              </div>
              <!-- end::line -->
            </div>
            <!-- end::item -->
          </div>
          <!-- end::flex_wrapper -->
        </div>

        <!-- end::col -->

        <div class="options_wrapper">
          <div class="item">
            <a href="javascript:;">
              <svg class="icon">
                <use xlink:href="~/static/sprite.svg#share"></use>
              </svg>
            </a>

            <a role="button" @click="toggleFav" v-if="is_loggedin">
              <span v-if="item.is_favorite != true">
                <svg class="icon">
                  <use xlink:href="~/static/sprite.svg#favourite"></use>
                </svg>
                <span>اضافة الي المفضلة</span>
              </span>
              <span v-if="item.is_favorite == true">
                <svg class="icon">
                  <use xlink:href="~/static/sprite.svg#favourite-filled"></use>
                </svg>
                <span> حذف من المفضلة</span>
              </span>
            </a>
          </div>
          <!-- end::item -->
          <div class="item">
            <nuxt-link
              :to="{ name: 'tender-id', params: { id: item.id } }"
              class="btn btn-default"
            >
              تفاصيل الصفقة
            </nuxt-link>
          </div>
          <!-- end::item -->
        </div>

        <!-- end::col -->
      </div>
      <!-- end::row -->
    </div>

    <!-- start:: apply_modal -->
    <b-modal
      id="apply_modal"
      ref="apply"
      size="lg"
      hide-footer
      title="تقديم العرض"
    >
      <div class="modal_wrapper">
        <div class="form_wrapper">
          <ValidationObserver ref="form">
            <b-form @submit.prevent="submitForm">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-group>
                  <b-input-group>
                    <b-form-textarea
                      type="text"
                      rows="6"
                      v-model="form.desc"
                      :class="{ invalid: errors[0] }"
                      placeholder="يرجى ادخال ملاحظة"
                    ></b-form-textarea>
                  </b-input-group>
                  <div class="uploads_wrapper">
                    <div class="item">
                      <input
                        type="file"
                        id="images"
                        @change="handleFileUpload($event, 'images')"
                        multiple
                      />
                      <label for="images">
                        <svg class="icon">
                          <use xlink:href="~/static/sprite.svg#image"></use>
                        </svg>
                        <span>اضافة صور</span>
                      </label>
                    </div>
                    <!-- end::item -->
                    <div class="item">
                      <input
                        type="file"
                        id="files"
                        @change="handleFileUpload($event, 'files')"
                        multiple
                      />
                      <label for="files" class="attahcment">
                        <svg class="icon">
                          <use
                            xlink:href="~/static/sprite.svg#attachment"
                          ></use>
                        </svg>
                        <span> اضافة ملفات</span>
                      </label>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::buttons_wrapper -->
                  <span v-if="errors[0]" class="validation-error">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>
              <!-- end::form-group -->

              <b-form-group>
                <div class="files_preview_wrapper">
                  <div class="wrapper" v-if="images.length > 0">
                    <label class="control-label"> الصور </label>
                    <div class="item" v-for="(file, idx) in images" :key="idx">
                      <a :href="file.media" target="_blank">
                        <img :src="file.media" alt="preivew" />
                      </a>
                      <span
                        class="close"
                        @click="deleteMedia(file.id, idx, 'images')"
                      >
                        x
                      </span>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::wrapper -->
                  <div class="wrapper" v-if="files.length > 0">
                    <label class="control-label"> الملفات </label>
                    <div
                      class="item file"
                      v-for="(file, idx) in files"
                      :key="idx"
                    >
                      <a :href="file.media" target="_blank">
                        <img src="~/static/document-file.svg" alt="preivew" />
                        <span class="text"> {{ file.name }} </span>
                      </a>
                      <span
                        class="close"
                        @click="deleteMedia(file.id, idx, 'files')"
                      >
                        x
                      </span>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::wrapper -->
                </div>
                <!-- end::files_preview_wrapper -->
              </b-form-group>

              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-default"
                  :disabled="disabled"
                >
                  <b-spinner variant="light" small v-if="disabled"></b-spinner>
                  <span>تقديم عرض</span>
                </button>
              </div>
              <!-- end::form-group -->
            </b-form>
            <!-- end::form -->
          </ValidationObserver>
        </div>
        <!-- end::form_wrapper -->
      </div>
    </b-modal>
    <!-- end:: apply_modal -->
  </div>
</template>

<script>
export default {
  name: "TenderCard",
  props: ["item"],
  data() {
    return {
      form: {
        desc: null,
        images: [],
        files: [],
      },
      images: [],
      files: [],
      disabled: false,
    };
  },
  computed: {
    is_loggedin() {
      return this.$cookies.get("userToken");
    },
  },
  methods: {
    async toggleFav() {
      await this.$axios
        .post(`/tenders/${this.item.id}/favorite`)
        .then((res) => {
          if (this.item.is_favorite == true) {
            this.TriggerNotify(
              "success",
              "تم ازالة المناقصة من المفضلة بنجاح !"
            );
            this.$emit("update-items");
          }
          if (this.item.is_favorite == false) {
            this.TriggerNotify(
              "success",
              "تم اضافة المناقصة من المفضلة بنجاح !"
            );
          }
          this.item.is_favorite = res.data.data.is_favorite;
          this.$forceUpdate();
        })
        .catch((err) => {
          const req_error = {
            data: err.response,
            type: "catch",
          };
          this.error_handler(req_error);
          this.TriggerNotify("error", this.notify.message);
        });
    },
    handleRoute() {
      if (this.is_loggedin) {
        this.$router.push({ name: "tender-id", params: { id: this.item.id } });
      } else {
        this.TriggerNotify(
          "error",
          "يجب تسجيل الدخول اولا لرؤية تفاصيل المناقصة"
        );
      }
    },
    handleFileUpload($event, type) {
      if (type == "files") {
        for (let x = 0; x < $event.target.files.length; x++) {
          this.form.files.push($event.target.files[x]);
          this.files.push({
            id: "new",
            media: URL.createObjectURL($event.target.files[x]),
            type: $event.target.files[x].type,
            name: $event.target.files[x].name,
          });
        }
      } else if (type == "images") {
        for (let x = 0; x < $event.target.files.length; x++) {
          this.form.images.push($event.target.files[x]);
          this.images.push({
            id: "new",
            media: URL.createObjectURL($event.target.files[x]),
            type: $event.target.files[x].type,
            name: $event.target.files[x].name,
          });
        }
      }
    },
    async deleteMedia(id, idx, type) {
      if (id != "new") {
        await this.$axios
          .delete(`/tender/${this.item.id}/medias/${id}`)
          .then((res) => {
            this.TriggerNotify("success", "تم حذف الملف بنجاح !");
          })
          .catch((err) => {
            const req_error = {
              data: err.response,
              type: "catch",
            };
            this.error_handler(req_error);
            this.TriggerNotify("error", this.notify.message);
          });
      }
      if (type == "files") {
        if (id == "new") {
          this.form.files.splice(idx, 1);
        }
        this.files.splice(idx, 1);
      } else if (type == "images") {
        if (id == "new") {
          this.form.images.splice(idx, 1);
        }
        this.images.splice(idx, 1);
      }
    },
    async submitForm() {
      await this.$refs.form.validate().then((success) => {
        if (success) {
          this.handleReq();
        }
      });
    },
    async handleReq() {
      this.disabled = true;
      const form_data = new FormData();

      form_data.append("desc", this.form.desc);
      if (this.form.images.length > 0) {
        this.form.images.forEach((file, index) => {
          form_data.append(`images[${index}]`, file);
        });
      }
      if (this.form.files.length > 0) {
        this.form.files.forEach((file, index) => {
          form_data.append(`files[${index}]`, file);
        });
      }

      await this.$axios
        .post(`/tenders/${this.item.id}/offers`, form_data)
        .then((res) => {
          this.TriggerNotify("success", "تم اضافة العرض بنجاح !");
          this.$bvModal.hide("apply_modal");
        })
        .catch((err) => {
          this.TriggerNotify("error", err.message);
          this.disabled = false;
        });

      this.disabled = false;
    },
    openModal() {
      this.$refs["apply"].show();
    },
  },
};
</script>

<style lang="scss" scoped>
.card_wrapper {
  padding: 15px;
  border: 2px solid $base-color;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  .ribbon {
    width: 120px;
    height: 120px;
    overflow: hidden;
    position: absolute;
    &.my_offer {
      &::before,
      &::after {
        border: 5px solid #df7755;
      }
      span {
        background-color: #df7755;
        color: #fff;
      }
    }
    &::before,
    &::after {
      position: absolute;
      z-index: -1;
      content: "";
      display: block;
      border: 5px solid #faea48;
    }
    span {
      position: absolute;
      display: block;
      width: 180px;
      padding: 10px 0;
      background-color: #faea48;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      color: #000;
      font: 700 14px/1 "Lato", sans-serif;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      text-align: center;
    }
    &.ribbon-top-left {
      top: -10px;
      left: -10px;
    }
    &::before,
    &::after {
      border-top-color: transparent;
      border-left-color: transparent;
    }
    &::before {
      top: 0;
      right: 6px;
    }
    &::after {
      bottom: 6px;
      left: 0;
    }
    & span {
      right: -13px;
      top: 30px;
      transform: rotate(-45deg);
    }
  }
  .card_content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .img_wrapper {
      min-height: 120px;
      max-height: 180px;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: auto;
        max-width: 100%;
        // height: 180px;
        border-radius: 10px;
      }
      @media (min-width: 992px) {
        margin-inline-end: 20px;
        width: 200px;
        margin-bottom: 0;
      }
    }
  }
  .info_wrapper {
    width: 100%;
    @media (min-width: 992px) {
      flex: 1;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #000;
      margin-bottom: 15px;
      span {
        font-size: 16px;
        color: #808080;
        font-weight: 400;
      }
    }
    .flex_wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 100%;
        @media (min-width: 992px) {
          &:first-child {
            flex: 1;
            margin-inline-end: 15px;
          }
          &:last-child {
            width: 250px;
          }
        }
        .desc {
          font-size: 16px;
          color: #808080;
          line-height: 1.5;
        }
        .line {
          margin-bottom: 10px;
          span {
            &:first-child {
              font-weight: 500;
              margin-inline-end: 10px;
            }
            &:last-child {
              color: $base-color;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .options_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 100px;
    width: 100%;
    @media (min-width: 992px) {
      width: 200px;
    }
    .item {
      display: flex;
      justify-content: flex-end;
      a {
        // margin-inline-end: 20px;
        .icon {
          width: 26px;
          height: 26px;
          fill: $base-color;
        }
        span {
          font-size: 16px;
          font-weight: 500;
          color: $base-color;
        }
      }
      .btn-default {
        background-color: $base-color;
        color: #fff;
        font-size: 15px;
        border-radius: 25px;
        font-weight: 500;
      }
      &:first-child {
        a:first-child {
          margin-inline-end: 10px;
        }
      }
      &:last-child {
        margin-top: auto;
      }
    }
  }
}
</style>
