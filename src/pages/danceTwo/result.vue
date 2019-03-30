<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame"
    >
    <img
      :src="baseUrl + 'text.png'+ this.$qiniuCompress()"
      :class="{'x-text':iphoneX,'text':!iphoneX}"
      class="text"
    >
    <img
      id="test"
      :src="compoundUrl"
      :class="{'x-photoImg':iphoneX,'photoImg':!iphoneX}"
      alt=""
      class="photoImg"
    >
    <canvas
      id="canvas"
      class="photoImg"
      style="display: none"
    />
    <p>1234567890</p>
  </div>
</template>
<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { onlyWechatShare } from '@/mixins/onlyWechatShare'
import MC from 'mcanvas'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/xsd_ad/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      base64Data: null,
      compoundUrl: null,
      wxShareInfoValue: {
        title: '舞王battle',
        desc: '不舞不型 全民街舞',
        link: 'http://papi.xingstation.com/api/s/pg2' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/xsd_ad/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getInfoById()
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.drawing()
        })
        .catch(err => {
          console.log(err)
        })
    },
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = this.photo + this.$qiniuCompress()
      let score = parseInt(this.$route.query.score)
      let ImgUrl = null
      if (score >= 282 && score <= 300) {
        ImgUrl = this.baseUrl + 'photo01.png'
      }
      if (score >= 263 && score <= 281) {
        ImgUrl = this.baseUrl + 'photo02.png'
      }
      if (score <= 262) {
        ImgUrl = this.baseUrl + 'photo03.png'
      }
      let that = this
      mc
        .background(this.baseUrl + 'frame.png', {
          left: 0,
          top: 0,
          type: 'origin',
          width: this.$innerWidth() * 0.1,
          height: this.$innerHeight(),
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .add(url, {
          width: '180%',
          color: '#000000',
          pos: {
            x: '-25%',
            y: '7%',
            rotate: 90
          }
        })
        .add(ImgUrl, {
          width: '100%',
          color: '#000000',
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'jpg',
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
      let text = this.$route.query.score
      let seal = new Image()
      seal.setAttribute('crossOrigin', 'Anonymous')
      image.src = this.base64Data
      image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = image.width * 1.2 * 0.53
        let y = image.height * 0.14
        ctx.font = '400 100px jingzhuan'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fff'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(text, 0, 0)
        ctx.restore()
        seal.onload = function () {
          ctx.drawImage(
            seal,
            0,
            0,
            seal.width,
            seal.height,
            image.width * 0.65,
            image.height * 0.08,
            image.width * 0.35,
            image.width * 0.32
          )
          let url = canvas.toDataURL('image/png')
          let img = document.getElementById('test')
          img.src = url
          thisRef.compoundUrl = url
        }
        seal.src = thisRef.baseUrl + '/passed.png'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/xsd_ad/";
@font-face {
  font-family: "jingzhuan";
  src: url("http://cdn.xingstation.cn/fe/marketing/img/xsd_ad/jinzhuan2.TTF");
  font-weight: normal;
  font-style: normal;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}back.png");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: #fff;
  .frame {
    width: 76%;
    position: absolute;
    left: 50%;
    top: 48.8%;
    transform: translate(-50%, -52%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-frame {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -58%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photoImg {
    width: 75.5%;
    position: absolute;
    left: 12.5%;
    top: 5.5%;
    -webkit-user-select: auto;
    pointer-events: auto;
    transform-origin: center top;
    -webkit-transform: rotate(90deg);
    transform: rotate(0deg);
  }
  .x-photoImg {
    width: 82%;
    position: absolute;
    left: 9%;
    top: 6.5%;
    transform: translate(-50%, -60%);
    -webkit-user-select: auto;
    pointer-events: auto;
    transform-origin: center top;
    -webkit-transform: rotate(90deg);
    transform: rotate(0deg);
  }
  .text {
    width: 65%;
    position: absolute;
    left: 50%;
    bottom: 1%;
    transform: translate(-50%, 0%);
    z-index: 2;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-text {
    width: 65%;
    position: absolute;
    left: 50%;
    bottom: 9%;
    transform: translate(-50%, 0%);
    z-index: 2;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  p {
    font-family: "jingzhuan";
    font-size: 8vw;
    opacity: 0;
  }
}
</style>
