<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- 券图 -->
    <!-- <img
      :src="baseUrl + '4.png'+ this.$qiniuCompress()"
      :class="{'x-couponImg':iphoneX,'couponImg':!iphoneX}"
      class="couponImg"
    > -->
    <img
      :src="couponImg+ this.$qiniuCompress()"
      :class="{'x-couponImg':iphoneX,'couponImg':!iphoneX}"
      class="couponImg"
    >
    <div
      :class="{'x-contain':iphoneX,'contain':!iphoneX}"
      class="contain"
    >
      <!-- <img
        :src="baseUrl + 'ewm.jpeg'+ this.$qiniuCompress()"
        class="ewm"
      > 
      <span 
        :style="style.code"
        class="code">1234567</span>
    </div>-->
      <img
        :src="qrcodeImg+ this.$qiniuCompress()"
        class="ewm"
      >
      <span
        :style="style.code"
        class="code"
      >{{ code }}</span>
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
  checkGetCoupon,
  dateFormat,
  formatTimestamp
} from "services";
const cdnUrl = process.env.CDN_URL;
const dayjs = require("dayjs");
export default {
  mixins: [onlyGetPhoto],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/tiger/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        },
        code: {
          bottom: (this.$innerWidth() * 65) / 750 + "px"
        }
      },
      iphoneX: false,
      // coupon_batch_id: this.$route.query.coupon_batch_id,
      id: this.$route.query.id,
      // oid: this.$route.query.utm_source,
      couponImg: null,
      qrcodeImg: null,
      code: null,
      couponID: ["116", "117"],
      //couponID: ['31', '32'],
      new_coupon_batch_id: null,
      params: {
        user_id: null
      },
      hasUsed: false,
      hasPost: false,
      wxShareInfoValue: {
        title: "四云奶盖贡茶请你喝奶茶了！",
        desc: "点击即可领福利",
        link: process.env.AD_API + "/api/s/913" + window.location.search,
        //link: process.env.AD_API+'/api/s/Lg4' + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/tiger/icon.png"
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
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
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
        this.randomCouponID();
        this.wxShareInfoValue.link = this.changeUrlArg(
          this.wxShareInfoValue.link,
          "coupon_batch_id",
          this.new_coupon_batch_id
        );
        this.handleShare();
        this.userId = Cookies.get("user_id");
        this.params.user_id = this.userId;
        this.checkCouponIsUse();
      }
    },
    //分享
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue);
        })
        .catch(_ => {
          console.warn(_.message);
        });
    },
    //分享的链接处理函数
    changeUrlArg(url, arg, val) {
      let pattern = arg + "=([^&]*)";
      let replaceText = arg + "=" + val;
      return url.match(pattern)
        ? url.replace(eval("/(" + arg + "=)([^&]*)/gi"), replaceText)
        : url.match("[?]")
        ? url + "&" + replaceText
        : url + "?" + replaceText;
    },
    //随机出randomCouponID
    randomCouponID() {
      let that = this;
      that.new_coupon_batch_id =
        that.couponID[Math.floor(Math.random() * that.couponID.length)];
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
            this.handleData(res);
          } else {
            let data = new Date();
            args = {
              coupon_batch_id: this.coupon_batch_id,
              include: "couponBatch"
            };
            // args.start_date = dateFormat(
            //   new Date(formatTimestamp(data, true)),
            //   'yyyy-MM-dd hh:mm:ss'
            // )
            // args.end_date = dateFormat(
            //   new Date(formatTimestamp(data, false) - 1000),
            //   'yyyy-MM-dd hh:mm:ss'
            // )
            args.start_date = dayjs(
              new Date(formatTimestamp(data, true))
            ).format("YYYY-MM-DD HH:mm:ss");
            args.end_date = dayjs(
              new Date(formatTimestamp(data, false) - 1000)
            ).format("YYYY-MM-DD HH:mm:ss");
            checkGetCoupon(args)
              .then(res => {
                if (res) {
                  this.handleData(res);
                } else {
                  this.sendCoupon();
                }
              })
              .catch(err => {
                console.log(err);
              });
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
        belong: this.$route.belong
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
      this.code = res.code;
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/tiger/";
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
  -webkit-overflow-scrolling: touch;
  .couponImg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .contain {
    width: 100%;
    height: 30%;
    position: relative;
    margin-top: 70%;
    .ewm {
      width: 22%;
      position: absolute;
      left: 14%;
      top: 30%;
    }
    .code {
      width: 50%;
      height: 16%;
      display: block;
      position: absolute;
      right: 10%;
      //top: 65.8%;
      color: #000;
      font-size: 5vw;
      z-index: 9;
    }
  }
  .x-contain {
    margin-top: 67%;
    .code {
      margin-bottom: 5%;
    }
  }
}
</style>
