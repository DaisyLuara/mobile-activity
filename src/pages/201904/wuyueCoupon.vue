<template>
  <div class="container"> 
    <div 
      v-if="type==='receive'" 
      class="couponBgBox">
      <img 
        :src="`${cdnUrl}/fe/wuyue-receive-coupon.png`" 
        class="couponBg" >
      <img 
        :src="`${cdnUrl}/fe/wuyue-receive-btn.png`" 
        class="couponBtn" 
        @click="onClickReceiveBtn" >
    </div>

    <div 
      v-else-if="type==='login'" 
      class="loginBgBox">
      <img 
        :src="`${cdnUrl}/fe/wuyue-login-bg.png`" 
        class="loginBg" >
      <div class="phoneBox">
        <img 
          :src="`${cdnUrl}/fe/wuyue-login-phone-bg.png`" 
          class="phoneBg" >
        <input 
          v-model="phone" 
          type="text" 
          class="phoneInput" >
      </div>
      <div class="validateBox">
        <img 
          :src="`${cdnUrl}/fe/wuyue-login-validate-bg.png`" 
          class="validateBg" >
        <input 
          v-model="vcode" 
          type="number" 
          class="validateInput" >		
        <div 
          v-if="vcodeText" 
          class="validateBtn">
          <img
            :src="`${cdnUrl}/fe/wuyue-count-down-box.png`"	 
            class="countDownBg" 
          >
          <span class="vcodeText">{{ vcodeText }}</span>  
        </div>			
        <img
          v-else
          :src="`${cdnUrl}/fe/wuyue-get-validate-box.png`"					 
          class="validateBtn" 
          @click="onGetVcode"
        >		
      </div>
      <img 
        :src="`${cdnUrl}/fe/wuyue-login-btn.png`" 
        class="loginBtn" 
        @click="onLogin" >
    </div>

    <div 
      v-else 
      class="couponListBox">
      <div class="couponBox">
        <img 
          :src="`${cdnUrl}/fe/wuyue-coupon-item_1.png`" 
          class="couponItem" >
        <img 
          :src="`${cdnUrl}/fe/wuyue-coupon-item_2.png`" 
          class="couponItem" >
        <img 
          :src="`${cdnUrl}/fe/wuyue-coupon-item_3.png`" 
          class="couponItem" >
        <img 
          v-if="isBefore" 
          :src="`${cdnUrl}/fe/wuyue-coupon-item_4.png`" 
          class="couponItem" >
        <img 
          v-else 
          :src="`${cdnUrl}/fe/wuyue-coupon-item_5.png`" 
          class="couponItem" >
      </div>
      <a href="https://m.mallcoo.cn/a/coupon/10658">
        <img 
          :src="`${cdnUrl}/fe/wuyue-my-coupon-text.png`" 
          class="myCouponText" >
      </a>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import {
	Cookies,
	getInfoById,
  getMallcooCouponInfo,
  checkMallMember,
  receiveMallcooCoupon,
  sendMessageCode,
	openMallcooMemberByPhone,
	validatePhone
} from "services";
import moment from "moment";
export default {
  data() {
    return {
      cdnUrl: process.env.CDN_URL,
      sign: "",
			qiniu_id: this.$route.query.id,
			oid: null,
			belong: "",
      type: "",
      phone: "",
      vcode: "",
      time: 60,
      vcodeText: "",
      verification_key: "",
      isBefore: moment(new Date()).isBefore("2019-05-06")
    };
  },
  mounted() {
		this.init()
	},
  methods: {
		async init() {
			this.sign = Cookies.get('sign')
      try {
				let { id, code, state } = this.$route.query
				let { belong, oid } = await getInfoById(id, code, state)
				this.oid = oid
				this.belong = belong
				this.onGetMallcooCouponInfo()
      } catch (err) {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      }
		},
		
    onGetMallcooCouponInfo() {
      let params = {
        sign: this.sign,
        qiniu_id: this.qiniu_id,
        oid: this.oid,
        belong: this.belong
      }
      getMallcooCouponInfo(params)
        .then(res => {
          if (res) {
            this.type = "couponList";
          } else {
            this.type = "receive";
          }
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },

    onGetMallcooUserInfo() {
      let params = {
        sign: this.sign,
        oid: this.oid
      };
      checkMallMember(params)
        .then(res => {
          if (res) {
            this.onReceiveCoupon();
          } else {
            this.type = "login";
          }
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },

    onReceiveCoupon() {
      let params = {
        qiniu_id: this.qiniu_id,
        sign: this.sign,
        belong: this.belong,
        oid: this.oid
      };
      receiveMallcooCoupon(params)
        .then(res => {
          this.type = "couponList";
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },

    onClickReceiveBtn() {
      this.onGetMallcooUserInfo();
    },

    onCountDown() {
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.vcodeText = "";
          this.time = 60;
        } else {
          this.vcodeText = `${this.time}s`;
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

    onLogin() {
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
            this.onReceiveCoupon();
          })
          .catch(err => {
            alert(err.response.data.message);
          });
      }
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
a {
  text-decoration: none;
  outline: none;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("https://cdn.xingstation.cn/fe/wuyue-coupon-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  overflow: hidden;

  .couponBgBox {
    position: relative;
    width: 61.3vw;
    height: 94.7vw;

    .couponBg {
      width: 100%;
      height: 100%;
    }

    .couponBtn {
      position: absolute;
      bottom: 9.2%;
      left: 50%;
      transform: translate(-50%, 0);
      width: 71.3%;
      height: auto;
    }
  }

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
</style>


