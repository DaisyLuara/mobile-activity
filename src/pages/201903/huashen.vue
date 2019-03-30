<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'bg.png'"
      class="bg"
    >
    <div class="picture">
      <img :src="picture">
    </div>
    <canvas id="canvas"/>
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
      base: CDN_URL + '/fe/image/huashen/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      picture: null,
      //微信分享
      wxShareInfoValue: {
        title: "梦回花朝，你就是古风女神",
        desc: "前世的你，是哪位花神？",
        link: 'http://papi.xingstation.com/api/s/pk1' + window.location.search,
        imgUrl: "https://cdn.xingstation.com/fe/image/huashen/icon.jpg"
      }
    }
  },
  watch: {
    sertime() {
      this.getImage()
    }
  },
  methods: {
    getImage() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let [bg, border, cover, that] = [new Image(), new Image(), new Image(), this]
      bg.setAttribute('crossOrigin', 'Anonymous')
      border.setAttribute('crossOrigin', 'Anonymous')
      cover.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = function () {
        canvas.width = bg.width
        canvas.height = bg.height
        border.onload = function () {
          cover.onload = function () {
            ctx.drawImage(bg, 0, 0, bg.width, bg.height)
            ctx.drawImage(border, 0, 0, border.width, border.height, canvas.width * 0.19, canvas.height * 0.165, canvas.width * 0.62, canvas.width * 0.618 / border.width * border.height)
            ctx.drawImage(cover, 0, 0, cover.width, cover.height, canvas.width * 0.196, canvas.height * 0.1685, canvas.width * 0.608, canvas.width * 0.608 / cover.width * cover.height)
            that.picture = canvas.toDataURL('image/png')
          }
          cover.src = that.photo
        }
        border.src = that.base + '2.png'
      }
      bg.src = this.base + '1.png'
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.com/fe/image/huashen/";
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
  .bg {
    position: relative;
    z-index: 0;
  }
  .picture {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
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
</style>


