<template>
  <section class="favourite_list">
    <div class="container">
      <!-- start:: breadcrumb -->
      <Breadcrumb :links="breadcrumb"></Breadcrumb>
      <!-- end:: breadcrumb -->

      <div class="title_box">
        <h2>المفضلة</h2>
      </div>
      <!-- end::title_box -->

      <b-tabs>
        <b-tab title="الصفقات" active>
          <div class="tenders_wrapper">
            <TenderCard
              v-for="item in tenders"
              :key="item.id"
              @update-items="updateitems(item)"
              :item="item"
            ></TenderCard>
            <b-pagination
              v-model="tenderPaging"
              :total-rows="tendersMeta.total"
              :last-page="tendersMeta.last_page"
              :per-page="tendersMeta.per_page"
              aria-controls="tenders"
            ></b-pagination>
          </div>
          <!-- end::tenders_wrapper -->
        </b-tab>
        <b-tab title="تصفيات و هوالك دورية">
          <div class="expirations_wrapper">
            <div v-for="item in expirations" :key="item.id">
              <expiration-card :item="item" @update-items="updateitems()" />
              <div class="row justify-content-between" v-if="false">
                <div class="col-lg-2">
                  <div class="img_wrapper" @click="handleRoute(item.id)">
                    <img
                      v-if="item.expiration_images.length > 0"
                      :src="item.expiration_images[0].media"
                      alt="tender_img"
                    />
                  </div>
                </div>
                <!-- end::col -->
                <div class="col-lg-6">
                  <div class="info_wrapper">
                    <h4 class="title" @click="handleRoute(item.id)">
                      {{ item.title }}
                      <span>
                        {{ $moment(item.created_at).startOf().fromNow() }}
                      </span>
                    </h4>
                    <div class="flex_wrapper">
                      <div class="item">
                        <p class="desc">{{ item.desc }}</p>
                        <div class="buttons_wrapper">
                          <a href="javascript:;" @click="handleSharing(item)">
                            <svg class="icon">
                              <use xlink:href="~/static/sprite.svg#share"></use>
                            </svg>
                          </a>

                          <a
                            href="javascript:;"
                            @click="toggleFav(item.id, idx)"
                          >
                            <span v-if="item.is_favorite != true">
                              <svg class="icon">
                                <use
                                  xlink:href="~/static/sprite.svg#favourite"
                                ></use>
                              </svg>
                              <span>اضافة الي المفضلة</span>
                            </span>
                            <span v-if="item.is_favorite == true">
                              <svg class="icon">
                                <use
                                  xlink:href="~/static/sprite.svg#favourite-filled"
                                ></use>
                              </svg>
                              <span> حذف من المفضلة</span>
                            </span>
                          </a>
                        </div>
                      </div>
                      <!-- end::item -->
                    </div>
                    <!-- end::flex_wrapper -->
                  </div>
                </div>
                <!-- end::col -->
                <div class="col-lg-3">
                  <div class="options_wrapper">
                    <div class="item"></div>
                    <!-- end::item -->
                    <div class="item">
                      <nuxt-link to="" class="btn btn-default"
                        >تقديم عرض</nuxt-link
                      >
                    </div>
                    <!-- end::item -->
                  </div>
                </div>
                <!-- end::col -->
              </div>
              <!-- end::row -->
            </div>
            <b-pagination
              v-model="expirationsPaging"
              :total-rows="expirationsMeta.total"
              :last-page="expirationsMeta.last_page"
              :per-page="expirationsMeta.per_page"
              aria-controls="expirations"
            ></b-pagination>
          </div>
          <!-- end::expirations_wrapper -->
        </b-tab>
        <b-tab title="وكلاء و موزعين">
          <div class="tenders_wrapper">
            <div class="agents_card_wrapper">
              <div class="row">
                <div
                  class="col-lg-6 mb-2"
                  v-for="item in agents"
                  :key="item.id"
                >
                  <agents-card :item="item" @update-items="updateitems()" />
                  <div class="card_wrapper" v-if="false">
                    <h5 class="main_title">{{ item.title }}</h5>
                    <p class="date">
                      {{ $moment(item.created_at).startOf("day").fromNow() }}
                    </p>
                    <p class="desc">
                      {{ item.desc }}
                    </p>
                    <div class="item mb-4">
                      <a href="javascript:;" @click="handleSharing(item)">
                        <svg class="icon">
                          <use xlink:href="~/static/sprite.svg#share"></use>
                        </svg>
                      </a>
                      <a
                        href="javascript:;"
                        @click="toggleFav(item.id, idx)"
                        v-if="is_loggedin"
                      >
                        <span v-if="item.is_favorite != true">
                          <svg class="icon">
                            <use
                              xlink:href="~/static/sprite.svg#favourite"
                            ></use>
                          </svg>
                          <span>اضافة الي المفضلة</span>
                        </span>
                        <span v-if="item.is_favorite == true">
                          <svg class="icon">
                            <use
                              xlink:href="~/static/sprite.svg#favourite-filled"
                            ></use>
                          </svg>
                          <span> حذف من المفضلة</span>
                        </span>
                      </a>
                    </div>
                    <!-- end::item -->
                    <div class="item">
                      <nuxt-link
                        :to="{ name: 'agents-id', params: { id: item.id } }"
                        class="btn btn-default"
                      >
                        تقديم عرض
                      </nuxt-link>
                    </div>
                    <!-- end::item -->
                  </div>
                  <!-- end::card_wrapper -->
                </div>
                <!-- end::col -->
              </div>
              <!-- end::row -->
              <b-pagination
                v-model="agentsPaging"
                :total-rows="agentsMeta.total"
                :last-page="agentsMeta.last_page"
                :per-page="agentsMeta.per_page"
                aria-controls="agents"
              ></b-pagination>
            </div>
            <!-- end::agents_card_wrapper -->
          </div>
          <!-- end::tenders_wrapper -->
        </b-tab>
      </b-tabs>
      <!-- end::tabs_wrapper  -->
    </div>
  </section>
