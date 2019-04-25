<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'gift_left.png'"
      class="gift1"
    >
    <img
      :src="base + 'gift_right.png'"
      class="gift2"
    >
    <img
      :src="base + 'bird.png'"
      class="bird"
    >
    <img
      :src="base + 'lipstick.png'"
      class="lipstick"
    >
    <img
      :src="base + 'envelope_bottom.png'"
      class="envelope"
    >
    <img
      :src="base + 'envelope.png'"
      class="cover"
    >
    <div class="main">
      <img
        :src="base + 'word.png'"
        class="word"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
const IMG_SERVER = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      base: IMG_SERVER + "/fe/image/sweety/",
      //分享
      wxShareInfoValue: {
        title: "你一笑，世界都变甜了",
        desc: "叮~您有一份甜蜜暴击等待签收！",
        link: "http://papi.xingstation.com/api/s/Xrk" + window.location.search,
        imgUrl: "http://cdn.xingstation.cn/fe/image/sweety/icon.jpg"
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.cn/fe/image/sweety/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #f6beb9;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
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
.warp {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-image: url("@{imgUrl}bg_1.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: repeat;
  background-color: #f6beb9;
  .gift1,
  .gift2,
  .bird,
  .lipstick {
    position: absolute;
    z-index: 999;
  }
  .gift1 {
    width: 24%;
    top: -5%;
    left: 0;
    animation: myup 0.6s linear infinite alternate;
  }
  .gift2 {
    width: 22.5%;
    top: -3%;
    right: 0;
    animation: myup 0.6s 0.2s linear infinite alternate;
  }
  .lipstick {
    width: 24%;
    top: 69%;
    left: -8%;
    animation: myrotate 0.8s linear infinite alternate;
  }
  .bird {
    width: 33%;
    top: 72%;
    right: -6%;
    animation: myrotate 0.4s linear infinite alternate-reverse;
  }
  .envelope {
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 0;
  }
  .cover {
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 9999;
  }
  .main {
    width: 74%;
    height: 100%;
    position: relative;
    background-image: url("@{imgUrl}bg_2.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: repeat;
    z-index: 9;
    .word {
      width: 81%;
      position: relative;
      z-index: 0;
      margin-top: 5%;
      margin-bottom: 5%;
    }
    .photo {
      width: 82.5%;
      position: relative;
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
      margin-bottom: 15%;
    }
  }
}
@keyframes myup {
  0% {
    transform: translateY(-2%);
  }
  100% {
    transform: translateY(5%);
  }
}
@keyframes myrotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(15deg);
  }
}
</style>



