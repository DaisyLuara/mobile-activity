<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="one">
      <img
        :src="base + 'one.png' + this.$qiniuCompress()"
        class="bg"
      >
      <div
        v-show="!hasgeted"
        class="coupon"
      >
        <img :src="imgUrl">
        <a
          v-if="textShow"
          class="aclick"
          @click="getAuth"
        >
          <img 
            :src="base
              + 'click.png'+
            this.$qiniuCompress()">
        </a>
      </div>
      <a
        v-show="hasgeted"
        href="http://papi.xingstation.com/api/s/gZ9"
      >
        <div class="coupon">
          <img :src="base + 'geted.png' + this.$qiniuCompress()">
        </div>
      </a>
    </div>
    <div class="two">
      <img
        v-show="Boolean(photo)"
        :src="base + 'save.png' + this.$qiniuCompress()"
        class="save"
      >
      <img
        :src="base + 'frame.png' + this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="base + 'bottom.png' + this.$qiniuCompress()"
      class=" bottom"
    >
    <img
      :src="base + 'logo.png' + this.$qiniuCompress()"
      class="logo"
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
  getMallcooOauth,
  checkCouponNumber
} from "services";
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + "/fe/image/lhdelivery/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      imgUrl: null,//'https://cdn.exe666.com/fe/image/longhu/120.png'
      id: this.$route.query.id,
      open_user_id: null,
      hasgeted: false,
      textShow: true,
      //分享
      wxShareInfoValue: {
        title: "一周年好礼相送",
        desc: "参与互动 福利翻倍",
        link: "http://papi.xingstation.com/api/s/ANB" + window.location.search,
        imgUrl: cdnUrl + "/fe/image/longhu/icon.png",

      }
    };
  },
  watch: {
    parms() {
      this.getCouponDetail();
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
    getAuth() {
      let url =
        window.location.origin +
        window.location.pathname +
        encodeURIComponent(String(window.location.search));
      let args = {
        redirect_url: url
      };
      getMallcooOauth(args)
        .then(res => {
          console.log(res);
          let data = res;
          window.location.href = data;
          return;
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    getCouponDetail() {
      checkCouponNumber(this.coupon_batch_id)
        .then(res => {
          this.imgUrl = res.image_url;
          this.checkGetCoupon()
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    //获取券信息
    checkGetCoupon() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
        include: "couponBatch"
      };
      checkGetCoupon(args)
        .then(res => {
          if (!res) {
            if (this.$route.query.open_user_id) {
              this.sendCoupon();
            }
          } else {
            this.hasgeted = true
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
          this.textShow = false;
          window.location.href = 'http://papi.xingstation.com/api/s/gZ9'
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@img: "https://cdn.exe666.com/fe/image/lhdelivery/";
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
  overflow-x: hidden;
  position: relative;
  padding-top: 11%;
  background: url("@{img}bg.png") center top / 100% 100% no-repeat;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .one {
    position: relative;
    width: 90%;
    z-index: 9;
    .coupon {
      display: inline-block;
      width: 90%;
      position: absolute;
      top: 47%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      .aclick {
        width: 27%;
        display: inline-block;
        position: absolute;
        top: 53%;
        right: 18%;
        z-index: 999;
      }
      img {
        z-index: 0;
      }
    }
  }
  .two {
    position: relative;
    width: 100%;
    z-index: 0;
    margin-top: 10%;
    .save {
      width: 71%;
      position: absolute;
      top: 4%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .frame {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 71%;
      position: absolute;
      z-index: 99;
      top: 16%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 99;
  }
  .logo {
    display: block;
    width: 41%;
    position: absolute;
    bottom: 1.8%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
}
</style>


