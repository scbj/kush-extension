import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
