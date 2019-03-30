<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'float_1.png'+ this.$qiniuCompress()"
      class="floatLeft  animated  linear infinite  tada"
    >
    <img
      :src="baseUrl + 'float_2.png'+ this.$qiniuCompress()"
      class="floatRight animated  linear infinite  tada"
    >
    <img
      :src="baseUrl + 'float_3.png'+ this.$qiniuCompress()"
      :class="{'x-floatBottom':iphoneX,'floatBottom':!iphoneX}"
      class="floatBottom animated  linear infinite  tada"
    >
    <div class="top">
      <img
        :src="baseUrl + 'title.png'+ this.$qiniuCompress()"
        class="title"
      >
    </div>
    <div class="center">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        :class="{'x-frame':iphoneX,'frame':!iphoneX}"
        class="frame"
      >
      <img
        :src="baseUrl + 'spot.png'+ this.$qiniuCompress()"
        class="spot"
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
    </div>
    <div class="bottom">
      <img
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        :class="{'x-nav':iphoneX,'nav':!iphoneX}"
        class="nav"
      >
      <img
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="bottomImg"
      >
      <img
        :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
        :class="{'x-save':iphoneX,'save':!iphoneX}"
        class="save"
      >
    </div>
  </div>
</template>
<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
import 'animate.css'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/turn_world/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: '翻转世界遇见你',
        desc: '一个世间独一无二的你',
        link: 'http://papi.xingstation.com/api/s/OyN' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/turn_world/icon.png'
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
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/turn_world/";
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
  background-color: #0b0422;
  .floatLeft {
    width: 15%;
    position: absolute;
    left: 3.5%;
    top: 9%;
    z-index: 99;
  }
  .floatRight {
    width: 20%;
    position: absolute;
    right: -2%;
    top: 50%;
    z-index: 99;
  }
  .floatBottom {
    width: 18%;
    position: absolute;
    left: 1.5%;
    bottom: 0%;
    z-index: 101;
  }
  .x-floatBottom {
    bottom: 4%;
  }
  .top {
    width: 100%;
    height: 20%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .title {
      width: 82%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      z-index: 9;
    }
  }
  .center {
    width: 100%;
    position: relative;
    margin-top: -12%;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 82%;
      position: absolute;
      left: 52%;
      top: 0;
      transform: translate(-50%, 0);
    }
    .x-frame {
      width: 90%;
    }
    .spot {
      width: 100%;
      position: absolute;
      left: 0%;
      top: 0;
      z-index: 10;
    }
    .photo {
      width: 68%;
      position: absolute;
      left: 47%;
      top: 0;
      transform: translate(-50%, 0);
      margin-top: 2%;
    }
    .photo-real {
      width: 68%;
      position: absolute;
      left: 47%;
      top: 0;
      transform: translate(-50%, 0);
      margin-top: 2%;
      user-select: auto;
      pointer-events: auto;
      opacity: 0;
    }
    .x-photo {
      width: 75%;
      left: 46.5%;
    }
  }
  .bottom {
    width: 100%;
    height: 10%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: none;
    user-select: none;
    .bottomImg {
      width: 100%;
      margin-top: -10%;
    }
    .nav {
      width: 15%;
      display: block;
      position: absolute;
      left: 40%;
      top: -16%;
      animation: arrow 0.8s linear infinite alternate;
    }
    .x-nav {
      top: -64%;
    }
    .save {
      width: 55%;
      display: block;
      position: absolute;
      left: 22%;
      top: 45%;
      animation: arrow 0.8s linear infinite alternate;
    }
    .x-save {
      top: -1%;
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
</style>
