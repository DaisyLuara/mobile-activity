<template>
  <div
    id="content"
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base + 'frame.png'"
        class="frame"
      >
      <img
        :src="base + character"
        class="people"
      >
      <span>{{ score }}</span>
      <img
        id="test"
        :src="compoundUrl"
        class="test"
      >
    </div>
    <canvas
      id="canvas"
      style="display: none"
    />
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
import MC from 'mcanvas'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/bee/',
      num: Math.round(Math.random() * 3),
      character: null,
      people: {
        Male: ['boy1.png', 'boy2.png', 'boy3.png', 'boy4.png'],
        Female: ['girl1.png', 'girl2.png', 'girl3.png', 'girl4.png']
      },
      base64Data: null,
      compoundUrl: null,
      //微信分享
      wxShareInfoValue: {
        title: '挑战高分',
        desc: '看看我的高分以及小偶',
        link: process.env.AD_API+'/api/s/NOL' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/bee/share.png',
      }
    }
  },
  watch: {
    parms() {
      this.drawing()
    }
  },
  mounted() {
    let id = this.$route.query.id
    if (localStorage.getItem('bee' + id)) {
      this.character = localStorage.getItem('bee' + id)
    } else {
      this.character = this.people[this.gender][this.num]
      localStorage.setItem('bee' + id, this.character)
    }

  },
  methods: {
    drawing() {
      let width = 692
      let height = 1292
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height
      })
      let url = this.base + this.character + this.$qiniuCompress()
      let score = this.parms.score
      let that = this
      mc.background(that.base + 'frame.png', {
        left: 0,
        top: 0,
        type: 'origin',
        width: 692,
        height: 1292,
        pos: {
          x: '0%',
          y: '0%'
        }
      })
        .add(url, {
          width: 355,
          color: '#000000',
          pos: {
            x: '24%',
            y: '26%'
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'png',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          quality: 1,
          // 成功回调；
          success(b64) {
            that.base64Data = b64
            that.drawingText()
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    },
    //文字的合成及章
    drawingText() {
      var thisRef = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let height = this.$innerHeight()
      let width = this.$innerWidth()
      let text = this.parms.score
      let seal = new Image()
      seal.setAttribute('crossOrigin', 'Anonymous')
      image.src = this.base64Data
      image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = image.width / 2
        let y = image.height * 0.2
        ctx.font = '400 80px liujiao'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fcdb67'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(text, 0, 0)
        ctx.restore()
        let url = canvas.toDataURL('image/png')
        let img = document.getElementById('test')
        img.src = url
        thisRef.compoundUrl = url
      }
    }
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.exe666.com/fe/image/bee/";
@font-face {
  font-family: "liujiao";
  src: url("http://cdn.exe666.com/fe/font/liujiao.TTF");
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
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow: hidden;
  background-image: url("@{base}bg.jpg");
  background-position: center bottom;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main {
    width: 89%;
    position: relative;
    z-index: 0;
    margin: 0 auto;
    margin-top: 5%;
    .frame {
      position: relative;
      z-index: 0;
    }
    .people {
      width: 55%;
      position: absolute;
      top: 24.5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
    }
    span {
      font-size: 10vw;
      font-family: "liujiao";
      color: #ffda67;
      z-index: 999;
      position: absolute;
      top: 14%;
      left: 50%;
      transform: translateX(-50%);
    }
    .test {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      z-index: 999;
      pointer-events: auto;
      user-select: auto;
      opacity: 0;
    }
  }
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
}
</style>


