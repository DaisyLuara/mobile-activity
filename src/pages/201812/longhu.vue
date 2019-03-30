<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base + 'tit.png' + this.$qiniuCompress()"
      class="tit"
    >
    <div
      v-if="belong!='cpLongfor'"
      class="zero"
    >
      <img
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
    <div class="one">
      <img
        :src="base + 'one3.png' + this.$qiniuCompress()"
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
      <ul class="ul-tab">
        <li
          v-for="(item,index) in tabs"
          :key="index"
        >
          <a @click="getTabs(index)" />
        </li>
      </ul>
      <img
        v-for="(item,index) in tabs"
        :key="index"
        :src="base + index + '.png'"
        :class="{bg:true,ceng2:item}"
      >
    </div>
    <img
      :src="base + 'logo.png' + this.$qiniuCompress()"
      class="logo"
    >
    <div
      v-show="mask"
      class="mask"
    >
      <img
        :src="base + note + '.png' + this.$qiniuCompress()"
        class="note"
      >
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
  checkGetCoupon,
  dateFormat,
  formatTimestamp,
  getMallcooOauth,
  checkCouponNumber
} from "services";
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + "/fe/image/longhu/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      textShow: false,
      imgUrl: null,
      coupon_batch_id: this.$route.query.coupon_batch_id,
      belong: this.$route.query.utm_campaign,
      tabs: {
        LHHappyBirthday: false,
        LonghuYinFood: false,
        cpLongfor: false
      },
      id: this.$route.query.id,
      open_user_id: null,
      mask: false,
      note: 'note1',
      hasgeted: false,
      //分享
      wxShareInfoValue: {
        title: "一周年好礼相送",
        desc: "参与互动 福利翻倍",
        link: "http://papi.xingstation.com/api/s/q7r" + window.location.search,
        imgUrl: cdnUrl + "/fe/image/longhu/icon.png"
      }
    };
  },
  mounted() {
    this.tabs[this.belong] = true;
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
    let that = this
    if (window.localStorage.getItem('longhu')) {
      return
    } else {
      this.mask = true
      let timer = setTimeout(function () {
        that.mask = false;
        clearTimeout(timer)
        window.localStorage.setItem('longhu', 'longhu')
      }, 2000)
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
    getTabs(index) {
      for (let i in this.tabs) {
        this.tabs[i] = false;
      }
      this.tabs[index] = true;
    },
    getAuth() {
      let url =
        window.location.origin +
        window.location.pathname +
        encodeURIComponent(String(window.location.search));
      let args = {
        redirect_url: url
      };
      this.note = 'note2'
      this.mask = true
      let that = this
      let timer = setTimeout(function () {
        that.mask = false;
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
        clearTimeout(timer)
      }, 2000)

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
            } else {
              this.textShow = true;
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
        qiniu_id: this.$route.query.id,
        oid: this.$route.query.oid || this.$route.query.utm_source,
        belong: this.$route.query.utm_campaign
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
@img: "https://cdn.xingstation.com/fe/image/longhu/";
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
  background: url("@{img}bg.png") center top / 100% 100% no-repeat;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .tit {
    position: relative;
    z-index: 0;
  }
  .zero {
    position: relative;
    width: 70%;
    overflow: hidden;
    margin-top: -3%;
    margin-bottom: 5%;
    z-index: 0;
    .save {
      position: absolute;
      left: 0%;
      top: 50%;
      transform: translateY(-50%);
      width: 17vw;
      z-index: 0;
    }
    .frame {
      width: 51vw;
      position: relative;
      z-index: 0;
      float: right;
    }
    .photo {
      width: 48.2vw;
      position: absolute;
      z-index: 99;
      top: 0.6%;
      right: 3.1%;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .one {
    position: relative;
    width: 95%;
    z-index: 0;
    .coupon {
      display: inline-block;
      width: 90%;
      position: absolute;
      top: 13%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      img {
        z-index: 0;
      }
      .aclick {
        width: 27%;
        display: inline-block;
        position: absolute;
        top: 53%;
        right: 18%;
        z-index: 999;
      }
    }
  }
  .two {
    position: relative;
    width: 100%;
    margin-top: 8%;
    z-index: 0;
    .ul-tab {
      width: 87%;
      height: 8%;
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      overflow: hidden;
      li {
        display: inline-block;
        height: 100%;
        width: 28vw;
        float: left;
        margin: 0 0.5vw;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .bg {
      width: 95%;
      z-index: 9;
      &:not(:last-child) {
        z-index: 0;
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .ceng2 {
      z-index: 99 !important;
    }
  }
  .logo {
    position: relative;
    width: 42%;
    margin-top: 2%;
    margin-bottom: 4%;
    z-index: 0;
  }
  .mask {
    position: fixed;
    width: 100%;
    top: 0%;
    bottom: 0%;
    left: 0%;
    right: 0%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
    .note {
      width: 80%;
      position: relative;
      margin-top: 20%;
    }
  }
}
</style>


