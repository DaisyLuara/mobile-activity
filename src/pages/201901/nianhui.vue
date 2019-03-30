<template>
  <div
    :style="style.root"
    class="warp"
  >
    <!-- <span class="code-text">{{code}}</span> -->
    <img
      :src="base + 'title.png'"
      class="title"
    >
    <div class="main">
      <img
        :src="base + 'bg2.png'"
        class="bg"
      >
      <div
        :style="{opacity:opacity}"
        class="coupon"
      >
        <img
          :src="base + 'bg3.png'"
          class="bg"
        >
        <canvas
          v-show="award"
          id="canvasDoodle"
          class="canvas-ele"
          width="200"
          height="90"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        />
        <img
          :src="coupon_url"
          class="coupon_img"
        >
      </div>
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="base + 'button.png'"
      class="save"
    >
    <span class="code-text">{{ code }}</span>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, sendCoupon, checkGetCoupon, checkCouponNumber, sendMoneyOnce, dateFormat, formatTimestamp } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/nianhui/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      opacity: 0,//false
      code: null,
      id: this.$route.query.id,
      userId: null,
      award: true,
      coupon_url: null,// 'https://cdn.xingstation.com/fe/image/nianhui/test.png'
    }
  },
  watch: {
    parms() {
      this.checkGetCoupon();
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
    this.handleForbiddenShare()
    // this.checkGetCoupon()
    let that = this
    let img = new Image()
    img.src = this.base + 'bg3.png'
    img.onload = function () {
      that.initCanvas()
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get("sign") === null) {
        let base_url = encodeURIComponent(String(window.location.href));
        let redirct_url =
          process.env.WX_API +
          "/wx/officialAccount/oauth?url=" +
          base_url +
          "&scope=snsapi_userinfo";
        window.location.href = redirct_url;
      } else {
        this.userId = Cookies.get("user_id");
      }
    },
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
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
      img.src = that.base + 'default.png'
      img.onload = () => {
        ctx.beginPath()
        ctx.drawImage(img, 0, 0, width, height)
        ctx.closePath()
        if (document.querySelector('.canvas-ele') !== null) {
          this.c = document.querySelector('.canvas-ele').getBoundingClientRect()
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
      console.dir(event)
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      let x = event.touches[0].clientX - this.c.left
      let y = event.touches[0].clientY - this.c.top
      ctx.beginPath()
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
        if (this.coupon_batch_id != 242) {
          this.sendMoney(this.code)
        }
      }
    },
    //获取券信息
    checkGetCoupon() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
        include: "couponBatch",
      };
      let date = new Date()
      args.start_date = dateFormat(
        new Date(formatTimestamp(date, true)),
        'yyyy-MM-dd hh:mm:ss'
      )
      args.end_date = dateFormat(
        new Date(formatTimestamp(date, false) - 1000),
        'yyyy-MM-dd hh:mm:ss'
      )
      checkGetCoupon(args)
        .then(res => {
          if (!res) {
            this.sendCoupon()
          } else {
            this.coupon_url = res.couponBatch.image_url
            this.code = res.code
            this.opacity = 1
          }
          if (parseInt(res.status) === 1) {
            this.award = false
          } else {
            this.award = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发现金券
    sendMoney(code) {
      sendMoneyOnce(code).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendCoupon() {
      let args = {
        include: "couponBatch",
        qiniu_id: this.id,
        oid: this.oid,
        belong: this.belong
      };
      sendCoupon(args, this.coupon_batch_id)
        .then(res => {
          //发完券
          this.coupon_url = res.couponBatch.image_url
          this.code = res.code
          this.opacity = 1
          // this.sendMoney(this.code)
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  }
}
</script>
<style lang="less" scoped>
@base: "https://cdn.xingstation.com/fe/image/nianhui/";
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
  font-size: 0;
  position: relative;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{base}up.png"), url("@{base}down.png"),
    url("@{base}bg.png");
  background-position: center top, center bottom, center top;
  background-size: 100% auto, 100% auto, 100% 100%;
  background-repeat: no-repeat, no-repeat, no-repeat;
  z-index: 0;
  .title {
    width: 80%;
    margin-top: 1%;
    margin-bottom: 8%;
  }
  .main {
    width: 100%;
    .bg {
      width: 91%;
      z-index: 0;
    }
    .coupon {
      position: absolute;
      width: 64vw;
      top: 7%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      .bg {
        width: 100%;
        position: relative;
        z-index: 0;
      }
      .coupon_img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9;
      }
      .canvas-ele {
        position: absolute;
        top: 0%;
        width: 100%;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
      }
    }
    .photo {
      width: 69%;
      position: absolute;
      top: 28%;
      left: 49.5%;
      transform: translateX(-50%);
      z-index: 999;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 74%;
    margin-top: 3%;
    margin-bottom: 15%;
  }
  .code-text {
    display: inline-block;
    font-size: 5vw;
    color: #fff;
    opacity: 0.7;
    font-weight: 500;
    position: absolute;
    top: 31%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
}
</style>

