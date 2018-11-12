<template>
  <div
    :style="style.root"
    class="root">
    <!-- 券图 -->
    <img 
      :src="couponImg+ this.$qiniuCompress()"
      class="couponImg">
    <div 
      class="center">
      <img 
        :src="baseUrl + 'scan.png'+ this.$qiniuCompress()"
        class="scan">
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo"> 
      <!-- 二维码 -->
      <img 
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="ewm"> 
      <img 
        v-if="hasUsed"
        :src="baseUrl + 'used.png'+ this.$qiniuCompress()"
        class="coupon-used">
    </div>
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
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
      baseUrl: cdnUrl + '/fe/marketing/img/taihe/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      coupon_batch_id: this.$route.query.coupon_batch_id,
      couponImg: null,
      qrcodeImg: null,
      params: {
        user_id: null
      },
      hasUsed: false,
      wxShareInfoValue: {
        title: '刷脸享优惠，畅快看大片！',
        desc: '太禾影城等你来嗨玩！',
        link: 'http://papi.xingstation.com/api/s/zK8' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/taihe/icon.jpg'
      }
    }
  },
  created() {},
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
            this.couponImg = res.couponBatch.image_url
            if (parseInt(res.status) === 1) {
              //已使用
              this.hasUsed = true
            }
          } else {
            this.sendCoupon()
          }
        })
        .catch(err => {
          console.log(err)
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
          this.couponImg = res.couponBatch.image_url
          if (parseInt(res.status) === 1) {
            //已使用
            this.hasUsed = true
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/taihe/';
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
  overflow: hidden;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .couponImg {
    width: 86%;
    position: relative;
    margin-top: 4%;
  }
  .center {
    width: 100%;
    position: relative;
    margin-top: 2.5%;
    .scan {
      width: 80%;
    }
    .photo {
      width: 32.5%;
      position: absolute;
      left: 17%;
      top: 8.5%;
      user-select: auto;
      pointer-events: auto;
      z-index: 5;
    }
    .ewm {
      width: 25%;
      position: absolute;
      right: 17%;
      top: 8.5%;
      user-select: auto;
      pointer-events: auto;
    }
    .coupon-used {
      width: 80%;
      position: absolute;
      left: 10%;
      top: 0.4%;
      z-index: 9;
    }
  }
}
</style>
