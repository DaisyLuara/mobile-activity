export const H5SaaSRouter = {
  path: '/m/',
  name: 'mSite',
  meta: {
    title: 'M站'
  },
  component: () => import('@/pages/m/mHome'),
  children: [
    {
      path: ':mkey/:mcode/trends/index',
      name: 'TrendsIndex',
      meta: {
        title: '我的照片'
      },
      component: () => import('@/pages/m/pages/trends/index/index')
    },
    {
      path: ':mkey/:mcode/trends/detail',
      name: 'TrendsDetail',
      meta: {
        title: '照片详情'
      },
      component: () => import('@/pages/m/pages/trends/detail/index')
    },
    {
      path: ':mkey/:mcode/theme/index',
      name: 'ThemeIndex',
      meta: {
        title: '主题详情'
      },
      component: () => import('@/pages/m/pages/activity/theme/index')
    },
    {
      path: ':mkey/:mcode/activity/shop',
      name: 'ActivityShop',
      meta: {
        title: '热门活动'
      },
      component: () => import('@/pages/m/pages/activity/shop/index')
    },
    {
      path: ':mkey/:mcode/activity/shop/detail',
      name: 'ActivityShopDetail',
      meta: {
        title: '热门活动详情'
      },
      component: () => import('@/pages/m/pages/activity/shop/detail')
    },
    {
      path: ':mkey/:mcode/activity/shop/alltopprogress',
      name: 'ActivityShopAllTopProgress',
      meta: {
        title: '投票活动进度'
      },
      component: () => import('@/pages/m/pages/activity/theme/alltop')
    },
    {
      path: ':mkey/:mcode/activity/shop/gameprogress',
      name: 'ActivityShopGameProgress',
      meta: {
        title: '排行榜'
      },
      component: () => import('@/pages/m/pages/activity/theme/game')
    },
    {
      path: ':mkey/:mcode/wallet/',
      name: 'CardIndex',
      meta: {
        title: '卡包'
      },
      component: () => import('@/pages/m/pages/wallet/index')
    },
    {
      path: ':mkey/:mcode/mall/',
      name: 'MallIndex',
      meta: {
        title: '商城'
      },
      component: () => import('@/pages/m/pages/mall/index')
    },
    {
      path: ':mkey/:mcode/my/',
      name: 'MyIndex',
      meta: {
        title: '我的嗨屏'
      },
      component: () => import('@/pages/m/pages/my/index')
    },
    {
      path: ':mkey/:mcode/my/gameplayed/',
      name: 'MyGamePlayed',
      meta: {
        title: '参与过的互动'
      },
      component: () => import('@/pages/m/pages/my/playedgames')
    },
    {
      path: ':mkey/:mcode/my/achivement/',
      name: 'MyAchivement',
      meta: {
        title: '我的成就'
      },
      component: () => import('@/pages/m/pages/my/achivement')
    },
    {
      path: ':mkey/:mcode/barrage/index/',
      name: 'BarrageIndex',
      meta: {
        title: '弹幕'
      },
      component: () => import('@/pages/m/pages/barrage/index')
    },
    {
      path: '404',
      name: 'mSite404',
      meta: {
        title: '我的嗨屏'
      },
      component: () => import('@/pages/m/pages/static/404')
    },
    {
      path: ':mkey/:mcode/topic/index/',
      name: 'TopicIndex',
      meta: {
        title: '全民话题'
      },
      component: () => import('@/pages/m/pages/topic/index')
    },
    {
      path: ':mkey/:mcode/activity/shop/topic',
      name: 'ActivityTopic',
      meta: {
        title: '全民话题'
      },
      component: () => import('@/pages/m/pages/activity/theme/topic')
    },
    {
      path: ':mkey/:mcode/activity/shop/birthday',
      name: 'ActivityBirthDayIndex',
      meta: {
        title: '公司动态'
      },
      component: () => import('@/pages/m/pages/activity/theme/birthday/index')
    },
    {
      path: ':mkey/:mcode/activity/shop/birthday/cake',
      name: 'ActivityBirthDayCake',
      meta: {
        title: '发送蛋糕'
      },
      component: () => import('@/pages/m/pages/activity/theme/birthday/cake')
    },
    {
      path: ':mkey/6d7143ab847f2d24c131',
      name: '6d7143ab847f2d24c131',
      meta: {
        title: '订阅服务'
      },
      component: () => import('@/pages/m/pages/subscription/index')
    }
  ]
}
