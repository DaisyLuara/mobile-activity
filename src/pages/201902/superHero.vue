<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'bg.png'"
        class="bg"
      >
      <img
        :src="photo"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from "@/mixins/normalPages";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + '/fe/image/superHero/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      wxShareInfoValue: {
        title: '刷脸测一测，你的隐藏超级英雄属性是？',
        desc: '拯救地球的重担，今后就交给你了！',
        link: 'http://papi.xingstation.com/api/s/3yr' + window.location.search,
        imgUrl: CDNURL + '/fe/image/superHero/icon.jpg'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/superHero/";
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
.warp {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #000;
  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    .bg {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 75%;
      position: absolute;
      top: 23.4%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      border-radius: 5px;
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>


