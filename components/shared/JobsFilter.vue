<template>
  <div class="jobs_filter">
    <form @submit.prevent="handleForm">
      <div class="form-group">
        <client-only>
          <div class="input-group">
            <!-- end::wrapper -->
            <multiselect
              :options="categories"
              v-model="form.category"
              placeholder="الدولة"
              track-by="id"
              label="name"
              :show-labels="false"
            >
            </multiselect>
            <!-- end::wrapper -->
          </div>
          <div class="input-group">
            <!-- end::wrapper -->
            <multiselect
              :options="countries"
              v-model="form.country"
              :placeholder="`الدولة`"
              track-by="id"
              label="name"
              :show-labels="false"
            >
            </multiselect>
            <!-- end::wrapper -->
          </div>
        </client-only>
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

<style lang="scss">
.jobs_filter {
  .form-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
    .input-group {
      display: block;
      width: fit-content;
      &:first-child {
        margin-inline-end: 8px;
      }
    }
  }
  .multiselect {
    width: 200px;
    // width: calc(100% / 3);
    min-height: 60px;

    .multiselect__select {
      top: 16px;
    }
    .multiselect__tags {
      display: flex;
      align-items: center;
      min-height: 60px;
      border-radius: 8px;
      border: 1px solid #648dc4;
    }
    .multiselect__placeholder {
      color: #000;
    }
  }
}
</style>
