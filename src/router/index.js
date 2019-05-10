import Vue from 'vue'
import Router from 'vue-router'
import marketingHome from 'pages/marketingHome'
import bindHome from 'pages/bindHome'
import PageNotFound from 'pages/404'

// 被分割的子路由信息
import marketingRouter from './marketing/index'
import wxBindRouter from './wxbind/index'
import { H5PocketRouter } from './legacy/h5pocket'
import { H5SaaSRouter } from './H5SaaS/index'

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
          component: _import(item.location),
          children: item.children || []
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
    H5PocketRouter,
    H5SaaSRouter
  ]
})

router.beforeEach((to, from, next) => {
  // first in Vue app
  if (from.name === null) {
    router.app.$options.store.commit('SET_WX_JS_URL', document.URL)
  }
  document.title = to.meta.title ? to.meta.title : '未找到页面'
  next()
})

export default router
