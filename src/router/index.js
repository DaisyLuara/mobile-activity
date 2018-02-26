import Vue from 'vue';
import Router from 'vue-router';
import marketingHome from 'pages/marketingHome';
import wxMiniHome from 'pages/wxMiniHome';
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/marketing',
    name: 'marketing pages',
    component: marketingHome,
    children: [{
      path: 'psbh',
      name: '浦商百货',
      component: () =>
        import(/* webpackChunkName: "psbh" */ 'pages/psbh/index.vue'),
    },
    {
      path: 'psbh/result',
      name: '浦商百货结果页',
      component: () =>
        import(/* webpackChunkName: "psbh" */ 'pages/psbh/result.vue'),
    },
    {
      path: 'jinjia',
      name: '金家',
      component: () =>
        import(/* webpackChunkName: "jinjia" */ 'pages/jinjia/index.vue'),
    },
    {
      path: 'jinjia/result',
      name: '金家结果页',
      component: () =>
      import(/* webpackChunkName: "jinjia" */ 'pages/jinjia/result.vue'),
    },
    {
      path: 'winPrizeClient',
      name: '勇闯三关屏幕端',
      component: () =>
      import(/* webpackChunkName: "winPrize" */ 'pages/winPrize/client.vue'),
    },
    {
      path: 'winPrize',
      name: '勇闯三关答题页',
      component: () =>
        import(/* webpackChunkName: "winPrize" */ 'pages/winPrize/game.vue'),
    },
    {
      path: 'openBox',
      name: '开箱子',
      component: () =>
        import ( /* webpackChunkName: "openBox" */ 'pages/openBox/index.vue')
    },
    {
      path: 'openBox/result',
      name: '开箱子照片页',
      component: () =>
        import ( /* webpackChunkName: "openBox" */ 'pages/openBox/result.vue')
    },
    {
      path: 'dog',
      name: '狗年旺情缘',
      component: () =>
        import ( /* webpackChunkName: "dog" */ 'pages/dog/index.vue')
    },
    {
      path: 'hongyi',
      name: '狗年旺情缘',
      component: () =>
        import ( /* webpackChunkName: "hongyi" */ 'pages/hongyi/index.vue')
    },
    {
      path: 'ps',
      name: '狗年旺情缘',
      component: () =>
        import(/* webpackChunkName: "ps" */ 'pages/ps/index.vue'),
    },
    {
      path: '/wxMini',
      name: 'wxMini pages',
      component: wxMiniHome,
      children: [
        {
          path: 'gaode',
          name: '高德地图Demo',
          component: () => import(/* webpackChunkName: "gaoDemo" */ 'pages/gaoDemo/index.vue'),
        }],
    },
    {
      path: 'spm',
      name: '小程序地图',
      component: () =>
        import(/* webpackChunkName: "ps" */ 'pages/smap/map.vue'),
    },
    ],
  }],
});
