<template>
  <div class="warp">
    <img
      :src="base + 'bg1.png'"
      class="bg"
    >
    <div class="main">
      <img
        :src="base + 'bg2.png'"
        class="bg"
      >
      <div class="picture">
        <img
          :src="base + 'frame.png'"
          class="bg"
        >
        <img
          :src="photo + this.$qiniuCompress()"
          class="photo"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/bing/',
      //微信分享
      wxShareInfoValue: {
        title: "冰爽假年华，等你来挑战",
        desc: "快来看看好友的萌照！",
        link: 'http://papi.xingstation.com/api/s/Z0E' + window.location.search,
        imgUrl: CDN_URL + "/fe/image/bing/icon.jpg"
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
      width: 63.5%;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      .photo {
        width: 92.5%;
        position: absolute;
        top: 49.5%;
        left: 49.5%;
        transform: translate(-50%, -50%);
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
    }
    .save {
      width: 42.5%;
      position: relative;
      margin: 4% auto;
    }
  }
}
</style>
