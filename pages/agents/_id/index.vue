<template>
  <div class="tender_details_wrapper">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>

      <div class="details_wrapper">
        <div class="header_wrapper">
          <h4 class="title">
            {{ item.title }}
            <span>
              {{ $moment(item.created_at).startOf("day").fromNow() }}
            </span>
          </h4>
          <div class="options_wrapper">
            <div class="item">
              <a href="javascript:;" @click="handleSharing(item)">
                <svg class="icon">
                  <use xlink:href="~/static/sprite.svg#share"></use>
                </svg>
              </a>
              <a href="javascript:;" @click="toggleFav">
                <span v-if="item.is_favorite != true">
                  <svg class="icon">
                    <use xlink:href="~/static/sprite.svg#favourite"></use>
                  </svg>
                  <span>اضافة الي المفضلة</span>
                </span>
                <span v-if="item.is_favorite == true">
                  <svg class="icon">
                    <use
                      xlink:href="~/static/sprite.svg#favourite-filled"
                    ></use>
                  </svg>
                  <span> حذف من المفضلة</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <!-- end::header_wrapper -->

        <div class="body_wrapper">
          <div class="line">
            <div class="title">اسم صاحب الصفقة :</div>
            <div class="value">{{ item.user_name }}</div>
          </div>
          <!-- end::line -->
          <div class="line">
            <div class="title">اسم الشركة :</div>
            <div class="value">{{ item.company_name }}</div>
          </div>
          <!-- end::line -->
          <div class="line">
            <div class="title">اسم المنتج :</div>
            <div class="value">{{ item.product_name }}</div>
          </div>
          <!-- end::line -->
          <div class="line w-100 mb-5">
            <div class="title">التفاصيل</div>
            <div class="value">
              {{ item.desc }}
            </div>
          </div>
          <!-- end::line -->
          <div class="line">
            <div class="title">تاريخ الانتهاء :</div>
            <div class="value colored rev_font">
              {{ item.expiry_date }}
            </div>
          </div>
          <!-- end::line -->
        </div>
        <!-- end::body_wrapper -->

        <div class="footer_wrapper">
          <button
            v-if="is_loggedIn"
            type="button"
            class="btn btn-default"
            v-b-modal.apply_modal
          >
            تقديم عرض
          </button>
          <nuxt-link v-else to="/auth/login" class="btn btn-default">
            <span>تسجيل الدخول</span>
          </nuxt-link>
        </div>
        <!-- end::footer_wrapper -->
      </div>
      <!-- end::details_wrapper -->

      <!-- start:: apply_modal -->
      <b-modal id="apply_modal" size="lg" hide-footer title="تقديم العرض">
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
                      <div
                        class="item"
                        v-for="(file, idx) in images"
                        :key="idx"
                      >
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
                    v-if="is_loggedIn"
                    class="btn btn-default"
                    :disabled="disabled"
                  >
                    <b-spinner
                      variant="light"
                      small
                      v-if="disabled"
                    ></b-spinner>
                    <span>تقديم عرض</span>
                  </button>
                  <nuxt-link v-else to="/auth/login" class="btn btn-default">
                    <span>تسجيل الدخول</span>
                  </nuxt-link>
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

      <!-- start:: share_modal -->
      <b-modal id="share_modal" hide-footer hide-header>
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
              :title="item.title"
              :description="item.desc"
              :quote="sharing.quote"
              :hashtags="sharing.hashtags"
              :twitterUser="sharing.twitterUser"
            >
              <b-icon :icon="network.icon" variant="light"></b-icon>
            </ShareNetwork>
          </div>
        </div>
      </b-modal>
      <!-- end:: share_modal -->
    </div>
  </div>
</template>

<script>
import ClientOnly from "vue-client-only";
import Breadcrumb from "~/components/shared/Breadcrumb.vue";

export default {
  name: "AgentDetails",
  components: { Breadcrumb, ClientOnly },
  async asyncData(context) {
    const agent = await context.$axios.$get(`/agents/${context.params.id}`);

    return { item: agent.data };
  },
  data() {
    return {
      breadcrumb: [
        { name: "agents", title: "الوكلاء و الموزعين" },
        { name: "", title: "تفاصيل الصفقة" },
      ],
      form: {
        desc: null,
        images: [],
        files: [],
      },
      images: [],
      files: [],
      disabled: false,
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
  },
  methods: {
    handleSharing(item) {
      this.selected_item = item;
      this.sharing.url = `https://mysupplyangel.com${this.$route.fullPath}/${item.id}`;
      this.$bvModal.show("share_modal");
    },
    async toggleFav() {
      await this.$axios
        .post(`/agent/${this.item.id}/favorite`)
        .then((res) => {
          if (this.item.is_favorite == true) {
            this.TriggerNotify("success", "تم ازالة الصفقة من المفضلة بنجاح !");
          }
          if (this.item.is_favorite == false) {
            this.TriggerNotify("success", "تم اضافة الصفقة من المفضلة بنجاح !");
          }
          this.item.is_favorite = res.data.data.is_favorite;
        })
        .catch((err) => {
          this.TriggerNotify("error", err.message);
        });
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
          .delete(`/agent/${this.item.id}/medias/${id}`)
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
        .post(`/agents/${this.$route.params.id}/offers`, form_data)
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
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/pages/detailsPage.scss";
</style>
