// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import 'services/utils/helper'

// import animate from 'animate.css'
// import { Lazyload } from 'mint-ui'
// Vue.use(Lazyload)
// Vue.use(animate)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// axios.defaults.withCredentials = true ;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
