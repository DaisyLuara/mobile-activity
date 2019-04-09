<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="picture">
      <img
        :src="base + '3.png' + this.$qiniuCompress()"
        class="border"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        :src="base + '1.png' + this.$qiniuCompress()"
        class="arrow"
      >
      <img
        :src="base + '4.png' + this.$qiniuCompress()"
        class="save"
      >
    </div>
    <div class="coupon">
      <img
        :src="coupon_img"
        class="coupon-bg"
      >
      <div class="erweima">
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
        <img
          v-show="passed"
          :src="base + 'passed.png'"
          class="used"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, sendV2Coupon, checkV2Coupon } from 'services'
import { normalPages } from '@/mixins/normalPages'
import moment from "moment";
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/mengbao/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      coupon_img: null,//'https://cdn.xingstation.cn/fe/image/mengbao/2.png',
      qrcodeImg: null,//'http://papi.xingstation.com/qrcode/5c7de9583796b.png',
      used: false,//false,
      passed: false,//false
      code: null,//'5c7de9583796b'
      z: null,
      //微信分享
      wxShareInfoValue: {
        title: "萌宝学跳舞",
        desc: "萌宝学跳舞",
        imgUrl: "https://cdn.xingstation.cn/fe/image/mengbao/icon.jpg"
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
      this.code = res.code
      let now = moment()
      let end = moment(res.end_date)
      let diff = end.diff(now)
      if (parseInt(res.status) === 1) {
        this.used = true
      } else if (diff <= 0) {
        this.passed = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/mengbao/";
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
  background-color: #19ffff;
  .picture {
    width: 100%;
    position: relative;
    margin-top: 8%;
    img {
      display: block;
    }
    .border {
      position: relative;
      width: 60.6%;
      z-index: 0;
    }
    .photo {
      width: 53.5%;
      position: absolute;
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
    .arrow {
      width: 4%;
      position: relative;
      z-index: 0;
      animation: toarrow linear 0.4s infinite alternate;
      margin-bottom: 3%;
    }
    .save {
      width: 43%;
      position: relative;
      z-index: 0;
    }
  }
  .coupon {
    width: 100%;
    position: relative;
    margin-top: 3%;
    margin-bottom: 15%;
    .coupon-bg {
      width: 92.5%;
      position: relative;
      z-index: 0;
    }
    .erweima {
      width: 19vw;
      height: 19vw;
      position: absolute;
      top: 17.3%;
      right: 11%;
      .clip {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 9;
        text-align: center;
        margin: 0 auto;
        img {
          width: 25vw;
          max-width: 35vw;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .used {
        width: 26vw;
        max-width: 35vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
      }
    }
  }
}
@keyframes toarrow {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(50%);
  }
}
</style>


