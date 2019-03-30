<template>
  <div class="content">
    <div class="one">
      <img
        :src="base + 'img1.png'"
        class="bg"
      >
      <img
        :src="base + 'candy1.png'"
        class="candy1 animated linear infinite tada"
      >
      <img
        :src="base + 'candy2.png'"
        class="candy2 animated linear infinite tada"
      >
      <img
        :src="base + 'bell.png'"
        class="bell animated linear infinite tada"
      >
    </div>
    <div class="two">
      <img
        :src="base + 'img2.png'"
        class="bg"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        :src="base + 'note.png'"
        class="note"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
import "animate.css";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/baolichm/",
      //微信分享
      wxShareInfoValue: {
        title: "宝贝，你的圣诞礼物",
        desc: "慈溪保利，圣诞有礼",
        link: "http://papi.xingstation.com/api/s/2xv" + window.location.search,
        imgUrl: CDNURL + "/fe/image/baolichm/share.png",
      }
    };
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.exe666.com/fe/image/baolichm/";
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
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  .one {
    width: 100%;
    position: relative;
    .bg {
      position: relative;
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
    .candy1 {
      position: absolute;
      width: 24.5%;
      top: 25%;
      right: -4%;
      z-index: 99;
    }
    .candy2 {
      position: absolute;
      width: 17%;
      top: 54%;
      right: 0%;
      z-index: 99;
    }
    .bell {
      position: absolute;
      width: 30%;
      top: 91%;
      left: -6%;
      z-index: 99;
    }
  }
  .two {
    width: 100%;
    position: relative;
    .bg {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 69%;
      position: absolute;
      top: 6.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
    .note {
      width: 47%;
      position: absolute;
      top: 84%;
      left: 26.5%;
      z-index: 99;
      animation: myup 0.6s linear infinite alternate;
    }
  }
}
@keyframes myshake {
  0% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
@keyframes myup {
  0% {
    transform: translate(0, 10px);
  }
  100% {
    transform: translate(0, -10px);
  }
}
@keyframes myleft {
  0% {
    transform: translate(10px, 10px);
  }
  100% {
    transform: translate(-10px, -10px);
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


