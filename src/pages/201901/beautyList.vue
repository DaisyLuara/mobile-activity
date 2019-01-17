<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'p1/frame.png'"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <a
      class="tolink"
      @click="toLink"
    >
      <img :src="base + 'button.png'">
    </a>
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
      base: CDN_URL + '/fe/image/beauty/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      link: '',
      //微信分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/beauty/icon.png'
      }
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'testing') {
      this.wxShareInfoValue.link = '' + window.location.search
      this.link = ''
    }
  },
  methods: {
    toLink() { }
  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.exe666.com/fe/image/beauty/";
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
  position: relative;
  overflow-x: hidden;
  background-image: url("@{url}p1/back.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  .main {
    position: relative;
    width: 100%;
    .frame {
      width: 84.5%;
      position: relative;
      z-index: 0;
      margin-left: 2%;
    }
    .photo {
      position: absolute;
      top: 5%;
      left: 15%;
      width: 66%;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .tolink {
    position: relative;
    width: 43%;
    margin-top: 5%;
    margin-bottom: 13%;
  }
}
</style>

