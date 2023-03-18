import responseHandler from '~/helpers/responseHandler'
import Cookies from 'js-cookie'

// const cookies = new Cookies()
export const state = () => ({
  userToken: Cookies.get('userToken') || null,
  userData: Cookies.get('userData') || null,
  errorMsg: '',
  countries: [],
  categories: [],
  cities: [],
  expire: 24,
  status: true,
})

export const mutations = {
  SET_USER_TOKEN(state, payload) {
    state.userToken = payload
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload
  },
  SET_ERROR_MSG(state, payload) {
    state.errorMsg = payload
  },
  SET_STORE_EXIRE(state, payload) {
    state.expire = payload
  },
  RESET_USER(state) {
    state.userToken = null
    state.userData = null

    this.$cookies.remove('userToken')
    this.$cookies.remove('userData')
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_CITIES(state, payload) {
    state.cities = payload
  },
}

export const getters = {
  is_loggedIn(state) {
    return !!state.userToken
  },
  userToken(state) {
    return state.userToken
  },
  userData(state) {
    return state.userData
  },
  get_errors(state) {
    return state.errorMsg
  },
  get_countries(state) {
    return state.countries
  },
  get_categories(state) {
    return state.categories
  },
  get_cities(state) {
    return state.cities
  },
}

export const actions = {
  response_handler({ commit }, payload) {
    responseHandler(payload.data, { commit }, payload.type)
  },
  // fetch countries
  async get_countries({ commit }) {
    await this.$axios
      .$get('/countries')
      .then((res) => {
        commit('SET_COUNTRIES', res.data)
      })
      .catch((err) => {
        responseHandler(err.response, { commit }, 'catch')
      })
  },
  // fetch categoris
  async get_categories({ commit }) {
    await this.$axios
      .$get('/categories')
      .then((res) => {
        commit('SET_CATEGORIES', res.data)
      })
      .catch((err) => {
        responseHandler(err.response, { commit }, 'catch')
      })
  },
  async get_cities({ commit }) {
    await this.$axios
      .$get('/cities')
      .then((res) => {
        commit('SET_CITIES', res.data)
      })
      .catch((err) => {
        responseHandler(err.response, { commit }, 'catch')
      })
  },
}
