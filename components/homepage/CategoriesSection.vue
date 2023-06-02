<template>
  <section class="categories_main_wrapper">
    <div class="container">
      <div class="title_box">
        <h2>القطاعات</h2>
      </div>
      <!-- end::title_box -->
      <div class="categories_wrappers">
        <div v-for="item in items" :key="item.id">
          <category-card :item="item" />
        </div>
        <!-- <div class="category_card">
          <nuxt-link :to="`/tenders-list?cate=${item.id}`">
            <img :src="item.image" alt="img" />
          </nuxt-link>
          <p class="title">{{ item.name }}</p>
        </div> -->
      </div>
      <!-- end::row -->
      <div class="button_wrapper">
        <nuxt-link :to="{ name: 'categories' }">عرض المزيد</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import CategoryCard from "../shared/CategoryCard.vue";
export default {
  components: { CategoryCard },

  name: "CategoriesSection",
  props: ["items"],
  methods: {
    handleRoute(id) {
      this.$router.push({ name: "tenders-list", query: { cate: id } });
    },
  },
};
</script>

<style lang="scss">
.categories_main_wrapper {
  padding-block: 60px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 240px);
    height: 1px;
    background-color: #ddd;
  }
  .title_box {
    h2 {
      text-align: center;
    }
  }
  // .card_wrapper {
  //   margin-bottom: 35px;
  //   cursor: pointer;
  //   img {
  //     width: 200px;
  //     height: 170px;
  //     display: block;
  //     margin-inline: auto;
  //     margin-bottom: 15px;
  //   }
  //   .title {
  //     text-align: center;
  //     font-size: 18px;
  //     font-weight: 600;
  //   }
  // }
  .button_wrapper {
    display: flex;
    justify-content: flex-end;
    a {
      font-weight: 500;
      color: $base-color;
      text-decoration: underline !important;
    }
  }
  .categories_wrappers {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
