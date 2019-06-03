<template>
  <div class="container">
    <img
      :src="CDNURL+'/fe/wy-dw-bg.png'"
      class="bigBg"
    >

    <div 
      v-show="showLoading" 
      class="loadingBox"
    >
      <img 
        :src="CDNURL+'/fe/wy-dw-loading.png'" 
        class="loadingIcon"
      >
      <img 
        v-if="showLoadingText"
        :src="CDNURL+'/fe/wy-dw-transition-text.png'" 
        class="transitionText"
      >
    </div>

    <div
      v-show="type==='receive'"
      class="receiveWrapper"
    >
      <div class="couponBox">
        <img
          :src="CDNURL+'/fe/wy-dw-coupon-box.png'"
          class="couponBg"
        >
        <img
          :src="CDNURL+'/fe/wy-dw-receive-btn.png'"
          class="couponBtn"
          @click="onClickReceiveBtn"
        >
      </div>
      <div class="photoBox">
        <img
          :src="CDNURL+'/fe/wy-dw-photo-wrapper.png'"
          class="photoBg"
        >
        <img
          :src="userImg"
          class="photo"
        >
      </div>
    </div>

    <div
      v-show="type==='login'"
      class="loginWrapper"
    >
      <div class="loginBox">
        <img
          :src="CDNURL+'/fe/wy-dw-input-bg.png'"
          class="loginBg"
        >
        <div class="inputWrapper phoneBox">
          <img
            :src="CDNURL+'/fe/wy-dw-input-wrapper.png'"
            class="inputBg"
          >
          <img
            :src="CDNURL+'/fe/wy-dw-phone.png'"
            class="phone"
          >
          <div class="inputItem">
            <input
              v-model="phone"
              type="text"
              class="item"
            >
          </div>
        </div>
        <div class="inputWrapper vcodeBox">
          <img
            :src="CDNURL+'/fe/wy-dw-input-wrapper.png'"
            class="inputBg"
          >
          <img
            :src="CDNURL+'/fe/wy-dw-vcode.png'"
            class="vcode"
          >
          <div class="inputItem">
            <input
              v-model="vcode"
              type="number"
              class="item"
            >
          </div>
          <div
            v-if="disabledGetVcode"
            class="vcodeBtn"
          >
            <img
              :src="CDNURL+'/fe/wy-dw-count-down.png'"
              class="countDownBg"
            >
            <span class="vcodeText">{{ time }}s</span>
          </div>
          <div
            v-else
            class="vcodeBtn"
            @click="onClickGetVcode"
          >
            <img
              :src="CDNURL+'/fe/wy-dw-get-vcode.png'"
              class="countDownBg"
            >
          </div>
        </div>
        <img
          :src="CDNURL+'/fe/wy-dw-complete-btn.png'"
          class="completeBtn"
          @click="onLogin"
        >
      </div>
    </div>

    <div
      v-show="type==='couponList'"
      class="couponWrapper"
    >
      <div class="couponBox">
        <img
          :src="CDNURL+'/fe/wy-dw-coupon-top.png'"
          class="couponTop"
        >
        <div class="couponList">
          <img
            :src="CDNURL+'/fe/wy-dw-coupon_1.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wy-dw-coupon_2.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wy-dw-coupon_3.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wy-dw-coupon_item4.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wy-dw-coupon_5.png'"
            class="couponItem"
          >
        </div>
      </div>
      <div
        class="myCoupon"
        @click="onNavToCouponPacks"
      >
        <img
          :src="CDNURL+'/fe/wy-dw-my-coupon.png'"
          class="btnText"
        >
        <img
          :src="CDNURL+'/fe/wy-dw-coupon-view.png'"
          class="desc"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  Cookies,
  $wechat,
  isInWechat,
  wechatShareTrack,
  getInfoById,
  getMallcooCouponInfo,
  checkMallMember,
  receiveMallcooCoupon,
  sendMessageCode,
  openMallcooMemberByPhone,
  validatePhone
} from "services";
import { Toast } from "mint-ui";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
const CDNURL = process.env.CDN_URL;

