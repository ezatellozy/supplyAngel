<template>
  <div class="filter_main_wrapper">
    <form @submit.prevent="handleForm">
      <div class="form-group">
        <div class="input-group">
          <!-- end::wrapper -->
          <client-only>
            <div class="row">
              <div class="col-6">
                <multiselect
                  :options="categories"
                  v-model="form.category"
                  placeholder="الدولة"
                  track-by="value"
                  label="name"
                  id="category"
                  :show-labels="false"
                >
                </multiselect>
              </div>
              <div class="col-6">
                <multiselect
                  :options="countries"
                  v-model="form.country"
                  :placeholder="`الدولة`"
                  track-by="value"
                  label="name"
                  id="country"
                >
                </multiselect>
              </div>
            </div>
          </client-only>
          <!-- end::wrapper -->
        </div>
        <!-- end::input-group -->
      </div>
      <!-- end::form-group -->
    </form>
  </div>
</template>

<script>
// importing vuex tools
import { mapGetters } from "vuex";

export default {
  name: "TenderFilter",
  props: {
    dropdowns: {
      default: true,
    },
    disabled: {
      default: false,
    },
  },
  data() {
    return {
      form: {
        keyword: null,
        country: null,
        category: null,
      },
    };
  },
  watch: {
    "form.keyword"(current) {
      if (current == "") {
        this.form.keyword = null;
      }
    },
  },
  async mounted() {
    if (this.$store.getters["localStorage/get_countries"].length == 0) {
      await this.$store.dispatch("localStorage/get_countries");
    }
    if (this.$store.getters["localStorage/get_categories"].length == 0) {
      await this.$store.dispatch("localStorage/get_categories");
    }
  },
  computed: {
    ...mapGetters({
      countries: ["localStorage/get_countries"],
      categories: ["localStorage/get_categories"],
    }),
  },
  methods: {
    handleForm() {
      this.$emit("handle-form", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter_main_wrapper {
  margin-bottom: 20px;
  .form-group {
    position: relative;
    .input-group {
      position: relative;
      // .icon {
      //   position: absolute;
      //   top: 50%;
      //   right: 10px;
      //   transform: translateY(-50%);
      //   width: 18px;
      //   height: 18px;
      //   fill: #919191;
      //   z-index: 10;
      // }
      .form-control {
        height: 60px;
        background-color: #efefef;
        border: none;
        padding-inline-start: 40px;
        box-shadow: none;
        border-radius: 0;
      }
      .wrapper {
        // width: 50%;
        display: flex;
        align-items: center;
        // &.full-width {
        //   width: 85%;
        // }
        // &.w-15 {
        //   width: 15%;
        //   .btn-default {
        //     width: 100%;
        //   }
        // }
        .multiselect {
          width: calc(100% / 2);
          min-height: 60px;
          &:first-child {
            margin-inline-end: 5px !important;
            .multiselect__tags {
              border-inline-end: none;
            }
          }
          .multiselect__select {
            top: 16px;
          }
          .multiselect__tags {
            display: flex;
            align-items: center;
            min-height: 60px;
            border-radius: 0;
            border: 2px solid #648dc4;
          }
          .multiselect__placeholder {
            color: #000;
          }
        }
        .btn-default {
          width: calc(100% / 3);
          background-color: #648dc4;
          color: #fff;
          border-radius: 0;
          height: 60px;
        }
      }
    }
  }
}
</style>
