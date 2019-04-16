<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}"
  >
    <div class="main">
      <!-- 照片区域 -->
      <div class="picture">
        <img
          :src="base + 'frame.png' + this.$qiniuCompress()"
          class="frame"
        >
        <img
          id="test"
          :src="compoundUrl"
          class="test"
        >
      </div>
      <div class="scores">
        <img
          :src="base + 'score.png' + this.$qiniuCompress()"
          class="scorebg"
        >
        <span>{{ score }}</span>
      </div>
      <div class="coupons">
        <img
          :src="base + 'text.png' + this.$qiniuCompress()"
          class="couponbg"
        >
        <img
          :src="base + coupon + '.png' + this.$qiniuCompress()"
          class="coupon"
        >
      </div>
      <a
        class="button"
        @click="toOtherLink"
      >
        <img
          :src="base+'button.png' + this.$qiniuCompress()"
          class="button"
        >
      </a>
    </div>
    <div
      v-show="mask"
      :class="{mask:true,iphoneX:iphoneX}"
    >
      <!-- 说明 -->
      <div
        v-show="explain1"
        class="explain1"
        @click="()=>{explain1 = false;mask=false;}"
      >
        <img :src="base + 'explain.png' + this.$qiniuCompress()">
        <a
          class="close"
          @click="()=>{explain1=false;mask=false;}"
        >
          <img :src="base+'close.png' + this.$qiniuCompress()">
        </a>
      </div>
      <!-- 领券，停顿显示图片，跳转链接 -->
      <div
        v-show="explain2"
        class="explain2"
      >
        <img :src="base+'explain2.png'">
      </div>
    </div>
    <canvas
      id="canvas"
      class="photoImg"
      style="display: none"
    />
  </div>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame,
  getGame,
  setParameter,
  getAdCoupon,
  checkCouponNumber
} from 'services'
import { normalPages } from '@/mixins/normalPages'
import MC from 'mcanvas'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/xh_dance/',
      iphoneX: false,
      score: this.$route.query.score,
      coupon: 3,
      mask: true,
      explain1: true,
      explain2: false,
      belong: null,
      photo: null,
      userId: null,
      base64Data: null,
      compoundUrl: null,
      link: process.env.AD_API+'/api/s/oYK',
      //http://xuhui.xiaooo.club/app/index.php?i=40&c=my&a=point&do=exchange
      //微信分享
      wxShareInfoValue: {
        title: '一起尬舞吗？朋友',
        desc: '金秋十月！来旭辉mall吃喝玩乐',
        link: process.env.AD_API+'/api/s/pg6' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/xh_dance/icon.png',
        success: function () {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
    // this.getAnim()
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
        this.belong = this.$route.query.utm_campaign
        this.getAnim()
      }
    },
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = this.photo + this.$qiniuCompress()
      let score = parseInt(this.$route.query.score)
      let ImgUrl = null
      if (score >= 282 && score <= 300) {
        ImgUrl = this.base + 'photo01.png'
      }
      if (score >= 263 && score <= 281) {
        ImgUrl = this.base + 'photo02.png'
      }
      if (score <= 262) {
        ImgUrl = this.base + 'photo03.png'
      }
      let that = this
      mc.background(that.base + 'frame.png', {
        left: 0,
        top: 0,
        type: 'origin',
        width: this.$innerWidth() * 0.1,
        height: this.$innerHeight(),
        pos: {
          x: '0%',
          y: '0%'
        }
      })
        .add(url, {
          width: '180%',
          color: '#000000',
          pos: {
            x: '-25%',
            y: '7%',
            rotate: 90
          }
        })
        .add(ImgUrl, {
          width: '100%',
          color: '#000000',
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'jpg',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          quality: 1,
          // 成功回调；
          success(b64) {
            that.base64Data = b64
            that.drawingText()
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    },
    //文字的合成及章
    drawingText() {
      var thisRef = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let height = this.$innerHeight()
      let width = this.$innerWidth()
      let text = this.$route.query.score
      let seal = new Image()
      seal.setAttribute('crossOrigin', 'Anonymous')
      image.src = this.base64Data
      image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = image.width * 1.2 * 0.53
        let y = image.height * 0.14
        ctx.font = '400 100px jingzhuan'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fff'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(text, 0, 0)
        ctx.restore()
        seal.onload = function () {
          ctx.drawImage(
            seal,
            0,
            0,
            seal.width,
            seal.height,
            image.width * 0.65,
            image.height * 0.08,
            image.width * 0.35,
            image.width * 0.32
          )
          let url = canvas.toDataURL('image/png')
          let img = document.getElementById('test')
          img.src = url
          thisRef.compoundUrl = url
        }
        seal.src = thisRef.base + '/passed.png'
      }
    },
    userGame() {
      let id = this.$route.query.id
      let args = {
        belong: this.belong,
        image_url: this.photo,
        qiniu_id: id
      }
      userGame(args, this.userId)
        .then(res => {
          this.getGame()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame() {
      let url = process.env.SAAS_API + '/user/' + this.userId + '/games?belong='
      this.$http
        .get(url + this.belong)
        .then(res => {
          this.score = parseInt(res.data.data[0].total_score)
            ? parseInt(res.data.data[0].total_score)
            : this.score
          this.docheckScore(this.score)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAnim() {
      let timer = requestAnimationFrame(this.getAnim)
      if (this.photo) {
        cancelAnimationFrame(timer)
        this.userGame()
        this.drawing()
        console.log('photo')
        return
      }
      console.log(this.photo)
    },
    docheckScore(score_total) {
      if (score_total <= 400) {
        this.coupon = 1
        return
      }
      if (score_total <= 700) {
        this.coupon = 2
        return
      }
      if (score_total <= 1000) {
        this.coupon = 3
        return
      }
      if (score_total > 1000) {
        this.coupon = 4
        return
      }
    },
    toOtherLink() {
      this.mask = true
      this.explain2 = true
      let that = this
      let timer = setTimeout(function () {
        window.location.href = that.link
      }, 3000)
    }
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.exe666.com/fe/image/xh_dance/";
@font-face {
  font-family: "jingzhuan";
  src: url("http://cdn.exe666.com/fe/marketing/img/xsd_ad/jinzhuan2.TTF");
  font-weight: normal;
  font-style: normal;
}
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
  overflow: hidden;
  position: relative;
  background-image: url("@{base}back.png");
  background-position: center bottom;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main {
    width: 100%;
    position: relative;
    z-index: 0;
    text-align: left;
    margin-top: 6%;
    .picture {
      width: 51%;
      display: inline-block;
      margin-left: 4%;
      position: relative;
      .frame {
        position: relative;
        z-index: 0;
      }
      .test {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        pointer-events: auto;
        user-select: auto;
      }
    }
    .scores {
      width: 36%;
      display: inline-block;
      margin-left: 3%;
      position: relative;
      transform: translateY(-30%);
      .scorebg {
        position: relative;
        z-index: 0;
      }
      span {
        font-family: "jingzhuan";
        font-size: 15vw;
        color: #fff;
        position: absolute;
        top: 100%;
        left: 0%;
      }
    }
    .coupons {
      width: 97%;
      margin: 0 auto;
      margin-top: -4.5%;
      position: relative;
      .couponbg {
        position: relative;
        z-index: 0;
      }
      .coupon {
        width: 40%;
        position: absolute;
        top: 46%;
        left: 52%;
        transform: translateX(-50%);
        z-index: 99;
      }
    }
    .button {
      display: block;
      width: 78%;
      margin: 0 auto;
      margin-top: 8%;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    text-align: center;
    .explain1 {
      position: relative;
      width: 91%;
      text-align: center;
      margin: auto;
      margin-top: 8%;
      .close {
        display: block;
        width: 15%;
        text-align: center;
        margin: auto;
        margin-top: 10%;
      }
    }
    .explain2 {
      width: 85%;
      text-align: center;
      margin: auto;
      margin-top: 10%;
    }
  }
}
.iphoneX {
  padding-top: 10%;
}
</style>


