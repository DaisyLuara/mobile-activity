<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- 券图 -->
    <img
      :src="couponImg+ this.$qiniuCompress()"
      :class="{'x-couponImg':iphoneX,'couponImg':!iphoneX}"
      class="couponImg"
    >
    <!-- <img
      :src="baseUrl + 'd.png'+ this.$qiniuCompress()"
      :class="{'x-couponImg':iphoneX,'couponImg':!iphoneX}"
      class="couponImg"
    > -->
    <div
      :class="{'x-center':iphoneX,'center':!iphoneX}"
      class="center"
    >
      <img
        :src="baseUrl + 's2.png'+ this.$qiniuCompress()"
        class="scan"
      >
      <!-- 二维码 -->
      <img
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="ewm"
      >
      <!-- <img
        :src="baseUrl + 'er.jpeg'+ this.$qiniuCompress()"
        class="ewm"
      > -->
      <!-- 已使用 -->
      <img
        v-if="hasUsed"
        :src="baseUrl + 'used.png'+ this.$qiniuCompress()"
        class="coupon-used"
      >
      <!-- 已失效-->
      <img
        v-if="hasPost"
        :src="baseUrl + 'post.png'+ this.$qiniuCompress()"
        class="coupon-post"
      >
    </div>
  </div>
</template>
<script>
import { onlyGetPhoto } from '../../mixins/onlyGetPhoto'
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  sendCoupon,
  checkGetCoupon,
  dateFormat,
  formatTimestamp
} from 'services'
const cdnUrl = process.env.CDN_URL
const dayjs = require('dayjs')
export default {
  mixins: [onlyGetPhoto],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/taihe/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      id: this.$route.query.id,
      couponImg: null,
      qrcodeImg: null,
      params: {
        user_id: null
      },
      hasUsed: false,
      hasPost: false
      // wxShareInfoValue: {
      //   title: '刷脸享优惠，畅快看大片！',
      //   desc: '太禾影城等你来嗨玩！',
      //   link: 'http://papi.xingstation.com/api/s/zK8' + window.location.search,
      //   imgUrl: cdnUrl + '/fe/marketing/img/taihe/icon.jpg'
      // }
    }
  },
  watch: {
    parms() {
      this.checkCouponIsUse()
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
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.handleForbiddenShare()
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
    //判断是否领过优惠券
    checkCouponIsUse() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
        include: 'couponBatch',
        qiniu_id: this.id
      }
      checkGetCoupon(args)
        .then(res => {
          if (res) {
            this.handleData(res)
          } else {
            let data = new Date()
            args = {
              coupon_batch_id: this.coupon_batch_id,
              include: 'couponBatch'
            }
            // args.start_date = dateFormat(
            //   new Date(formatTimestamp(data, true)),
            //   'yyyy-MM-dd hh:mm:ss'
            // )
            // args.end_date = dateFormat(
            //   new Date(formatTimestamp(data, false) - 1000),
            //   'yyyy-MM-dd hh:mm:ss'
            // )
            args.start_date = dayjs(new Date(formatTimestamp(data, true))).format('YYYY-MM-DD HH:mm:ss')
            args.end_date = dayjs(new Date(formatTimestamp(data, false) - 1000)).format('YYYY-MM-DD HH:mm:ss')
            checkGetCoupon(args)
              .then(res => {
                if (res) {
                  this.handleData(res)
                } else {
                  this.sendCoupon()
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //发优惠券
    sendCoupon() {
      let args = {
        include: 'couponBatch',
        qiniu_id: this.id,
        oid: this.oid,
        belong: this.belong
      }
      sendCoupon(args, this.coupon_batch_id)
        .then(res => {
          console.log('sendCoupon', res)
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url
      this.couponImg = res.couponBatch.image_url
      this.time = res.created_at
      let dateValue = this.time.replace(/\-/g, '/')
      //当天24点过期
      if (formatTimestamp(dateValue, false) < new Date().getTime()) {
        //失效处理
        this.hasPost = true
        this.hasUsed = false
      } else if (parseInt(res.status) === 1) {
        //已使用
        this.hasUsed = true
        this.hasPost = false
      }
    },
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/taihe/";
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
  background-image: url("@{imageHost}bg6.jpg");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .couponImg {
    width: 72%;
    position: relative;
    margin-top: 4%;
  }
  .x-couponImg {
    width: 86%;
    position: relative;
    margin-top: 12%;
  }

  .center {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .scan {
      width: 70%;
    }
    .ewm {
      width: 24.5%;
      position: absolute;
      left: 21.5%;
      top: 45%;
      user-select: auto;
      pointer-events: auto;
    }
    .coupon-used,
    .coupon-post {
      width: 71%;
      position: absolute;
      left: 15%;
      top: -0.6%;
      z-index: 9;
    }
  }
  .x-center {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .scan {
      width: 84%;
    }
    .ewm {
      width: 28.5%;
      position: absolute;
      left: 16.5%;
      top: 45%;
    }
    .coupon-used,
    .coupon-post {
      width: 85%;
      position: absolute;
      left: 7%;
      top: -0.6%;
      z-index: 9;
    }
  }
}
</style>
