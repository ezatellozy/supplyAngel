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
                  <div class="row">
                    <ValidationProvider
                      rules="required|min:3"
                      v-slot="{ errors }"
                      class="col-md-6"
                      name="اضف السيرة الذاتية"
                    >
                      <b-form-group>
                        <label for="cv"> اضف السيرة الذاتية </label>
                        <label class="d-flex img_holder" for="cv">
                          <img
                            class="img-fluid"
                            v-if="form.cv.preview"
                            :src="form.cv.preview"
                            alt="cv"
                          />
                          <i v-else class="fas fa-upload"></i>
                        </label>
                        <b-form-file
                          name="اضف السيرة الذاتية"
                          id="cv"
                          @input="uploadCv"
                          class="d-none"
                          v-model="form.cv.mainMedia"
                          placeholder="Choose a file or drop it here..."
                          drop-placeholder="Drop file here..."
                        ></b-form-file>

                        <span v-if="errors[0]" class="validation-error">
                          {{ errors[0] }}
                        </span>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      rules="required|min:3"
                      v-slot="{ errors }"
                      class="col-md-6"
                      name="اضف  صورة شخصية"
                    >
                      <b-form-group>
                        <label for="avatar"> اضف صورة شخصية </label>
                        <label class="d-flex img_holder" for="avatar">
                          <img
                            class="img-fluid"
                            v-if="form.avatar.preview"
                            :src="form.avatar.preview"
                            alt="avatar"
                          />
                          <i v-else class="fas fa-upload"></i>
                        </label>
                        <b-form-file
                          name="اضف  صورة شخصية"
                          id="avatar"
                          @input="uploadAvatar"
                          class="d-none"
                          v-model="form.avatar.mainMedia"
                          placeholder="Choose a file or drop it here..."
                          drop-placeholder="Drop file here..."
                        ></b-form-file>

                        <span v-if="errors[0]" class="validation-error">
                          {{ errors[0] }}
                        </span>
                      </b-form-group>
                    </ValidationProvider>
                  </div>
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

                  <!-- end::col -->
                </div>

                <div class="col-lg-6 order-3">
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
            </b-form>
          </ValidationObserver>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "~/components/shared/Breadcrumb.vue";
export default {
  middleware: ["auth"],
  name: "find-job",

  components: { Breadcrumb },
  data() {
    return {
      loading: false,
      form: {
        job_title: null,
        company_name: null,

        desc: null,
        cv: {
          mainMedia: null,
          preview: null,
        },
        avatar: {
          mainMedia: null,
          preview: null,
        },
      },
      breadcrumb: [
        { name: "jobs", title: "وظائف مشتريات و مخازن" },
        { name: "find-job", title: "بحث عن وظيفة" },
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
          frmData.append("company_name", this.form.company_name);
          this.$axios
            .post("jobs", frmData)
            .then((res) => {
              this.loading = false;
              this.TriggerNotify("error", res.data.message);
            })
            .catch(() => (this.loading = false));
        }
      });
    },
    uploadCv(event) {
      this.form.cv.preview = URL.createObjectURL(event);
    },
    uploadAvatar(event) {
      this.form.avatar.preview = URL.createObjectURL(event);
    },
  },
};
</script>

<style lang="scss">
.add_job {
  padding-top: 50px;
  padding-bottom: 100px;
  .img_holder {
    position: relative;
    // width: 150px;
    height: 120px;
    border: 2px dashed $base-color;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    i {
      font-size: 28px;
      color: $base-color;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
