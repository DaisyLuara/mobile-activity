<template>
  <div
    :style="style.root"
    class="root"
  >
    <div
      v-show="showImg"
      class="shade"
    >
      <div class="shade-c">
        <img
          :src="baseUrl + 'rice.png'+ this.$qiniuCompress()"
          class="rice animated  linear infinite  tada"
        >
        <img
          :src="baseUrl + 'loadingtext.png'+ this.$qiniuCompress()"
          class="loading"
        >
      </div>
    </div>
    <!-- 内容 -->
    <div
      v-show="contentShow"
      class="content"
    >
      <img
        :src="baseUrl + 'bg_two.png'+ this.$qiniuCompress()"
        class="bg"
      >
      <div id="main" />
      <img
        id="test"
        :src="base64Data"
        alt=""
        class="photoImg"
      >
      <canvas
        id="canvas"
        class="photoImg"
        style="display: none"
      />
      <img
        :src="baseUrl + 'savetitle.png'+ this.$qiniuCompress()"
        class="save"
      >
    </div>
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL
import MC from 'mcanvas'
import 'animate.css'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/open_pig/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      type: null,
      showImg: true,
      contentShow: false,
      base64Data: null,
      paths: [
        '1.png', '2.png', '3.png', '4.png', '5.png'
      ],
      fanpaths: [
        'fan1.png', 'fan2.png', 'fan3.png', 'fan4.png'
      ],
      wxShareInfoValue: {
        title: '送你一张饭票，祝你诸事顺利',
        desc: '金猪送福，即刻领取',
        link: process.env.AD_API+'/api/s/vQV' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/open_pig/icon.png'
      }
    }
  },
  watch: {
    parms() {
      this.type = this.parms.type
      this.drawing()
    }
  },
  mounted() {
    console.log(this.base64Data)
    let timer = setTimeout(() => {
      this.showImg = false
      this.contentShow = true
      clearTimeout(timer);
    }, 3000)
    if (process.env.NODE_ENV === 'testing') {
      this.type = this.$route.query.type,
        this.drawing()
    }
  },
  methods: {
    //获取随机数图片
    rnd(n, m) {
      let random = Math.floor(Math.random() * (m - n + 1) + n);
      return random;
    },
    //合成文字
    drawingText() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let height = this.$innerHeight()
      let width = this.$innerWidth()
      // let text = this.text
      let text = this.rnd(50, 1000)
      console.log(text)
      image.src = this.base64Data
      image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = image.width * 0.57
        let y = image.height * 0.307
        ctx.font = '400 72px "MatrixCode"'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#000'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(text, 0, 0)
        ctx.restore()
        let url = canvas.toDataURL('image/png')
        let img = document.getElementById('test')
        img.src = url
      }
    },
    //合成图片
    drawing() {
      let width = this.$innerWidth()
      let height = (this.$innerWidth() / 1080) * 2000
      let that = this
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = that.photo + that.$qiniuCompress()
      // let url =
      //   'https://cdn.xingstation.cn/fe/marketing/img/open_pig/666.png'
      let imgUrl = 'https://cdn.xingstation.cn/fe/marketing/img/open_pig/' + this.fanpaths[this.type]
      let imgUrl2 = 'https://cdn.xingstation.cn/fe/marketing/img/open_pig/t.png'
      let imgUrl3 = 'https://cdn.xingstation.cn/fe/marketing/img/open_pig/' + this.rnd(1, this.paths.length) + '.png'
      mc.background('https://cdn.xingstation.cn/fe/marketing/img/open_pig/bg_two.png', {
        left: '0%',
        top: '0%',
        type: 'origin',
        width: this.$innerWidth(),
        pos: {
          x: '0%',
          y: '0%'
        }
      })
        .add(url, {
          width: '54%',
          pos: {
            x: '23.8%',
            y: '45%'
          }
        })
        .add(that.baseUrl + 'frame.png', {
          width: '93%',
          pos: {
            x: '3.5%',
            y: '8%'
          }
        })
        .add(imgUrl, {
          width: '55%',
          pos: {
            x: '22.5%',
            y: '16%'
          }
        })
        .add(imgUrl2, {
          width: '48%',
          pos: {
            x: '27%',
            y: '28.5%'
          }
        })
        .add(imgUrl3, {
          width: '50%',
          pos: {
            x: '25%',
            y: '33%'
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
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/open_pig/";
/*声明 WebFont*/
@font-face {
  font-family: "MatrixCode";
  src: url("http://cdn.xingstation.cn/fe/marketing/img/open_pig/jinhei.TTF");
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
.root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  font-family: MatrixCode;
  font-size: 72px;
  .shade {
    width: 100%;
    height: 100%;
    position: relative;
    background: #821616;

    .shade-c {
      width: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -70%);
      .rice {
        width: 60%;
      }
      .loading {
        width: 100%;
        margin: 15% 0 0 5%;
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    .bg {
      width: 100%;
    }
    .photoImg {
      width: 100%;
      position: absolute;
      left: 0%;
      top: 0%;
      -webkit-user-select: auto;
      pointer-events: auto;
    }
    .save {
      width: 60%;
      position: relative;
      margin-top: -20%;
      animation: arrow 0.8s linear infinite alternate;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
