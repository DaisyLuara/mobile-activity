<template>
  <div class="photo-merge">
    <div class="photo-area">
      <img
        v-if="mergedUrl"
        :src="mergedUrl"
        class="photo-merged"
      >
      <canvas
        id="canvas"
        style="display: none"
      />
    </div>
    <img
      :src="`${CDNURL}/dimond520/upload_success.png`"
      class="success-img"
    >
    <div class="love-rule"/>
  </div>
</template>

<script>
import MC from 'mcanvas'
import { Toast } from 'mand-mobile'
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      CDNURL: CDNURL,
      mergedUrl: '',
      base64Data: null,
      imgList: ['mphoto_text_back.png', 'mphoto_frame.png'],
      baseUrl: CDNURL + '/dimond520/',
      fullWidth: 254,
      fullHeight: 530,
      photoWidth: 198,
      photoHeight: 353
    }
  },
  async mounted() {
    Toast.loading('照片加载中')
    let r = await this.loadImage()
    this.drawing()
  },
  methods: {
    loadImage() {
      let preList = []
      for (let i = 0; i < this.imgList.length; i++) {
        let pre = new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = () => {
            resolve(img)
          }
          img.src = this.baseUrl + this.imgList[i]
        })
        preList.push(pre)
      }
      return Promise.all(preList)
    },
    drawing() {
      const that = this
      const width = this.fullWidth * 4
      const height = this.fullHeight * 4
      const photoWidth = this.photoWidth * 4
      const photoHeight = this.photoHeight * 4
      let backgroundColor = 'transparent'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let photo = this.image
      mc
        .background(this.baseUrl + 'mphoto_frame.png', {
          left: 0,
          top: 0,
          type: 'origin',
          width: width
        })
        .add(photo, {
          width: photoWidth,
          height: photoHeight,
          pos: {
            x: 27.5 * 4,
            y: 117 * 4
          }
        })
        .add(this.baseUrl + 'mphoto_text_back.png', {
          width: 236 * 4,
          height: 128 * 4,
          pos: {
            x: 9 * 4,
            y: 377 * 4
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'png',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          // 成功回调；
          success(b64) {
            that.base64Data = b64
            that.drawingText()
          },
          // 错误回调；
          error(err) {
            console.log(err)
            Toast.failed('照片加载失败')
          }
        })
    },
    // 文字合成
    drawingText() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      let name = this.name
      let msg = this.msg
      let msgLine1 = msg.slice(0, 7)
      let msgLine2 = msg.slice(7)
      image.src = this.base64Data
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let x = 105 * 4
        let y = 98 * 4
        // 绘制名字
        ctx.font = '400 74px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillStyle = '#fff'
        ctx.fillText('', x, y)
        ctx.save()
        ctx.translate(x, y)
        ctx.fillText(name, 0, 0)
        ctx.restore()
        // 绘制告白信息
        ctx.font = 'oblique normal bold 84px sans-serif'
        ctx.fillStyle = '#fff'
        ctx.translate(190, 1820)
        ctx.rotate(-(15 * Math.PI/180))
        ctx.fillText(msgLine1, 0, 0)
        ctx.restore()
        ctx.translate(-50, 120)
        ctx.fillText(msgLine2, 0, 0)
        ctx.restore()
        let url = canvas.toDataURL('image/png')
        this.mergedUrl = url
        Toast.hide()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/cdnUrl.less";

img {
  display: block;
}

.photo-merge {
  position: relative;
  .photo-area {
    height: 536px;
    padding: 2px 0 4px;
    box-sizing: border-box;
    .photo-merged {
      display: block;
      width: 254px;
      height: 530px;
      margin: 0 auto;
    }
    #canvas {
      width: 254px;
      height: 530px;
    }
  }
  .success-img {
    width: 2.96rem;
    height: 0.61rem;
    margin: 0 auto 0.3rem;
  }
  .love-rule {
    width: 3.28rem;
    height: 5.04rem;
    background-image: url("@{cdnUrl}/dimond520/love_rule_2.png");
    background-size: 100% 100%;
    margin: 0 auto 0.2rem;
  }
}
</style>