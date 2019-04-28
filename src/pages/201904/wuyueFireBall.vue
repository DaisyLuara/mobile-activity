<template>
  <div class="container">
    <img 
      :src="CDNURL+'/fe/wuyue-anniversary-bg.png'"
      class="bigBg"
    >
    <img 
      :src="CDNURL+'/fe/wuyue-fireBallBg-top.png'"
      class="playerBgTop"
    >
    <img 
      :src="CDNURL+'/fe/wuyue-fireball-bg-bottom.png'"
      class="playerBgBottom"
    >
    <div 
      v-show="showLoading" 
      class="loadingBox">
      <img 
        :src="CDNURL+'/fe/wuyue-loading-icon.png'" 
        class="loadingIcon"
      >
    </div>
    <img 
      :src="CDNURL+'/fe/wuyue-anniversary-desc.png'"
      class="desc" 
    >

    <div class="content">
      <div 
        v-show="type==='receive'"
        class="receiveWrapper"
      >
        <div class="couponBgBox">
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-coupon.png'"
            class="couponBg"
          >
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-receive-btn.png'"
            class="couponBtn"
            @click="onClickReceiveBtn"
          >
        </div>
        <div class="photoWrapper">
          <div class="photoBox">
            <img 
              :src="CDNURL+'/fe/wuyue-anniversary-photo-box.png'"
              class="photoBg"
            >
            <img 
              :src="userImg"
              class="photo"
            >
          </div>
          <img 
            :src="CDNURL+'/fe/wuyue-anniversary-save-btn.png'" 
            class="savePhoto"
          >
        </div>
      </div>

      <div
        v-show="type==='login'"
        class="loginWrapper"
      >
        <div class="loginBgBox">
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-login-bg.png'"
            class="loginBg"
          >
          <div class="phoneBox">
            <img
              :src="CDNURL+'/fe/wuyue-anniversary-phone-box.png'"
              class="phoneBg"
            >
            <input
              v-model="phone"
              type="text"
              class="phoneInput"
              @input="onChangePhone"
            >
          </div>
          <div class="validateBox">
            <img
              :src="CDNURL+'/fe/wuyue-anniversary-vcode-box.png'"
              class="validateBg"
            >
            <input
              v-model="vcode"
              type="number"
              class="validateInput"
              @input="onChangeVcode"
            >
            <div 
              class="validateBtn" 
              @click="onClickGetVcode">
              <img
                v-if="disabledGetVcode"
                :src="CDNURL+'/fe/wuyue-anniversary-count-down-gray.png'"
                class="countDownBg"
              >
              <img
                v-else
                :src="CDNURL+'/fe/wuyue-anniversary-count-down-bg.png'"
                class="countDownBg"
              >         
              <span class="vcodeText">{{ vcodeText }}</span>
            </div>
          </div>
          <img
            v-if="disabledLogin"
            :src="CDNURL+'/fe/wuyue-anniversary-login-gray.png'"
            class="loginBtn"
          >
          <img
            v-else
            :src="CDNURL+'/fe/wuyue-anniversary-login-btn.png'"
            class="loginBtn"
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
            :src="CDNURL+'/fe/wuyue-anniversary-coupon-map.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-music.png'"
            class="couponItem marginLeft"
          >
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-kisscat.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-mkct.png'"
            class="couponItem marginLeft"
          >
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-zyhx.png'"
            class="couponItem"
          >
          <img
            :src="CDNURL+'/fe/wuyue-anniversary-vr.png'"
            class="couponItem marginLeft"
          >
        </div>
        <img
          :src="CDNURL+'/fe/wuyue-anniversary-my-couponPacks.png'"
          class="myCouponText"
          @click="onNavToCouponPacks"
        >
      </div>

      <div 
        v-show="type === 'transition'"
        class="transitionAnimation"
      >
        <div class="transitionBox">
          <img 
            :src="CDNURL+'/fe/wuyue-anniversary-loading-bg.png'"
            class="transitionBg"
          >
          <div id="lottie"/>
        </div>
      </div>
    </div>

    <img 
      :src="CDNURL+'/fe/wuyue-anniversary-logo.png'"
      class="logo"
    >
  </div>
