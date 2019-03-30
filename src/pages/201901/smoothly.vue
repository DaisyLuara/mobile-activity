<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="contain">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="baseUrl + 'cloud01.png'+ this.$qiniuCompress()"
        class="cloudOne"
      >
      <img
        :src="baseUrl + 'cloud02.png'+ this.$qiniuCompress()"
        class="cloudTwo"
      >
      <img
        :src="baseUrl + 'cloud03.png'+ this.$qiniuCompress()"
        class="cloudThree"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="baseUrl + 'text.png'+ this.$qiniuCompress()"
      class="text"
    >
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/pig_smoothly/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      wxShareInfoValue: {
        title: "如意，如意，随我心意",
        desc: "猪年大吉，快快显灵",
        link: "http://papi.xingstation.com/api/s/JND" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/pig_smoothly/icon.png"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/pig_smoothly/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}back.jpg");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .contain {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 80%;
    }
    .photo {
      width: 67.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      user-select: auto;
    }
    .cloudOne {
      width: 32%;
      position: absolute;
      left: -9%;
      top: -3%;
      z-index: 99;
      animation: arrow 0.5s linear infinite alternate;
    }
    .cloudTwo {
      width: 18%;
      position: absolute;
      right: 0%;
      bottom: 15%;
      z-index: 99;
    }
    .cloudThree {
      width: 25%;
      position: absolute;
      right: -0%;
      bottom: 4%;
      z-index: 99;
    }
  }
  .text {
    width: 64%;
    position: relative;
    margin-top: -5%;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
