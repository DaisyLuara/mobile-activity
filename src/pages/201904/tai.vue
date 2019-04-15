<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'bg.png'"
      class="bg"
    >
    <div class="main">
      <img
        :src="base + 'pic.png'"
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
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/tai/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: "纯粹泰国",
        desc: "纯粹泰国",
        link: '' + window.location.search,
        imgUrl: CDN_URL + "/fe/image/tai/icon.png"
      }
    }
  },
}
</script>
<style lang="less" scoped>
@imgurl: "http://cdn.xingstation.cn/fe/image/tai/";
html,
body {
  width: 100%;
  height: 100%;
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
  position: relative;
  overflow: hidden;
  .bg {
    position: relative;
    z-index: 0;
  }
  .main {
    width: 76.5%;
    position: absolute;
    top: 41%;
    left: 50%;
    transform: translateX(-50%);
    .photo {
      width: 72.5vw;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>


