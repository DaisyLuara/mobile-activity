<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.png'"
      :style="style.root"
      :class="{isMoveBg:isMovebg}"
      class="bg"
    >
    <div
      :class="{isMoveEnter:isMove}"
      class="enter"
    >
      <img
        :src="baseUrl + 'enter.png'"
        class="enter-bg"
      >
      <div
        class="input-area"
        @click="clearError"
      >
        <img
          :src="baseUrl + 'b.png'"
          class="input-bg"
        >
        <img
          v-show="status.isPhoneError"
          :src="baseUrl + 'error.png'"
          class="input-error"
        >
        <input
          ref="inputreal"
          v-model="phoneValue"
          maxlength="11"
          class="input-value"
        >
        <img
          v-if="status.shouldInputRemindShow"
          :src="baseUrl + 'phone.png'"
          class="input-rel"
        >
      </div>
      <div
        class="button"
        @click="checkPhoneValue"
      >
        <img
          :src="baseUrl + 'a.png'"
          class="remind-bt"
        >
      </div>
    </div>
  </div>
</template>
<script>
const wih = window.innerHeight;
const wiw = window.innerWidth;
const baseUrl =
  "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/zoo/";
import { $wechat, wechatShareTrack, isInWechat } from "services";
import { normalPages } from "@/mixins/normalPages";
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: baseUrl,
      style: {
        root: {
          height: wih + "px"
        }
      },
      isMovebg: false,
      isMove: false,
      phoneValue: null,
      mobile: "mobile",
      status: {
        isPhoneError: false,
        shouldInputRemindShow: true,
        step: "input"
      },
      wxShareInfoValue: {
        title: "动物去哪了",
        desc: "让我们去动物园吧",
        imgUrl: baseUrl + "share.png"
      }
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {},
  methods: {
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
      if (localStorage.getItem(this.mobile) != null) {
        this.redirct();
      }
    },
    //清空数据
    clearError() {
      this.status.isPhoneError = false;
      this.status.shouldInputRemindShow = false;
      this.$refs.inputreal.focus();
    },
    //跳转操作
    redirct() {
      let id = this.$route.query.id;
      this.isMove = true;
      this.isMovebg = true;
      this.phoneValue = "";
      this.status.shouldInputRemindShow = true;
      setTimeout(() => {
        window.location.href =
          window.location.origin +
          "/marketing/zoo_result?id=" +
          id +
          "&mobileNum=" +
          localStorage.getItem(this.mobile);
      }, 1000);
    },
    //校验手机号
    checkPhoneValue() {
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.status.isPhoneError = true;
        this.status.shouldInputRemindShow = false;
        this.phoneValue = "";
        return;
      } else {
        localStorage.setItem(this.mobile, this.phoneValue);
        this.handleTrack();
        this.redirct();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #062313;
  user-select: none;
  .bg {
    width: 100%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
  }
  .enter {
    width: 100%;
    height: 50%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    z-index: 2;
    .enter-bg {
      width: 100%;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -52%);
    }
    .input-area {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 3;
      transform: translate(-50%, -50%);
      .input-bg {
        width: 90%;
        -webkit-touch-callout: none;
        user-select: none;
        pointer-events: none;
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
        color: #fff;
      }
      .input-error {
        width: 62%;
        position: absolute;
        left: 19%;
        top: 28%;
      }
      .input-rel {
        width: 50%;
        position: absolute;
        left: 26%;
        top: 28%;
      }
    }
    .button {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 3;
      transform: translate(-50%, 70%);
      .remind-bt {
        width: 90%;
        -webkit-touch-callout: none;
        user-select: none;
        pointer-events: none;
      }
    }
  }
  .isMoveBg {
    animation: moveBg 3s ease-out alternate;
  }
  .isMoveEnter {
    animation: moveEnter 3s ease-out alternate;
  }
}
@keyframes moveBg {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(5);
  }
}
@keyframes moveEnter {
  0% {
    transform: translate(-50%, -70%);
  }
  100% {
    transform: translate(-50%, -290%);
  }
}
</style>
