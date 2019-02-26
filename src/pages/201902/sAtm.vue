<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'top.png'"
      class="top"
    >
    <img
      :src="coupon_img"
      class="coupon"
    >

    <div class="erweima">
      <img
        :src="base + 'qr.png'"
        class="erbg"
      >
      <img
        :src="base + 'logo.png'"
        class="logo"
      >
      <div class="clip">
        <img
          :src="qrcodeImg"
          class="qrcode"
        >
      </div>
      <img
        v-show="used"
        :src="base + 'used.png'"
        class="used"
      >
    </div>

  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, sendV2Coupon, checkV2Coupon } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/sAtm/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      coupon_img: null,//'https://cdn.exe666.com/fe/image/sAtm/test.png',
      qrcodeImg: null,//'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      used: false,
      z: null,
      //微信分享
      wxShareInfoValue: {
        title: "笑容ATM",
        desc: "笑容ATM",
        imgUrl: "https://cdn.exe666.com/fe/image/sAtm/icon.jpg"
      }
    }
  },
  watch: {
    userinfo() {
      if (Cookies.get('z')) {
        this.z = Cookies.get('z')
      } else {
        this.z = this.userinfo.z
        Cookies.set('z', this.userinfo.z)
        this.coupon_batch_id ? this.checkV2Coupon() : null
      }
    },
    coupon_batch_id() {
      this.z ? this.checkV2Coupon() : null
    }
  },
  mounted() {
    this.handleForbiddenShare()
    if (Cookies.get('z')) {
      this.z = Cookies.get('z')
      this.coupon_batch_id ? this.checkV2Coupon() : null
    }
  },
  methods: {
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
    checkV2Coupon() {
      let args = {
        z: this.z,
        coupon_batch_id: this.coupon_batch_id,
        include: 'couponBatch',
      }
      checkV2Coupon(args).then(res => {
        if (res) {
          this.handleData(res)
        } else {
          this.sendV2Coupon()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendV2Coupon() {
      let args = {
        qiniu_id: this.id,
        z: this.z,
        belong: this.belong,
        oid: this.oid
      }
      sendV2Coupon(args, this.coupon_batch_id)
        .then(res => {
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url
      this.coupon_img = res.couponBatch.image_url
      if (parseInt(res.status) === 1) {
        this.used = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/sAtm/";
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
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  position: relative;
  overflow-x: hidden;
  background-image: url("@{img}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 8%;
  .top {
    position: relative;
    width: 87%;
  }
  .coupon {
    width: 92%;
    position: relative;
    z-index: 0;
    margin-top: 6%;
    margin-bottom: 10%;
  }
  .erweima {
    position: relative;
    width: 32%;
    margin-bottom: 10%;
    .erbg {
      position: relative;
      z-index: 0;
    }
    .logo {
      width: 21vw;
      position: absolute;
      bottom: 0%;
      right: -83%;
      z-index: 99;
    }
    .clip {
      width: 25vw;
      height: 25vw;
      overflow: hidden;
      position: absolute;
      top: 5.5%;
      left: 50%;
      z-index: 9;
      transform: translateX(-50%);
      text-align: center;
      border-radius: 20px;
    }
    .qrcode {
      width: 30vw;
      max-width: 35vw;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .used {
      width: 27vw;
      position: absolute;
      top: 18%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }
  }
}
</style>


