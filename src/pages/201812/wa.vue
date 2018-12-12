<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}"
  >
    <div class="main">
      <img
        :src="base + 'coupon.png'"
        class="coupon"
      >
      <div class="check">
        <img
          :src="base + 'hexiao.png'"
          class="checkbg"
        >
        <img
          :src="ewm"
          class="er"
        >
        <img
          v-show="used"
          :src="base + 'used.png'"
          class="used"
        >
        <span class="code">{{ code }}</span>
      </div>
      <img
        :src="base + 'address.png'"
        class="address"
      >

    </div>
    <img
      :src="base + 'smokeY.png'"
      class="smokeY"
    >
    <img
      :src="base + 'smokeR.png'"
      class="smokeR"
    >
    <img
      :src="base + 'huoguo.png'"
      class="huoguo"
    >
  </div>
</template>
<script>
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
export default {
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/wa/',
      ewm: null,
      code: null,
      iphoneX: false,
      userId: null,
      coupon_batch_id: this.$route.query.coupon_batch_id,
      id: this.$route.query.id,
      used: false,
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
    this.handleForbiddenShare()
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
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
        this.checkGetCoupon()
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
    checkGetCoupon() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
        include: 'couponBatch',
        qiniu_id: this.id
      }
      checkGetCoupon(args).then(res => {
        console.log(res)
        if (res) {
          this.handleData(res)
        } else {
          let date = new Date()
          args = {
            coupon_batch_id: this.coupon_batch_id,
            include: 'couponBatch'
          }
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
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendCoupon() {
      let args = {
        include: 'couponBatch',
        qiniu_id: this.id,
        oid: this.$route.query.oid,
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
      this.ewm = res.qrcode_url
      this.code = res.code
      if (parseInt(res.status) === 1) {
        this.used = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.exe666.com/fe/image/wa/";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
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
  background-image: url("@{img}smoke1.png"), url("@{img}smoke2.png"),
    url("@{img}logo.png");
  background-position: center top, center bottom, center center;
  background-size: 100% auto, 100% auto, 100% auto;
  background-repeat: no-repeat, no-repeat, no-repeat;
  .main {
    width: 86%;
    z-index: 0;
    position: relative;
    img {
      position: relative;
      z-index: 0;
    }
    .coupon {
      margin-top: 3%;
    }
    .check {
      margin: -3% auto;
      position: relative;
      .checkbg {
        position: relative;
        z-index: 0;
      }
      .er {
        position: absolute;
        top: 16%;
        left: 9%;
        z-index: 99;
        width: 24.5vw;
        pointer-events: auto;
        user-select: auto;
      }
      .used {
        position: absolute;
        top: 17%;
        left: 4%;
        z-index: 999;
        width: 33vw;
        pointer-events: auto;
        user-select: auto;
      }
      .code {
        display: inline-block;
        position: absolute;
        z-index: 99;
        top: 50%;
        left: 42%;
        width: 42.5vw;
        height: 10.2vw;
        font-size: 5vw;
        line-height: 10.2vw;
        color: #000;
      }
    }
  }
  .smokeY {
    position: absolute;
    left: 0%;
    top: 0%;
    width: 23.2%;
    z-index: 99;
    animation: myflow 1.2s linear infinite alternate;
  }
  .smokeR {
    position: absolute;
    top: 80%;
    right: 2%;
    width: 16.3%;
    z-index: 99;
    animation: myflow 1s 0.2s linear infinite alternate-reverse;
  }
  .huoguo {
    position: absolute;
    right: -1.5%;
    bottom: -1.5%;
    width: 28%;
    z-index: 99;
  }
}
.iphoneX {
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
  }
  .smokeY {
    top: 6%;
  }
  .huoguo {
    width: 35%;
  }
}
@keyframes myflow {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>


