<template>
  <div class="container">
    <div 
      v-show="type==='couponList' && showModal" 
      class="modalBox"
    >
      <div 
        class="modalSpace" 
        @click="onCloseModal"
      />
      <img
        :src="CDNURL+'/fe/wuyue-share-bg.png'"
        class="modalImg"
      >
    </div>
    <div 
      v-show="showLoading" 
      class="loadingBox"
    >
      <img 
        :src="CDNURL+'/fe/wuyue-loading-icon.png'" 
        class="loadingIcon"
      >
    </div>
    <div
      v-show="type==='receive'"
      class="couponBgBox"
    >
      <img
        :src="CDNURL+'/fe/wuyue-receive-coupons.png'"
        class="couponBg"
      >
      <img
        :src="CDNURL+'/fe/wuyue-receive-btn.png'"
        class="couponBtn"
        @click="onClickReceiveBtn"
      >
    </div>

    <div
      v-show="type==='login'"
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
        @click="onLogin"
      >
    </div>

    <div
      v-show="type==='couponList'"
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
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
			CDNURL: CDNURL,
			showModal: true,
			showLoading: false,
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
			
      isBefore: moment(new Date()).isBefore("2019-05-06"),
      wxShareInfoValue: {
        title: "前方高能！一大波吾悦广场红包等你疯抢！",
        desc: "拼手速，抢吾悦广场惊喜好礼",
        link: process.env.M_URL + '/marketing/wuyue_share' + window.location.search,
        imgUrl: CDNURL + "/fe/image/wuyueShare/icon.jpg"
      }
    };
  },
  mounted() {
    this.init()
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
        let { id, code, state } = this.$route.query
        let { belong, oid } = await getInfoById(id, code, state)
        this.oid = oid
        this.belong = belong
        this.wxShareInfoValue.link += '&qiniu_id=' + this.qiniu_id + '&oid=' + this.oid + '&belong=' + this.belong
        this.onGetMallcooCouponInfo()
      } catch (err) {
        if (err.response.data) {
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
					this.showLoading = false;
          this.type = "couponList";
        })
        .catch(err => {
					this.showLoading = false;
					if (err.response.data.status_code === 429) {
						this.type = "couponList";
						return;
					}
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
          this.vcodeText = this.time + 's';
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
			this.onCountDown();
      let params = {
        phone: this.phone
      };
      sendMessageCode(params)
        .then(res => {
          this.verification_key = res.key;
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
				this.showLoading = true;
        openMallcooMemberByPhone(params)
          .then(res => {
            this.onReceiveCoupon();
          })
          .catch(err => {
						alert(err.response.data.message);
						this.showLoading = false;
          });
      }
		},
		
		onCloseModal() {
			this.showModal = false
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
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
	overflow: hidden;
	
	.modalBox {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;

		.modalSpace {
			flex: 1
		}
		.modalImg {
			position: absolute;
			top: 3%;
			left: 50%;
			width: 85%;
			transform: translate(-50%, 0);
		}
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
				text-align: left;
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
				text-align: left;
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
		z-index: 1;

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

@keyframes loading {
	0% {
			transform: rotate(0deg);
	}

	100% {
			transform: rotate(360deg);
	}

}
</style>


