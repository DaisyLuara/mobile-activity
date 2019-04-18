<template>
  <div
    :style="style.root"
    class="warp"
  >
    <!-- <img
      :src="base + 'bg.png'"
      class="bg"
    > -->
    <div class="center main">
      <img
        :src="base + 'under.png'"
        class="bg"
      >
      <img
        v-show="Boolean(picture)"
        :src="picture"
        class="center photo"
      >
      <img
        :src="base + 'arrow.png'"
        class="arrow"
      >
    </div>

    <canvas id="canvas"></canvas>
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
      base: CDN_URL + '/fe/image/aiMeng/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      value: 0,
      picture: null,
      imgList: {
        bg: {
          src: CDN_URL + '/fe/image/aiMeng/bg.png',
          width: 1080,
          height: 1920,
        },
        tab: {
          src: null,
          width: 0.56,//width:616,// height: 205,
        },
        info: {
          src: null,
          //width: 775,height: 66,
          width: 0.72,
        },
        photo: {
          src: null,
          //width: 1060,height: 1060,
          width: 0.585,
        },
        star: {
          src: null,
          //width: 310,height: 310,
          width: 0.285,
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "AI测萌值，谁还不是个小可爱鸭",
        desc: "点击查看好友的萌值评分",
        link: 'http://papi.xingstation.com/api/s/M1B' + window.location.search,
        imgUrl: CDN_URL + "/fe/image/aiMeng/icon.jpg"
      }
    }
  },
  watch: {
    parms() {
      this.imgList.tab.src = this.base + 'tab' + this.parms.index + '.png'
      this.imgList.info.src = this.base + 'info' + this.parms.index + '.png'
      this.imgList.photo.src = this.photo
      this.imgList.star.src = this.parms.imgUrl
      this.value = this.parms.value
      this.getPicture()
    }
  },
  mounted() { },
  methods: {
    getPicture() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = this.imgList.bg.width
      canvas.height = this.imgList.bg.height
      let [cw, ch] = [canvas.width, canvas.height]
      let [bg, tab, info, main, star] = [new Image(), new Image(), new Image(), new Image(), new Image()]
      bg.setAttribute('crossOrigin', 'Anonymous')
      tab.setAttribute('crossOrigin', 'Anonymous')
      info.setAttribute('crossOrigin', 'Anonymous')
      main.setAttribute('crossOrigin', 'Anonymous')
      star.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = () => {
        ctx.drawImage(bg, 0, 0)
        tab.onload = () => {
          ctx.drawImage(tab, 0, 0, tab.width, tab.height, cw * 0.22, ch * 0.07, cw * 0.56, cw * 0.56 / tab.width * tab.height)
          info.onload = () => {
            ctx.drawImage(info, 0, 0, info.width, info.height, cw * 0.14, ch * 0.18, cw * 0.72, cw * 0.72 / info.width * info.height)
            main.onload = () => {
              ctx.drawImage(main, 0, 0, main.width, main.height, cw * 0.2, ch * 0.234, cw * 0.585, cw * 0.585 / main.width * main.height)
              star.onload = () => {
                ctx.drawImage(star, 0, 0, star.width, star.height, cw * 0.3575, ch * 0.633, cw * 0.285, cw * 0.285 / star.width * star.height)
                ctx.font = '900 80px "abc"'
                ctx.textAlign = 'right'
                ctx.fillStyle = '#5763f3'
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 2
                ctx.fillText(this.value, cw * 0.93, ch * 0.5)
                ctx.strokeText(this.value, cw * 0.93, ch * 0.5)
                this.picture = canvas.toDataURL('image/png')
              }
              star.src = this.imgList.star.src
            }
            main.src = this.imgList.photo.src
          }
          info.src = this.imgList.info.src
        }
        tab.src = this.imgList.tab.src
      }
      bg.src = this.imgList.bg.src
    }
  }
}
</script>
<style lang="less" scoped>
@imgurl: "http://cdn.xingstation.cn/fe/image/aiMeng/";
@font-face {
  font-family: "abc";
  src: url("@{imgurl}abc.eot");
  src: url("@{imgurl}abc.eot?#font-spider") format("embedded-opentype"),
    url("@{imgurl}abc.woff") format("woff"),
    url("@{imgurl}abc.ttf") format("truetype"),
    url("@{imgurl}abc.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}
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
  background-image: url("@{imgurl}back.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  .bg {
    position: relative;
    z-index: 0;
  }
  #canvas {
    font-family: "abc";
    color: #5763f3;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: none;
  }
  .center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
  .main {
    width: 100%;
    top: 2%;
    z-index: 9;
    .bg {
      width: 77%;
    }
    .photo {
      width: 61.5%;
      top: 10.3%;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
    .arrow {
      width: 5%;
      position: absolute;
      left: 50%;
      bottom: 12%;
      z-index: 999;
      transform: translate(-50%, -15px);
      animation: arrow 0.6s linear infinite alternate;
    }
  }
}

@keyframes arrow {
  0% {
    transform: translate(-50%, -15px);
  }
  50% {
    transform: translate(-50%, 0px);
  }
  100% {
    transform: translate(-50%, 15px);
  }
}
</style>