</template>

<script>
import { Toast } from "mint-ui";
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
import moment from "moment";
import lottie from "lottie-web";
const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
      showLoading: false,
      sign: "",
      qiniu_id: this.$route.query.id,
      oid: null,
      belong: "",
      type: "couponList",
      userImg: "",
      phone: "",
      vcode: "",
      verification_key: "",
      time: 60,
      vcodeText: "获取验证码",
      disabledGetVcode: true,
      disabledLogin: true
    };
  },
  mounted() {
    this.initAnimation()
    this.handleForbiddenShare()
    // this.init()
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
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
        }
        const mallcooCouponInfoRes = await getMallcooCouponInfo(params)
        if (mallcooCouponInfoRes) {
          this.type = "couponList";
        } else {
          this.type = "receive";
        }
      } catch (err) {
        if (err.response.data) {
          alert(err.response.data.message);
        }
      }
    },

    // 微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.sign = Cookies.get('sign')
        this.init()
      }
    },

    // 禁止微信分享
    handleForbiddenShare() {
      $wechat().then(res => {
        res.forbidden();
      });
    },

    initAnimation() {
      const el = document.getElementById('lottie')
      lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath: this.CDNURL + '/fe/wuyue-anniversary-loading-icon.png',
        path: this.CDNURL + '/fe/wuyue-loading-data.json'
      })
    },

    // 商场会员信息
    async onGetMallcooUserInfo(params) {
      try {
        const mallcooUserInfoRes = await checkMallMember(params)
        if (mallcooUserInfoRes) {
          let params = {
            qiniu_id: this.qiniu_id,
            sign: this.sign,
            belong: this.belong,
            oid: this.oid
          };
          this.onReceiveCoupon(params);
        } else {
          this.type = "login";
        }
      } catch (err) {
        if (err.response.data) {
          alert(err.response.data.message);
        }
      }
    },

    // 发送短信验证码
    async onGetVcode(params) {
      try {
        const vcodeRes = await sendMessageCode(params)
        if (vcodeRes) {
          this.verification_key = vcodeRes.key;
        }
      } catch (err) {
        if (err.response.data) {
          alert(err.response.data.message);
        }
      }
    },

    // 手机号开卡
    async onOpenMallcooUsers(params) {
      try {
        const mallcooUsersRes = await openMallcooMemberByPhone(params)
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
        if (err.response.data) {
          this.showLoading = false;
          alert(err.response.data.message);
        }
      }
    },

    // 猫酷-领取优惠券包
    async onReceiveCoupon(params) {
      try {
        const receiveMallcooCouponRes = await receiveMallcooCoupon(params)
        if (receiveMallcooCouponRes) {
          this.showLoading = false;
          this.type = "couponList";
        }
      } catch (err) {
        if (err.response.data) {
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

    onChangePhone() {
      if (!this.phone || !validatePhone(this.phone)) {
        this.disabledGetVcode = true;
        return;
      }
      this.disabledGetVcode = false;
    },

    onChangeVcode() {
      if (this.onGetErrorTips()) {
        this.disabledLogin = true;
        return;
      }
      this.disabledLogin = false;
    },

    onCountDown() {
      this.disabledGetVcode = true;
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.vcodeText = "获取验证码";
          this.time = 60;
          this.disabledGetVcode = false;
        } else {
          this.vcodeText = this.time + 's';
          this.time--;
        }
      }, 1000);
    },

    onClickGetVcode() { 
      if (this.disabledGetVcode) return;
      this.onCountDown();
      let params = {
        phone: this.phone
      };
      this.onGetVcode(params);
    },

    onLogin() {
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
      this.type = "transition";
      setTimeout(() => {
        window.location.href = 'https://m.mallcoo.cn/a/coupon/10658';
      }, 1000)
    }
	}
};
</script>
<style lang="less" scoped>
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
}
img {
  max-width: 100%;
  user-select: none;
}

