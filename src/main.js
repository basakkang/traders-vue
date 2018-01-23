// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import App from './App'
import router from './router'

// Base URL
Vue.prototype.$baseURL = 'http://45.76.110.84:9090'
// Vue.prototype.$baseURL = 'http://45.32.24.213:9090'
// Vue.prototype.$baseURL = 'http://104.238.149.57:9090'

Vue.prototype.$http = axios
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
