<template>
  <div 
    :style="height"
    class="content">
    <!-- 欢乐积攒有惊喜 三级联动显示-->
    <div 
      class="group">

    </div>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame,
  getGame
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/halloween/',
      height: this.$innerHeight(),
      params: {
        deUrl:
          'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
        userId: null,
        belong: this.$route.query.utm_campaign,
        id: this.$route.query.id,
        score: this.$route.query.score
      },
      // 节目数据，是否已玩
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false,
        projectFour: false
      },
      //分享
      wxShareInfoValue: {
        title: '中秋国庆星乐享，1000份好礼“刷脸”大派送！',
        desc: '大融城-星视度嗨玩节，福利优惠拿不停。',
        link: 'http://papi.xingstation.com/api/s/nZR' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/halloween/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    // //微信授权
    // if (isInWechat() === true) {
    //   if (
    //     process.env.NODE_ENV === 'production' ||
    //     process.env.NODE_ENV === 'testing'
    //   ) {
    //     this.handleWechatAuth()
    //   }
    // }
  },
  methods: {
    // handleWechatAuth() {
    //   if (Cookies.get('sign') === null) {
    //     let base_url = encodeURIComponent(String(window.location.href))
    //     let redirct_url =
    //       process.env.WX_API +
    //       '/wx/officialAccount/oauth?url=' +
    //       base_url +
    //       '&scope=snsapi_base'
    //     window.location.href = redirct_url
    //   } else {
    //     this.params.userId = Cookies.get('user_id')
    //     this.params.belong = this.$route.query.utm_campaign
    //     this.userGame()
    //   }
    // },
    // userGame() {
    //   let args = {
    //     belong: this.params.belong,
    //     image_url: this.params.deUrl,
    //     qiniu_id: this.params.id,
    //     score: this.params.score
    //   }
    //   userGame(args, this.params.userId)
    //     .then(res => {
    //       console.log(res)
    //       this.getGame()
    //     })
    //     .catch(e => {
    //       console.log(e)
    //     })
    // },
    // getGame() {
    //   let args = {
    //     withCredentials: true
    //   }
    //   let userId = this.params.userId
    //   getGame(args, userId)
    //     .then(res => {
    //       console.log(res)
    //       this.projectStatus(res, userId)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // projectStatus(list, userId) {
    //   let data = list
    //   console.log(list)
    //   data.map(r => {
    //     // 节目1，搞怪万圣节
    //     if (r.belong === 'PaPaJohnsPizza') {
    //       this.gameData.projectOne = true
    //     }
    //     // 节目2，不给糖就捣蛋
    //     if (r.belong === 'huawei') {
    //       this.gameData.projectTwo = true
    //     }
    //     // 节目3,抓鬼大冒险
    //     if (r.belong === 'childDream') {
    //       this.gameData.projectThree = true
    //     }
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/halloween/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  background-color: #fef6d1;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
a {
  display: inline-block;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}

.content {
  width: 100%;
  overflow-x: hidden;
  max-width: 750px;
  // background-image: url('@{imageHost}background.png');
  // background-position: center top;
  // background-size: 100% auto;
  // background-repeat: no-repeat;
  padding-top: 60%;
}
</style>


