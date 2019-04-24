<template>
  <div class="warp">
    <!-- 游戏 -->
    <div
      v-show="!hidden"
      class="game-group"
    >
      <CouponRain
        ref="game"
        :spritesData="sprites"
        @listenGameEnd="listenGameEnd"
      />
    </div>
    <div
      v-show="!hidden"
      v-if="end&&type==='receive'"
      class="no-getCoupon"
    >
      <img
        :src="base + '4.png'"
        class="bg"
      >
      <a
        class="couponBtn"
        @click="onClickReceiveBtn"
      >
        <img :src="base + 'click.png'">
      </a>
    </div>
    <div
      v-show="hidden"
      class="game-end"
    >
      <!-- 发券 -->
      <div class="container">
        <div
          v-show="register"
          class="loginBgBox"
        >
          <img
            :src="CDNURL+'/fe/wuyue-login-bg.png'"
            class="loginBg"
          >
          <div class="phoneBox">
            <img
              :src="CDNURL+'/fe/wuyue-login-phone-bg.png'"
              class="phoneBg"
            >
            <input
              v-model="phone"
              type="text"
              class="phoneInput"
            >
          </div>
          <div class="validateBox">
            <img
              :src="CDNURL+'/fe/wuyue-login-validate-bg.png'"
              class="validateBg"
            >
            <input
              v-model="vcode"
              type="number"
              class="validateInput"
            >
            <div
              v-if="vcodeText"
              class="validateBtn"
            >
              <img
                :src="CDNURL+'/fe/wuyue-count-down-box.png'"
                class="countDownBg"
              >
              <span class="vcodeText">{{ vcodeText }}</span>
            </div>
            <img
              v-else
              :src="CDNURL+'/fe/wuyue-get-validate-box.png'"
              class="validateBtn"
              @click="onGetVcode"
            >
          </div>
          <img
            :src="CDNURL+'/fe/wuyue-login-btn.png'"
            class="loginBtn"
            @click="doRegister"
          >
        </div>
        <div
          v-if="type==='couponList'&&!needregister"
          class="couponListBox"
        >
          <div class="couponBox">
            <img
              :src="CDNURL+'/fe/wuyue-coupon-item_1.png'"
              class="couponItem"
            >
            <img
              :src="CDNURL+'/fe/wuyue-coupon-item_2.png'"
              class="couponItem"
            >
            <img
              :src="CDNURL+'/fe/wuyue-coupon-item_3.png'"
              class="couponItem"
            >
            <img
              v-if="isBefore"
              :src="CDNURL+'/fe/wuyue-coupon-item_4.png'"
              class="couponItem"
            >
            <img
              v-else
              :src="CDNURL+'/fe/wuyue-coupon-item_5.png'"
              class="couponItem"
            >
          </div>
          <a href="https://m.mallcoo.cn/a/coupon/10658">
            <img
              :src="CDNURL+'/fe/wuyue-my-coupon-text.png'"
              class="myCouponText"
            >
          </a>
        </div>
      </div>
    </div>
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
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
import CouponRain from "@/modules/couponRain"
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [onlyWechatShare],
  components: {
    CouponRain
  },
  data() {
    return {
      CDNURL: CDNURL,
      base: CDNURL + "/fe/image/wuyueShare/",
      sprites: {
        bg: CDNURL + '/fe/game/couponrain/Background.png',
        title: CDNURL + '/fe/image/wuyueShare/title.png',
        pig: CDNURL + '/fe/image/wuyueShare/pig.png',
        logo: CDNURL + '/fe/image/wuyueShare/logo.png',
        button: CDNURL + '/fe/game/couponrain/button.png',
        buttonDown: CDNURL + '/fe/game/couponrain/down.png',
        cover: CDNURL + '/fe/game/couponrain/cover.png',
        red: CDNURL + '/fe/game/couponrain/red.png',
      },
      end: false,
      sign: "",
      qiniu_id: this.$route.query.id,
      hidden: false,
      type: 'receive',
      register: true,
      needregister: true,
      phone: "",
      vcode: "",
      time: 60,
      vcodeText: "",
      verification_key: "",
      isBefore: moment(new Date()).isBefore("2019-05-06"),
      wxShareInfoValue: {
        title: "前方高能！一大波吾悦广场红包等你疯抢！",
        desc: "拼手速，抢吾悦广场惊喜好礼",
        link: window.location.href,
        imgUrl: CDNURL + "/fe/image/wuyueShare/icon.jpg"
      }
    }
  },
  mounted() {
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
    listenGameEnd(end) {
      this.end = end
    },
    async init() {
      try {
        let { id, code, state } = this.$route.query
        let { belong, oid } = await getInfoById(id, code, state)
        this.oid = oid
        this.belong = belong
        const getCouponListArgs = {
          sign: this.sign,
          qiniu_id: this.qiniu_id,
          oid: this.oid,
          belong: this.belong
        }
        const getMallcooUserArgs = {
          sign: this.sign,
          oid: this.oid
        }
        const getCouponListResult = await getMallcooCouponInfo(getCouponListArgs)
        if (getCouponListResult) {
          this.type = "couponList";
          return
        }
        const getMallcooUserResult = await checkMallMember(getMallcooUserArgs)
        getMallcooUserResult ? this.needregister = false && this.sendMallcooCoupon() : this.needregister = true
      } catch (err) {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    },
    //微信静默授权
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
    onClickReceiveBtn() {
      this.hidden = true
      this.register = this.needregister ? true : false
    },
    sendMallcooCoupon() {
      const sendCouponArgs = {
        qiniu_id: this.qiniu_id,
        sign: this.sign,
        belong: this.belong,
        oid: this.oid
      }
      receiveMallcooCoupon(sendCouponArgs).then(res => {
        res ? this.type = "couponList" : null
      }).catch(err => {

        alert(err.response.data.message);
      })
    },
    onCountDown() {
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.vcodeText = "";
          this.time = 60;
        } else {
          this.vcodeText = '${this.time}s';
          this.time--;
        }
      }, 1000);
    },
    onGetErrorTips() {
      if (!validatePhone(this.phone)) {
        return "手机格式不正确，请重新输入";
      }
      if (!this.vcode || !/^\d{4}(\d{2})?$/.test(this.vcode)) {
        return "验证码格式错误，请重新输入";
      }
      return "";
    },

    onGetVcode() {
      console.log(this.phone)
      if (!this.phone || !validatePhone(this.phone)) {
        Toast("手机格式不正确，请重新输入");
        return;
      }
      let params = {
        phone: this.phone
      };
      sendMessageCode(params)
        .then(res => {
          this.verification_key = res.key;
          this.onCountDown();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },

    doRegister() {
      console.log('register')
      if (this.onGetErrorTips()) {
        Toast(this.onGetErrorTips());
      } else {
        let params = {
          verification_key: this.verification_key,
          verification_code: this.vcode,
          oid: this.oid,
          sign: this.sign
        };
        openMallcooMemberByPhone(params)
          .then(res => {
            this.doRegister();
          })
          .catch(err => {
            alert(err.response.data.message);
          });
      }
    }
  }
}
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  // pointer-events: none;
  // user-select: none;
  max-width: 100%;
}
.bg {
  position: relative;
  z-index: 0;
}
.warp {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  .game-group {
    position: relative;
    z-index: 0;
  }
  .no-getCoupon {
    width: 61.3%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    .couponBtn {
      width: 71.3%;
      display: block;
      position: absolute;
      bottom: 9.2%;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 99;
    }
  }
  .game-end {
    position: relative;
    z-index: 99;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url("https://cdn.xingstation.cn/fe/wuyue-coupon-bg.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    overflow: hidden;
    .loginBgBox {
      position: relative;
      width: 66.9vw;
      height: 102vw;

      .loginBg {
        width: 100%;
        height: 100%;
      }

      .phoneBox {
        position: absolute;
        top: 37.7%;
        left: 50%;
        width: 78.1%;
        height: 9.94%;
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
          font-size: 14px;
          box-sizing: border-box;
        }
      }

      .validateBox {
        position: absolute;
        top: 51.6%;
        left: 50%;
        width: 78.1%;
        height: 9.94%;
        transform: translate(-50%, 0);

        .validateBg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .validateBtn {
          position: absolute;
          top: 50%;
          right: 10px;
          width: 30.1%;
          height: 20px;
          transform: translate(0, -50%);
          font-size: 14px;

          .countDownBg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          .vcodeText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            color: #fff;
            z-index: 999;
          }
        }

        .validateInput {
          position: absolute;
          top: 50%;
          right: 38.3%;
          width: 30%;
          height: 80%;
          transform: translate(0, -50%);
          border: 0px;
          outline: none;
          font-size: 14px;
          box-sizing: border-box;
        }
      }

      .loginBtn {
        position: absolute;
        top: 79.8%;
        left: 50%;
        width: 78.1%;
        height: 9.94%;
        transform: translate(-50%, 0);
      }
    }

    .couponListBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .couponBox {
        width: 53.3vw;
        margin-top: 35vw;

        .couponItem {
          width: 100%;
          height: auto;
          margin-bottom: 10px;
        }
      }

      .myCouponText {
        width: 44.5vw;
        margin-top: 20px;
      }
    }
  }
}
</style>


