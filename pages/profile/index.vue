<template>
  <section class="profile_Wrapper">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>
      <!-- end:: breadcrumb -->

      <div class="title_box">
        <h2>معلومات الحساب و سابقة الاعمال</h2>
      </div>
      <!-- end::title_box -->

      <FormCard
        :categories="categories"
        :item="profile"
        @search-query="filterCategories"
      ></FormCard>
      <!-- end::FormCard -->
    </div>
  </section>
</template>

<script src="~/pages/profile/-script.js"></script>

<style lang="scss" scoped>
.profile_Wrapper {
  padding-block: 70px;
  position: relative;
}
</style>
