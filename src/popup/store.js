import Vue from 'vue'
import Vuex from 'vuex'
import VuexPathify, { make } from 'vuex-pathify'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  accessToken: '',
  extension: null
}

const mutations = make.mutations(state)

const actions = {
  async login ({ commit }, { username, password }) {
    try {
      const { status, data } = await axios
        .post(`${process.env.VUE_APP_SERVER_URL}/auth/login`, {
          username,
          password
        })
      if (status === 200) {
        const { accessToken } = data
        commit('SET_ACCESS_TOKEN', accessToken)
        return { accessToken }
      }
    } catch (error) {
      console.log('🐞: login -> error', error)
      return { error }
    }
  },

  async createExtension ({ dispatch, commit, state }) {
    try {
      const { status, data: extension } = await axios.post(`${process.env.VUE_APP_SERVER_URL}/extension`, {
        ip: 'localhost',
        os: 'Windows',
        navigator: 'Chrome',
        name: 'Home'
      }, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      })
      if (status !== 201) throw new Error("Status isn't 201")

      commit('SET_EXTENSION', extension)
      return { extension }
    } catch (error) {
      return { error }
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    VuexPathify.plugin
  ]
})
