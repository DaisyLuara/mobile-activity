<template>
  <div
    :style="style.root"
    class="root"
  >
    <div
      v-show="result"
      class="index"
    >
      <img
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        :class="{'x-start':iphoneX,'start':!iphoneX}"
        class="start"
      >
      <!-- 上传 -->
      <div
        v-show="atm1"
        class="upload-picture"
      >
        <img
          :src="baseUrl + 'w_1.png'+ this.$qiniuCompress()"
          :class="{'xw':iphoneX,'w-1':!iphoneX}"
          class="w-1"
        >
        <div
          v-show="atm1"
          class="upload"
        >
          <input
            type="file"
            accept="image/*"
            class="camera"
            @change="toUpLoad"
          >
          <!-- 上传按钮 -->
          <img
            :src="baseUrl + 'button.png'+ this.$qiniuCompress()"
            class="button"
          >
        </div>

      </div>
      <!-- 生成结果 -->
      <div
        v-show="atm2"
        class="generate-resultse"
      >
        <img
          :src="baseUrl + 'w_2.png'+ this.$qiniuCompress()"
          :class="{'xw':iphoneX,'w-2':!iphoneX}"
          class="w-2"
        >
        <img
          :src="baseUrl + 'scan.gif'+ this.$qiniuCompress()"
          :class="{'x-scan':iphoneX,'scan':!iphoneX}"
          class="scan"
        >
      </div>
    </div>
    <div
      v-show="!result"
      class="result"
    >
      <!-- photo -->
      <img
        :src="couponImg+ this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo"
      >
      <!-- 二维码 -->
      <img
        :src="qrcodeImg+this.$qiniuCompress()"
        :class="{'x-ewm':iphoneX,'ewm':!iphoneX}"
        class="ewm"
      >
      <!-- 已使用 -->
      <img
        v-show="hasUsed"
        :src="baseUrl + 'hasUsed.png'+ this.$qiniuCompress()"
        :class="{'x-hasUsed':iphoneX,'hasUsed':!iphoneX}"
        class="hasUsed"
      >
    </div>
  </div>
</template>
<script>
import { normalPages } from "../../mixins/normalPages";
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  getImage,
  sendCoupon,
  checkGetCoupon,
  dateFormat,
  formatTimestamp} from 'services'
const cdnUrl = process.env.CDN_URL;
const dayjs = require('dayjs');
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/simle_atm/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      photo: null,
      iphoneX: false,
      result: true,
      hasUsed: false,
      atm1: true,
      atm2: false,
      coupon_batch_id: this.$route.query.coupon_batch_id,
      id: this.$route.query.id,
      // oid: this.$route.query.utm_source,
      qrcodeImg: null,
      couponImg: null,
      params: {
        user_id: null
      },
      wxShareInfoValue: {
        title: "笑容还能换钱花？测一测你的笑容值多少钱。",
        desc: "错过今天，再等N年。",
        link: "http://papi.xingstation.com/api/s/3QQ" + window.location.search,
        //link: "http://papi.newgls.cn/api/s/JZo" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/simle_atm/icon.jpg",
        success: () => {
          wechatShareTrack();
        }
      }
    };
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
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
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
      }
    },
    toUpLoad(event) {
      let formData = new FormData()
      formData.append('image', event.target.files[0])
      formData.append('type', 'avatar')
      getImage(formData)
        .then(res => {
          console.log(res)
          alert('头像上传成功')
          this.toResult()
        })
        .catch(err => {
          alert('头像上传失败！请重新上传，只支持jpg,png格式')
          console.log(err)
        })
    },
    //上传成功之后的操作
    toResult() {
      this.atm2 = true;
      this.atm1 = false;
      this.checkCouponIsUse()
    },
    failure() {
      this.atm2 = false
      this.atm1 = true
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
          console.log('checkGetCoupon', res)
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
                console.log('checkGetCoupon', res)
                if (res) {
                  this.handleData(res)
                } else {
                  this.sendCoupon()
                }
              })
              .catch(err => {
                this.failure()
                console.log(err)
              })
          }
        })
        .catch(err => {
          this.failure()
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
          this.failure()
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      let that = this
      setTimeout(function () {
        that.result = false
      }, 2000)
      this.qrcodeImg = res.qrcode_url
      this.couponImg = res.couponBatch.image_url
      if (parseInt(res.status) === 1) {
        //已使用
        this.hasUsed = true
      }
    },
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/simle_atm/";
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
  .index {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("@{imageHost}background.png");
    background-size: 100% auto;
    background-position: center bottom;
    background-repeat: no-repeat;
    pointer-events: none;
    user-select: none;
    .start {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .x-start {
      width: 94%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .upload-picture {
      .w-1 {
        width: 55%;
        position: absolute;
        left: 22.3%;
        top: 28.1%;
        z-index: 9;
      }
      .xw {
        width: 63.5%;
        position: absolute;
        left: 18.5%;
        top: 29%;
        z-index: 9;
      }
      .upload {
        width: 40%;
        position: absolute;
        left: 30%;
        top: 63%;
        z-index: 10;
        pointer-events: auto;
        user-select: auto;
        img {
          width: 100%;
        }
        .camera {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0%;
          top: 0%;
          z-index: 10;
        }
      }
    }
    .generate-resultse {
      pointer-events: none;
      user-select: none;
      .w-2 {
        width: 55%;
        position: absolute;
        left: 22.3%;
        top: 28.1%;
        z-index: 9;
      }
      .xw {
        width: 63.5%;
        position: absolute;
        left: 18.5%;
        top: 29%;
        z-index: 9;
      }
      .scan {
        width: 50%;
        position: absolute;
        left: 25%;
        top: 33%;
        z-index: 9;
      }
      .x-scan {
        top: 36%;
      }
    }
  }
  .result {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("@{imageHost}bg.jpg");
    background-size: 100% 100%;
    background-position: center bottom;
    background-repeat: no-repeat;
    pointer-events: none;
    user-select: none;
    .photo {
      width: 88%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -86%);
    }
    .ewm {
      width: 23%;
      position: absolute;
      left: 38.5%;
      bottom: 26%;
    }
    .x-ewm {
      width: 27%;
      position: absolute;
      left: 36.5%;
      bottom: 26%;
    }
    .hasUsed {
      width: 32.8%;
      position: absolute;
      left: 33.5%;
      bottom: 23%;
      z-index: 9;
    }
    .x-hasUsed {
      width: 34.5%;
      position: absolute;
      left: 33%;
      bottom: 24.2%;
      z-index: 9;
    }
  }
}
</style>
