<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg"
    >
    <img
      :src="baseUrl + 'lantern_left.png'+ this.$qiniuCompress()"
      class="lantern-l animated linear infinite swing"
    >
    <img
      :src="baseUrl + 'lantern_right.png'+ this.$qiniuCompress()"
      class="lantern-r animated linear infinite swing"
    >
    <img
      :src="baseUrl + 'blessing_left.png'+ this.$qiniuCompress()"
      class="blessing-l"
    >
    <img
      :src="baseUrl + 'blessing_right.png'+ this.$qiniuCompress()"
      class="blessing-r"
    >
    <div class="center">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="real-photo"
      >

    </div>
    <div class="bt">
      <img
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="btImg"
      >
      <img
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav"
      >
      <img
        :src="baseUrl + 'hammer_left.png'+ this.$qiniuCompress()"
        class="left"
      >
      <img
        :src="baseUrl + 'hammer_right.png'+ this.$qiniuCompress()"
        class="right"
      >
    </div>
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
import 'animate.css'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/luck/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      wxShareInfoValue: {
        title: "新年运势",
        desc: "2019锦鲤非你莫属！",
        link: "http://papi.xingstation.com/api/s/462" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/luck/icon.jpg"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/luck/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  font-size: 10px;
}
* {
  padding: 0;
  margin: 0;
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
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  .topImg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
  }
  .lantern-l {
    width: 20%;
    position: absolute;
    left: -6%;
    top: 10%;
    z-index: 9;
    animation-duration: 8s;
  }
  .lantern-r {
    width: 20%;
    position: absolute;
    right: -6%;
    top: 10%;
    z-index: 9;
    animation-duration: 8s;
  }
  .blessing-l {
    width: 16%;
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 9;
  }
  .blessing-r {
    width: 16%;
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 9;
  }
  .center {
    width: 80%;
    margin-top: 15%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 100%;
    }
    .photo {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: 10%;
    }
    .real-photo {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: 10%;
      opacity: 0;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .bt {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    pointer-events: none;
    user-select: none;
    .btImg {
      width: 100%;
    }
    .nav {
      width: 22%;
      position: absolute;
      left: 39%;
      top: -6%;
      animation: arrow 0.5s linear infinite alternate;
    }
    .left {
      width: 27%;
      position: absolute;
      left: 15%;
      top: 9%;
      animation-name: hammerLeft;
      animation-duration: 0.5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    }
    .right {
      width: 26%;
      position: absolute;
      right: 16%;
      top: 5%;
      animation-name: hammerRight;
      animation-duration: 0.5s;
      animation-timing-function: linear;
      animation-delay: 0.3s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    }
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
@keyframes hammerLeft {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(4px);
  }
}
@keyframes hammerRight {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(4px);
  }
}
</style>
