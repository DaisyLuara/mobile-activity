// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
// axios.defaults.withCredentials = true ;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'production') {
  axios('http://sapi.xingstation.com/', {
    withCredentials: true
  });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});