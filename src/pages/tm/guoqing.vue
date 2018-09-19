<template>
  <div 
    :style="style.root"
    class="content">
    <!-- 欢乐积攒有惊喜 四级联动显示-->
    <div 
      class="block group">
      <img
       :src="base + 'group.png' + this.$qiniuCompress()"
        class="bg">
      <img
        v-show="gameData.projectOne"
       :src="base + 'a.png' + this.$qiniuCompress()"
        class="done1">
      <img
        v-show="gameData.projectTwo"
       :src="base + 'b.png' + this.$qiniuCompress()"
        class="done2">
      <img
        v-show="gameData.projectThree"
        :src="base + 'c.png' + this.$qiniuCompress()"
        class="done3">
      <img
        v-show="gameData.projectFour"
        :src="base + 'd.png' + this.$qiniuCompress()"
        class="done4">
      <span
        class="span">已集齐<span class="white">{{gameData.numArr[gameData.num]}}</span>赞
      </span>
    </div>
    <img 
        :src="base + 'note.png'"
        class="note">
    <div 
      class="block coupons">
      <img 
        :src="base + params.belong + '.png' + this.$qiniuCompress()">
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
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMG_SERVER + '/image/tm/guoqing/',
      params: {
        deUrl:
          'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
        userId: null,
        belong: this.$route.query.utm_campaign,
        id: this.$route.query.id
      },
      // 节目数据，是否已玩
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false,
        projectFour: false,
        num: 0,
        numArr: ['0', '一', '二', '三', '四']
      },
      //分享
      wxShareInfoValue: {
        title: '中秋国庆星乐享，1000份好礼“刷脸”大派送！',
        desc: '大融城-星视度嗨玩节，福利优惠拿不停。',
        link: 'http://papi.xingstation.com/api/s/nZR' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/tm/guoqing/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('user_id') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.params.userId = Cookies.get('user_id')
        this.params.belong = this.$route.query.utm_campaign
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.params.belong,
        image_url: this.params.deUrl,
        qiniu_id: this.params.id,
        score: 100
      }
      userGame(args, this.params.userId)
        .then(res => {
          console.log(res)
          this.getGame()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame() {
      let args = {
        withCredentials: true
      }
      let userId = this.params.userId
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list, userId) {
      let data = list
      console.log(list)
      data.map(r => {
        // 节目1，棒约翰
        if (r.belong === 'PaPaJohnsPizza') {
          this.gameData.projectOne = true
          this.gameData.num++
        }
        // 节目2，华为周年庆
        if (r.belong === 'huawei') {
          this.gameData.projectTwo = true
          this.gameData.num++
        }
        // 节目3,balabala,小小童星梦
        if (r.belong === 'childDream') {
          this.gameData.projectThree = true
          this.gameData.num++
        }
        // 节目4，嘉庭老上海味道
        if (r.belong === 'jiating') {
          this.gameData.projectFour = true
          this.gameData.num++
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/*声明 WebFont*/
@font-face {
  font-family: 'haibao';
  src: url('http://p22vy0aug.bkt.clouddn.com/font/haibao.ttf');
  src: url('http://p22vy0aug.bkt.clouddn.com/font/haibao.eot'),
    url('http://p22vy0aug.bkt.clouddn.com/font/haibao.woff'),
    url('http://p22vy0aug.bkt.clouddn.com/font/haibao.ttf'),
    url('http://p22vy0aug.bkt.clouddn.com/font/haibao.svg');
  font-weight: normal;
  font-style: normal;
}
@base: 'http://p22vy0aug.bkt.clouddn.com/image/tm/guoqing/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
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
  background-color: #fef6d1;
  max-width: 750px;
  background-image: url('@{base}title.png');
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 62%;

  .block {
    width: 97.5%;
    overflow-x: hidden;
    position: relative;
    margin: 0 auto;
  }
  .note {
    width: 54.5%;
    margin-top: 4%;
    margin-bottom: 6%;
  }
  .group {
    background-image: url('@{base}bg.png');
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding-top: 1%;
    .bg {
      position: relative;
      z-index: 0;
    }
    .done1,
    .done2,
    .done3,
    .done4 {
      height: 36%;
      position: absolute;
      top: 45.5%;
    }
    .done1 {
      left: 1.5%;
    }
    .done2 {
      left: 26%;
    }
    .done3 {
      left: 50.5%;
    }
    .done4 {
      left: 75%;
    }
    .span {
      width: 56%;
      text-align: center;
      font-family: 'haibao';
      font-size: 8vw;
      letter-spacing: 2px;
      text-stroke: 1px #000;
      -webkit-text-stroke: 1px #000;
      position: absolute;
      left: 22%;
      bottom: 3.8%;
      color: #e93f42;
      .white {
        color: #fff;
        font-size: 8vw;
      }
    }
  }
  .coupons {
    margin-bottom: 8%;
  }
}
</style>


