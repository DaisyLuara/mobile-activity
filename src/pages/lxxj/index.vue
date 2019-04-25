<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 背景 -->
    <img 
      :src="baseUrl + 'bg.png'"
      :style="style.bg"
      class="root-bg" 
    >
    <div
      v-show="status.step === 'input'"
      class="input-wrapper"
    >
      <img 
        :src="baseUrl + 'logo.png'"
        class="logo" 
      >
      <div
        class="input-area"
        @click="clearError"
      >
        <div 
          v-show="status.isPhoneError"
          class="input-error"
        >
          您输入的手机号有误
        </div>
        <img 
          :src="baseUrl + 'input.png'"
          class="input-bg"
        >
        <input 
          ref="inputreal"
          v-model="phoneValue"
          maxlength="11"
          class="input-value" >
        
        <img
          v-if="status.shouldInputRemindShow" 
          :src="baseUrl + 'remind.png'"
          class="input-remind"
        >

      </div>

      <img
        :src="baseUrl + 'smsremind.png'" 
        class="smsremind"
      >

      <div
        class="input-button"
        @click="checkPhoneValue"
      >
        <img 
          :src="baseUrl + 'btn-submit.png'" 
        >
      </div>

      <img
        :src="baseUrl + 'time.png'" 
        class="wrapper-time"
      >
    </div>

    <div
      v-show="status.step === 'coupon'"
      class="coupon-wrapper">

      <!-- 背景 -->
      <img
        :src="baseUrl + 'coupon-bg.png'" 
        class="coupon-bg"
      >
      
      <div
        v-show="status.isGetCoupon === true"
        :style="style.coupon1"
        class="coupon-inner-1"
      >
        <img
          :src="baseUrl + 'coupon-1.png'" 
          class="inner-cover"
        >

        <div 
          class="coupon-number"
        >
          <div
            v-for="(item, index) of String(coupon_code)"
            :key="index" 
            class="number-inner">
            <img 
              :src="baseUrl + item + '.png'" 
            >
          </div>
        </div>

        <div
          class="inner-button"
          @click="handleRemindShow"
        >
          <img
            :src="baseUrl + 'btn-submit.png'" 
            style="pointer-events: none; "
          >
        </div>
        
      </div>

      <img
        v-show="status.isGetCoupon === false" 
        :src="baseUrl + 'coupon-2.png'"
        :style="style.coupon2"
        class="coupon-inner-2"
      >

      <img
        :src="baseUrl + 'time.png'" 
        class="wrapper-time"
      >
        
    </div>
    
    <Remind v-show="status.shouldRemindShow"/>

    <!-- 宝箱 -->
    <img 
      v-show="status.step === 'coupon'"
      :src="baseUrl + 'box.png'"
      class="link"
      @click="jumpToLink"
    >
    <!-- 弹出层 -->
    <GameShow 
      ref="gameShow" 
      :style-data="style"/>
  </div>
</template>

<script>
const wih = window.innerHeight;
const wiw = window.innerWidth;
const imgUrl = process.env.CDN_URL;
import GameShow from "modules/gameShow";
import {
  isInWechat,
  getWxUserInfo,
  Cookies,
  getInfoById,
  $wechat
} from "services";

import Remind from "./remind";

const baseUrl =
  "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/";
