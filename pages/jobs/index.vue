<template>
  <section class="tenders_list_wrapper">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>
      <!-- end:: breadcrumb -->

      <div class="title_box">
        <h2>وظائف مشتريات و مخازن</h2>
      </div>
      <!-- end::title_box -->

      <!-- start::filter_wrapper -->

      <!-- end::filter_wrapper -->

      <b-tabs>
        <b-tab title="وظائف">
          <JobsFilter @handle-form="handleFilter"></JobsFilter>
          <div class="row">
            <div class="col-lg-6" v-for="item in jobs" :key="item.id">
              <JobCard :item="item" />
            </div>
          </div>
          <!-- end::tenders_wrapper -->
        </b-tab>
        <b-tab title="موظفين">
          <div class="agents_wrapper">
            <div class="row">
              <div class="col-lg-6" v-for="item in jobs" :key="item.id">
                <JobCard :item="item" />
              </div>
              <!-- end::col -->
            </div>
            <!-- end::row -->
          </div>
          <!-- end::tenders_wrapper -->
        </b-tab>
      </b-tabs>

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
  },
};
</script>

<style lang="scss" scoped>
.tenders_list_wrapper {
  padding-block: 60px;
}
</style>
