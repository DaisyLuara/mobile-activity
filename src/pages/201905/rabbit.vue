<template>
  <div class="warp">
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
    <div
      v-show="mask"
      class="mask"
    >
      <div class="center">
        <a
          :href="link"
          class="link"
        >
          <img :src="base + 'link.png'">
        </a>
        <div
          class="close"
          @click="toClose"
        >
          <img :src="base + 'close.png'">
        </div>
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
      base: CDN_URL + '/fe/image/white_rabbit/',
      link: 'http://papi.xingstation.com/api/s/q2R',
      mask: true,
      wxShareInfoValue: {
        title: '大白兔奶茶店Luone站提醒您: ',
        desc: '提取照片,欢乐加倍!',
        link: 'http://papi.xingstation.com/api/s/rYk' + window.location.search,
        imgUrl: CDN_URL + "/fe/image/white_rabbit/icon.png"

      }
    }
  },
  methods: {
    toClose() {
      this.mask = false
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
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  .main {
    position: relative;
    width: 100%;
    z-index: 0;
    background: #fff;
    .bg {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 56.8%;
      position: absolute;
      top: 24.8%;
      left: 20.8%;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .link {
      width: 78%;
    }
    .close {
      width: 14.6%;
      display: block;
      margin-top: 5%;
    }
  }
}
</style>


