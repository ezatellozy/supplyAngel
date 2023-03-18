<template>
  <section class="tender_form">
    <div class="form_wrapper">
      <client-only>
        <ValidationObserver ref="form">
          <b-form @submit.prevent="submitForm">
            <div class="row align-items-stretch">
              <div class="col-lg-6">
                <div class="form_part h-100">
                  <div class="row">
                    <div class="col-lg-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            أسمك
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
                      <ValidationProvider
                        rules="required|numeric|min:9"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            رقم الهاتف
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="phone"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال رقم الهاتف"
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
                      <ValidationProvider
                        rules="numeric|min:9"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            رقم الواتس
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="whatsapp"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال رقم الواتس"
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
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            أسم الشركة
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="form.company_name"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال أسم الشركة"
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

                    <div class="col-lg-12">
                      <ValidationProvider
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            البريد الألكتروني
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="email"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال البريد الألكتروني"
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
                      <ValidationProvider v-slot="{ errors }">
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            العنوان
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="form.address"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال العنوان"
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
                      <ValidationProvider v-slot="{ errors }">
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            عنوان الشركة
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="form.company_address"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال عنوان الشركة"
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
                      <ValidationProvider rules="numeric" v-slot="{ errors }">
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            البطاقة الضريبية
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="form.tax_card_num"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال البطاقة الضريبية "
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
                      <ValidationProvider rules="numeric" v-slot="{ errors }">
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            السجل التجاري
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="text"
                              v-model="form.commercial_register_num"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال السجل التجاري  "
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

                    <div class="col-xl-12">
                      <h4 class="title_wrapper">تغيير كلمة المرور</h4>
                    </div>
                    <!-- end::col -->

                    <div class="col-lg-12">
                      <ValidationProvider
                        vid="confirm_password"
                        :rules="{
                          min: 8,
                        }"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            كلمة المرور الحالية
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="password"
                              v-model="current_password"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال كلمة المرور الحالية"
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

                    <div class="col-lg-12">
                      <ValidationProvider
                        vid="confirm_password"
                        :rules="{
                          min: 8,
                        }"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            كلمة المرور الجديدة
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="password"
                              v-model="password"
                              :class="{ invalid: errors[0] }"
                              placeholder="يرجى ادخال كلمة المرور الجديدة"
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

                    <div class="col-lg-12">
                      <ValidationProvider
                        rules="confirmed:confirm_password"
                        v-slot="{ errors }"
                      >
                        <b-form-group>
                          <label
                            class="control-label"
                            :class="{ invalid: errors[0] }"
                          >
                            تأكيد كلمة المرور
                          </label>
                          <b-input-group>
                            <b-form-input
                              type="password"
                              v-model="password_confirmation"
                              :class="{ invalid: errors[0] }"
                              placeholder=" تأكيد كلمة المرور الجديدة"
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
                  <!-- end::row -->
                </div>
                <!-- end::form_part -->
              </div>
              <!-- end::col -->

              <div class="col-lg-6">
                <div class="form_part h-100 with_border">
                  <h4 class="title_wrapper mt-0">السيرة الذاتية</h4>
                  <div class="upload_wrapper">
                    <div class="preview_wrapper">
                      <embed v-if="prev_work" :src="prev_work" />
                    </div>
                    <input
                      type="file"
                      id="uploadFile"
                      @change="handleFileUpload($event)"
                    />
                    <label for="uploadFile" class="btn btn-default">
                      رفع ملف جديد
                    </label>
                  </div>

                  <div class="categories_dropdown_wrapper">
                    <b-form-group label="تخصص الصفقة">
                      <b-input-group>
                        <div class="wrapper">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="ابحث عن تخصص"
                            @input="emitQuery($event.target.value)"
                          />
                          <svg class="icon">
                            <use
                              xlink:href="~/static/fontawesome/solid.svg#magnifying-glass"
                            ></use>
                          </svg>
                        </div>
                      </b-input-group>
                    </b-form-group>
                    <!-- end::form-group -->

                    <div class="categories_selected">
                      <div
                        class="item"
                        v-for="(option, idx) in form.category_ids"
                        :key="idx + 100"
                      >
                        {{ option.name }}
                        <span class="close" @click="toggleSelected(option)">
                          x
                        </span>
                      </div>
                      <!-- end::item -->
                    </div>
                    <!-- end::categories_selected -->

                    <div class="categories_list">
                      <a
                        href="javascript:;"
                        v-for="(item, idx) in categories"
                        :key="idx"
                        @click="toggleSelected(item)"
                      >
                        {{ item.name }}
                      </a>
                    </div>
                    <!-- end::categories_list -->
                  </div>
                  <!-- end::categories_dropdown_wrapper -->
                </div>
              </div>
              <!-- end::col -->

              <div class="col-xl-12">
                <div class="submit_wrapper">
                  <button
                    type="submit"
                    class="btn btn-default"
                    :disabled="disabled"
                  >
                    <b-spinner
                      v-if="disabled"
                      variant="light"
                      small
                    ></b-spinner>
                    <span>حفظ</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- end::row -->
          </b-form>
        </ValidationObserver>
      </client-only>
    </div>
    <!-- end::form_wrapper -->
  </section>
</template>

<script src="~/pages/profile/-form/-script.js"></script>

<style lang="scss">
.tender_form {
  .multiselect__select {
    top: 15px !important;
  }
  .multiselect__tags {
    min-height: 60px !important;
    border-radius: 25px !important;
    display: flex;
    align-items: center;
  }
  .submit_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    .btn {
      width: 50%;
      background-color: $base-color;
      color: #fff;
      border-radius: 25px;
      padding-block: 15px;
    }
  }
  .form_part {
    position: relative;
    &.with_border {
      @media (min-width: 992px) {
        padding-inline-start: 35px;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 100%;
          background-color: #ddd;
          transform: translateY(-50%);
        }
      }
    }
  }
  .input-group {
    .wrapper {
      width: 100%;
      .icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        fill: #919191;
        z-index: 10;
      }
      .form-control {
        height: 60px;
        background-color: #efefef;
        border: none;
        padding-inline-start: 40px;
        box-shadow: none;
        border-radius: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.title_wrapper {
  font-size: 22px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 30px;
}
.upload_wrapper {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #cbcbcb;
  margin-bottom: 30px;
  input {
    display: none;
  }
  .preview_wrapper {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #eee;
    border-radius: 10px;
    embed {
      width: 100%;
      height: 200px;
    }
  }
  .btn {
    background-color: $base-color;
    color: #fff;
    border-radius: 25px;
    display: block;
    width: 100%;
  }
}
</style>
