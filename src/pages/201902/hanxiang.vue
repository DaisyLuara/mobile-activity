<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'frame.png'"
        class="frame"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        :src="base + 'save.png'"
        class="save"
      >
      <img
        :src="coupon_img"
        class="coupon"
      >
      <div class="erweima">
        <img
          :src="base + 'QR.png'"
          class="erbg"
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
    <img
      :src="base + 'logo.png'"
      class="logo"
    >
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
      base: CDN_URL + '/fe/image/hanxiang/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      coupon_img: null,//'https://cdn.xingstation.cn/fe/image/hanxiang/coupon.png',
      qrcodeImg: null,//'https://cdn.xingstation.cn/fe/image/couponrain/5c22f3d46c008.png',
      used: false,//false
      z: null,
      //微信分享
      wxShareInfoValue: {
        title: "汉翔书法教育",
        desc: "汉翔书法教育",
      }
    }
  },
  watch: {
    sertime() {
      if (localStorage.getItem('z')) {
        this.z = localStorage.getItem('z')
      } else {
        this.z = this.userinfo.z
        localStorage.setItem('z', this.userinfo.z)
      }
      this.checkV2Coupon()
    }
  },
  mounted() {
    this.handleForbiddenShare()
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
          let timer = setTimeout(() => {
            this.sendV2Coupon()
            clearTimeout(timer)
          }, 1000)
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
@img: "http://cdn.xingstation.cn/fe/image/hanxiang/";
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
  background-image: url("@{img}BG.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 4%;
  .main {
    position: relative;
    width: 71%;
    margin-bottom: 50%;
    .frame {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 98.4%;
      position: absolute;
      top: 0.3%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
      pointer-events: auto;
      user-select: auto;
      border-radius: 5px;
    }
    .save {
      width: 10vw;
      position: absolute;
      top: 50%;
      right: 0%;
      transform: translate(50%, -50%);
      z-index: 99;
    }
    .coupon {
      width: 42vw;
      position: absolute;
      top: 81%;
      left: -5%;
      z-index: 999;
    }
    .erweima {
      position: absolute;
      top: 83%;
      right: -5%;
      width: 31vw;
      z-index: 999;
      .erbg {
        position: relative;
        z-index: 0;
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
        width: 32vw;
        max-width: 35vw;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .used {
        width: 30vw;
        position: absolute;
        top: 9%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
  }
  .logo {
    width: 47%;
    position: absolute;
    top: 92%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>


