import Vue from 'vue';
import Router from 'vue-router';
import marketingHome from 'pages/marketingHome';
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/marketing',
      name: 'marketing pages',
      component: marketingHome,
      children: [
        {
          path: 'psbh',
          name: '浦商百货',
          component: () => import(/* webpackChunkName: "psbh" */ 'pages/psbh/index.vue')
        },
        {
          path: 'psbh/result',
          name: '浦商百货结果页',
          component: () => import(/* webpackChunkName: "psbh" */ 'pages/psbh/result.vue')
        }
      ]
    },
  ],
});
