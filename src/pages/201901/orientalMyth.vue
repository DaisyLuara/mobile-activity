<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg_2.png'+ this.$qiniuCompress()"
      class="bg"
    >
    <div class="top">
      <img
        :src="baseUrl + 'topImg.png'+ this.$qiniuCompress()"
        class="topImg"
      >
      <div class="center">
        <img
          :src="img+ this.$qiniuCompress()"
          class="card"
        >
        <img
          :src="baseUrl + 'float_1.png'+ this.$qiniuCompress()"
          class="float-one animated  linear infinite  swing"
        >
        <img
          :src="baseUrl + 'float_2.png'+ this.$qiniuCompress()"
          class="float-two animated  linear infinite  tada"
        >
        <img
          :src="photo+ this.$qiniuCompress()"
          class="photo"
        >
      </div>
    </div>
    <div class="center-b">
      <img
        :src="baseUrl + 'card_22.png'+ this.$qiniuCompress()"
        class="card"
      >
      <img
        :src="baseUrl + 'float_3.png'+ this.$qiniuCompress()"
        class="float-three animated  linear infinite  wobble"
      >
      <img
        :src="baseUrl + 'float_4.png'+ this.$qiniuCompress()"
        class="float-four animated  linear infinite  tada"
      >
      <div class="clip">
        <img
          :src="qrcodeImg"
          class="ewm"
        >
      </div>
      <img
        v-show="hasUsed"
        :src="baseUrl + 'word.png'+ this.$qiniuCompress()"
        class="hasUsed"
      >
      <img
        :src="baseUrl + 'bottom_1.png'+ this.$qiniuCompress()"
        class="bottom-one"
      >
    </div>

  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  sendCoupon,
  checkGetCoupon
} from "services";
const cdnUrl = process.env.CDN_URL;
import 'animate.css'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/orientalMyth/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      hasUsed: false,
      img: null,
      // img: 'https://cdn.exe666.com/fe/image/drc_year19_dfth/card_1_b.png',
      userId: null,
      id: this.$route.query.id,
      qrcodeImg: null,
      // qrcodeImg: 'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      wxShareInfoValue: {
        title: "来东方童画激发潜能",
        desc: "点击领取",
        link: "http://papi.xingstation.com/api/s/OPg" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/orientalMyth/icon.jpg"
      }
    };
  },
  watch: {
    parms() {
      this.checkCouponIsUse();
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
    if (process.env.NODE_ENV === 'testing') {
      this.wxShareInfoValue.link = 'http://papi.newgls.cn/api/s/qYr'
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get("sign") === null) {
        let base_url = encodeURIComponent(String(window.location.href));
        let redirct_url =
          process.env.WX_API +
          "/wx/officialAccount/oauth?url=" +
          base_url +
          "&scope=snsapi_base";
        window.location.href = redirct_url;
      } else {
        this.userId = Cookies.get("user_id");
      }
    },
    //判断是否领过优惠券
    checkCouponIsUse() {
      let coupon_batch_id = this.coupon_batch_id
      let args = {
        coupon_batch_id: coupon_batch_id,
        include: "couponBatch",
        qiniu_id: this.id
      };
      checkGetCoupon(args)
        .then(res => {
          if (res) {
            console.log("checkGetCoupon", res);
            this.handleData(res);
          } else {
            this.sendCoupon();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发优惠券
    sendCoupon() {
      let coupon_batch_id = this.coupon_batch_id
      let args = {
        include: "couponBatch",
        qiniu_id: this.id,
        oid: this.oid,
        belong: this.belong
      };
      sendCoupon(args, coupon_batch_id)
        .then(res => {
          console.log("sendCoupon", res);
          this.handleData(res);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url;
      this.img = res.couponBatch.image_url
      if (parseInt(res.status) === 1) {
        //已使用
        this.hasUsed = true;
      }
    }
  },

};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/orientalMyth/";
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
    pointer-events: none;
    user-select: none;
    .topImg {
      width: 65%;
      position: relative;
      left: 0%;
      top: 0;
      z-index: 9;
      margin-top: 5%;
    }
    .center {
      width: 100%;
      position: relative;
      left: 0;
      top: 0;
      .card {
        width: 86%;
        margin-top: -8%;
      }
      .float-one {
        width: 14%;
        position: absolute;
        right: -2%;
        top: 17%;
      }
      .float-two {
        width: 14%;
        position: absolute;
        left: -2%;
        top: 27%;
      }
      .photo {
        width: 26.5%;
        position: absolute;
        right: 20%;
        top: 36%;
        pointer-events: auto;
        user-select: auto;
      }
    }
  }
  .center-b {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .card {
      width: 86%;
    }
    .float-three {
      width: 10%;
      position: absolute;
      left: 2.5%;
      top: -1%;
    }
    .float-four {
      width: 20%;
      position: absolute;
      right: 0;
      top: 0;
    }
    .clip {
      width: 25vw;
      height: 25vw;
      border-radius: 5px;
      position: absolute;
      overflow: hidden;
      left: 15.3%;
      top: 56.2%;
      text-align: center;
      .ewm {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: auto;
        user-select: auto;
      }
    }

    .hasUsed {
      width: 13%;
      position: absolute;
      left: 21.8%;
      bottom: 8.8%;
    }
    .bottom-one {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -11%;
    }
  }
}
</style>
