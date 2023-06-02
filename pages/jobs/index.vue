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
      <div class="d-flex justify-content-between flex-wrap mt-4 mb-2">
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
        <div class="links">
          <nuxt-link to="/jobs/find-job" class="find-job">
            بحث عن وظيفة
          </nuxt-link>
          <nuxt-link to="/jobs/add-job" class="add-job">
            إضافة إعلان توظيف
          </nuxt-link>
        </div>
      </div>
      <!-- end::filter_buttons -->
      <JobsFilter @handle-form="handleFilter"></JobsFilter>
      <div class="row">
        <div class="col-lg-6" v-for="item in jobs" :key="item.id">
          <JobCard :item="item" v-if="queryType == 'jobs'" />
          <EmployCard :item="item" v-if="queryType == 'employees'" />
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
import EmployCard from "~/components/shared/EmployCard.vue";

// importing vuex tools
// import { mapGetters } from "vuex";

export default {
  name: "jobs",
  components: { Breadcrumb, JobsFilter, JobCard, EmployCard },

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
    async handleFilter(form) {
      await this.$axios
        .$get("/jobs", {
          params: {
            city_id: form.city != null ? form.city.id : null,
            country_id: form.country != null ? form.country.id : null,
          },
        })
        .then((res) => {
          this.jobs = res.data;
        })
        .catch((err) => {
          this.TriggerNotify("error", err.message);
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
    margin-bottom: 20px;

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
  .links {
    margin-bottom: 20px;
    display: flex;
    a {
      border: 1px solid $base-color;
      padding: 5px 16px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.find-job {
        margin-inline-end: 10px;
        background: $base-color;
        color: #fff;
        transition: 0.3s;
        &:hover {
          background: $btn-hover-color;
        }
      }
    }
  }
}
</style>
