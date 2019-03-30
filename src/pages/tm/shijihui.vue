<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base + 'bg.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="base + 'qiu.png'+ this.$qiniuCompress()"
        class="qiu"
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
const IMG_SERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMG_SERVER + '/image/tm/shijihui/',
      //分享
      wxShareInfoValue: {
        title: '玩转世纪，世纪汇广场邀你嗨翻世纪',
        desc: '世纪汇广场美食节，狂欢就现在',
        link: 'http://papi.xingstation.com/api/s/68n' + window.location.search,
        imgUrl: IMG_SERVER + '/image/tm/shijihui/share.png',
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
@base: "http://p22vy0aug.bkt.clouddn.com/image/tm/shijihui/";
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
    .qiu {
      width: 18%;
      position: absolute;
      top: 3.5%;
      right: 1%;
      z-index: 99;
      animation: sheng 1.2s linear infinite alternate;
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
      width: 63%;
      pointer-events: auto;
      user-select: auto;
      position: absolute;
      top: 21.5%;
      left: 5.4%;
      z-index: 99;
    }
  }
}
@keyframes sheng {
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-15px);
  }
}
</style>