export default {
  components: {
    Remind,
    GameShow
  },
  data() {
    return {
      baseUrl: baseUrl,
      style: {
        root: {
          height: wih + "px"
        },
        show: true,
        coupon2: {},
        coupon1: {
          height: ((wiw * 0.5 * 260) / 373) * 1.5 + "px"
        },
        top: {
          top:
            this.$innerHeight() * 0.12 +
            ((this.$innerWidth() * 0.7) / 503) * 34 -
            38 +
            "px",
          right: this.$innerWidth() * 0.15 - 45 + "px"
        },
        popupsContent: {
          height: this.$innerHeight() + "px"
        },
        popups: {
          height: this.$innerHeight() + "px"
        }
      },
      phoneValue: null,
      coupon_code: 580870245930946,
      status: {
        isPhoneError: false,
        isGetCoupon: null,
        // step: 'coupon',
        step: "input",
        shouldInputRemindShow: true,
        shouldRemindShow: false
      }
    };
  },
  created() {
    document.title = "龙虾刑警";
    this.handleStorage();
  },
  mounted() {
    this.handleForbiddenShare();
    this.getInfo();
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "test"
      ) {
        this.handleWechatAuth();
      }
      // this.handleWechatAuth()
    }
  },
  methods: {
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
        let utm_campaign = this.$route.query.utm_campaign;
        let user_id = Cookies.get("user_id");
        this.$refs.gameShow.createGame(utm_campaign, user_id);
      }
    },
    handleTrack() {
      const baseUrl = process.env.EXE_API;
      let url =
        `${baseUrl}/goodsxsd/?id=` +
        String(this.$route.query.id) +
        "&mobile=" +
        String(this.phoneValue) +
        "&api=json";
      this.$http.get(url).then(r => {});
    },
    getInfo() {
      let id = this.$route.query.id;
      getInfoById(id).then(res => {});
    },
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden();
        })
        .catch(_ => {
          console.warn(_.message);
        });
    },
    handleStorage() {
      if (localStorage.getItem("longxia") !== null) {
        let getData = JSON.parse(localStorage.getItem("longxia"));
        this.coupon_code = getData.coupon_code;
        this.status.isGetCoupon = getData.isGetCoupon;
        this.status.step = "coupon";
      }
    },
    saveStorage() {
      let saveData = {
        coupon_code: this.coupon_code,
        isGetCoupon: this.status.isGetCoupon
      };
      localStorage.setItem("longxia", JSON.stringify(saveData));
    },
    checkPhoneValue() {
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.status.isPhoneError = true;
        return;
      } else {
        this.status.step = "coupon";
        this.handleTrack();
        this.getCoupon();
      }
    },
    getCoupon() {
      let rq = process.env.WX_API + "/v6/common/coupon";
      let rd = {
        tenant_id: process.env.NODE_ENV === "production" ? "18" : "20"
      };
      this.$http.post(rq, rd).then(r => {
        this.savedCounponId = r.data.data.id;
        if (r.data.data.coupon_batch.name === "龙虾刑警观影券") {
          this.status.isGetCoupon = true;
          this.coupon_code = r.data.data.code;
        } else {
          this.status.isGetCoupon = false;
        }
        this.handlePhoneBind();
        this.saveStorage();
      });
    },
    handleRemindShow() {
      this.status.shouldRemindShow = !this.status.shouldRemindShow;
    },
    handlePhoneBind() {
      let rq = process.env.WX_API + "/v4/common/coupon";
      let rd = {
        mobile: this.phoneValue,
        coupon_id: this.savedCounponId
      };
      this.$http.put(rq, rd).then(r => {
        if (r.data.success === false) {
        } else {
          if (this.status.isGetCoupon === true) {
            this.sendSms(this.savedCounponId);
          }
        }
      });
    },
    sendSms(id) {
      let rq = process.env.WX_API + "/v6/common/coupon/sms";
      let rd = {
        mobile: this.phoneValue,
        coupon_id: id,
        sms_tmp_id: "2351522"
      };
      this.$http.post(rq, rd).then(r => {});
    },
    clearError() {
      this.status.isPhoneError = false;
      this.status.shouldInputRemindShow = false;
      this.$refs.inputreal.focus();
    },
    jumpToLink() {
      window.location.href =
        process.env.NODE_ENV === "production"
          ? process.env.AD_API + "/api/s/pyX"
          : process.env.AD_API + "/api/s/vm";
    }
  }
};
</script>

<style lang="less" scoped>
@imgServerUrl: "http://cdn.xingstation.cn//fe/marketing/img/sndy";
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  .root-bg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .input-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    .logo {
      width: 80%;
      position: absolute;
      top: 10%;
      z-index: 12;
      left: 10%;
    }
    .input-area {
      position: absolute;
      width: 80%;
      top: 43%;
      width: 80%;
      left: 10%;
      z-index: 12;
      .input-error {
        position: absolute;
        top: -35%;
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 200;
      }
      .input-bg {
        width: 100%;
        z-index: 13;
      }
      .input-value {
        background-color: transparent;
        z-index: 14;
        width: 100%;
        position: absolute;
        top: 0;
        height: 100%;
        left: 0;
        padding: 0 18%;
      }
      .input-remind {
        position: absolute;
        width: 50%;
        top: 0;
        left: 25%;
        z-index: 15;
        bottom: 0;
        right: 0;
        margin: auto 0;
      }
    }
    .smsremind {
      position: absolute;
      width: 60%;
      left: 20%;
      top: 55%;
      z-index: 11;
    }
    .input-button {
      position: absolute;
      width: 40%;
      left: 30%;
      top: 60%;
      z-index: 11;
      img {
        width: 100%;
      }
    }
    .wrapper-time {
      z-index: 11;
      width: 30%;
      left: 35%;
      position: absolute;
      bottom: 5%;
    }
  }
  .coupon-wrapper {
    .wrapper-time {
      z-index: 12;
      width: 30%;
      left: 35%;
      position: absolute;
      bottom: 5%;
    }
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    .coupon-bg {
      width: 100%;
      margin: auto;
      position: absolute;
      top: -10%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
    }

    .coupon-inner-1 {
      width: 50%;
      margin: auto;
      position: absolute;
      top: -2%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
      .coupon-number {
        height: 12%;
        position: absolute;
        top: 51.8%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0 5%;
        .number-inner {
          height: 100%;
          img {
            width: 100%;
          }
        }
      }
      .inner-cover {
        width: 100%;
      }
      .inner-button {
        width: 80%;
        position: absolute;
        bottom: 10%;
        left: 10%;
        margin-top: 5%;
        img {
          width: 100%;
        }
      }
    }
    .coupon-inner-2 {
      width: 50%;
      margin: auto;
      position: absolute;
      top: -4%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
    }
  }
  .link {
    position: absolute;
    width: 20%;
    top: 38%;
    right: 0;
    z-index: 10000;
  }
}
</style>
