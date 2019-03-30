<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="top">
      <a href="http://papi.xingstation.com/api/s/ql3">
        <img :src="base + 'egg.png'">
      </a>
    </div>
    <div class="main">
      <img
        :src="base +'bg.png'"
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
      base: CDNURL + '/fe/image/yun/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      wxShareInfoValue: {
        title: '快快领取 新年红包',
        desc: '金猪送福 新年大吉',
        link: 'http://papi.xingstation.com/api/s/7pw' + window.location.search,
        imgUrl: CDNURL + '/fe/image/luwan/share.png'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/yun/";
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
  width: 100%;
  overflow: hidden;
  background-color: #ffde1d;
  .top {
    position: relative;
    z-index: 0;
    width: 100%;
    background-color: #bc0206;
    a {
      display: inline-block;
      width: 90%;
      animation: bigger 0.7s linear infinite alternate;
      margin: 0 auto;
    }
  }
  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    .bg {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 57.5%;
      position: absolute;
      top: 32.6%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
      z-index: 999;
    }
  }
}
@keyframes bigger {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
</style>


