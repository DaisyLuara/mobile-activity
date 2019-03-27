<template>
  <div class="warp">
    <img
      :src="bgData"
      class="bg"
    >
    <div class="main">
      <div class="picture">
        <img
          :src="base + 'c1.png'"
          class="c1"
        >
        <img
          :src="base + 'c2.png'"
          class="c2"
        >
        <img
          :src="photo + this.$qiniuCompress()"
          class="photo"
        >
      </div>
      <img
        v-show="Boolean(photo)"
        :src="base + 'c3.png'"
        class="c3"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'save.png'"
        class="save"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  props: {
    bgData: {
      type: String,
      required: false,
      default: CDN_URL + '/fe/image/summer_dress/back.png'
    },
    linkData: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      base: CDN_URL + '/fe/image/summer_dress/',
      //微信分享
      wxShareInfoValue: {
        title: "狂欢夏日趴，尬舞玩一夏",
        desc: "星视度邀你嗨玩美陈展。",
        link: this.linkData,
        imgUrl: CDN_URL + "/fe/image/summer_dress/icon.jpg"
      }
    }
  }
}
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  width: 100%;
  overflow: hidden;
  position: relative;
  .bg {
    position: relative;
    z-index: 0;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0%;
    overflow: hidden;
    z-index: 9;
    .picture {
      position: relative;
      width: 56.8%;
      z-index: 0;
      margin-top: 11%;
      .c1 {
        width: 22vw;
        position: absolute;
        top: -10%;
        left: -31%;
        z-index: 99;
      }
      .c2 {
        width: 21.2vw;
        position: absolute;
        top: 50%;
        right: -31%;
        transform: translateY(-50%);
        z-index: 99;
      }
      .photo {
        position: relative;
        z-index: 0;
        pointer-events: auto;
        user-select: auto;
        border-radius: 20px;
      }
    }
    .c3 {
      margin-top: 3%;
      display: block;
      width: 4.6%;
      position: relative;
      animation: arrow 1.2s linear infinite alternate;
    }
    .save {
      width: 42.5%;
      position: relative;
      margin: 4% auto;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
</style>
