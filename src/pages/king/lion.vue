<template>
  <div
    :style="style.root"
    class="root">
    <img 
      :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
      class="bg"> 
    <div class="top">
      <img 
        :src="baseUrl + 'topImg.png'+ this.$qiniuCompress()"
        class="topImg"> 
      <img 
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"> 
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo"> 
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo-real"> 
    </div>
    <!-- 优惠券部分 -->
    <div class="bt">
      <img 
        v-if="!hasUsed"
        :src="couponImg+ this.$qiniuCompress()"
        class="coupon"> 
      <img 
        v-if="!hasUsed"
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="erweima"> 
      <span 
        v-if="!hasUsed"
        class="quanma"
      >{{ code }}</span>
      <!-- 券已使用 -->
      <img 
        v-if="hasUsed"
        :src="baseUrl + 'used.png'+ this.$qiniuCompress()"
        class="coupon">
      <!--券过期 -->
      <img 
        v-if="hasUsed"
        :src="baseUrl + 'failure.png'+ this.$qiniuCompress()"
        class="coupon">
    </div>
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
import {
  checkCouponNumber,
  getCouponId,
  getCouponProjectMessage,
  checkGetCoupon
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
      showImg: false,
      iphoneX: false,
      belong: this.$route.query.utm_campaign,
      policyID: null,
      couponID: null,
      couponImg: null,
      qrcodeImg: null,
      code: null,
      time: null,
      hasUsed: false,
      wxShareInfoValue: {
        title: '萌狮表情大作战',
        desc: '天降福利，身骑白马闯三关',
        link: 'http://papi.xingstation.com/api/s/pQ6' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/lion/icon.jpeg'
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.getProjectMassage()
  },
  methods: {
    //获取节目抽奖信息
    getProjectMassage() {
      getCouponProjectMessage(this.belong)
        .then(res => {
          console.log(res)
          this.policyID = res.policy_id
          this.getCouponId()
        })
        .catch(err => {
          console.log(err)
        })
    },
    //抽奖
    getCouponId() {
      getCouponId(this.policyID)
        .then(res => {
          console.log(res)
          this.couponID = res.id
          this.couponImg = res.image_url
          this.checkGetCoupon(res.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //判断是否领过优惠券
    checkGetCoupon(id) {
      let args = {
        coupon_batch_id: id
      }
      checkGetCoupon(args)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.qrcodeImg = res.qrcode_url
            this.code = res.code
            this.time = res.created_at
            //是否使用过及过期限定
            if (
              Math.round(new Date()) -
                (Math.round(this.time) + 24 * 60 * 60 * 1000) >
              0
            ) {
              this.hasUsed = true
            } else {
              if (res.status === 1) {
                this.hasUsed = true
              }
            }
          } else {
            this.getCheck()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //发优惠券
    getCheck() {
      let id = this.couponID
      checkCouponNumber(id)
        .then(res => {
          console.log(res)
          this.qrcodeImg = res.qrcode_url
          this.code = res.code
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/lion/';
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
  }
  .top {
    width: 100%;
    position: relative;
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
    .erweima {
      width: 17%;
      position: absolute;
      left: 10.5%;
      top: 59%;
    }
    .quanMa {
      display: block;
      position: absolute;
      left: 37%;
      top: 62.5%;
      color: #d84a4d;
      font-size: 4vw;
      text-align: center;
    }
    .coupon {
      width: 96%;
    }
  }
}
</style>
