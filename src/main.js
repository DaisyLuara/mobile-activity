// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from '@/store/index'
import 'services/utils/helper'
Vue.prototype.$http = axios
Vue.config.productionTip = false
// axios.defaults.withCredentials = true ;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
