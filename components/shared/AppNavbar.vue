<template>
  <header>
    <nav class="app_navbar">
      <div class="container">
        <div class="nav_content">
          <div class="logo_wrapper d-flex align-items-center">
            <b-button class="menu-list-btn" v-b-modal.sub-menu
              ><i class="fas fa-bars"></i
            ></b-button>
            <nuxt-link to="/">
              <span>Logo</span>
            </nuxt-link>
          </div>

          <!-- end::col -->

          <div class="top_menu">
            <nuxt-link :to="{ name: 'index' }">الرئيسية</nuxt-link>
            <nuxt-link :to="{ name: 'categories' }">القطاعات</nuxt-link>
            <client-only>
              <nuxt-link :to="{ name: 'my-tenders' }" v-if="is_loggedIn">
                صفقاتي
              </nuxt-link>
            </client-only>

            <nuxt-link :to="{ name: 'plans' }">خطط الاسعار</nuxt-link>
            <nuxt-link :to="{ name: 'contact' }">تواصل معنا</nuxt-link>
            <nuxt-link :to="{ name: 'static-slug', params: { slug: 'about' } }">
              من نحن
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'static-slug', params: { slug: 'why-us' } }"
            >
              لماذا نحن
            </nuxt-link>
          </div>

          <!-- end::col -->

          <client-only>
            <div class="options_wrapper d-flex align-items-center">
              <b-button class="menu-list-btn" v-b-modal.app-navbar
                ><i class="fas fa-bars"></i
              ></b-button>
              <div v-if="is_loggedIn">
                <b-dropdown>
                  <template #button-content>
                    <svg class="icon">
                      <use xlink:href="~/static/sprite.svg#notification"></use>
                    </svg>
                  </template>
                </b-dropdown>
                <!-- end::link -->

                <b-dropdown>
                  <template #button-content>
                    <svg class="icon">
                      <use xlink:href="~/static/sprite.svg#user"></use>
                    </svg>
                  </template>
                  <b-dropdown-item :to="{ name: 'profile' }">
                    معلومات الحساب و سابقة الاعمال
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click="logoutHandler" class="text-danger">
                    تسجيل الخروج
                  </b-dropdown-item>
                </b-dropdown>
                <!-- end::link -->
              </div>

              <div v-else class="options_wrapper">
                <nuxt-link class="auth-btn" to="/auth/login">
                  <span>Login/Register</span>
                  <i class="fas fa-user"></i>
                </nuxt-link>
              </div>
            </div>
          </client-only>
          <!-- end::col -->
        </div>
        <!-- end::row -->
      </div>
      <!-- end::container_fluid -->
    </nav>
    <!-- end::app_navbar -->

    <div class="sub_menu_wrapper">
      <div class="container">
        <div class="content">
          <!-- end::col -->

          <div class="menu">
            <nuxt-link :to="{ name: 'tenders-list' }">
              سجل المناقصات
            </nuxt-link>
            <nuxt-link :to="{ name: 'expirations' }">
              تصفيات وهوالك دورية
            </nuxt-link>
            <client-only>
              <nuxt-link :to="{ name: 'favourite' }" v-if="is_loggedIn"
                >المفضلة</nuxt-link
              >
            </client-only>
            <nuxt-link :to="{ name: 'agents' }">الوكلاء والموزعين</nuxt-link>
            <nuxt-link :to="{ name: 'jobs' }">وظائف مشتريات ومخازن</nuxt-link>
          </div>

          <!-- end::col -->

          <div class="options_wrapper">
            <nuxt-link :to="{ name: 'tender' }">
              إضافة مناقصة او طلب
            </nuxt-link>
          </div>

          <!-- end::col -->
        </div>
        <!-- end::row -->
      </div>
    </div>
    <client-only>
      <div>
        <b-modal id="app-navbar" hide-footer>
          <nav class="app_navbar">
            <div class="container">
              <div class="nav_content">
                <div class="logo_wrapper d-flex align-items-center">
                  <nuxt-link to="/">
                    <span>Logo</span>
                  </nuxt-link>
                </div>

                <!-- end::col -->

                <div class="top_menu">
                  <nuxt-link :to="{ name: 'index' }">الرئيسية</nuxt-link>
                  <nuxt-link :to="{ name: 'categories' }">القطاعات</nuxt-link>
                  <client-only>
                    <nuxt-link :to="{ name: 'my-tenders' }" v-if="is_loggedIn">
                      صفقاتي
                    </nuxt-link>
                  </client-only>

                  <nuxt-link :to="{ name: 'plans' }">خطط الاسعار</nuxt-link>
                  <nuxt-link :to="{ name: 'contact' }">تواصل معنا</nuxt-link>
                  <nuxt-link
                    :to="{ name: 'static-slug', params: { slug: 'about' } }"
                  >
                    من نحن
                  </nuxt-link>
                  <nuxt-link
                    :to="{ name: 'static-slug', params: { slug: 'why-us' } }"
                  >
                    لماذا نحن
                  </nuxt-link>
                </div>
              </div>
              <!-- end::row -->
            </div>
            <!-- end::container_fluid -->
          </nav>
        </b-modal>
        <b-modal id="sub-menu" hide-footer>
          <div class="sub_menu_wrapper">
            <div class="container">
              <div class="content">
                <!-- end::col -->

                <div class="menu">
                  <nuxt-link :to="{ name: 'tenders-list' }">
                    سجل المناقصات
                  </nuxt-link>
                  <nuxt-link :to="{ name: 'expirations' }">
                    تصفيات وهوالك دورية
                  </nuxt-link>
                  <client-only>
                    <nuxt-link :to="{ name: 'favourite' }" v-if="is_loggedIn"
                      >المفضلة</nuxt-link
                    >
                  </client-only>
                  <nuxt-link :to="{ name: 'agents' }"
                    >الوكلاء والموزعين</nuxt-link
                  >
                  <nuxt-link :to="{ name: 'jobs' }"
                    >وظائف مشتريات ومخازن</nuxt-link
                  >
                </div>

                <!-- end::col -->

                <div class="options_wrapper">
                  <nuxt-link :to="{ name: 'tender' }">
                    إضافة مناقصة او طلب
                  </nuxt-link>
                </div>

                <!-- end::col -->
              </div>
              <!-- end::row -->
            </div>
          </div>
        </b-modal>
      </div>
    </client-only>
    <!-- end::sub_menu_wrapper -->
  </header>
