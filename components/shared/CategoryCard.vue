<template>
  <div class="category_card">
    <nuxt-link :to="`/tenders-list?cate=${item.id}`">
      <img :src="item.image" alt="img" />
    </nuxt-link>
    <p class="title">{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss">
.category_card {
  margin-inline: 10px;
  margin-bottom: 10px;
  @media (min-width: 992px) {
    margin-bottom: 0px;
  }
  a {
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  p {
    font-size: 16px;
    margin: 0;
    text-align: center;
    color: #1d1d1d;
    font-weight: 500;
  }
}
</style>
