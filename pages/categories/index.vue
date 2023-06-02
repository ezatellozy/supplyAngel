<template>
  <section class="categoreis_page">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>
      <!-- end:: breadcrumb -->

      <div class="title_box">
        <h2>القطاعات</h2>
      </div>
      <!-- end::title_box -->

      <!-- start::filter_wrapper -->
      <TenderFilter
        placeholder="ابحث عن قطاع"
        :dropdowns="false"
        :disabled="disabled"
        @handle-form="handleFilter"
      ></TenderFilter>
      <!-- end::filter_wrapper -->

      <div class="row">
        <div class="categories_wrappers">
          <div v-for="item in categories" :key="item.id">
            <category-card :item="item" />
          </div>
        </div>
      </div>
      <!-- end::row -->
    </div>
  </section>
</template>

<script src="~/pages/categories/-script.js"></script>

<style lang="scss" scoped>
.categoreis_page {
  padding-block: 70px;
  position: relative;
  .title_box {
    margin-bottom: 40px;
  }
  .card_wrapper {
    margin-bottom: 35px;
    cursor: pointer;
    img {
      width: 200px;
      height: 170px;
      display: block;
      margin-inline: auto;
      margin-bottom: 15px;
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.categories_wrappers {
  display: flex;
  flex-wrap: wrap;
}
</style>
