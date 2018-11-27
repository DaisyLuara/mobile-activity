<template>
  <div
    :style="style.root"
    class="root">
    <!-- 券图 -->
    <img 
      :src="couponImg+ this.$qiniuCompress()"
      :class="{'x-couponImg':iphoneX,'couponImg':!iphoneX}"
      class="couponImg">
    <!-- <img 
      :src="baseUrl + 'y_0.5.png'+ this.$qiniuCompress()"
      :class="{'x-couponImg':iphoneX,'couponImg':!iphoneX}"
      class="couponImg">  -->
    <div 
      :class="{'x-center':iphoneX,'center':!iphoneX}"
      class="center">
      <img 
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="scan">
      <!-- 二维码 -->
      <img 
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="ewm"> 
      <!-- <img 
        :src="baseUrl + 'ewm.jpeg'+ this.$qiniuCompress()"
        class="ewm"> -->
      <!-- 已使用 -->
      <img 
        v-if="hasUsed"
        :src="baseUrl + 'has_used.png'+ this.$qiniuCompress()"
        class="coupon-used">
      <!-- 已失效-->
      <img 
        v-if="hasPost"
        :src="baseUrl + 'has_post.png'+ this.$qiniuCompress()"
        class="coupon-post">
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
  dateFormat
} from 'services'
const cdnUrl = process.env.CDN_URL
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
      coupon_batch_id: this.$route.query.coupon_batch_id,
      id: this.$route.query.id,
      oid: this.$route.query.utm_source,
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
            args.start_date = dateFormat(
              new Date(this.formatTimestamp(data, true)),
              'yyyy-MM-dd hh:mm:ss'
            )
            args.end_date = dateFormat(
              new Date(this.formatTimestamp(data, false) - 1000),
              'yyyy-MM-dd hh:mm:ss'
            )
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
        belong: this.$route.query.utm_campaign
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
      if (this.formatTimestamp(dateValue, false) < new Date().getTime()) {
        //失效处理
        this.hasPost = true
        this.hasUsed = false
      } else if (parseInt(res.status) === 1) {
        //已使用
        this.hasUsed = true
        this.hasPost = false
      }
    },
    //处理时间
    formatTimestamp(data, flag) {
      let nextDate = new Date(new Date(data).getTime() + 24 * 60 * 60 * 1000)
      if (flag) {
        nextDate = data
      }
      nextDate.setHours(0)
      nextDate.setMinutes(0)
      nextDate.setSeconds(0)
      nextDate.setMilliseconds(0)
      let todayStartTime = nextDate.getTime()
      return todayStartTime
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
  background-image: url('@{imageHost}background_2.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .couponImg {
    width: 85%;
    position: relative;
  }
  .x-couponImg {
    width: 90%;
    position: relative;
  }

  .center {
    width: 100%;
    position: relative;
    margin-top: -0.6%;
    pointer-events: none;
    user-select: none;
    .scan {
      width: 82%;
    }
    .ewm {
      width: 29.8%;
      position: absolute;
      left: 15.5%;
      top: 28%;
    }
    .coupon-used,
    .coupon-post {
      width: 84%;
      position: absolute;
      left: 8%;
      top: -1.6%;
      z-index: 9;
    }
  }
  .x-center {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .scan {
      width: 87%;
    }
    .ewm {
      width: 30%;
      position: absolute;
      left: 14%;
      top: 29%;
    }
    .coupon-used,
    .coupon-post {
      width: 88%;
      position: absolute;
      left: 6%;
      top: -0.6%;
      z-index: 9;
    }
  }
}
</style>
