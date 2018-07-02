import Vue from 'vue'
import Router from 'vue-router'
import marketingHome from 'pages/marketingHome'
import wxMiniHome from 'pages/wxMiniHome'
import bindHome from 'pages/bindHome'

// 被分割的子路由信息
import marketingRouter from './marketing/index'
import wxMiniRouter from './wxmini/index'
import wxBindRouter from './wxbind/index'

// 引用模块
const _import = require('../services/utils/import')

// 过滤掉废弃页面
const marketingRouterAfterFilter = marketingRouter.filter(e => !e.isAbandoned)
const wxMiniRouterAfterFilter = wxMiniRouter.filter(e => !e.isAbandoned)
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
      path: '/wxMini',
      name: 'wxMiniPages',
      component: wxMiniHome,
      children: wxMiniRouterAfterFilter.map(item => {
        const routerItem = {
          path: item.path,
          name: item.name,
          meta: item.meta,
          component: _import(item.location)
        }
        return routerItem
      })
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '未找到页面'
  next()
})

export default router
