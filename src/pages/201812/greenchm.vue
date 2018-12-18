<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      v-show="Boolean(imgUrl)"
      :src="base + 'title.png' + this.$qiniuCompress()"
      class="title"
    >
    <!-- 券 -->
    <div class="one">
      <img
        :src="imgUrl + this.$qiniuCompress()"
        class="coupon"
      >
    </div>
    <!-- 规则提示 -->
    <div class="two">
      <img
        :src="base + 'note.png' + this.$qiniuCompress()"
        class="note"
      >
    </div>
    <!-- 照片 -->
    <div class="three">
      <img
        :src="base + 'kuang.png' + this.$qiniuCompress()"
        class="bg"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      v-show="Boolean(photo)"
      :src="base + 'save.png' + this.$qiniuCompress()"
      class="save"
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
  dateFormat,
  formatTimestamp,
  getMallcooOauth,
  checkCouponNumber
} from "services";
import { normalPages } from "../../mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + "/fe/image/greenchm/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      coupon_batch_id: this.$route.query.coupon_batch_id,
      belong: this.$route.query.utm_campaign,
      oid: this.$route.query.oid || this.$route.query.utm_source,
      photo: null,
      imgUrl: null,//'https://cdn.exe666.com//fe/image/zpld_chr/7winter.png',
      id: this.$route.query.id,
      //分享
      wxShareInfoValue: {
        title: "圣诞转盘-周浦绿地",
        desc: "圣诞转盘-周浦绿地",
        link: "http://papi.xingstation.com/api/s/p81" + window.location.search,
        imgUrl: cdnUrl + "/fe/image/greenchm/icon.png",
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
        this.getCouponDetail();
      }
    },
    //获取券信息
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
    //获取券信息,判断是否领过券
    checkGetCoupon() {
      let args = {
        coupon_batch_id: this.coupon_batch_id,
        include: "couponBatch"
      };
      checkGetCoupon(args)
        .then(res => {
          if (!res) {
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
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@img: "https://cdn.exe666.com/fe/image/greenchm/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  background-color: #01a660;
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
  background-color: #01a660;
  background: url("@{img}back.png") center top / 100% auto repeat;
  padding-top: 12%;
  .title {
    width: 56%;
    margin-bottom: 7%;
  }
  & > div {
    position: relative;
    width: 88%;
    margin-bottom: 6%;
  }
  // .one {
  // }
  // .two {
  // }
  .three {
    width: 74%;
    margin-bottom: 0%;
    .bg {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 70vw;
      position: absolute;
      top: 1.5%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 47%;
    position: relative;
    margin-top: 15px;
    animation: myslider 0.6s linear infinite alternate;
  }
  .logo {
    width: 85.5%;
    margin-top: 13%;
    margin-bottom: 7%;
  }
}
@keyframes myslider {
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>