export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      CDNURL: CDNURL,
      sign: "",
      qiniu_id: this.$route.query.id,
      oid: null,
      belong: "",
      type: "",
      userImg: "",
      phone: "",
      vcode: "",
      verification_key: "",
      time: 60,
      disabledGetVcode: false,
      showLoading: false,
      showLoadingText: false,
      wxShareInfoValue: {
        title: "吾悦全城招募-端午节顶粽王者挑战赛！",
        desc: "点击发现大神",
        link: process.env.M_URL + '/marketing/wy_dragonBoatFestival_share' + window.location.search,
        imgUrl: CDNURL + "/fe/wy-dw-share-icon.png"
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
    // 微信静默授权
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
        this.sign = Cookies.get("sign");
        this.init();
      }
    },

    async init() {
      try {
        let { id, code, state } = this.$route.query;
        let { belong, oid, image } = await getInfoById(id, code, state);
        this.oid = oid;
        this.belong = belong;
        this.userImg = image;
        let params = {
          sign: this.sign,
          qiniu_id: this.qiniu_id,
          oid: this.oid,
          belong: this.belong
        };
        const userCouponRes = await getMallcooCouponInfo(params);
        if (userCouponRes) {
          this.type = "couponList";
        } else {
          this.type = "receive";
        }
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    },

    // 商场会员信息
    async onGetMallcooUserInfo(params) {
      try {
        const mallcooUserInfoRes = await checkMallMember(params);
        if (mallcooUserInfoRes) {
          let params = {
            qiniu_id: this.qiniu_id,
            sign: this.sign,
            belong: this.belong,
            oid: this.oid
          };
          this.onReceiveCoupon(params);
        } else {
          this.showLoading = false;
          this.type = "login";
        }
      } catch (err) {
        if (err.response && err.response.data) {
          this.showLoading = false;
          alert(err.response.data.message);
        }
      }
    },

    // 发送短信验证码
    async onGetVcode(params) {
      try {
        const vcodeRes = await sendMessageCode(params);
        if (vcodeRes) {
          this.verification_key = vcodeRes.key;
        }
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    },

    // 手机号开卡
    async onOpenMallcooUsers(params) {
      try {
        const mallcooUsersRes = await openMallcooMemberByPhone(params);
        if (mallcooUsersRes) {
          let params = {
            qiniu_id: this.qiniu_id,
            sign: this.sign,
            belong: this.belong,
            oid: this.oid
          };
          this.onReceiveCoupon(params);
        }
      } catch (err) {
        if (err.response && err.response.data) {
          this.showLoading = false;
          alert(err.response.data.message);
        }
      }
    },

    // 猫酷-领取优惠券包
    async onReceiveCoupon(params) {
      try {
        const receiveMallcooCouponRes = await receiveMallcooCoupon(params);
        if (receiveMallcooCouponRes) {
          this.showLoading = false;
          this.type = "couponList";
        }
      } catch (err) {
        if (err.response && err.response.data) {
          this.showLoading = false;
          alert(err.response.data.message);
        }
      }
    },

    onClickReceiveBtn() {
      let params = {
        sign: this.sign,
        oid: this.oid
      };
      this.showLoading = true;
      this.onGetMallcooUserInfo(params);
    },

    onGetErrorTips() {
      if (!validatePhone(this.phone)) {
        return "手机格式不正确，请重新输入";
      }
      if (!this.vcode || !/^\d{4}$/.test(this.vcode)) {
        return "验证码格式错误，请重新输入";
      }
      return "";
    },

    onCountDown() {
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.time = 60;
          this.disabledGetVcode = false;
        } else {
          this.time--;
        }
      }, 1000);
    },

    onClickGetVcode() {
      if (!validatePhone(this.phone)) {
        Toast('手机格式不正确，请重新输入');
        return;
      }
      this.disabledGetVcode = true;
      this.onCountDown();
      let params = {
        phone: this.phone
      };
      this.onGetVcode(params);
    },

    onLogin() {
      if (this.onGetErrorTips()) {
        Toast(this.onGetErrorTips());
        return;
      }
      this.showLoading = true;
      let params = {
        verification_key: this.verification_key,
        verification_code: this.vcode,
        oid: this.oid,
        sign: this.sign
      };
      this.onOpenMallcooUsers(params);
    },

    onNavToCouponPacks() {
      this.showLoading = true;
      this.showLoadingText = true;
      setTimeout(() => {
        window.location.href = "https://m.mallcoo.cn/a/coupon/10658";
        this.showLoading = false;
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  max-width: 100%;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  .bigBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: -1;
  }

  .loadingBox {
    display: flex;
    flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: rgba(0,0,0,0.7);

		.loadingIcon {
			width: 12.8vw;
			height: 12.8vw;
			animation: loading 2s linear infinite;
    }
    
    .transitionText {
      width: 47.47vw;
      margin-top: 5.33vw;
    }
  }

  .receiveWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .couponBox {
      position: relative;
      width: 82.13vw;
      margin-top: 7.47vw;

      .couponBg {
        width: 100%;
      }

      .couponBtn {
        position: absolute;
        bottom: 4.95%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 42.93vw;
      }
    }

    .photoBox {
      position: relative;
      width: 55.47vw;
      margin-top: 4.53vw;

      .photoBg {
        width: 100%;
      }

      .photo {
        position: absolute;
        top: 3.5%;
        left: 4%;
        width: 62.5%;
        height: 93%;
      }
    }
  }

  .loginWrapper {
    flex: 1;

    .loginBox {
      position: relative;
      width: 74.67vw;
      margin-top: 32.53vw;

      .loginBg {
        width: 100%;
      }

      .inputWrapper {
        position: absolute;
        left: 50%;
        width: 58.13vw;
        height: 11.2vw;
        transform: translate(-50%, 0);

        .inputBg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .inputItem {
          flex: 1;
          height: 100%;
          z-index: 999;
        }

        .item {
          width: 100%;
          height: 100%;
          padding: 0 3vw;
          border: 0px;
          outline: none;
          text-align: left;
          font-size: 14px;
          color: #666;
          background: transparent;
        }
      }

      .phoneBox {
        top: 37.56%;
        display: flex;
        align-items: center;

        .phone {
          width: 13.87vw;
          margin-left: 4vw;
          z-index: 999;
        }
      }

      .vcodeBox {
        top: 51.64%;
        display: flex;
        align-items: center;

        .vcode {
          width: 10.4vw;
          margin-left: 4vw;
          z-index: 999;
        }

        .vcodeBtn {
          position: relative;
          width: 17.6vw;
          margin-right: 3vw;
          z-index: 999;

          .countDownBg {
            width: 100%;
          }

          .vcodeText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 10px;
            color: #666;
          }
        }
      }

      .completeBtn {
        position: absolute;
        bottom: 10.09%;
        left: 50%;
        width: 58.93vw;
        transform: translate(-50%, 0);
      }
    }
  }

  .couponWrapper {
    flex: 1;

    .couponBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 82.13vw;
      margin-top: 7.47vw;

      .couponTop {
        width: 100%;
      }

      .couponList {
        display: flex;
        flex-direction: column;
        width: 59.2vw;
        margin-top: -17.87vw;

        .couponItem {
          width: 100%;
        }
      }
    }

    .myCoupon {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10.93vw;

      .btnText {
        width: 47.2vw;
        margin-bottom: 2.93vw;
      }

      .desc {
        width: 31.47vw;
      }
    }
  }
}

@keyframes loading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
