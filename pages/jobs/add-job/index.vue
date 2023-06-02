<template>
  <div class="add_job">
    <div class="container">
      <Breadcrumb :links="breadcrumb"></Breadcrumb>

      <div class="form_wrapper">
        <client-only>
          <ValidationObserver ref="addJobForm">
            <b-form @submit.prevent="submitForm">
              <div class="row">
                <div class="col-lg-6 order-lg-2">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <b-form-group>
                      <label for="country">الدولة</label>
                      <div class="input-group">
                        <!-- end::wrapper -->
                        <multiselect
                          :options="countries"
                          v-model="form.country"
                          placeholder="الدولة"
                          track-by="id"
                          label="name"
                          id="country"
                          :show-labels="false"
                        >
                        </multiselect>
                        <!-- end::wrapper -->
                      </div>

                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <b-form-group>
                      <label for="city">المدينة</label>
                      <div class="input-group">
                        <!-- end::wrapper -->
                        <multiselect
                          :options="cities"
                          v-model="form.city"
                          placeholder="المدينة"
                          track-by="id"
                          label="name"
                          id="city"
                          :show-labels="false"
                        >
                        </multiselect>
                        <!-- end::wrapper -->
                      </div>

                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                </div>
                <div class="col-lg-6 order-lg-1">
                  <ValidationProvider
                    rules="required|min:3"
                    v-slot="{ errors }"
                    name="عنوان الوظيفة"
                  >
                    <b-form-group>
                      <label for="job_title"> عنوان الوظيفة</label>
                      <b-input-group>
                        <b-form-input
                          type="text"
                          v-model="form.job_title"
                          :class="{ invalid: errors[0] }"
                          placeholder="عنوان الوظيفة"
                          name="عنوان الوظيفة"
                        ></b-form-input>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|min:3"
                    v-slot="{ errors }"
                  >
                    <b-form-group>
                      <label for="company_name">اسم الشركة</label>
                      <b-input-group>
                        <b-form-input
                          id="company_name"
                          type="text"
                          v-model="form.company_name"
                          :class="{ invalid: errors[0] }"
                          placeholder="اسم الشركة"
                        ></b-form-input>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|min:3"
                    v-slot="{ errors }"
                  >
                    <b-form-group>
                      <label for="desc">التفاصيل</label>
                      <b-input-group>
                        <b-form-textarea
                          id="desc"
                          rows="6"
                          v-model="form.desc"
                          placeholder="التفاصيل "
                          :class="{ invalid: errors[0] }"
                        ></b-form-textarea>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                </div>
                <div class="col-lg-6 order-3">
                  <div>
                    <b-form-group class="mb-0">
                      <button
                        type="submit"
                        class="btn btn-default w-100"
                        :disabled="loading"
                      >
                        <b-spinner
                          variant="light"
                          small
                          v-if="loading"
                        ></b-spinner>
                        <span>ارسال</span>
                      </button>
                    </b-form-group>
                    <!-- end::item -->
                  </div>
                </div>
              </div>

              <!-- end::col -->
            </b-form>
          </ValidationObserver>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "~/components/shared/Breadcrumb.vue";
export default {
  middleware: ["auth"],
  name: "add-job",

  components: { Breadcrumb },
  data() {
    return {
      loading: false,
      form: {
        job_title: null,
        company_name: null,
        country: null,
        city: null,

        desc: null,
      },
      breadcrumb: [
        { name: "jobs", title: "وظائف مشتريات و مخازن" },
        { name: "add-job", title: "إضافة وظيفة" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$refs.addJobForm.validate().then((d) => {
        if (d) {
          this.loading = true;
          const frmData = new FormData();
          frmData.append("job_title", this.form.job_title);
          frmData.append("desc", this.form.desc);
          frmData.append("country_id", this.form.country.id);
          frmData.append("city_id", this.form.city.id);
          frmData.append("company_name", this.form.company_name);
          this.$axios
            .post("jobs", frmData)
            .then((res) => {
              this.loading = false;
              this.TriggerNotify("success", res.data.message);
            })
            .catch((err) => {
              this.loading = false;
              this.TriggerNotify("error", err.message);
            });
        }
      });
    },
  },
  async mounted() {
    if (this.$store.getters["localStorage/get_countries"].length == 0) {
      await this.$store.dispatch("localStorage/get_countries");
    }
    if (this.$store.getters["localStorage/get_cities"].length == 0) {
      await this.$store.dispatch("localStorage/get_cities");
    }
  },
  computed: {
    ...mapGetters({
      countries: ["localStorage/get_countries"],
      cities: ["localStorage/get_cities"],
    }),
  },
};
</script>

<style lang="scss">
.add_job {
  padding-top: 50px;
  padding-bottom: 100px;
  .multiselect__tags {
    border-radius: 12px !important;
  }
}
</style>
