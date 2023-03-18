<template>
  <section class="services_main_wrapper">
    <div class="container">
      <div class="title_box">
        <h2>خدماتنا</h2>
      </div>
      <!-- end::title_box -->

      <div class="row">
        <div
          class="col-xl-3 col-lg-4 col-md-6"
          v-for="item in items"
          :key="item.id"
        >
          <div class="card_wrapper">
            <div class="img_wrapper">
              <img :src="item.avatar" alt="img" />
            </div>
            <div class="info_wrapper">
              <h5 class="title">{{ item.title }}</h5>
              <p class="desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- end::row -->
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesSection",
  props: ["items"],
};
</script>

<style lang="scss" scoped>
.services_main_wrapper {
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
  .card_wrapper {
    margin-bottom: 20px;
    .img_wrapper {
      width: 120px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 9px #648dc445;
      border: 1px solid #648dc4;
      border-radius: 100%;
      margin-inline: auto;
      margin-bottom: 15px;
      overflow: hidden;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        // width: 90px;
        // height: 90px;
      }
    }
    .info_wrapper {
      .title {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .desc {
        text-align: center;
        font-size: 15px;
        line-height: 1.6;
        color: #919191;
        margin-bottom: 0;
      }
    }
  }
}
</style>