</template>

<script>
// importing components
import Breadcrumb from "~/components/shared/Breadcrumb.vue";
import TenderCard from "~/components/shared/TenderCard.vue";
import ExpirationCard from "~/components/shared/ExpirationCard.vue";
import AgentsCard from "~/components/shared/AgentsCard.vue";

export default {
  middleware: ["auth"],
  name: "FavouriteList",
  components: { Breadcrumb, TenderCard, ExpirationCard, AgentsCard },
  async asyncData(context) {
    const tenders = await context.$axios.$get("/tender/favorites");
    const expirations = await context.$axios.$get("/expiration/favorites");
    const agents = await context.$axios.$get("/agent/favorites");

    return {
      tenders: tenders.data,
      tendersMeta: tenders.meta,
      expirations: expirations.data,
      expirationsMeta: expirations.meta,
      agents: agents.data,
      agentsMeta: agents.meta,
    };
  },
  data() {
    return {
      breadcrumb: [{ name: "favourite", title: "المفضلة" }],
      tenderPaging: 1,
      expirationsPaging: 1,
      agentsPaging: 1,
    };
  },
  computed: {
    is_loggedin() {
      return this.$cookies.get("userToken");
    },
  },
  methods: {
    updateitems() {
      this.$nuxt.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.favourite_list {
  padding-block: 70px;
  position: relative;
  .agents_card_wrapper {
    .card_wrapper {
      padding: 25px;
      border: 2px solid $base-color;
      border-radius: 10px;
      .main_title {
        font-size: 22px;
        font-weight: 600;
      }
      .date {
        color: #808080;
        font-size: 15px;
      }
      .desc {
        color: #808080;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .item {
        display: flex;
        align-items: center;
        a {
          margin-inline-end: 20px;
          .icon {
            width: 26px;
            height: 26px;
            fill: $base-color;
          }
          span {
            font-size: 16px;
            font-weight: 500;
            color: $base-color;
          }
        }
        .btn-default {
          background-color: $base-color;
          color: #fff;
          font-size: 15px;
          border-radius: 25px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
