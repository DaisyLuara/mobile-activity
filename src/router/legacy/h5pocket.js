export const H5PocketRouter = {
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
}
