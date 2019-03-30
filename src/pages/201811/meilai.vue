<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}"
  >
    <div class="main">
      <div class="circles">
        <img
          :src="imgUrl+'gear1.png'"
          class="gear1"
        >
        <img
          :src="imgUrl+'gear2.png'"
          class="gear2"
        >
        <img
          :src="imgUrl+'gear3.png'"
          class="gear3"
        >
        <img
          :src="imgUrl+'gear4.png'"
          class="gear4"
        >
        <img
          :src="imgUrl+'gear5.png'"
          class="gear5"
        >
        <img
          :src="imgUrl+'gear6.png'"
          class="gear6"
        >
        <img
          :src="imgUrl+'gear7.png'"
          class="gear7"
        >
        <img
          :src="imgUrl+'gear8.png'"
          class="gear8"
        >
        <img
          :src="imgUrl+'gear9.png'"
          class="gear9"
        >
      </div>
      <img
        id="mImg"
        :src="photo"
        class="money"
      >
      <img
        :src="imgUrl+'frame1.png'"
        class="imgframe"
      >
    </div>
    <img
      :src="imgUrl+'logo.png'"
      class="logo"
    >
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
const BASE_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      imgUrl: BASE_URL + '/fe/image/yanzhi/meilai/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      //微信分享
      wxShareInfoValue: {
        title: '刷“颜值”，赢好礼！与美莱一起美出新高度！ ',
        desc: '美莱颜值礼遇，等你来参与！',
        link: 'http://papi.xingstation.com/api/s/Jqo' + window.location.search,
        imgUrl: BASE_URL + '/fe/image/yanzhi/meilai/icon.png'
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.exe666.com/fe/image/yanzhi/meilai";
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
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
  position: relative;
  overflow-x: hidden;
  background: url("@{imgUrl}/back.png") center center/100% 100% no-repeat;
  .main {
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .circles {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
  }
  .circles > img {
    position: absolute;
  }
  .gear1 {
    width: 35.6%;
    left: -7px;
    top: 2%;
    z-index: 0;
    animation: mycircle 12s infinite linear;
  }
  .gear2 {
    width: 22%;
    left: 17%;
    top: 6.5%;
    z-index: 9;
    animation: myback 10s infinite linear;
  }
  .gear3 {
    width: 22%;
    left: 47%;
    bottom: 9%;
    z-index: 0;
    animation: mycircle 8s infinite linear;
  }
  .gear4 {
    width: 32.9%;
    left: 61%;
    bottom: 3.5%;
    animation: myback 10s infinite linear;
  }
  .gear5 {
    width: 17%;
    left: 0%;
    bottom: 12%;
    animation: mycircle 5s infinite linear;
  }
  .gear6 {
    width: 11.2%;
    right: 0%;
    top: 12%;
    z-index: 0;
    animation: myback 10s infinite linear alternate;
  }
  .gear7 {
    width: 17%;
    left: 80%;
    bottom: 8%;
    animation: mycircle 6s infinite linear;
  }
  .gear8 {
    width: 10.9%;
    left: 36%;
    top: 6.5%;
    z-index: 999;
    animation: mycircle 6s infinite linear;
  }
  .gear9 {
    width: 16%;
    left: 78%;
    top: 6%;
    z-index: 0;
    animation: mycircle 10s infinite linear alternate;
  }
  .money {
    z-index: 99999;
    width: 87%;
    position: absolute;
    left: 0;
    right: 0;
    top: 12.6%;
    pointer-events: auto;
    user-select: auto;
  }
  .imgframe {
    margin: 15% auto;
    width: 100%;
    position: relative;
    z-index: 9999;
  }
  .logo {
    width: 37%;
    margin-top: -15%;
    margin-bottom: 8%;
  }
}
.iphoneX {
  .main {
    margin-top: 10%;
  }
  .logo {
    margin-top: -10%;
  }
}
@keyframes mycircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes myback {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes updown {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
}
</style>


