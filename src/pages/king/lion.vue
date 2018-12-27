<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
      class="bg"
    >
    <div class="top">
      <img
        :src="baseUrl + 'topImg.png'+ this.$qiniuCompress()"
        class="topImg"
      >
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo-real"
      >
    </div>
    <!-- 优惠券部分 -->
    <div
      v-show="over"
      class="bt"
    >
      <img
        :src="couponImg+ this.$qiniuCompress()"
        class="coupon"
      >
      <img
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="erweima"
      >
      <span class="quanma">{{ code }}</span>
      <!-- 券已使用 -->
      <img
        v-if="hasUsed&&!hasPost"
        :src="baseUrl + 'used.png'+ this.$qiniuCompress()"
        class="coupon-used"
      >
      <!--券过期 -->
      <img
        v-if="hasPost&&!hasUsed"
        :src="baseUrl + 'failure.png'+ this.$qiniuCompress()"
        class="coupon-post"
      >
    </div>
  </div>
</template>
<script>
import { normalPages } from '@/mixins/normalPages'
import {
  sendCoupon,
  checkGetCoupon,
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies
} from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/lion/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      // belong: this.$route.query.utm_campaign,
      // coupon_batch_id: this.$route.query.coupon_batch_id,
      couponImg: null,
      qrcodeImg: null,
      code: null,
      time: null,
      over: true,
      params: {
        user_id: null
      },
      hasUsed: true,
      hasPost: true,
      wxShareInfoValue: {
        title: '萌狮表情大作战',
        desc: '天降福利，身骑白马闯三关',
        link: 'http://papi.xingstation.com/api/s/pQ6' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/lion/icon.jpeg'
      }
    }
  },
  watch: {
    parms() {
      this.checkCouponIsUse()
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
  },
  methods: {
    //微信静默授权
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
        this.params.user_id = this.userId
        this.checkCouponIsUse()
      }
    },
    //判断是否领过优惠券
    checkCouponIsUse() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
        include: 'couponBatch'
      }
      checkGetCoupon(args)
        .then(res => {
          if (res) {
            this.qrcodeImg = res.qrcode_url
            this.code = res.code
            this.time = res.created_at
            this.couponImg = res.couponBatch.image_url
            let dateValue = this.time.replace(/\-/g, '/')
            if (
              new Date().getTime() - new Date(dateValue).getTime() >
              86400000
            ) {
              //失效处理
              this.hasPost = true
              this.hasUsed = false
            } else if (parseInt(res.status) === 1) {
              //已使用
              this.hasUsed = true
              this.hasPost = false
            }
          } else {
            this.sendCoupon()
          }
        })
        .catch(err => {
          console.log(err)
          this.over = false
        })
    },
    //发优惠券
    sendCoupon() {
      let args = {
        include: 'couponBatch'
      }
      sendCoupon(args, this.coupon_batch_id)
        .then(res => {
          this.qrcodeImg = res.qrcode_url
          this.code = res.code
          this.time = res.created_at
          this.couponImg = res.couponBatch.image_url
          let dateValue = this.time.replace(/\-/g, '/')
          if (new Date().getTime() - new Date(dateValue).getTime() > 86400000) {
            //失效处理
            this.hasPost = true
            this.hasUsed = false
          } else if (parseInt(res.status) === 1) {
            //已使用
            this.hasUsed = true
            this.hasPost = false
          }
        })
        .catch(err => {
          this.over = false
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/lion/";
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
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow-x: hidden;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
  }
  .top {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .topImg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 20%;
      z-index: 9;
    }
    .frame {
      width: 72%;
      margin-top: 3%;
      pointer-events: none;
      user-select: none;
    }
    .photo {
      width: 56.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49.8%, -56%);
      user-select: auto;
      pointer-events: auto;
    }
    .photo-real {
      width: 56.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49.8%, -56%);
      user-select: auto;
      pointer-events: auto;
      z-index: 99;
      opacity: 0;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    text-align: center;
    margin: 0 auto;
    pointer-events: none;
    user-select: none;
    .erweima {
      width: 18.5%;
      position: absolute;
      left: 10%;
      top: 58%;
    }
    .quanma {
      display: block;
      position: absolute;
      left: 32%;
      top: 62.5%;
      color: #d84a4d;
      font-size: 4vw;
      text-align: center;
    }
    .coupon {
      width: 96%;
    }
    .coupon-used {
      width: 96%;
      position: absolute;
      left: 2%;
      top: 0;
      z-index: 19;
    }
    .coupon-post {
      width: 96%;
      position: absolute;
      left: 2%;
      top: 0;
      z-index: 19;
    }
  }
}
</style>
