const lagacyPages = [
  {
    path: 'psbh',
    location: 'psbh/index',
    name: 'psbh'
  },
  {
    path: 'winPrizeClient',
    location: 'winPrize/client',
    name: 'winPrizeClient',
    meta: {
      title: '勇闯三关',
      desc: '勇闯三关屏幕端',
      author: ''
    },
    isAbandoned: true
  },
  {
    path: 'winPrize',
    location: 'winPrize/game',
    name: 'winPrize',
    meta: {
      title: '勇闯三关',
      desc: '勇闯三关答题页'
    },
    isAbandoned: true
  },
  {
    path: 'openBox',
    location: 'openBox/index',
    name: 'openBox',
    meta: {
      title: '开箱子'
    },
    isAbandoned: true
  },
  {
    path: 'openBox/result',
    location: 'openBox/result',
    name: 'openBoxResult',
    meta: {
      title: '开箱子',
      desc: '开箱子照片页'
    },
    isAbandoned: true
  },

  {
    path: 'hongyi',
    location: 'hongyi/index',
    name: 'hongyi',
    meta: {
      title: '狗年旺情缘宏伊'
    },
    isAbandoned: true
  },
  {
    path: 'ps',
    location: 'ps/index',
    name: 'psDog',
    meta: {
      title: '狗年旺情缘浦商'
    },
    isAbandoned: true
  },
  {
    path: 'angel',
    location: 'angel/index',
    name: 'angel',
    meta: {
      title: '黑白天使'
    }
  },
  {
    path: 'psbh_travel',
    location: 'psbh_travel/index',
    name: 'psbh_travel',
    meta: {
      title: '浦商百货'
    }
  },
  {
    path: 'worldcupplanet',
    location: 'worldCupPlanet/index',
    name: 'worldCupPlanet',
    meta: {
      title: '世界杯球星卡'
    }
  },
  {
    path: 'popcorn',
    location: 'popcorn/index',
    name: 'popCorn',
    meta: {
      title: '爆米花奥斯卡'
    },
    isAbandoned: true
  },
  {
    path: 'popcorn/result',
    location: 'popcorn/result',
    name: 'popCornResult',
    meta: {
      title: '爆米花奥斯卡结果页'
    },
    isAbandoned: true
  },
  {
    path: 'mogujie',
    loction: 'mogujie/index',
    meta: {
      title: '蘑菇街女装'
    },
    isAbandoned: true
  },
  {
    path: 'tree/result',
    location: 'tree/result',
    meta: {
      title: '凯德绿享新生活'
    }
  },
  {
    path: 'mallcoo/result',
    location: 'mallcoo/result',
    meta: {
      title: '马里奥2.0'
    }
  },
  {
    path: 'mallcoo/mallcoo',
    location: 'mallcoo/mallcoo',
    meta: {
      title: '老虎机'
    }
  },
  {
    path: 'heyjuice',
    location: 'heyjuice/result',
    meta: {
      title: '茶桔便'
    }
  },
  {
    path: 'xcdog',
    location: 'xcdog/result',
    meta: {
      title: '携程旅行'
    }
  },
  {
    path: 'xc_travel',
    location: 'xc_travel/index',
    meta: {
      title: '携程旅行'
    }
  },
  {
    path: 'animal',
    location: 'exeAnimal/animal',
    meta: {
      title: '星视度有嘻哈'
    }
  },
  {
    path: 'universal',
    location: 'exeAnimal/universal',
    meta: {
      title: '星视度有嘻哈'
    }
  },
  {
    path: 'gdbank',
    location: 'exeMaliao/gdbank',
    meta: {
      title: '星视度送福利',
      desc: '马里奥-光大银行'
    }
  },
  {
    path: 'gdbank2',
    location: 'exeMaliao/gdbank2',
    meta: {
      title: '星视度送福利',
      desc: '马里奥-光大银行2'
    }
  },
  {
    path: 'retro',
    location: 'exeRetro/index',
    meta: {
      title: '复古通用版',
      desc: '复古通用版手机号页面'
    },
    isAbandoned: true
  },
  {
    path: 'retro/result',
    loction: 'exeRetro/retro',
    meta: {
      title: '复古通用版',
      desc: '复古通用版结果页'
    },
    isAbandoned: true
  },
  {
    path: 'retroxc',
    location: 'exeRetro/retroxc',
    meta: {
      title: '携程旅行',
      desc: '复古-携程'
    }
  },
  {
    path: 'hiphop',
    location: 'exeXiha/index',
    meta: {
      title: '复古通用版',
      desc: '嘻哈通用版手机号页'
    }
  },
  {
    path: 'hiphop/result',
    location: 'exeXiha/hiphop',
    meta: {
      title: '嘻哈通用版',
      desc: '嘻哈通用版结果页'
    }
  },
  {
    path: 'lyhiphop',
    location: 'exeXiha/lianyang',
    meta: {
      title: '联洋广场',
      desc: '联洋广场嘻哈'
    }
  },
  {
    path: 'xchiphop',
    location: 'exeXiha/xiecheng',
    meta: {
      title: '携程旅行',
      desc: '携程嘻哈'
    }
  },
  {
    path: 'travel',
    location: 'exeTravel/index',
    meta: {
      title: '旅行通用版',
      desc: '旅行通用版手机号页面'
    }
  },
  {
    path: 'travel/result',
    location: 'exeTravel/travel',
    meta: {
      title: '旅行通用版',
      desc: '旅行通用版结果页'
    }
  },
  {
    path: 'yanzhi',
    location: 'exeYanzhi/index',
    meta: {
      title: '颜值印钞机通用版手机号页',
      desc: '颜值印钞机通用版手机号页'
    }
  },
  {
    path: 'yanzhi/result',
    location: 'exeYanzhi/yanzhi',
    meta: {
      title: '颜值印钞机通用版内容页',
      desc: '颜值印钞机通用版'
    }
  },
  {
    path: 'dfyanzhi',
    location: 'exeYanzhi/dongfang',
    meta: {
      title: '东方商厦',
      desc: '颜值印钞机-东方商厦'
    }
  },
  {
    path: 'lehui',
    location: 'exeLehui/lehui',
    meta: {
      title: '乐荟陪你“美”一天',
      desc: '乐荟'
    }
  },
  {
    path: 'lhwanda',
    location: 'exeLehui/wanda',
    meta: {
      title: '万达',
      desc: '乐荟-万达版'
    }
  },
  {
    path: 'spring',
    location: 'exeSpring/index',
    meta: {
      title: '狗年大吉',
      desc: '狗年大吉手机页'
    }
  },
  {
    path: 'spring/result',
    location: 'exeSpring/spring',
    meta: {
      title: '狗年大吉',
      desc: '狗年大吉结果页'
    }
  },
  {
    path: 'newSpring',
    location: 'exeSpring/newindex',
    meta: {
      title: '狗年大吉',
      desc: '新狗年大吉手机号页'
    }
  },
  {
    path: 'newSpring/result',
    location: 'exeSpring/newspring',
    meta: {
      title: '狗年大吉',
      desc: '新狗年大吉结果页'
    }
  },
  {
    path: 'haoke',
    location: 'haoke/index',
    meta: {
      title: '豪客牛排'
    }
  },
  {
    path: 'wc_hj',
    location: 'worldCups/heiqiu',
    meta: {
      title: '嗨啾'
    },
    name: 'worldCupPlanetHeiJiu'
  },
  {
    path: 'goodboy',
    location: 'goodboy/result',
    meta: {
      title: 'Happy Dino',
      desc: '好孩子'
    }
  },
  {
    path: 'concert',
    location: 'concert/result',
    meta: {
      title: '芒果娱乐荣誉出品',
      desc: '芒果-黄子韬演唱会'
    },
    isAbandoned: true
  },
  {
    path: 'miizz',
    location: 'miizz/result',
    meta: {
      title: '觅作'
    }
  },
  {
    path: 'mangguo',
    location: 'mangguo/result',
    meta: {
      title: '芒果娱乐荣誉出品',
      desc: '芒果TV'
    }
  },
  {
    path: 'hiltonMla',
    location: 'hiltonMla/result',
    meta: {
      title: '希尔顿',
      desc: '马里奥希尔顿'
    }
  },
  {
    path: 'hiltonYZ',
    location: 'exeYanzhi/hilton',
    meta: {
      title: '',
      desc: '希尔顿印钞机'
    }
  },
  {
    path: 'danceTwo',
    location: 'danceTwo/index',
    meta: {
      title: '星视度',
      desc: '跳舞机第二版'
    }
  },
  {
    path: 'dh',
    location: 'dh/result',
    meta: {
      title: '大华集团',
      desc: '光启城'
    }
  },
  {
    path: 'wc_goal',
    location: 'worldCups/goal',
    meta: {
      title: '6嗨全球GO！'
    },
    name: 'worldCupPlanetGoal'
  },
  {
    path: 'ppt',
    location: 'ppt/result',
    meta: {
      title: '星视度宣传',
      desc: '星视度玩法宣传'
    }
  },
  {
    path: 'ppt/video',
    location: 'ppt/v1',
    meta: {
      title: '星视度',
      desc: '星视度玩法宣传视频'
    }
  },
  {
    path: 'kissMe',
    location: 'kissMe/result',
    meta: {
      title: 'Kissme',
      desc: 'kissMe电影通用版'
    }
  },
  {
    path: 'drc',
    location: 'drc/result',
    meta: {
      title: '大融城'
    }
  },
  {
    path: 'hotblood',
    location: 'mangguo/hotblood',
    meta: {
      title: '热血狂篮'
    }
  },
  {
    path: 'ppt_index',
    location: 'ppt/index',
    meta: {
      title: '星视度宣传',
      desc: '星视度玩法宣传视频组菜单页'
    }
  },
  {
    path: 'ppt_videos',
    location: 'ppt/video',
    meta: {
      title: '星视度',
      desc: '星视度玩法宣传视频组'
    }
  },
  {
    path: 'tea',
    location: 'heyjuice/tea',
    meta: {
      title: '茶桔便',
      desc: '茶桔便2.0'
    }
  },
  {
    path: 'summer_ice',
    location: 'summer/ice',
    meta: {
      title: '夏天',
      desc: '镜世界通用模板-夏天'
    }
  },
  {
    path: 'qixi_glassWord',
    location: 'qixi_glassWord/index',
    meta: {
      title: '星视度',
      desc: '七夕-镜世界通用版'
    }
  },
  {
    path: 'pjfd',
    location: 'pjfd/index',
    meta: {
      title: '浦江饭店'
    },
    name: 'pujiangfandian'
  },
  {
    path: 'circus',
    location: 'circus/index',
    meta: {
      title: '马戏团',
      desc: '镜世界通用模板-马戏团'
    }
  },
  {
    path: 'world_cup',
    location: 'world_cup/index',
    meta: {
      title: '世界杯',
      desc: '镜世界通用模板-世界杯'
    }
  },
  {
    path: 'wc_ct',
    location: 'worldCups/circletalent',
    meta: {
      title: '',
      desc: ''
    },
    name: 'wordCupCirlceTalent'
  },
  {
    path: 'sn_redPacket',
    location: 'suning/index',
    meta: {
      title: '天降福利',
      desc: '苏宁天降红包'
    },
    isAbandoned: true
  },
  {
    path: 'hi_play',
    location: 'hiPlay/index',
    meta: {
      title: '嗨玩'
    }
  },
  {
    path: 'fourShoot',
    location: 'fourShoot/result',
    meta: {
      title: '星视度'
    },
    name: 'fourShoot'
  },
  {
    path: 'hj_normal',
    location: 'worldCups/heijiuNormal',
    meta: {
      title: 'Hi啾拍照嗨翻天'
    }
  },
  {
    path: 'ynf',
    location: 'yunifang/index',
    meta: {
      title: '御泥坊'
    }
  },
  {
    path: 'weiindex',
    location: 'weixun/gameIndex',
    meta: {
      title: '测试你的音撩报告'
    }
  },
  {
    path: 'yp_worldCup',
    location: 'world_cup/ypWorldcup',
    meta: {
      title: '世界杯',
      desc: '雅培世界杯'
    },
    isAbandoned: true
  },
  {
    path: 'yp_share',
    location: 'world_cup/ypShare',
    meta: {
      title: '世界杯',
      desc: '雅培世界杯分享页',
      isAbandoned: true
    }
  },
  {
    path: 'capsule_toys',
    location: 'capsuleToys/index',
    meta: {
      title: '扭蛋机'
    }
  },
  {
    path: 'couponlist',
    location: 'couponList/index',
    meta: {
      title: '优惠券'
    }
  },
  {
    path: 'pandp',
    location: 'pandp/index',
    meta: {
      title: ' '
    }
  },
  {
    path: 'risk',
    location: 'risk/index',
    meta: {
      title: '丛林大冒险'
    }
  },
  {
    path: 'meme',
    location: 'meme/result',
    meta: {
      title: '表情包制造机'
    }
  },
  {
    path: 'lxxj',
    location: 'lxxj/index',
    name: 'longXiaXingJing',
    meta: {
      title: '龙虾刑警'
    }
  },
  {
    path: 'ad',
    location: 'ad/index',
    meta: {
      title: '星视度'
    }
  },
  {
    path: 'tmall',
    location: 'tmall/index',
    meta: {
      title: '天猫color run'
    },
    name: 'tmall'
  },
  {
    path: 'star_dream',
    location: 'starDream/index',
    meta: {
      title: '星梦试镜间'
    },
    name: 'star_dream'
  },
  {
    path: 'suning-ms',
    location: 'suning/midseason',
    name: 'suningMidSeasonSales',
    meta: {
      title: '颜值头条',
      desc: '苏宁长宁-颜值头条',
      author: 'Anluis'
    }
  },
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
    alias: '/wxMini/feng2',
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

export default lagacyPages
