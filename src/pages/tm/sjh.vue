<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base + 'bg2.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <span class="score">{{ score }}</span>
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/marketing/img/sjh/',
      //分享
      wxShareInfoValue: {
        title: '天降美食',
        desc: '欲罢不能 吞食天下',
        link: process.env.AD_API+'/api/s/DRn' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/sjh/icon.jpeg',
      }
    }
  }
}
</script>
<style lang="less" scoped>
/*声明 WebFont*/
@font-face {
  font-family: "mutouren";
  src: url("https://cdn.exe666.com/fe/font/mutouren.ttf");
  src: url("https://cdn.exe666.com/fe/font/mutouren.eot"),
    url("https://cdn.exe666.com/fe/font/mutouren.woff"),
    url("https://cdn.exe666.com/fe/font/mutouren.ttf"),
    url("https://cdn.exe666.com/fe/font/mutouren.svg");
  font-weight: normal;
  font-style: normal;
}

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
  text-align: center;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #fffff5;
  max-width: 750px;
  .main {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    .bg {
      position: relative;
      z-index: 0;
    }
    .score {
      font-family: "mutouren";
      font-size: 10vw;
      position: absolute;
      top: 28%;
      left: 71%;
      font-weight: bold;
      font-style: italic;
    }
    .photo {
      width: 62%;
      pointer-events: auto;
      user-select: auto;
      position: absolute;
      top: 23.5%;
      left: 6.4%;
      z-index: 99;
    }
  }
}
</style>


