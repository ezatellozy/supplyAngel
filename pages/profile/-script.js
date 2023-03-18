// importing components
import Breadcrumb from '~/components/shared/Breadcrumb.vue'
import FormCard from '~/pages/profile/-form/index.vue'
// importing vuex tools
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileWrapper',
  components: { Breadcrumb, FormCard },
  async asyncData(context) {
    const profile = await context.$axios.$get('/profile')

    return { profile: profile.data }
  },
  data() {
    return {
      breadcrumb: [
        { name: 'profile', title: 'معلومات الحساب و سابقة الاعمال' },
      ],
      disabled: false,
    }
  },
  async created() {
    await this.$store.dispatch('localStorage/get_categories')
  },
  computed: {
    ...mapGetters({
      categories: ['localStorage/get_categories'],
    }),
  },
  methods: {
    async filterCategories(value) {
      await this.$axios
        .$get(`/categories-without-pagination?keyword=${value}`)
        .then((res) => {
          this.categories = res.data
        })
    },
  },
}
