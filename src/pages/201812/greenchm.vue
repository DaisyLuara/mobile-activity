<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base + 'back.png' + this.$qiniuCompress()"
      class="back"
    >
    <img
      v-show="Boolean(imgUrl)"
      :src="base + 'top.png' + this.$qiniuCompress()"
      class="title"
    >
    <span class="getdate">{{ coupon_date }}</span>
    <span class="code">{{ code }}</span>
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
        :src="base + 'note2.png' + this.$qiniuCompress()"
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
      :src="base + 'newlogo.png' + this.$qiniuCompress()"
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
  dateFormat,
  sendCoupon,
  checkGetCoupon,
  checkCouponNumber,
  formatTimestamp
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
      imgUrl: null,//'https://cdn.xingstation.com//fe/image/zpld_chr/7winter.png'
      id: this.$route.query.id,
      userId: null,
      coupon_date: null,
      code: null,
      //分享
      wxShareInfoValue: {
        title: "周浦绿地广场双旦狂欢季，转出缤纷好礼",
        desc: "缤纷双旦纷享礼，感谢有你",
        link: "http://papi.xingstation.com/api/s/p81" + window.location.search,
        imgUrl: cdnUrl + "/fe/image/greenchm/icon.png",
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
    this.handleForbiddenShare()
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
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    //获取券信息
    getCouponDetail() {
      checkCouponNumber(this.parms.coupon_batch_id)
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
        coupon_batch_id: this.parms.coupon_batch_id,
        include: "couponBatch"
      };
      let date = new Date()
      args.start_date = dateFormat(
        new Date(formatTimestamp(date, true)),
        'yyyy-MM-dd hh:mm:ss'
      )

      args.end_date = dateFormat(
        new Date(formatTimestamp(date, false) - 1000),
        'yyyy-MM-dd hh:mm:ss'
      )
      checkGetCoupon(args)
        .then(res => {
          if (res) {
            this.handleData(res)
          } else {
            this.sendCoupon()
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
      sendCoupon(args, this.parms.coupon_batch_id)
        .then(res => {
          console.log('send', res)
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    //处理返回数据
    handleData(res) {
      this.coupon_date = res.created_at
      this.code = res.code
    },
  }
};
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.com/fe/image/greenchm/";
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
  padding-top: 12%;
  .back {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .getdate {
    position: absolute;
    top: 0.5%;
    right: 2%;
    font-size: 3vw;
    color: #000;
    font-weight: 400;
    z-index: 999;
  }
  .code {
    position: absolute;
    top: 0.5%;
    left: 2%;
    font-size: 5vw;
    color: #000;
    font-weight: 400;
    z-index: 999;
  }
  .title {
    position: relative;
    width: 66%;
    margin-bottom: 7%;
    z-index: 9;
  }
  & > div {
    position: relative;
    width: 88%;
    margin-bottom: 6%;
    z-index: 9;
  }
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
    display: block;
    width: 47%;
    position: relative;
    margin-top: 15px;
    animation: myslider 0.6s linear infinite alternate;
    z-index: 9;
  }
  .logo {
    position: relative;
    display: block;
    width: 42%;
    margin-top: 8.5%;
    z-index: 9;
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
