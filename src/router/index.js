import Vue from 'vue'
import Router from 'vue-router'
import marketingHome from 'pages/marketingHome'
import bindHome from 'pages/bindHome'
import hidolHome from 'pages/hidolHome'

// 被分割的子路由信息
import marketingRouter from './marketing/index'
import wxBindRouter from './wxbind/index'
import hidolRouter from './hidol/index'

// 引用模块
const _import = require('../services/utils/import')

// 过滤掉废弃页面
const marketingRouterAfterFilter = marketingRouter.filter(e => !e.isAbandoned)
const wxBindRouterAfterFilter = wxBindRouter.filter(e => !e.isAbandoned)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/marketing',
      name: 'marketingPages',
      component: marketingHome,
      children: marketingRouterAfterFilter.map(item => {
        const routerItem = {
          path: item.path,
          name: item.name,
          meta: item.meta,
          component: _import(item.location)
        }
        if (item.hasOwnProperty('alias')) {
          routerItem.alias = item.alias
        }
        return routerItem
      })
    },
    {
      path: '/wxBind',
      name: 'wxBindPages',
      component: bindHome,
      children: wxBindRouterAfterFilter.map(item => {
        const routerItem = {
          path: item.path,
          name: item.name,
          meta: item.meta,
          component: _import(item.location)
        }
        return routerItem
      })
    },
    {
      path: '/hpocket',
      name: 'h5Pocket',
      redirect: '/hpocket/mall',
      meta: {
        title: '商城'
      },
      component: () => import('@/pages/h5pocket/pocketHome'),
      children: [
        {
          path: 'mall',
          name: 'PocketMall',
          meta: {
            title: '圣诞福利'
          },
          component: () => import('@/pages/h5pocket/pages/mall')
        },
        {
          path: 'wallet',
          name: 'PocketWallet',
          meta: {
            title: '圣诞福利'
          },
          component: () => import('@/pages/h5pocket/pages/wallet')
        },
        {
          path: 'cpd',
          name: 'CouponDetail',
          meta: {
            title: '圣诞福利'
          },
          component: () => import('@/pages/h5pocket/pages/couponDetail')
        },
        {
          path: 'cqr',
          name: 'CouponQR',
          meta: {
            title: '圣诞福利'
          },
          component: () => import('@/pages/h5pocket/pages/couponQr')
        }
      ]
    },
    {
      path: '/m/',
      name: 'mSite',
      meta: {
        title: 'M站'
      },
      component: () => import('@/pages/m/mHome'),
      children: [
        {
          path: ':mkey/trends/index',
          name: 'TrendsIndex',
          meta: {
            title: '我的足迹'
          },
          component: () => import('@/pages/m/pages/trends/index/index')
        },
        {
          path: ':mkey/trends/detail',
          name: 'TrendsDetail',
          meta: {
            title: '足迹详情'
          },
          component: () => import('@/pages/m/pages/trends/detail/index')
        },
        {
          path: ':mkey/theme/index',
          name: 'ThemeIndex',
          meta: {
            title: '主题详情'
          },
          component: () => import('@/pages/m/pages/activity/theme/index')
        },
        {
          path: ':mkey/activity/shop',
          name: 'ActivityShop',
          meta: {
            title: '商家活动'
          },
          component: () => import('@/pages/m/pages/activity/shop/index')
        }
      ]
    }
    // {
    //   path: '/hidol',
    //   name: 'hidolApp',
    //   component: hidolHome,
    //   children: hidolRouter.map(item => {
    //     const routerItem = {
    //       path: item.path,
    //       name: item.name,
    //       meta: item.meta,
    //       component: _import(item.location)
    //     }
    //     return routerItem
    //   })
    // }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '未找到页面'
  next()
})

export default router
