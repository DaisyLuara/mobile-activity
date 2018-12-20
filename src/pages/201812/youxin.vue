<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div
      :style="style.root"
      class="main"
    >
      <img
        v-for="item in 7"
        :key="item.id"
        :src="base + 'sw.png'"
        :class="'snow'+item"
        class="snow"
      >
      <div class="one">
        <a
          class="coupon"
          @click="toLink"
        >
          <img :src="base + 'coupon.png' + this.$qiniuCompress()">
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
    <!-- mask -->
    <div
      v-show="mask"
      class="mask"
    >
      <img
        :src="base + 'hint.png' + this.$qiniuCompress()"
        class="hint"
      >
      <img
        :src="base + 'santa.png' + this.$qiniuCompress()"
        class="santa"
      >
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
} from "services";
import { normalPages } from "../../mixins/normalPages";
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
      mask: false,
      //微信分享
      wxShareInfoValue: {
        title: '参与互动 马上领取',
        desc: '由心咖啡 买一赠一',
        link: 'http://papi.xingstation.com/api/s/xnJ' + window.location.search,
        imgUrl: cdnUrl + '/fe/image/youxin/icon.png',
      }
    }
  },
  mounted() {

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
  background-color: #530107;
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
  background-color: #530107;
  overflow-x: hidden;
  position: relative;
  background-image: url("@{img}zs2.png"), url("@{img}zs2.png");
  background-position: -5% center, right center;
  background-size: 13% auto, 13% auto;
  background-repeat: no-repeat, no-repeat;
  .main {
    background-color: #330206;
    width: 84%;
    position: relative;
    padding-top: 5%;
    overflow: hidden;
    .snow {
      position: absolute;
      z-index: 99;
    }
    .snow1 {
      width: 14vw;
      left: -8%;
      top: 2%;
      animation: myrotate 3s linear infinite;
    }
    .snow2 {
      width: 10vw;
      right: 5%;
      top: -1%;
      animation: myrotate 3s linear infinite;
    }
    .snow3 {
      width: 8vw;
      top: 24%;
      left: 1%;
      animation: myrotate 2s linear infinite;
    }
    .snow4 {
      width: 14vw;
      top: 14%;
      right: -8%;
      animation: myrotate 2s linear infinite;
    }
    .snow5 {
      width: 10vw;
      top: 54%;
      left: 1.5%;
      animation: myrotate 4s linear infinite;
    }
    .snow6 {
      width: 10vw;
      right: 3%;
      top: 45%;
      animation: myrotate 2s linear infinite;
    }
    .snow7 {
      width: 7vw;
      right: 4.5%;
      top: 55%;
      animation: myrotate 4s linear infinite;
    }
    .bg {
      position: relative;
      z-index: 0;
    }
    .one {
      width: 100%;
      position: relative;
      a {
        width: 78vw;
      }
    }
    .two {
      width: 58vw;
      position: relative;
      margin-top: 1%;
      .photo {
        width: 52vw;
        position: absolute;
        top: 3.1%;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: auto;
        user-select: auto;
      }
      .getscore {
        width: 36vw;
        position: relative;
        margin-top: 3%;
        z-index: 0;
        .score {
          font-family: "zhehei";
          position: absolute;
          top: 21%;
          left: 44%;
          z-index: 99;
          color: #cc0917;
          font-size: 4vw;
          font-weight: bold;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    background-color: rgba(0, 0, 0, 0.65);
    .hint {
      width: 89%;
      position: relative;
      margin-top: 40%;
    }
    .santa {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0%;
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
</style>


