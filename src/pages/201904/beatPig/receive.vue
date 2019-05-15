<template>
  <div class="container">
    <div class="content">
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-receiveDesc.png'"
        class="receiveDesc"
      >
      <div class="inputArea">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-inputBg.png'"
          class="inputBg"
        >
        <div class="phoneBox">
          <img 
            :src="CDNURL+'/fe/wuyue-beatPig-phone.png'"
            class="phoneBg"
          >
          <input
            v-model="phone"
            type="text"
            class="phoneInput"
            placeholder="请输入手机号"
          >
          <img 
            v-if="phone"
            :src="CDNURL+'/fe/wuyue-beatPig-clearBtn.png'"
            class="clearBtn"
            @click="onClearPhone"
          >
        </div>
        
        <div class="vcodeBox">
          <img 
            :src="CDNURL+'/fe/wuyue-beatPig-vcode.png'"
            class="vcodeBg"
          >
          <input
            v-model="vcode"
            type="number"
            class="vcodeInput"
            placeholder="请输入验证码"
            @input="onChangeVcode"
          >
          <div 
            v-if="vcodeText" 
            class="getVcode">
            <img 
              :src="CDNURL+'/fe/wuyue-beatPig-countDownBg.png'"
              class="getVcode"
            >
            <span class="vcodeText">{{ vcodeText }}</span>
          </div>
          <img 
            v-else
            :src="CDNURL+'/fe/wuyue-beatPig-getVcode.png'"
            class="getVcode"
            @click="onClickGetVcode"
          >
        </div>
      </div>
      <img 
        v-if="disabledConfirm"
        :src="CDNURL+'/fe/wuyue-beatPig-confirmBtn-grey.png'"
        class="confirmBtn"
      >
      <img 
        v-else
        :src="CDNURL+'/fe/wuyue-beatPig-confirmBtn.png'"
        class="confirmBtn"
        @click="onClickConfirm"
      >
    </div>
    <img 
      :src="CDNURL+'/fe/wuyue-beatPig-bottomText.png'"
      class="bottomText"
    >
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import lottie from "lottie-web";
import { 
  validatePhone,
  sendMessageCode,
  openMallcooMemberByPhone,
  mallcooCoupons
} from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
      CDNURL: CDNURL,
			phone: "",
      vcode: "",
      verification_key: "",
			time: 60,
			vcodeText: "",
			disabledConfirm: true
    };
  },
  mounted() {
    const { sign, oid, belong } = this.$route.params
    this.sign = sign
    this.oid = oid
    this.belong = belong
  },
  methods: {
    // 发送短信验证码
    async onGetVcode(params) {
      try {
        const vcode = await sendMessageCode(params)
        if (vcode && vcode.key) {
          this.verification_key = vcode.key;
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
        const mallcooUsers = await openMallcooMemberByPhone(params)
        if (mallcooUsers) {
          const mallcooCouponsParams = {
						sign: this.sign,
						oid: this.oid,
            belong: this.belong            
          }
          const mallcooCouponsRes = await mallcooCoupons(mallcooCouponsParams)
					if (mallcooCouponsRes) {
            Toast('兑奖券码已短信形式发送至手机，请注意查收')
            this.$router.go(-1)
					}
        }
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
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
          this.vcodeText = "";
          this.time = 60;
        } else {
          this.vcodeText = this.time + 's';
          this.time--;
        }
      }, 1000);
    },

    onClearPhone() {
      this.phone = ''
    },

    onClickGetVcode() { 
			if (!validatePhone(this.phone)) {
				Toast('手机格式不正确，请重新输入')
        return;
      }
      this.onCountDown();
      let params = {
        phone: this.phone
      };
      this.onGetVcode(params);
		},
		
		onChangeVcode() {
      if (this.onGetErrorTips()) {
        this.disabledConfirm = true;
        return;
      }
      this.disabledConfirm = false;
    },

    onClickConfirm() {
      if (this.onGetErrorTips()) {
        Toast(this.onGetErrorTips())
        return;
      }
      const params = {
        verification_key: this.verification_key,
        verification_code: this.vcode,
        sign: this.sign,
        oid: this.oid
      }
      this.onOpenMallcooUsers(params)
    }
	}
};
</script>
<style lang="less" scoped>
@base: "http://cdn.xingstation.cn";
@font-face {
  font-family: "HKYT";
  src: url("@{base}/fe/font/HKYTW9.TTF");
  font-weight: normal;
  font-style: normal;
}
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

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #7E100E;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #7E100E;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #7E100E;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #7E100E#7E100E;
}

.container {
  display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
  width: 100%;
	height: 100vh;
	padding: 16.85vw 7.59vw 5.46vw;
	overflow: hidden;
	background-color: #FC9715;

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		.receiveDesc {
			width: 77.04vw;
			height: auto;
			margin-bottom: 5.56vw;
		}

		.inputArea {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: auto;
			margin: 5.56vw 0 7.5vw;

			.inputBg {
				width: 100%;
				height: auto;
			}

			.phoneBox {
				display: flex;
				align-items: flex-end;
				position: absolute;
				top: 16.86%;
				left: 50%;
				width: 67.69vw;
				height: auto;
				margin-bottom: 4.91vw;
				transform: translate(-50% ,0);

				.phoneBg {
					width: 100%;
					height: auto;
				}

				.phoneInput {
          position: absolute;
          left: 17.65%;
					bottom: 0;
					width: 70%;
					height: 70%;
					padding: 2% 0 3%;
					border: 0px;
					outline: none;
					text-align: left;
					font-size: 12px;
					color: #7E100E;
          box-sizing: border-box;      
          background: transparent;
        }
        
        .clearBtn {
          position: absolute;
          bottom: 25.41%;
          right: 4.92%;
          width: 3.7vw;
          height: auto;
        }
			}

			.vcodeBox {
				display: flex;
				align-items: flex-end;
				position: absolute;
				bottom: 16.05%;
				left: 50%;
				width: 67.69vw;
				height: auto;
				transform: translate(-50% ,0);

				.vcodeBg {
					width: 43vw;
					margin-right: 3px;
				}

				.vcodeInput {
          position: absolute;
					left: 0;
					bottom: 0;
					width: 43vw;
					height: 70%;
					padding: 2% 9.56% 3%;
					border: 0px;
					outline: none;
					text-align: left;
					font-size: 12px;
					color: #7E100E;
          box-sizing: border-box;      
          background: transparent;
				}

				.getVcode {
					position: relative;
					width: 24.07vw;
					height: auto;
				}

				.vcodeText {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-family: 'HKYT';
					font-size: 14px;
					color: #fff
				}
			}
		}

		.confirmBtn {
			width: 40vw;
			height: auto;
		}
	}

	.bottomText {
		align-self: center;
		width: 49.81vw;
		height: auto;
	}
}
</style>


