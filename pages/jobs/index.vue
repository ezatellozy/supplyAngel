<template>
  <section class="tenders_list_wrapper">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>
      <!-- end:: breadcrumb -->

      <!-- end::title_box -->
      <div class="title_box flex">
        <h2>وظائف مشتريات و مخازن</h2>
      </div>
      <div class="filter_buttons">
        <button
          type="buton"
          class="btn btn-defaut"
          :class="{ active: queryType == 'jobs' }"
          @click="toggleType('jobs')"
        >
          وظائف
        </button>
        <button
          type="buton"
          class="btn btn-defaut"
          :class="{
            active: queryType == 'employees',
          }"
          @click="toggleType('employees')"
        >
          موظفين
        </button>
      </div>
      <!-- end::filter_buttons -->
      <JobsFilter @handle-form="handleFilter"></JobsFilter>
      <div class="row">
        <div class="col-lg-6" v-for="item in jobs" :key="item.id">
          <JobCard :item="item" />
        </div>
      </div>

      <!-- end::tenders_wrapper -->
    </div>
  </section>
</template>

<script>
import Breadcrumb from "~/components/shared/Breadcrumb.vue";
import JobCard from "~/components/shared/JobCard.vue";
import JobsFilter from "~/components/shared/JobsFilter.vue";

// importing vuex tools
// import { mapGetters } from "vuex";

export default {
  name: "Jobs",
  components: { Breadcrumb, JobsFilter, JobCard },

  async asyncData(context) {
    try {
      const res = await context.$axios.$get("/jobs");

      return { jobs: res.data };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      breadcrumb: [{ name: "jobs", title: "وظائف مشتريات و مخازن" }],
      queryType: "jobs",
      // jobs: null,
    };
  },

  methods: {
    // async refetchTenders(page) {
    //   await this.$axios.$get(`/tenders?page=${page}`).then((res) => {
    //     this.$store.commit("tenders/SET_TENDERS_DATA", res.data);
    //     this.$store.commit("tenders/SET_TENDERS_META", res.meta);
    //   });
    // },
    async handleFilter(form) {
      await this.$axios
        .$get("/tenders", {
          params: {
            keyword: form.keyword,
            category_id: form.category != null ? form.category.id : null,
            country_id: form.country != null ? form.country.id : null,
          },
        })
        .then((res) => {
          this.$store.commit("tenders/SET_TENDERS_DATA", res.data);
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
    toggleType(query) {
      this.queryType = query;

      this.$axios.get(query).then((res) => (this.jobs = res.data.data));
    },
  },
};
</script>

<style lang="scss" scoped>
.tenders_list_wrapper {
  padding-block: 60px;
  .filter_buttons {
    margin-top: 60px;
    transform: translateY(-30px);
    .btn {
      padding: 8px 15px;
      background-color: transparent;
      border: none;
      color: #919191;
      font-size: 18px;
      font-weight: 500;
      border-radius: 8px !important;
      box-shadow: none;
      transition: all 0.25s;
      &.active {
        background-color: #648dc4;
        color: #fff;
      }
    }
  }
}
</style>
