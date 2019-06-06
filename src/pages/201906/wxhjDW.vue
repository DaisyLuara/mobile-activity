<template>
  <div class="container">
    <img
      v-if="type==='photo'"
      :src="CDNURL+'/fe/wxhj-dw-bg2.png'"
      class="bigBg"
    >
    <img
      v-else
      :src="CDNURL+'/fe/wxhj-dw-bg.png'"
      class="bigBg"
    >

    <div class="content">
      <div
        v-show="type==='login'"
        class="loginBox"
      >
        <img
          :src="CDNURL+'/fe/wxhj-dw-login-bg.png'"
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

      <div
        v-show="type==='photo'"
        class="photoBox"
      >
        <img
          :src="CDNURL+'/fe/wxhj-dw-photo-wrapper.png'"
          class="photoWrapper"
        >
        <img
          :src="userImage"
          class="photo"
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
  getInfoById,
  checkMallMember,
  sendHuiJuVCode,
  openMallcooMemberByPhone,
  validatePhone
} from "services";
import { Toast } from "mand-mobile";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
import "assets/less/reset-mand.less";
const CDNURL = process.env.CDN_URL;

export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      CDNURL: CDNURL,
      sign: "",
      oid: null,
      userImage: "",
      type: "",
      phone: "",
      vcode: "",
      verification_key: "",
      time: 60,
      disabledGetVcode: false,
      wxShareInfoValue: {
        title: "全城招募-荟聚顶粽达人挑战赛",
        desc: "点击查看好友的专属靓照",
        link: window.location.href,
        imgUrl: CDNURL + "/fe/wxhj-dw-share-icon.png"
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
        let { oid, image } = await getInfoById(id, code, state);
        this.oid = oid;
        this.userImage = image;
        let params = {
          sign: this.sign,
          oid: this.oid
        };
        const mallMember = await checkMallMember(params);
        if (mallMember) {
          this.type = "photo";
        } else {
          this.type = "login";
        }
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    },

    // 发送短信验证码
    async onGetVcode(params) {
      try {
        const vcodeRes = await sendHuiJuVCode(params);
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
          Toast.hide();
          this.type = 'photo';
        }
      } catch (err) {
        if (err.response && err.response.data) {
          Toast.hide();
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
          this.time = 60;
          this.disabledGetVcode = false;
        } else {
          this.time--;
        }
      }, 1000);
    },

    onClickGetVcode() {
      if (!validatePhone(this.phone)) {
        Toast.info('手机格式不正确，请重新输入');
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
        Toast.info(this.onGetErrorTips());
        return;
      }
      Toast.loading('照片提取中')
      let params = {
        verification_key: this.verification_key,
        verification_code: this.vcode,
        oid: this.oid,
        sign: this.sign
      };
      this.onOpenMallcooUsers(params);
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
    width: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .photoBox {
    position: relative;
    width: 86.67vw;
    margin-top: 19.53vw;

    .photoWrapper {
      position: relative;
      width: 100%;
      z-index: 999;
    }

    .photo {
      position: absolute;
      top: 2%;
      left: 50%;
      width: 69.5%;
      transform: translate(-50%, 0);
    }
  }

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

@keyframes loading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
