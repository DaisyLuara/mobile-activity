import Vue from 'vue'
import Router from 'vue-router'
import marketingHome from 'pages/marketingHome'
import wxMiniHome from 'pages/wxMiniHome'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/marketing',
      name: 'marketing pages',
      component: marketingHome,
      children: [
        {
          path: 'psbh',
          name: '浦商百货',
          component: () =>
            import(/* webpackChunkName: "psbh" */ 'pages/psbh/index.vue')
        },
        {
          path: 'psbh/result',
          name: '浦商百货结果页',
          component: () =>
            import(/* webpackChunkName: "psbh" */ 'pages/psbh/result.vue')
        },
        {
          path: 'jinjia',
          name: '金家',
          component: () =>
            import(/* webpackChunkName: "jinjia" */ 'pages/jinjia/index.vue')
        },
        {
          path: 'jinjia/result',
          name: '金家结果页',
          component: () =>
            import(/* webpackChunkName: "jinjia" */ 'pages/jinjia/result.vue')
        },
        {
          path: 'winPrizeClient',
          name: '勇闯三关屏幕端',
          component: () =>
            import(/* webpackChunkName: "winPrize" */ 'pages/winPrize/client.vue')
        },
        {
          path: 'winPrize',
          name: '勇闯三关答题页',
          component: () =>
            import(/* webpackChunkName: "winPrize" */ 'pages/winPrize/game.vue')
        },
        {
          path: 'openBox',
          name: '开箱子',
          component: () =>
            import(/* webpackChunkName: "openBox" */ 'pages/openBox/index.vue')
        },
        {
          path: 'openBox/result',
          name: '开箱子照片页',
          component: () =>
            import(/* webpackChunkName: "openBoxPhoto" */ 'pages/openBox/result.vue')
        },
        {
          path: 'dog',
          name: '狗年旺情缘',
          component: () =>
            import(/* webpackChunkName: "dog" */ 'pages/dog/index.vue')
        },
        {
          path: 'hongyi',
          name: '狗年旺情缘宏伊',
          component: () =>
            import(/* webpackChunkName: "hongyi" */ 'pages/hongyi/index.vue')
        },
        {
          path: 'ps',
          name: '狗年旺情缘浦商',
          component: () =>
            import(/* webpackChunkName: "ps" */ 'pages/ps/index.vue')
        },
        // {
        //   path: 'spm',
        //   name: '小程序地图',
        //   component: () =>
        //     import(/* webpackChunkName: "spm" */ 'pages/smap/map.vue')
        // },
        {
          path: 'hq',
          name: '虹桥天地',
          component: () =>
            import(/* webpackChunkName: "hq" */ 'pages/hq/result.vue')
        },
        {
          path: 'angel',
          name: '黑白天使',
          component: () =>
            import(/* webpackChunkName: "angel" */ 'pages/angel/index.vue')
        },
        {
          path: 'psbh_travel',
          name: 'psbh_travel',
          component: () =>
            import(/* webpackChunkName: "psbh_travel" */ 'pages/psbh_travel/index.vue')
        },
        {
          path: 'worldcupplanet',
          name: 'worldCupPlanet',
          component: () =>
            import(/* webpackChunkName: "worldCupPlanet" */ 'pages/worldCupPlanet/index.vue')
        },
        {
          path: 'popcorn',
          name: '爆米花奥斯卡',
          component: () =>
            import(/* webpackChunkName: "popcorn" */ 'pages/popcorn/index.vue')
        },
        {
          path: 'popcorn/result',
          name: '爆米花奥斯卡结果页',
          component: () =>
            import(/* webpackChunkName: "popcorn" */ 'pages/popcorn/result.vue')
        },
        {
          path: 'mogujie',
          name: '蘑菇街女装',
          component: () =>
            import(/* webpackChunkName: "moguujie" */ 'pages/mogujie/index.vue')
        },
        {
          path: 'tree/result',
          name: '凯德绿享新生活结果页',
          component: () =>
            import(/* webpackChunkName: "tree" */ 'pages/tree/result.vue')
        },
        {
          path: 'mallcoo/result',
          name: '猫酷获取券',
          component: () =>
            import(/*webpackChunkName: "mallcoo"*/ 'pages/mallcoo/result.vue')
        },
        {
          path: 'dance',
          name: '跳舞机',
          component: () =>
            import(/* webpackChunkName: "dance" */ 'pages/dance/index.vue')
        },
        {
          path: 'heyjuice',
          name: '茶桔梗',
          component: () =>
            import(/* webpackChunkName: "heyjuice" */ 'pages/heyjuice/result.vue')
        },
        {
          path: 'xcdog',
          name: '携程版刀刀狗',
          component: () =>
            import(/*webpackChunkName:"xcdog"*/ 'pages/xcdog/result.vue')
        },
        {
          path: 'xc_travel',
          name: '携程版小泰',
          component: () =>
            import(/* webpackChunkName: "xc_travel" */ 'pages/xc_travel/index.vue')
        }
      ]
    },
    {
      path: '/wxMini',
      name: 'wxMini pages',
      component: wxMiniHome,
      children: [
        {
          path: 'gaode',
          name: '高德地图Demo',
          component: () =>
            import(/* webpackChunkName: "gaoDemo" */ 'pages/gaoDemo/index.vue')
        },
        {
          path: 'feng',
          name: '蜂鸟云Demo',
          component: () =>
            import(/* webpackChunkName: "fengDemo" */ 'pages/fengDemo/index.vue')
        },
        {
          path: 'feng2',
          name: 'fengMapDemo2',
          component: () =>
            import(/* webpackChunkName: "fengDemo2" */ 'pages/fengDemo/demo2.vue')
        },
        {
          path: 'rp',
          name: 'redPack',
          component: () =>
            import(/* webpackChunkName: "redPack" */ 'pages/fengDemo/components/redPack.vue')
        }
      ]
    }
  ]
})
