<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- 券图 -->
    <img
      :src="couponImg+ this.$qiniuCompress()"
      class="couponImg"
    >
    <div class="center">
      <img
        :src="baseUrl + 'dgm.png'+ this.$qiniuCompress()"
        class="scan"
      >
      <!-- 二维码 -->
      <img
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="ewm"
      >
      <img
        :src="photo+ this.$qiniuCompress()"
        class="photo"
      >
      <!-- 已使用 -->
      <img
        v-if="hasUsed"
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        class="coupon-used"
      >
    </div>
  </div>
</template>
<script>
import { onlyGetPhoto } from "../../mixins/onlyGetPhoto";
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
      baseUrl: cdnUrl + "/fe/marketing/img/dgm_movie/",
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
      hasUsed: false
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
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/dgm_movie/";
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
  text-align: center;
  overflow: hidden;
  background-image: url("@{imageHost}bg1.png");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .couponImg {
    width: 76%;
    position: relative;
    margin-top: 4%;
  }
  .logo {
    position: relative;
    width: 15%;
    margin-top: 3%;
  }
  .center {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    margin-top: -0.5%;
    .scan {
      width: 76%;
      margin-left: -2.2%;
    }
    .ewm {
      width: 22%;
      position: absolute;
      right: 21%;
      top: 11%;
      user-select: auto;
      pointer-events: auto;
    }
    .photo {
      width: 28.7%;
      position: absolute;
      left: 20.7%;
      top: 8.7%;
      user-select: auto;
      pointer-events: auto;
    }
    .coupon-used {
      width: 78%;
      position: absolute;
      left: 10%;
      top: -1.75%;
      z-index: 9;
    }
  }
}
</style>
