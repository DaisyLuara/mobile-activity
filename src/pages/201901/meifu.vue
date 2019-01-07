<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="contain">
      <!-- <img
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="topImg"
      > -->
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
export default {
  mixins: [normalPages],
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
      score: null,
      userId: null,
      hasUsed: false,
      wxShareInfoValue: {
        title: "猪年来缤纷城福气满满！",
        desc: "点击领取福气美照 ",
        link: "http://papi.xingstation.com/api/s/Ogg" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/drc_meifu/icon.png"
      }
    };
  },
  watch: {
    parms() {
      this.score = this.parms.score
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
@imageHost: "http://cdn.exe666.com/fe/marketing/img/drc_meifu/";
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
  overflow: hidden;
  // background-image: url("@{imageHost}bg.png");
  // background-size: 100% auto;
  // background-position: center bottom;
  // background-repeat: no-repeat;
  .contain {
    position: relative;
    margin-top: 5%;
  }
}
</style>
