<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}" 
      class="frame">
    <img 
      :src="baseUrl + 'text.png'+ this.$qiniuCompress()"
      :class="{'x-text':iphoneX,'text':!iphoneX}"
      class="text">
    <!-- <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photoImg':iphoneX,'photoImg':!iphoneX}"
      class="photoImg"> -->
    <img
      id="test" 
      :src="compoundUrl"
      alt="" 
      class="photoImg photo-real" >
    <canvas 
      id="canvas" 
      class="photoImg"
      style="display: none" />
    <!-- <p>1234567890</p> -->
  </div>
</template>
<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
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
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    //this.getInfoById()
    this.drawing()
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
      let that = this
      // this.baseUrl + '666.png'
      mc
        .background(this.baseUrl + 'frame.png', {
          left: 0,
          top: 0,
          type: 'origin',
          width: this.$innerWidth(),
          height: this.$innerHeight(),
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .add(this.baseUrl + '666.png', {
          width: '180%',
          color: '#000000',
          pos: {
            x: '-25%',
            y: '10%',
            rotate: 90
          }
        })
        .add(this.baseUrl + 'photo01.png', {
          width: '100%',
          color: '#000000',
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .add(this.baseUrl + 'passed.png', {
          width: '30%',
          color: '#000000',
          pos: {
            x: '65%',
            y: '5%'
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
    //文字的合成
    drawingText() {
      var thisRef = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let height = this.$innerHeight()
      let width = this.$innerWidth()
      let text = this.$route.query.score
      image.src = this.base64Data
      image.onload = function() {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = image.width * 1.2 * 0.55
        let y = image.height * 0.14
        ctx.font = '400 90px jingzhuan'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fff'

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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/xsd_ad/';
@font-face {
  font-family: 'jingzhuan';
  src: url('http://cdn.exe666.com/fe/marketing/img/xsd_ad/jinzhuan2.TTF');
  font-weight: normal;
  font-style: normal;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}back.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: #fff;
  .frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photoImg {
    width: 75.5%;
    position: absolute;
    left: 12.5%;
    top: 9.5%;
    -webkit-user-select: auto;
    pointer-events: auto;
    -webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-transform: rotate(90deg);
    transform: rotate(0deg);
  }
  .x-photoImg {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    -webkit-user-select: auto;
    pointer-events: auto;
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
    font-family: 'jingzhuan';
    font-size: 8vw;
    // display: none;
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
