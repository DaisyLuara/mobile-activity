<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'city.png'+ this.$qiniuCompress()"
      :class="{'x-city':iphoneX,'city':!iphoneX}"
      class="city"
    >
    <img
      :src="baseUrl + 'line.png'+ this.$qiniuCompress()"
      class="line"
    >
    <div class="center">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        :class="{'x-frame':iphoneX,'frame':!iphoneX}"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo-real':!iphoneX}"
        class="photo-real"
      >
      <img
        :src="baseUrl + 'camera.png'+ this.$qiniuCompress()"
        class="camera"
      >
      <img
        :src="baseUrl + 'open.png'+ this.$qiniuCompress()"
        class="open"
      >
      <img
        :src="baseUrl + 'stone.png'+ this.$qiniuCompress()"
        class="stone"
      >
    </div>
    <div class="bt">
      <img
        :src="baseUrl + 'G.gif'+ this.$qiniuCompress()"
        class="jiantou"
      >
      <img
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"
      >
    </div>
  </div>
</template>
<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/fashion_manufacturing/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: '刷脸测一测，你是哪种“潮流偶像”！',
        desc: '星视度潮流制造局，等你来变身。',
        link: process.env.AD_API+'/api/s/KZn' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/fashion_manufacturing/icon.jpg'
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/fashion_manufacturing/";
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
  background-image: url("@{imageHost}bg.png");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .line {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .city {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 31%;
  }
  .x-city {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 26%;
  }
  .center {
    width: 100%;
    height: 85%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 73%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: 10%;
    }
    .x-frame {
      width: 88%;
    }
    .photo {
      width: 63.5%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: 15%;
    }
    .photo-real {
      width: 63.5%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: 15%;
      opacity: 0;
      user-select: auto;
      pointer-events: auto;
    }
    .x-photo {
      width: 77.5%;
    }
    .camera {
      width: 28%;
      position: absolute;
      left: 5%;
      top: 2%;
      animation: Tada 2s linear infinite alternate;
    }
    .open {
      width: 28%;
      position: absolute;
      right: -3%;
      top: 2%;
      animation: arrow 0.8s linear infinite alternate;
    }
    .stone {
      width: 25%;
      position: absolute;
      right: 3%;
      bottom: 0%;
      animation: scale 1.5s linear infinite alternate;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .jiantou {
      width: 7%;
      margin-top: -3%;
    }
    .save {
      width: 65%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 150%);
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(5px);
  }
}
@keyframes scale {
  from {
    transform: scale(0.8, 0.8);
  }
  50% {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.8, 0.8);
  }
}
@keyframes Tada {
  0% {
    transform: scale(1);
    transform: scale(1);
  }
  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
    transform: scale(0.9) rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
    transform: scale(1.1) rotate(3deg);
  }
  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
    transform: scale(1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }
}
</style>
