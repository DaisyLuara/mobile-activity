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
