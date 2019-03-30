<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
      class="bg"
    >
    <img
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="top"
    >
    <img
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="bottom"
    >
    <img
      :src="baseUrl + 'kuang.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame"
    >
    <img
      v-if="photo !== null"
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo"
    >
    <!-- 云 -->
    <img
      :src="baseUrl + 'cloud_1.png'+ this.$qiniuCompress()"
      class="cloud-1"
    >
    <img
      :src="baseUrl + 'cloud_2.png'+ this.$qiniuCompress()"
      class="cloud-2"
    >
    <img
      :src="baseUrl + 'cloud_3.png'+ this.$qiniuCompress()"
      class="cloud-3"
    >
    <!-- 蝴蝶 -->
    <img
      :src="baseUrl + 'hudie_1.png'+ this.$qiniuCompress()"
      class="hudie-1"
    >
    <img
      :src="baseUrl + 'hudie_2.png'+ this.$qiniuCompress()"
      class="hudie-2"
    >
    <img
      :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
      class="nav"
    >
    <img
      :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
      class="prompt"
    >
    <img
      :src="baseUrl + 'flower.png'+ this.$qiniuCompress()"
      class="flower"
    >
  </div>
</template>
<script>
import { normalPages } from "../../mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/muming/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "穿越仙境 爱意暖冬",
        desc: "点击领取专属照片",
        link: "http://papi.xingstation.com/api/s/ZY6" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/muming/icon.png",
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/muming/";
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
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #ee658c;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .top {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  .frame {
    width: 74%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    z-index: 2;
  }
  .x-frame {
    width: 86%;
  }
  .photo {
    width: 71%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    z-index: 99;
    pointer-events: auto;
    user-select: auto;
  }
  .x-photo {
    width: 82%;
    transform: translate(-49.9%, -52%);
  }
  .cloud-1 {
    width: 30%;
    position: absolute;
    left: 3%;
    top: 20%;
    z-index: 100;
    animation: cloudLeft 1s linear infinite alternate;
  }
  .cloud-2 {
    width: 32%;
    position: absolute;
    left: -7%;
    top: 64%;
    z-index: 100;
    animation: cloudLeft 1s linear infinite alternate;
  }
  .cloud-3 {
    width: 34%;
    position: absolute;
    right: -10%;
    top: 30%;
    z-index: 100;
    animation: cloudRight 1s linear infinite alternate;
  }
  .hudie-1 {
    width: 20%;
    position: absolute;
    left: 0%;
    top: 33%;
    z-index: 100;
    animation: arrow 0.8s linear infinite alternate;
  }
  .hudie-2 {
    width: 20%;
    position: absolute;
    right: 0%;
    top: 60%;
    z-index: 100;
    animation: arrow 0.8s linear infinite alternate;
  }
  .nav {
    width: 23%;
    position: absolute;
    left: 37%;
    bottom: 4%;
    z-index: 1001;
    animation: arrow 0.8s linear infinite alternate;
  }
  .prompt {
    width: 60%;
    position: absolute;
    left: 21%;
    bottom: 2%;
    z-index: 1001;
    animation: arrow 0.8s linear infinite alternate;
  }
  .flower {
    width: 13%;
    position: absolute;
    right: 12%;
    bottom: 1%;
    z-index: 3;
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
@keyframes cloudLeft {
  0% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(10px);
  }
}
@keyframes cloudRight {
  0% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
}
@keyframes fly {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-200px);
  }
}
</style>
