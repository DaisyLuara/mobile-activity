<template>
  <div class="warp">
    <Dreamland
      v-if="isMember"
      :link="link"
    />
    <div
      v-else
      class="mask"
    >
      <div class="form">
        <img
          :src="base + 'regbg.png'"
          class="bg"
        >
        <input
          id="phone"
          v-model="phone"
          type="text"
          maxlength="11"
          class="phone"
          @change="checkPhone"
        >
        <input
          id="vertify"
          v-model="vcode"
          type="text"
          maxlength="4"
          class="vertify"
        >
        <div
          class="vertify-text"
          @click="onGetVcode"
        >
          {{ vcodeText }}
        </div>
        <a
          class="confirm"
          @click="doRegister"
        >
          <img :src="base + 'confirm.png'">
        </a>
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
  checkMallMember,
  sendMessageCode,
  openMallcooMemberByPhone,
  validatePhone
} from "services";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
import Dreamland from '@/modules/dreamLand'
const CDNURL = process.env.CDN_URL;
export default {
  components: { Dreamland },
  mixins: [onlyWechatShare],
  data () {
    return {
      base: CDNURL + '/fe/image/kaika/',
      oid: null,
      sign: '',
      isMember: false,
      phone: "",
      vcode: "",
      time: 60,
      vcodeText: "获取验证码",
      verification_key: "",
      link: 'http://papi.xingstation.com/api/s/wkm' + window.location.search,
    }
  },
  mounted () {
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
    async init () {
      try {
        let { id, code, state } = this.$route.query
        let { belong, oid, image } = await getInfoById(id, code, state)
        this.oid = oid
        const getMallcooUserArgs = {
          sign: this.sign,
          oid: this.oid
        }
        const getMallcooUserResult = await checkMallMember(getMallcooUserArgs)
        if (getMallcooUserResult) {
          this.isMember = true
        }
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
      }
    },
    //微信静默授权
    handleWechatAuth () {
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
    onClickReceiveBtn () {
      this.index = false
    },
    checkPhone () {
      if (!this.phone || !validatePhone(this.phone)) {
        alert("手机格式不正确，请重新输入");
      }
    },
    onCountDown () {
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.vcodeText = "60s后重发";
          this.time = 60;
        } else {
          this.vcodeText = this.time + 's后重发';
          this.time--;
        }
      }, 1000);
    },
    onGetVcode () {
      if (this.vcodeText !== '获取验证码') {
        return
      }
      if (!this.phone) {
        alert("请输入手机号码");
        return;
      }
      if (!validatePhone(this.phone)) {
        alert("手机格式不正确，请重新输入");
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
    doRegister () {
      if (!this.phone) {
        alert("请输入手机号码");
        return;
      }
      if (!validatePhone(this.phone)) {
        alert("手机格式不正确，请重新输入");
        return;
      }
      if (!this.vcode) {
        alert("请输入验证码");
        return;
      }
      let params = {
        verification_key: this.verification_key,
        verification_code: this.vcode,
        oid: this.oid,
        sign: this.sign
      };
      openMallcooMemberByPhone(params)
        .then(res => {
          this.isMember = true
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/fe/image/kaika/";
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
  max-width: 100%;
}
.bg {
  position: relative;
  z-index: 0;
}
a {
  display: inline-block;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.warp {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  .mask {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0%;
    left: 0%;
    overflow: hidden;
    z-index: 99;
    background-image: url("@{img}back.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    .form {
      width: 100%;
      position: relative;
      input {
        background: transparent;
        .center;
        height: 8vw;
        line-height: 8vw;
        text-align: left;
        color: #956d5b;
        font-size: 4vw;
        z-index: 99;
      }
      .phone {
        position: absolute;
        top: 43%;
        left: 58%;
        width: 33%;
      }
      .vertify {
        position: absolute;
        left: 46%;
        top: 51.5%;
        width: 15%;
      }
      .vertify-text {
        position: absolute;
        right: 27%;
        top: 51.5%;
        width: 15%;
        height: 9vw;
        line-height: 9vw;
        text-align: center;
        color: #956d5b;
        font-size: 2.6vw;
        z-index: 99;
      }
      .confirm {
        width: 33%;
        .center;
        bottom: 20%;
        z-index: 99;
      }
    }
  }
}
</style>


