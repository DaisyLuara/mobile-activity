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
          name: '猫酷获取券-马里奥',
          component: () =>
            import(/*webpackChunkName: "mallcoo"*/ 'pages/mallcoo/result.vue')
        },
        {
          path: 'mallcoo/mallcoo',
          name: '猫酷获取券-老虎机',
          component: () =>
            import(/*webpackChunkName: "mallcoo"*/ 'pages/mallcoo/mallcoo.vue')
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
        },
        {
          path: 'wc_card',
          name: 'WorldCupCard',
          component: () =>
            import(/* webpackChunkName: "WorldCupCard" */ 'pages/worldCups/card.vue')
        },
        {
          path: 'wc_shemen',
          name: 'WorldCupShemen',
          component: () =>
            import(/* webpackChunkName: "WorldCup" */ 'pages/worldCups/shemen.vue')
        },
        {
          path: 'animal',
          name: '嘻哈动物版',
          component: () =>
            import(/* webpackChunkName: "animal" */ 'pages/exeAnimal/animal.vue')
        },
        {
          path: 'universal',
          name: '动物嘻哈2',
          component: () =>
            import(/* webpackChunkName: "universal" */ 'pages/exeAnimal/universal.vue')
        },
        {
          path: 'gdbank',
          name: '马里奥-光大银行',
          component: () =>
            import(/* webpackChunkName: "gdbank" */ 'pages/exeMaliao/gdbank.vue')
        },
        {
          path: 'gdbank2',
          name: '马里奥-光大银行2',
          component: () =>
            import(/* webpackChunkName: "gdbank2" */ 'pages/exeMaliao/gdbank2.vue')
        },
        {
          path: 'retro',
          name: '复古通用版手机号页面',
          component: () =>
            import(/* webpackChunkName: "retro" */ 'pages/exeRetro/index.vue')
        },
        {
          path: 'retro/result',
          name: '复古通用版结果页',
          component: () =>
            import(/* webpackChunkName: "retro" */ 'pages/exeRetro/retro.vue')
        },
        {
          path: 'retroxc',
          name: '复古-携程',
          component: () =>
            import(/* webpackChunkName: "retroxc" */ 'pages/exeRetro/retroxc.vue')
        },
        {
          path: 'hiphop',
          name: '嘻哈通用版手机号页',
          component: () =>
            import(/* webpackChunkName: "hiphop" */ 'pages/exeXiha/index.vue')
        },
        {
          path: 'hiphop/result',
          name: '嘻哈通用版结果页',
          component: () =>
            import(/* webpackChunkName: "hiphop" */ 'pages/exeXiha/hiphop.vue')
        },
        {
          path: 'lyhiphop',
          name: '联洋广场嘻哈',
          component: () =>
            import(/* webpackChunkName: "lyhiphop" */ 'pages/exeXiha/lianyang.vue')
        },
        {
          path: 'xchiphop',
          name: '携程嘻哈',
          component: () =>
            import(/* webpackChunkName: "xchiphop" */ 'pages/exeXiha/xiecheng.vue')
        },
        {
          path: 'travel',
          name: '旅行通用版手机号页面',
          component: () =>
            import(/* webpackChunkName: "travel" */ 'pages/exeTravel/index.vue')
        },
        {
          path: 'travel/result',
          name: '旅行通用版结果页',
          component: () =>
            import(/* webpackChunkName: "travel" */ 'pages/exeTravel/travel.vue')
        },
        {
          path: 'yanzhi',
          name: '颜值印钞机通用版手机号页',
          component: () =>
            import(/* webpackChunkName: "yanzhi" */ 'pages/exeYanzhi/index.vue')
        },
        {
          path: 'yanzhi/result',
          name: '颜值印钞机通用版内容页',
          component: () =>
            import(/* webpackChunkName: "yanzhi" */ 'pages/exeYanzhi/yanzhi.vue')
        },
        {
          path: 'dfyanzhi',
          name: '颜值印钞机-东方商厦',
          component: () =>
            import(/* webpackChunkName: "dfyanzhi" */ 'pages/exeYanzhi/dongfang.vue')
        },
        {
          path: 'lehui',
          name: '乐荟',
          component: () =>
            import(/* webpackChunkName: "lehui" */ 'pages/exeLehui/lehui.vue')
        },
        {
          path: 'lhwanda',
          name: '乐荟-万达版',
          component: () =>
            import(/* webpackChunkName: "lehui" */ 'pages/exeLehui/wanda.vue')
        },
        {
          path: '51act',
          name: '51act',
          component: () =>
            import(/* webpackChunkName: "51xingshidu" */ 'pages/51act/index.vue')
        },
        {
          path: '51actcp',
          name: '51actcp',
          component: () =>
            import(/* webpackChunkName: "51xingshidu" */ 'pages/51act/coupon.vue')
        },
        {
          path: 'spring',
          name: '狗年大吉手机页',
          component: () =>
            import(/* webpackChunkName: "spring" */ 'pages/exeSpring/index.vue')
        },
        {
          path: 'spring/result',
          name: '狗年大吉结果页',
          component: () =>
            import(/* webpackChunkName: "spring" */ 'pages/exeSpring/spring.vue')
        },
        {
          path: 'newSpring',
          name: '新狗年大吉手机号页',
          component: () =>
            import(/* webpackChunkName: "newspring" */ 'pages/exeSpring/newindex.vue')
        },
        {
          path: 'newSpring/result',
          name: '新狗年大吉结果页',
          component: () =>
            import(/* webpackChunkName: "newspring" */ 'pages/exeSpring/newspring.vue')
        },
        {
          path: 'haoke',
          name: '豪客牛排',
          component: () =>
            import(/* webpackChunkName: "haoke" */ 'pages/haoke/index.vue')
        },
        {
          path: 'wc_hj',
          name: 'worldCupPlanetHeiJiu',
          component: () =>
            import(/* webpackChunkName: "worldCupPlanet" */ 'pages/worldCups/heiqiu.vue')
        },
        {
          path: 'goodboy',
          name: '好孩子',
          component: () =>
            import(/* webpackChunkName: "goodboy" */ 'pages/goodboy/result.vue')
        },
        {
          path: 'wc_card_pr',
          name: 'WorldCupCardPhone',
          component: () =>
            import(/* webpackChunkName: "WorldCupCard" */ 'pages/worldCups/cardPre.vue')
        },
        {
          path: 'war',
          name: '芒果-三宝大战诸葛亮',
          component: () =>
            import(/* webpackChunkName: "war" */ 'pages/war/result.vue')
        },
        {
          path: 'concert',
          name: '芒果-黄子韬演唱会',
          component: () =>
            import(/* webpackChunkName: "concert" */ 'pages/concert/result.vue')
        },
        {
          path: 'miizz',
          name: '觅作',
          component: () =>
            import(/* webpackChunkName: "miizz" */ 'pages/miizz/result.vue')
        },
        {
          path: 'suning',
          name: '苏宁嗨购',
          component: () =>
            import(/* webpackChunkName: "suning" */ 'pages/suning/result.vue')
        },
        {
          path: 'mangguo',
          name: '芒果TV',
          component: () =>
            import(/* webpackChunkName: "mangguo" */ 'pages/mangguo/result.vue')
        },
        {
          path: 'hiltonMla',
          name: '马里奥希尔顿',
          component: () =>
            import(/* webpackChunkName: "hiltonMla" */ 'pages/hiltonMla/result.vue')
        },
        {
          path: 'hiltonYZ',
          name: '希尔顿印钞机',
          component: () =>
            import(/* webpackChunkName: "hiltonYZ" */ 'pages/exeYanzhi/hilton.vue')
        },
        {
          path: 'danceTwo',
          name: '跳舞机第二版',
          component: () =>
            import(/* webpackChunkName: "danceTwo" */ 'pages/danceTwo/index.vue')
        },
        {
          path: 'dh',
          name: '光启城',
          component: () =>
            import(/* webpackChunkName: "dh" */ 'pages/dh/result.vue')
        },
        {
          path: 'wc_goal',
          name: 'worldCupPlanetGoal',
          component: () =>
            import(/* webpackChunkName: "worldCupPlanet" */ 'pages/worldCups/goal.vue')
        },
        {
          path: 'ppt',
          name: '星视度玩法宣传',
          component: () =>
            import(/* webpackChunkName: "ppt" */ 'pages/ppt/result.vue')
        },
        {
          path: 'ppt/video',
          name: '星视度玩法宣传视频',
          component: () =>
            import(/* webpackChunkName: "ppt" */ 'pages/ppt/v1.vue')
        },
        {
          path: 'kissMe',
          name: 'kissMe电影通用版',
          component: () =>
            import(/* webpackChunkName: "kissMe" */ 'pages/kissMe/result.vue')
        },
        {
          path: 'drc',
          name: '大融城',
          component: () =>
            import(/* webpackChunkName: "drc" */ 'pages/drc/result.vue')
        },
        {
          path: 'hotblood',
          name: '热血狂篮',
          component: () =>
            import(/* webpackChunkName: 'hotblood' */ 'pages/mangguo/hotblood.vue')
        },
        {
          path: 'ppt_index',
          name: '星视度玩法宣传视频组菜单页',
          component: () =>
            import(/* webpackChunkName: "ppt" */ 'pages/ppt/index.vue')
        },
        {
          path: 'ppt_videos',
          name: '星视度玩法宣传视频组',
          component: () =>
            import(/* webpackChunkName: "ppt" */ 'pages/ppt/video.vue')
        },
        {
          path: 'tea',
          name: '茶桔便2.0',
          component: () =>
            import(/* webpackChunkName: "heyjuice" */ 'pages/heyjuice/tea.vue')
        },
        {
          path: 'summer_ice',
          name: '镜世界通用模板-夏天',
          component: () =>
            import(/* webpackChunkName: "summer" */ 'pages/summer/ice.vue')
        },
        {
          path: 'qixi_glassWord',
          name: '七夕-镜世界通用版',
          component: () =>
            import(/* webpackChunkName: "qixi_glassWord" */ 'pages/qixi_glassWord/index.vue')
        },
        {
          path: 'pjfd',
          name: 'pujiangfandian',
          component: () =>
            import(/* webpackChunkName: "pujiangfandian" */ 'pages/pjfd/index.vue')
        },
        {
          path: 'circus',
          name: '镜世界通用模板-马戏团',
          component: () =>
            import(/* webpackChunkName: "circus" */ 'pages/circus/index.vue')
        },
        {
          path: 'world_cup',
          name: '镜世界通用模板-世界杯',
          component: () =>
            import(/* webpackChunkName: "world_cup" */ 'pages/world_cup/index.vue')
        },
        {
          path: 'wc_ct',
          name: 'wordCupCirlceTalent',
          component: () =>
            import(/* webpackChunkName: "wordCupCirlceTalent" */ 'pages/worldCups/circletalent.vue')
        },
        {
          path: 'sn_redPacket',
          name: '苏宁天降红包',
          component: () =>
            import(/* webpackChunkName: "suning" */ 'pages/suning/index.vue')
        },
        {
          path: 'hi_play',
          name: '嗨玩',
          component: () =>
            import(/* webpackChunkName: "hiPlay" */ 'pages/hiPlay/index.vue')
        },
        {
          path: 'voice',
          name: 'vocieTest',
          component: () =>
            import(/* webpackChunkName: "voiceTest" */ 'pages/voiceGame/test.vue')
        },
        {
          path: 'fourShoot',
          name: 'fourShoot',
          component: () =>
            import(/* webpackChunkName: "fourShoot" */ 'pages/fourShoot/result.vue')
        },
        {
          path: 'hj_normal',
          name: 'heijiuNormal',
          component: () =>
            import(/* webpackChunkName: "heijiuNormal" */ 'pages/worldCups/heijiuNormal.vue')
        },
        {
          path: 'ynf',
          name: '御泥坊',
          component: () =>
            import(/* webpackChunkName: "yunifang" */ 'pages/yunifang/index.vue')
        },
        {
          path: 'weiindex',
          name: 'weiXunGameIndex',
          component: () =>
            import(/* webpackChunkName: "weixunGameIndex" */ 'pages/weixun/gameIndex.vue')
        },
        {
          path: 'oh',
          name: 'oh 秀发',
          component: () =>
            import(/* webpackChunkName: "suning" */ 'pages/suning/oh.vue')
        },
        {
          path: 'yp_worldCup',
          name: '雅培世界杯',
          component: () =>
            import(/* webpackChunkName: "world_cup" */ 'pages/world_cup/ypWorldcup.vue')
        },
        {
          path: 'yp_share',
          name: '雅培世界杯分享页',
          component: () =>
            import(/* webpackChunkName: "world_cup" */ 'pages/world_cup/ypShare.vue')
        },
        {
          path: 'capsule_toys',
          name: '扭蛋机',
          component: () =>
            import(/* webpackChunkName: "capsuleToys" */ 'pages/capsuleToys/index.vue')
        },
        {
          path: 'couponlist',
          name: 'couponList',
          component: () =>
            import(/* webpackChunkName: "couponList" */ 'pages/couponList/index.vue')
        },
        {
          path: 'lottie',
          name: 'lottie',
          component: () =>
            import(/* webpackChunkName: "Lottie" */ 'pages/lottie/index')
        },
        {
          path: 'pandp',
          name: '穿越前世今生',
          component: () =>
            import(/* webpackChunkName: "pandp" */ 'pages/pandp/index.vue')
        },
        {
          path: 'risk',
          name: '丛林大冒险',
          component: () =>
            import(/* webpackChunkName: "risk" */ 'pages/risk/index')
        },
        {
          path: 'meme',
          name: '表情包制造机',
          component: () =>
            import(/* webpackChunkName: "meme" */ 'pages/meme/result.vue')
        },
        {
          path: 'lxxj',
          name: 'longXiaXingJing',
          component: () =>
            import(/* webpackChunkName: "longXiaXingJing" */ 'pages/lxxj/index')
        },
        {
          path: 'ad',
          name: 'ad',
          component: () =>
            import(/* webpackChunkName: "ad" */ 'pages/ad/index')
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
