<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
      class="bg"
    >
    <div class="top">
      <img
        :src="baseUrl + 'top2.png'+ this.$qiniuCompress()"
        class="topImg"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <!-- 券图 -->
    <div class="center">
      <img
        :src="couponImg"
        class="coupon"
      >
    </div>
    <div class="bottom">
      <img
        :src="baseUrl + 'art.png'+ this.$qiniuCompress()"
        class="btImg"
      >
      <!-- 二维码 -->
      <img
        :src="qrcodeImg"
        class="ewm"
      >
      <img
        v-if="hasUsed"
        :src="baseUrl + 'has.png'+ this.$qiniuCompress()"
        class="hasUsed"
      >
    </div>
  </div>
</template>
<script>
import { onlyGetPhoto } from "@/mixins/onlyGetPhoto";
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  sendCoupon,
  checkGetCoupon
} from "services";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [onlyGetPhoto],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/drc_meifu/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      id: this.$route.query.id,
      couponImg: null,
      qrcodeImg: null,
      userId: null,
      hasUsed: false,
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
    this.handleForbiddenShare();
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
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden();
        })
        .catch(_ => {
          console.warn(_.message);
        });
    },
    //判断是否领过优惠券
    checkCouponIsUse() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
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
      let args = {
        include: "couponBatch",
        qiniu_id: this.id,
        oid: this.oid,
        belong: this.belong
      };
      sendCoupon(args, this.coupon_batch_id)
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
      this.couponImg = res.couponBatch.image_url;
      if (parseInt(res.status) === 1) {
        //已使用
        this.hasUsed = true;
      }
    }
  },
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/drc_meifu/";
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
    position: relative;
    margin-top: 4%;
    pointer-events: none;
    user-select: none;
    .photo {
      width: 43%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-48.8%, -50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .center {
    position: relative;
    width: 88%;
    margin-top: 4%;
    pointer-events: none;
    user-select: none;
  }
  .bottom {
    position: relative;
    margin-top: 5%;
    width: 88%;
    pointer-events: none;
    user-select: none;
    .ewm {
      width: 30%;
      position: absolute;
      left: 2%;
      top: 15%;
      pointer-events: auto;
      user-select: auto;
    }
    .hasUsed {
      width: 100%;
      position: absolute;
      left: 0;
      top: -1%;
      z-index: 9;
    }
  }
}
</style>