</template>

<script>
// importing vuex tools

export default {
  name: "AppNavbar",
  computed: {
    is_loggedIn() {
      return this.$store.getters["localStorage/is_loggedIn"];
    },
    userData() {
      return this.$store.getters["localStorage/userData"];
    },
  },
  methods: {
    async logoutHandler() {
      await this.$axios
        .post("/logout")
        .then((res) => {
          this.$store.commit("localStorage/RESET_USER");
          if (this.$route.path != "/") {
            this.$router.replace("/");
          }
          this.TriggerNotify(
            "success",
            "لقد تم تسجيل الخروج من الحساب بنجاح !"
          );
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
<style lang="scss">
.menu-list-btn {
  padding: 0;
  background: none !important;
  border: none;
  i {
    font-size: 22px;
    margin-inline: 5px;
  }
  &:hover {
    background: none;
  }
}
#app-navbar.modal {
  .modal-dialog {
    margin: 0;
    height: 100%;
    .modal-content {
      background: #648dc4;
      height: 100%;
      .modal-header {
        position: absolute;
        padding: 0;
        margin: 0;
        z-index: 10;
        left: unset;
        right: 10px;
      }
      .nav_content {
        flex-direction: column;
        .logo_wrapper {
          margin-bottom: 30px;
        }
        .top_menu {
          width: 100%;
          align-items: flex-start;
          a {
            width: 100%;
            margin-bottom: 10px;
            border-radius: 8px;
            padding-block: 10px;
            &.nuxt-link-exact-active.nuxt-link-active {
              background-color: #fff;
              color: #648dc4;
            }
          }
        }
      }
      .top_menu {
        display: flex;
        flex-direction: column;
      }
    }
  }
  &.fade .modal-dialog {
    transform: translateX(100%);
  }
  &.show .modal-dialog {
    transform: none;
  }
}
#sub-menu.modal {
  .modal-dialog {
    margin: 0;
    height: 100%;
    .modal-content {
      height: 100%;
      .modal-header {
        position: absolute;
        padding: 0;
        margin: 0;
        z-index: 10;
        left: unset;
        right: 10px;
      }
      .sub_menu_wrapper {
        display: flex;
        box-shadow: none;
        .content {
          flex-direction: column;
        }
        .menu {
          flex-direction: column;
          align-items: flex-start;
          a {
            margin-bottom: 10px;
            width: 100%;
            border-radius: 8px;
            padding-block: 10px;
            &.nuxt-link-exact-active.nuxt-link-active {
              background-color: #648dc4;
              color: #fff;
            }
          }
        }
        .options_wrapper {
          align-items: center;
          margin-top: 30px;
          justify-content: center;
        }
      }
    }
  }
  &.fade .modal-dialog {
    transform: translateX(100%);
  }
  &.show .modal-dialog {
    transform: none;
  }
}
html[dir="rtl"] {
  #app-navbar.modal {
    .modal-dialog {
      .modal-content {
        .modal-header {
          left: 20px;
          right: unset;
        }
      }
    }
  }
}
</style>
