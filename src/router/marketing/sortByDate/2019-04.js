const Date201904 = [
  {
    path: 'changzhou',
    location: '201904/changzhou',
    name: 'changzhou',
    meta: {
      title: '风味常州',
      author: 'lipan',
      desc: '风味常州'
    },
    isAbandoned: false
  },
  {
    path: 'fuli',
    location: '201904/fuli',
    name: 'fuli',
    meta: {
      title: '今日福利',
      author: 'lipan',
      desc: '今日福利'
    },
    isAbandoned: false
  },
  {
    path: 'betty',
    location: '201904/betty',
    name: 'betty',
    meta: {
      title: '精灵密语',
      author: 'lipan',
      desc: '贝蒂'
    },
    isAbandoned: false
  },
  {
    path: 'ctest',
    location: '201904/test',
    name: 'ctest',
    meta: {
      title: '领券注册测试',
      author: 'lipan',
      desc: '领券注册测试'
    },
    isAbandoned: false
  },
  {
    path: 'tanmo',
    location: '201904/tanmo',
    name: 'tanmo',
    meta: {
      title: '弹幕-未知',
      author: 'lipan',
      desc: ''
    },
    isAbandoned: false
  },
  {
    path: 'pika',
    location: '201904/pika',
    name: 'pika',
    meta: {
      title: '皮卡丘',
      author: 'lipan',
      desc: '皮卡丘'
    },
    isAbandoned: false
  },
  {
    path: 'unlockguofang',
    location: '201904/unlockguofang',
    name: 'unlockGuoFang',
    meta: {
      title: '解锁中',
      author: 'Anluis',
      desc: '解锁链接'
    },
    isAbandoned: false
  },
  {
    path: 'naviguofang',
    location: '201904/naviguofang',
    name: 'naviGuoFang',
    meta: {
      title: '跳转中',
      author: 'Anluis',
      desc: '跳转链接'
    },
    isAbandoned: false
  },
  {
    path: 'guofang2',
    location: '201904/guofang2',
    name: 'guofang2',
    meta: {
      title: '前方高能！国芳百货【全城发红包啦】！',
      author: 'lipan',
      desc: '国芳百货'
    },
    isAbandoned: false
  },
  {
    path: 'tai',
    location: '201904/tai',
    name: 'tai',
    meta: {
      title: '你“泰好看”啦',
      author: 'lipan',
      desc: '纯萃泰国'
    },
    isAbandoned: false
  },
  {
    path: 'ai_meng',
    location: '201904/aiMeng',
    name: 'ai_meng',
    meta: {
      title: 'AI测萌值，谁还不是个小可爱鸭',
      author: 'lipan',
      desc: 'AI测萌值'
    },
    isAbandoned: false
  },
  {
    path: 'wuyueCoupon',
    location: '201904/wuyueCoupon',
    name: 'wuyueCoupon',
    meta: {
      title: '吾悦广场优惠券',
      author: 'ykk',
      desc: '吾悦广场优惠券'
    },
    isAbandoned: false
  },
  {
    path: 'wuyueAnniversary',
    location: '201904/wuyueAnniversary',
    name: 'wuyueAnniversary',
    meta: {
      title: '我爱你五月，I ♡ may',
      author: 'ykk',
    },
    isAbandoned: false
  },
  {
    path: 'wuyueFireBall',
    location: '201904/wuyueFireBall',
    name: 'wuyueFireBall',
    meta: {
      title: '吃喝购在吾悦',
      author: 'ykk',
      desc: '还有额外小惊喜可领，先到先得'
    },
    isAbandoned: false
  },
  //猫酷发券，吾悦广场红包雨-通用版
  {
    path: 'wuyue_share', //分享页
    location: '201904/wuyueShare',
    name: 'wuyue_share',
    meta: {
      title: '吾悦天降红包',
      author: 'lipan',
      desc: '吾悦天降红包-分享页-玩游戏'
    },
    isAbandoned: false
  },
  {
    path: 'yhss',
    location: '201904/yongheng2',
    name: 'yhss',
    meta: {
      title: '前方高能！【全城发红包啦】！',
      author: 'lipan',
      desc: '永恒盛世'
    },
    isAbandoned: false
  },
  {
    path: 'jiading_drc',
    location: '201904/jiading_drc',
    name: 'jiading_drc',
    meta: {
      title: '来萌托邦乐园，享大融城五一好礼！',
      author: 'lipan',
      desc: '嘉定大融城-大融城萌托邦乐园'
    },
    isAbandoned: false
  },
  {
    path: 'beatPig',
    location: '201904/beatPig/main',
    name: 'beatPig',
    meta: {
      title: 'Pick金猪赢壕礼！',
      author: 'ykk',
      desc: 'Pick金猪，大牌美妆免费送'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/pages/201904/beatPig/index'),
        name: 'beatPigIndex',
        meta: {
          title: 'Pick金猪赢壕礼！',
          author: 'ykk',
          desc: 'Pick金猪，大牌美妆免费送'
        },
      },
      {
        path: 'game',
        component: () => import('@/pages/201904/beatPig/game'),
        name: 'beatPigGame',
        meta: {
          title: 'Pick金猪赢壕礼！',
          author: 'ykk',
          desc: 'Pick金猪，大牌美妆免费送'
        },
      },
      {
        path: 'result',
        component: () => import('@/pages/201904/beatPig/result'),
        name: 'beatPigResult',
        meta: {
          title: 'Pick金猪赢壕礼！',
          author: 'ykk',
          desc: 'Pick金猪，大牌美妆免费送'
        },
      }
    ],
    isAbandoned: false
  }
]
export default Date201904
