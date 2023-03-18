<template>
  <div class="tender_details_wrapper">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>

      <div class="details_wrapper">
        <div class="header_wrapper">
          <h4 class="title">
            {{ item.job_title }}
            <span>
              {{ $moment(item.created_at).startOf("day").fromNow() }}
            </span>
          </h4>
          <div class="options_wrapper">
            <div class="item">
              <a role="button" @click="handleSharing(item)">
                <svg class="icon">
                  <use xlink:href="~/static/sprite.svg#share"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="body_wrapper">
          <!-- end::line -->
          <div class="line">
            <div class="title">اسم الشركة :</div>
            <div class="value">{{ item.company_name }}</div>
          </div>
          <!-- end::line -->

          <div class="line w-100 mb-5">
            <div class="title">التفاصيل</div>
            <div class="value">
              {{ item.desc }}
            </div>
          </div>
          <div class="footer_wrapper" v-if="!item.i_applied">
            <button
              type="button"
              class="btn btn-default"
              @click="$bvModal.show('apply_modal')"
            >
              تقديم
            </button>
          </div>
          <!-- end::row -->
        </div>
      </div>
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
      <!-- <div class="item">
      <b-overlay
        :show="loading"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
      >
        <b-button
          :disabled="loading || item.i_applied"
          @click="applyModal(item)"
          class="btn btn-default"
        >
          <span v-if="!item.i_applied"> التقديم</span>
          <span v-else> تم التقديم</span>
        </b-button>
      </b-overlay>
    </div> -->
      <!-- end::details_wrapper -->
    </div>

    <!-- start:: apply_modal -->
    <b-modal id="apply_modal" size="lg" hide-footer title="تقديم العرض">
      <div class="modal_wrapper">
        <div class="form_wrapper">
          <ValidationObserver ref="form" @submit.prevent="submitForm">
            <div class="row">
              <div class="col-lg-6">
                <ValidationProvider rules="required|min:3" v-slot="{ errors }">
                  <b-form-group>
                    <label
                      class="control-label"
                      :class="{ invalid: errors[0] }"
                    >
                      الأسم
                      <span class="star">*</span>
                    </label>
                    <b-input-group>
                      <b-form-input
                        type="text"
                        v-model="form.name"
                        :class="{ invalid: errors[0] }"
                        placeholder="يرجى ادخال الأسم"
                      ></b-form-input>
                    </b-input-group>
                    <span v-if="errors[0]" class="validation-error">
                      {{ errors[0] }}
                    </span>
                  </b-form-group>
                </ValidationProvider>
                <!-- end::item -->
              </div>
              <!-- end::col -->

              <div class="col-lg-6">
                <b-form-group>
                  <label class="control-label">
                    رقم الهاتف
                    <span class="star">*</span>
                  </label>
                  <b-input-group class="phone_input">
                    <b-form-select
                      v-model="form.phone_code"
                      :options="codes_list"
                    ></b-form-select>

                    <ValidationProvider
                      rules="required|numeric|min:8"
                      v-slot="{ errors }"
                      class="wrapper"
                      name=" رقم الهاتف"
                    >
                      <b-form-input
                        name=" رقم الهاتف"
                        type="text"
                        v-model="form.phone"
                        :class="{ invalid: errors[0] }"
                        placeholder="يرجى ادخال رقم الهاتف"
                      ></b-form-input>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </b-input-group>
                </b-form-group>
                <!-- end::item -->
              </div>
              <!-- end::col -->

              <div class="col-lg-6">
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <b-form-group>
                    <label
                      class="control-label"
                      :class="{ invalid: errors[0] }"
                    >
                      البريد الألكتروني
                      <span class="star">*</span>
                    </label>
                    <b-input-group>
                      <b-form-input
                        type="text"
                        v-model="form.email"
                        :class="{ invalid: errors[0] }"
                        placeholder="يرجى ادخال البريد الالكتروني"
                      ></b-form-input>
                    </b-input-group>
                    <span v-if="errors[0]" class="validation-error">
                      {{ errors[0] }}
                    </span>
                  </b-form-group>
                </ValidationProvider>
                <!-- end::item -->
              </div>
              <!-- end::col -->
            </div>

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
import Breadcrumb from "~/components/shared/Breadcrumb.vue";
import { mapGetters } from "vuex";
export default {
  name: "job-id",
  components: { Breadcrumb },
  async asyncData(context) {
    const tender = await context.$axios.$get(`/jobs/${context.params.id}`);

    return { item: tender.data };
  },
  data() {
    return {
      breadcrumb: [
        { name: "jobs", title: "الوظائف" },
        { name: "", title: "تفاصيل الوظيفة" },
      ],
      form: {
        name: null,
        email: null,
        phone: null,
        image: null,
        file: null,
        phone_code: "02",
      },

      disabled: false,
      offers: [],
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
    computed: {
      ...mapGetters({
        countries: ["localStorage/get_countries"],
      }),
      codes_list() {
        let list = [];
        this.countries.forEach((elem) => {
          list.push({ text: elem.phone_code, value: elem.phone_code });
        });

        return list;
      },
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
          }
          if (this.item.is_favorite == false) {
            this.TriggerNotify(
              "success",
              "تم اضافة المناقصة من المفضلة بنجاح !"
            );
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
        .post(`/tenders/${this.$route.params.id}/offers`, form_data)
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
    handleSharing(item) {
      this.selected_item = item;
      this.sharing.url = `https://mysupplyangel.com${this.$route.fullPath}/${item.id}`;
      this.$refs["share_modal"].show();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/pages/detailsPage.scss";
</style>
