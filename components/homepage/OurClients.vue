<template>
  <div class="clients_wrapper overflow-hidden">
    <div class="container">
      <div class="title_box">
        <h2>عملائنا</h2>
      </div>
      <!-- end::title_box -->
      <div class="carousel-wrapper">
        <client-only>
          <carousel v-bind="options">
            <slide v-for="item in items" :key="item.id">
              <div class="img-wrapper">
                <img :src="item.avatar" alt="client" />
              </div>
            </slide>
          </carousel>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
// importing slick slider
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "OurClients",
  props: ["items"],
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settings: [
        {
          dots: true,
          focusOnSelect: true,
          infinite: false,
          autoplay: true,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
          touchThreshold: 8,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        },
      ],
      options: {
        loop: true,
        perPage: 4,
        paginationEnabled: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.clients_wrapper {
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
  .slider_wrapper {
    .clients_card {
      margin-inline: 5px;
      box-shadow: 0px 0px 6px #00000029;
    }
    .img_wrapper {
      // border: 1px solid #eee;
      border-radius: 5px;
      width: 95% !important;
      // margin-inline: auto;
      img {
        width: 70%;
        height: 100px;
        // margin-inline: auto;
      }
    }
  }
}
.carousel-wrapper {
  // padding: 40px;
  height: 150px;
  .VueCarousel-slide {
    text-align: center;
  }
}
.img-wrapper img {
  margin: auto;
  width: 200px;
  height: 100px;
  object-fit: cover;
  background-image: linear-gradient(gray 100%, transparent 0);
}
</style>
