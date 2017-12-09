import Vue from 'vue';
import Router from 'vue-router';
import marketingHome from 'pages/marketingHome'
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/marketing',
      name: 'H5营销',
      component: marketingHome,
      children: [
        {
          path: 'hello',
          name: '测试页',
          component: () => import(/* webpackChunkName: "hello" */ 'pages/hello.vue'),
        }
      ]
    },
  ],
});
