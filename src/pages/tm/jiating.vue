<template>
  <div
    :style="style.root"
    class="content"
  >
    <!-- 刮刮卡抽奖-->
    <div class="group">
      <div class="winner">
        <img
          :src="base + 'head4.png'"
          class="head"
        >
        <img
          :src="base + 'winbg.png'"
          class="winbg"
        >
        <canvas
          v-if="award"
          id="canvasDoodle"
          class="canvas-ele"
          width="200"
          height="90"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        />
        <div class="win-text">
          <!-- 优惠券 -->
          <img :src="coupon.url + this.$qiniuCompress()">
        </div>
        <img
          v-show="award"
          :src="base + 'text.png'"
          class="text"
        >
        <div
          v-show="form"
          class="form"
        >
          <input
            v-model="mobile"
            type="text"
            maxlength="11"
            placeholder="请输入手机号"
            class="input"
          >
          <a
            class="get-btn"
            @click="checkMobile(mobile)"
          />
          <a
            class="cancel-btn"
            @click="()=>{mobile='';}"
          />
        </div>
      </div>
    </div>
    <!-- 商品优惠内容 -->
    <div class="block coupons">
      <img :src="base + 'jiating1.png' + this.$qiniuCompress()">
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
  getGame,
  getCouponId,
  getAdCoupon,
  basicTrack,
  validatePhone,
  checkGetCoupon
} from 'services'
import { Toast } from 'mint-ui'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + '/fe/image/drc/guoqing/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      deUrl:
        'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
      userId: null,
      id: this.$route.query.id,
      coupon: {
        policyId: 4,
        couponId: null,
        url: null
      },
      mobile: null,
      award: true,
      form: false,
      c: null,
      //分享
      wxShareInfoValue: {
        title: '中秋国庆星乐享，1000份好礼“刷脸”大派送！',
        desc: '大融城-星视度嗨玩节，福利优惠拿不停。',
        link: 'http://papi.xingstation.com/api/s/nZl' + window.location.search,
        imgUrl:
          'http://cdn.xingstation.cn/image/tm/guoqing/share_jiating.png',
      }
    }
  },
  watch: {
    belong() {
      this.userGame()
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
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.deUrl,
        qiniu_id: this.id,
        score: 100
      }
      userGame(args, this.userId)
        .then(res => {
          this.initCanvas()
          this.getCouponId()
        })
        .catch(e => {
          console.log(e)
        })
    },
    checkMobile(mobile) {
      if (validatePhone(mobile)) {
        basicTrack(this.$route.query.id, mobile)
        this.getCoupon()
        this.form = false
      } else {
        Toast('您输入的手机号有误')
      }
    },
    initCanvas() {
      let that = this
      let img = new Image()
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      img.setAttribute('crossOrigin', 'Anonymous')
      canvas.height = 90
      canvas.width = 200
      //获取当前画布的宽高
      let width = canvas.width
      let height = canvas.height
      img.src = that.base + 'ward.png'
      img.onload = () => {
        ctx.beginPath()
        ctx.drawImage(img, 0, 0, width, height)
        ctx.closePath()
        if (document.querySelector('.canvas-ele') !== null) {
          this.c = document.querySelector('.canvas-ele').getBoundingClientRect()
          console.log(this.c)
        }
      }
    },
    handleTouchMove(event) {
      // console.dir(event)
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      /* 根据手指移动画线，使之变透明*/
      if (this.c.top > window.innerHeight) {
        let x = event.touches[0].pageX - this.c.left
        let y = event.touches[0].pageY - this.c.top
        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      } else {
        let x = event.touches[0].clientX - this.c.left
        let y = event.touches[0].clientY - this.c.top
        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    },
    handleTouchStart(event) {
      // console.dir(event)
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      let x = event.touches[0].clientX - this.c.left
      let y = event.touches[0].clientY - this.c.top
      ctx.beginPath()
      console.log(x)
      console.log(y)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    },
    handleTouchEnd(event) {
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      /* 获取imageData对象*/
      let imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height)
      /* */
      let allPX = imageDate.width * imageDate.height
      let iNum = 0 //记录刮开的像素点个数
      for (let i = 0; i < allPX; i++) {
        if (imageDate.data[i * 4 + 3] == 0) {
          iNum++
        }
      }
      if (iNum >= (allPX * 1) / 4) {
        this.award = false
        if (this.coupon.couponId != 11) {
          this.form = true
        }
      }
    },
    getCoupon() {
      let args = {
        mobile: this.mobile
      }
      getAdCoupon(args, this.coupon.couponId)
        .then(res => {
          Toast('领取优惠券成功!')
        })
        .catch(err => {
          Toast(err.response.data.message)
        })
    },
    getCouponId() {
      getCouponId(this.coupon.policyId)
        .then(res => {
          console.log(res)
          this.coupon.couponId = res.id
          this.coupon.url = res.image_url
          if (res.wx_user_id) {
            this.award = false
          }
          this.checkGetCoupon(res.id)
        })
        .catch(err => {
          console.log(err)
        })
    },

    checkGetCoupon(id) {
      let args = {
        coupon_batch_id: id
      }
      checkGetCoupon(args)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.form = false
          } else {
            this.form = this.award ? false : true
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
/*声明 WebFont*/
@font-face {
  font-family: "haibao";
  src: url("http://cdn.xingstation.cn/font/haibao.ttf");
  src: url("http://cdn.xingstation.cn/font/haibao.eot"),
    url("http://cdn.xingstation.cn/font/haibao.woff"),
    url("http://cdn.xingstation.cn/font/haibao.ttf"),
    url("http://cdn.xingstation.cn/font/haibao.svg");
  font-weight: normal;
  font-style: normal;
}
@base: "http://cdn.xingstation.cn/fe/image/drc/guoqing/";
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
  background-color: #fef6d1;
  max-width: 750px;
  background-image: url("@{base}background.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 40%;
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
    position: relative;
    width: 100%;
    background-image: url("@{base}bg.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: 0;
    margin-bottom: 10%;
  }
  .coupons {
    z-index: 0;
    margin-bottom: 5%;
  }
  .group {
    width: 100%;
    position: relative;
    margin-bottom: 6%;
    background-image: url("@{base}topbg.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding-top: 4%;
  }
  .winner {
    width: 88%;
    position: relative;
    .head {
      display: block;
      width: 48%;
      position: relative;
      z-index: 99;
      margin-bottom: -7.5%;
    }
  }
  .winbg {
    position: relative;
    z-index: 0;
    width: 93%;
  }
  .canvas-ele {
    position: absolute;
    top: 42%;
    width: 70%;
    height: 32%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  }
  .win-text {
    position: absolute;
    top: 42%;
    width: 69%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }
  .text {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
  }
  .form {
    width: 73%;
    height: 25%;
    text-align: center;
    position: absolute;
    top: 77%;
    left: 50%;
    transform: translateX(-50%);
    overflow-x: hidden;
    background-image: url("@{base}formbg.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    .input {
      position: relative;
      width: 100%;
      height: 40%;
      margin-top: 0.5%;
      border-radius: 5px;
      text-align: center;
      color: #a3a3a3;
      background: transparent;
      font-size: 5vw;
      letter-spacing: 2px;
    }
    .get-btn,
    .cancel-btn {
      width: 44%;
      height: 43%;
      position: relative;
      border-radius: 5px;
      margin-top: 2%;
    }
    .get-btn {
      float: left;
      margin-left: 2%;
    }
    .cancel-btn {
      float: right;
      margin-right: 2%;
    }
  }
}
.overflow {
  overflow: hidden;
}
</style>