.container {
	position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 15.74vw 0 5.19vw;
  overflow: hidden;
  
  .bigBg {
    position: absolute;
		top: 0;
		left: 0;
		width: 100%;
    height: auto;
    z-index: -2;
  }

  .playerBgTop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
    height: auto;
    z-index: -1;
	}

	.playerBgBottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
    height: auto;
    z-index: -1;
	}

	.loadingBox {
		display: flex;
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
			width: 50px;
			height: 50px;
			animation: loading 2s linear infinite;
		}
  }
  
  .desc {
    width: 71.85vw;
		height: auto;
		z-index: 999;
  }

  .content {
    flex: 1;
    display: flex;
  }

  .receiveWrapper {
    flex: 1;

    .couponBgBox {
      position: relative;
      width: 57.4vw;
      height: 69.3vw;

      .couponBg {
        width: 100%;
        height: 100%;
      }

      .couponBtn {
        position: absolute;
        bottom: 5.6%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 79.03%;
        height: auto;
      }
    }

    .photoWrapper {
      display: flex;
      align-items: flex-start;
      margin-top: 11.3vw;

      .photoBox {
        position: relative;
        width: 44.63vw;
        height: auto;

        .photoBg {
          width: 100%;
          height: auto;
        }

        .photo {
          position: absolute;
          top: 1.7%;
          left: 3%;
          width: 94.3%;
          height: 96.5%;
        }
      }

      .savePhoto {
        width: 10.74vw;
        height: auto;
        margin-left: 4.07vw;
      }
    }
  }

  .loginWrapper {
    flex: 1;

    .loginBgBox {
      position: relative;
      width: 64.3vw;
      height: auto;
      margin-top: 10vw;

      .loginBg {
        width: 100%;
        height: 100%;
      }

      .phoneBox {
        position: absolute;
        top: 30.78%;
        left: 50%;
        width: 84.44%;
        height: 12.27%;
        transform: translate(-50%, 0);

        .phoneBg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .phoneInput {
          position: absolute;
          top: 50%;
          right: 8.5%;
          width: 53%;
          height: 80%;
          transform: translate(0, -50%);
          border: 0px;
          outline: none;
          text-align: left;
          font-size: 14px;
          color: #fff;
          box-sizing: border-box;      
          background: transparent;
        }
      }

      .validateBox {
        position: absolute;
        top: 47.48%;
        left: 50%;
        width: 84.44%;
        height: 12.27%;
        transform: translate(-50%, 0);

        .validateBg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .validateBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          right: 8px;
          width: 37%;
          height: 60%;
          transform: translate(0, -50%);

          .countDownBg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          .vcodeText {
            font-size: 10px;
            color: #fff;
            z-index: 999;
          }
        }

        .validateInput {
          position: absolute;
          top: 50%;
          right: 43%;
          width: 26%;
          height: 80%;
          transform: translate(0, -50%);
          border: 0px;
          outline: none;
          text-align: left;
          font-size: 14px;
          color: #fff;
          box-sizing: border-box;
          background: transparent;
        }
      }

      .loginBtn {
        position: absolute;
        bottom: 12.27%;
        left: 50%;
        width: 70.61%;
        height: auto;
        transform: translate(-50%, 0);
      }
    }
  }

  .couponWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5.74vw;
    margin-top: 14vw;
    z-index: 1;

    .couponBox {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      height: auto;

      .couponItem {
        width: 41.67vw;
        height: 18.52vw;
        margin-bottom: 5vw;
      }

      .marginLeft {
        margin-left: 5vw;
      }
    }
    
    .myCouponText {
      width: 57.04vw;
      height: auto;
      margin-top: 14vw;
    }
  }

  .transitionAnimation {
    flex: 1;

    .transitionBox {
      position: relative;
      width: 64.26vw;
      height: 66.67vw;
      margin-top: 22.96vw;

      .transitionBg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #lottie {
        position: absolute;
        top: 12.2%;
        left: 50%;
        width: 36.6%;
        height: 35.56%;
        transform: translate3d(0, 0, 0);
        transform: translate(-50%, 0);
        overflow: hidden;
        opacity: 1;
        background: transparent;
      }
    }
  }

  .logo {
    width: 59.1vw;
    height: auto;
    margin-top: 13.7vw;
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
