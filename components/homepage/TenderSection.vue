<template>
  <section class="tender_main_wrapper">
    <div class="container">
      <div class="title_box">
        <h2>احدث المناقصات</h2>
      </div>
      <!-- end::title_box -->
      <TenderFilter @handle-form="handleFilter"></TenderFilter>
      <div class="tenders_wrapper">
        <TenderCard
          v-for="(item, idx) in tenders_list"
          :key="idx"
          :item="item"
        ></TenderCard>

        <div class="button_wrapper">
          <nuxt-link :to="{ name: 'tenders-list' }">عرض المزيد</nuxt-link>
        </div>
      </div>
      <!-- end::tenders_wrapper -->
    </div>
  </section>
</template>

<script>
// importing components
import TenderFilter from "~/components/shared/TenderFilter.vue";
import TenderCard from "~/components/shared/TenderCard.vue";

export default {
  name: "TenderSection",
  props: ["tenders"],
  components: { TenderFilter, TenderCard },
  data() {
    return {
      tenders_list: this.tenders,
    };
  },
  methods: {
    handleFilter(e) {
      this.$axios({
        methods: "get",
        url: "tenders",
        params: {
          keyword: e.keyword,
          category_id: e.category?.id,
          country_id: e.country?.id,
        },
      }).then((res) => (this.tenders_list = res.data.data));
    },
  },
};
</script>

<style lang="scss" scoped>
.button_wrapper {
  display: flex;
  justify-content: flex-end;
  a {
    font-weight: 500;
    color: $base-color;
    text-decoration: underline !important;
  }
}
</style>
