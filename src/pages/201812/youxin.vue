<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="one">
      <a
        href="http://papi.xingstation.com/api/s/wVJ"
        class="coupon"
      >
        <img :src="base + 'coupon1.png' + this.$qiniuCompress()">
      </a>
    </div>
    <div class="two">
      <img
        :src="base + 'photo.png' + this.$qiniuCompress()"
        class="bg"
      >
      <img
        :src="photo"
        class="photo"
      >
      <div class="getscore">
        <img
          :src="base + 'score.png'+ this.$qiniuCompress()"
          class="bg"
        >
        <span class="score">{{ score }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
} from "services";
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + '/fe/image/youxin/',
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: '参与互动 马上领取',
        desc: '由心咖啡 买一赠一',
        link: 'http://papi.xingstation.com/api/s/xnJ' + window.location.search,
        imgUrl: cdnUrl + '/fe/image/youxin/icon.png',
      }
    }
  },
  methods: {
    toLink() {
      this.mask = true
      let timer = setTimeout(() => {
        clearTimeout(timer)
        window.location.href = 'http://papi.xingstation.com/api/s/wVJ'
      }, 3000)
    },
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.exe666.com/fe/image/youxin/";
/*声明 WebFont*/
@font-face {
  font-family: "zhehei";
  src: url("http://cdn.exe666.com/fe/image/cangqian/zhehei.ttf");
  src: url("http://cdn.exe666.com/fe/image/cangqian/zhehei.eot"),
    url("http://cdn.exe666.com/fe/image/cangqian/zhehei.woff"),
    url("http://cdn.exe666.com/fe/image/cangqian/zhehei.ttf"),
    url("http://cdn.exe666.com/fe/image/cangqian/zhehei.svg");
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
  background-color: #330206;
}
* {
  padding: 0;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  background-color: #330206;
  overflow-x: hidden;
  position: relative;

  .bg {
    position: relative;
    z-index: 0;
  }
  .one {
    width: 100%;
    position: relative;
    a {
      width: 90%;
      animation: mybig 0.6s linear infinite alternate;
    }
  }
  .two {
    width: 88%;
    position: relative;
    margin-top: 1%;
    .bg {
      width: 87%;
    }
    .photo {
      width: 78%;
      position: absolute;
      top: 3.1%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
    .getscore {
      width: 60vw;
      position: relative;
      margin-top: 3%;
      z-index: 0;
      .score {
        font-family: "zhehei";
        position: absolute;
        top: 22%;
        left: 44%;
        z-index: 99;
        color: #cc0917;
        font-size: 6vw;
        font-weight: bold;
      }
    }
  }
}
@keyframes myrotate {
  0% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(-360deg);
  }
}
@keyframes mybig {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>


