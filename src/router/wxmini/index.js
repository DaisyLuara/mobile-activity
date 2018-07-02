const wxMiniRouter = [
  {
    path: 'gaode',
    location: 'gaoDemo/index',
    meta: {
      title: '高德地图demo'
    },
    isAbandoned: true
  },
  {
    path: 'feng',
    location: 'fengDemo/index',
    meta: {
      title: '蜂鸟云Demo'
    },
    isAbandoned: true
  },
  {
    path: 'feng2',
    location: 'fengDemo/demo2',
    meta: {
      title: '地图导览'
    },
    name: 'fengMapDemo2'
  },
  {
    path: 'rp',
    location: 'fengDemo/components/redPack',
    meta: {
      title: '红包',
      desc: '红包组件'
    },
    name: 'redPack',
    isAbandoned: false
  }
]
export default wxMiniRouter
