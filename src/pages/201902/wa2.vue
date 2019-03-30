<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="coupon + this.$qiniuCompress()"
        class="coupon"
      >
      <div
        v-show="Boolean(coupon)"
        :class="{description:true,toleft:toleft,toright:toright}"
      >
        <img
          :src="base + 'explain.png'"
          class="bg"
        >
        <img
          :src="base + arrow+ '.png'"
          class="arrow"
        >
        <a
          class="ashow"
          @click="()=>{arrow=arrow=='arrow01'?'arrow02':'arrow01';toleft=!toleft;toright = !toleft}"
        />
        <div class="txt">
          <ol
            start="1"
            type="1"
          >
            <li
              v-for="item in text"
              :key="item.id"
            >{{ item }}</li>
          </ol>
        </div>
      </div>
      <div
        v-show="Boolean(coupon)"
        class="check"
      >
        <img
          :src="base + 'hexiao.png'"
          class="checkbg"
        >
        <img
          :src="ewm"
          class="er"
        >
        <img
          v-show="used"
          :src="base + 'used.png'"
          class="used"
        >
        <span class="code">{{ code }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  sendCoupon,
  checkGetCoupon
} from "services";
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      base: cdnUrl + "/fe/image/wa2/",
      ewm: null,//'https://cdn.xingstation.cn/fe/image/couponrain/5c22f3d46c008.png'
      code: null,//5c5157930db56
      coupon: null, //'http://cdn.xingstation.cn/fe/image/wa2/coupon01.png',
      description: null,
      userId: null,
      text: null,
      arrow: "arrow01",
      id: this.$route.query.id,
      used: false,
      toleft: false,
      toright: false
    };
  },
  watch: {
    coupon_batch_id() {
      this.checkGetCoupon()
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
    checkGetCoupon() {
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
          this.handleData(res);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    //处理返回数据
    handleData(res) {
      this.ewm = res.qrcode_url;
      this.code = res.code;
      this.coupon = res.couponBatch.image_url;
      this.description = res.couponBatch.description;
      if (parseInt(res.status) === 1) {
        this.used = true;
      }
      this.text = this.description ? this.description.split("/n") : this.description;
    }
  }
};
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/fe/image/wa2/";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-image: url("@{img}top.png"), url("@{img}wood.png"),
    url("@{img}back.jpg");
  background-position: center top, center top, center top;
  background-size: 100% auto, 100% 100%, 100% 100%;
  background-repeat: no-repeat, no-repeat, no-repeat;
  padding-top: 7%;
  .main {
    width: 77.5%;
    z-index: 0;
    position: relative;
    img {
      position: relative;
      z-index: 0;
    }
    .coupon {
      pointer-events: auto;
      user-select: auto;
    }
    .description {
      width: 118%;
      overflow: hidden;
      position: absolute;
      top: -4%;
      left: -2%;
      z-index: 99;
      transform: translateX(80%);
      .bg {
        position: relative;
        z-index: 0;
      }
      .arrow {
        width: 3.2vw;
        position: absolute;
        top: 4%;
        left: 2%;
        z-index: 9;
      }
      .ashow {
        display: inline-block;
        width: 17vw;
        height: 11vw;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
      }
      .txt {
        width: 70%;
        position: absolute;
        top: 5%;
        left: 25%;
        z-index: 9999;
        ol {
          width: 100%;
          li {
            width: 100%;
            color: #fff;
            font-size: 4vw;
            letter-spacing: 2px;
            margin: 3% auto;
            text-align: left;
          }
        }
      }
    }
    .toleft {
      animation: myleft 0.5s linear forwards;
    }
    .toright {
      animation: myright 0.5s linear forwards;
    }
    .check {
      margin: 0 auto;
      position: relative;
      margin-top: 3%;
      margin-bottom: 5%;
      .checkbg {
        position: relative;
        z-index: 0;
      }
      .er {
        position: absolute;
        top: 15.5%;
        left: 9%;
        z-index: 99;
        width: 22vw;
        pointer-events: auto;
        user-select: auto;
        border-radius: 5px;
      }
      .used {
        position: absolute;
        top: 17%;
        left: 4%;
        z-index: 999;
        width: 33vw;
        pointer-events: auto;
        user-select: auto;
      }
      .code {
        display: inline-block;
        position: absolute;
        z-index: 99;
        top: 50.5%;
        left: 42.5%;
        width: 38vw;
        height: 9vw;
        font-size: 4.5vw;
        line-height: 9vw;
        color: #000;
        // color: #fff;
      }
    }
  }
}

@keyframes myleft {
  0% {
    transform: translateX(80%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes myright {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(80%);
  }
}
</style>


