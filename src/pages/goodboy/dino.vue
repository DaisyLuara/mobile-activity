<template>
  <div 
    :style="style.root"
    class="content">
    <div
      class="main">
      <img
        :src="base + 'frame.png'"
        class="frame">
      <div 
        class="picture">
        <img
          :src="photo + this.$qiniuCompress()"
          class="photo">
      </div>
      <span
        class="score">{{ score }}</span>
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const IMAGE_SERVER = 'http://p22vy0aug.bkt.clouddn.com/image/'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMAGE_SERVER + 'goodboy/dino/',
      photo: null,
      score: this.$route.query.score,
      //微信分享
      wxShareInfoValue: {
        title: '限时活动丨PK游戏之王赢大奖',
        desc: '点击领取你的游戏结果',
        link: 'http://papi.xingstation.com/api/s/0Rv' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/goodboy/dino/share.png'
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
        this.userId = Cookies.get('user_id')
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.$route.query.utm_campaign,
        image_url: this.photo,
        score: this.$route.query.score,
        qiniu_id: this.$route.query.id
      }
      userGame(args, this.userId)
        .then(res => {
          if (res.success) {
            console.log(res)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: 'mianhuatang';
  src: url('http://p22vy0aug.bkt.clouddn.com/font/mianhuatang.ttf');
}
@base: 'http://p22vy0aug.bkt.clouddn.com/image/goodboy/dino/';
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
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #ee9616;
  background-image: url('@{base}bg.png');
  background-position: center bottom;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .main {
    width: 100%;
    position: relative;
    z-index: 9;
    margin-top: 2%;
    margin-bottom: 64%;
    .frame {
      position: relative;
      z-index: 0;
      width: 94%;
    }
    .picture {
      width: 34vw;
      height: 34vw;
      position: absolute;
      top: 11.5%;
      left: 50%;
      transform: translateX(-50%);
      border: solid 10px #fff;
      border-radius: 50%;
      overflow: hidden;
      z-index: 99;
      .photo {
        vertical-align: middle;
        object-fit: contain;
        object-position: center;
        margin: 0 auto;
      }
    }
    .score {
      position: absolute;
      top: 58%;
      left: 51%;
      color: #fff;
      font-size: 15vw;
      font-family: 'mianhuatang';
      z-index: 99;
    }
  }
}
</style>


