<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'top1.png'"
      class="top"
    >
    <img
      :src="coupon_img"
      class="coupon"
    >

    <div class="erweima">
      <img
        :src="base + 'logo.png'"
        class="logo"
      >
      <div class="clip">
        <img
          :src="barcode_url"
          class="qrcode"
        >
      </div>
      <img
        v-show="used"
        :src="base + 'used.png'"
        class="used"
      >
    </div>
    <div class="code">{{code}}</div>

  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, sendV2Coupon, checkV2Coupon } from 'services'
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
      coupon_img: null,//'https://cdn.exe666.com/fe/image/qpyl/2_2.png',
      qrcodeImg: null,//'http://papi.xingstation.com/qrcode/5c7de9583796b.png',
      barcode_url: null,//'https://cdn.exe666.com/fe/image/sAtm/tiao.png'
      used: false,//false
      code: null,//'5c7de9583796b'
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
      if (localStorage.getItem('z')) {
        this.z = localStorage.getItem('z')

      } else {
        this.z = this.userinfo.z
        localStorage.setItem('z', this.userinfo.z)
        this.coupon_batch_id ? this.checkV2Coupon() : null
      }
    },
    coupon_batch_id() {
      this.z ? this.checkV2Coupon() : null
    }
  },
  mounted() {
    this.handleForbiddenShare()
    if (localStorage.getItem('z')) {
      this.z = localStorage.getItem('z')
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
        code_type: "barcode",
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
        code_type: "barcode",
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
      this.barcode_url = res.barcode_url
      this.coupon_img = res.couponBatch.image_url
      this.code = res.code
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
  background-image: url("@{img}bg1.png");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 8%;
  margin-bottom: -1px;
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
    width: 100%;
    margin-bottom: 2%;
    .logo {
      width: 21vw;
      position: absolute;
      bottom: 0%;
      right: 6%;
      z-index: 99;
    }
    .clip {
      width: 40vw;
      overflow: hidden;
      position: relative;
      border: "solid 1px #000";
      background-color: #fff;
      padding: 5px 8px;
      z-index: 9;
      text-align: center;
      margin: 0 auto;
    }
    .used {
      width: 32vw;
      position: absolute;
      top: -1%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }
  }
  .code {
    position: relative;
    font-size: 4vw;
    color: #000;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 10%;
    background-color: #fff;
    border-radius: 15px;
    display: inline-block;
    padding: 5px 10px;
  }
}
</style>


