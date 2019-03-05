<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'title.png'"
      class="top"
    >
    <div class="links">
      <img
        :src="base + 'left.png'"
        class="left"
      >
      <!-- https://pfs.suning.com/pfs-web/huiju/index.htm?plazaId=E002 -->
      <a
        href="http://papi.xingstation.com/api/s/krx"
        class="tolink"
      >
        <img :src="base + 'button.png'">
      </a>
      <img
        :src="base + 'rigtt.png'"
        class="right"
      >
    </div>
    <div class="picture">
      <img :src="picture">
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
      base: CDN_URL + '/fe/image/ailishi/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      picture: null,
      //微信分享
      wxShareInfoValue: {
        title: "苏宁爱丽狮",
        desc: "苏宁爱丽狮",
        link: 'http://papi.xingstation.com/api/s/mYp' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/ailishi/icon.jpg"
      }
    }
  },
  watch: {
    photo() {
      this.getImage()
    }
  },
  mounted() {
    // this.getImage()
  },
  methods: {
    getImage() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let [bg, cover, that] = [new Image(), new Image(), this]
      cover.onload = function () {
        canvas.width = cover.width
        canvas.height = cover.height
        bg.onload = function () {
          ctx.drawImage(bg, 0, 0, bg.width, bg.height, canvas.width * 0.245, canvas.height * 0.14, canvas.width * 0.525, canvas.width * 0.525 / 557 * 900)
          ctx.drawImage(cover, 0, 0, canvas.width, canvas.height)
          that.picture = canvas.toDataURL('image/png')
        }
        bg.src = that.photo //that.base + 'test.png'
      }
      cover.src = this.base + 'p1.png'
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/ailishi/";
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
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-image: url("@{img}bgx.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: repeat;
  .top {
    position: relative;
  }
  .links {
    width: 100%;
    position: relative;
    margin: 8% auto;
    .tolink {
      display: inline-block;
      width: 65.5%;
      position: relative;
      z-index: 0;
    }
    .left {
      width: 10%;
      position: absolute;
      top: 50%;
      left: 2%;
      transform: translate(0%, -50%);
      z-index: 9;
      animation: aleft linear 0.6s infinite alternate;
    }
    .right {
      width: 10%;
      position: absolute;
      top: 50%;
      right: 2%;
      transform: translate(0%, -50%);
      z-index: 9;
      animation: aright linear 0.6s infinite alternate;
    }
  }
  .picture {
    width: 95.6%;
    position: relative;
    margin-bottom: 10%;
    img {
      pointer-events: auto;
      user-select: auto;
    }
  }
  #canvas {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 0;
  }
}
@keyframes aleft {
  0% {
    transform: translate(0%, -50%);
  }
  100% {
    transform: translate(50%, -50%);
  }
}
@keyframes aright {
  0% {
    transform: translate(0%, -50%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>


