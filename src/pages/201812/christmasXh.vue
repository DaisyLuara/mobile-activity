<template>
  <div
    :style="style.root"
    class="root"
  >
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
      :src="baseUrl + 'text_new.png'+ this.$qiniuCompress()"
      class="save"
    >
  </div>
</template>
<script>
import { onlyWechatShare } from '@/mixins/onlyWechatShare'
import { getInfoById } from 'services'
import MC from 'mcanvas'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/christmas/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      base64Data: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: '惊喜~看看和我合照的是谁？',
        desc: '快来星海生活广场和神秘人物合拍圣诞照片~',
        link: process.env.AD_API+'/api/s/1Wj' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/christmas/icon_h5.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.getInfoById();
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          console.log(res)
          this.photo = res.image
          this.drawing()
        })
        .catch(err => {
          console.log(err)
        })
    },
    //合成图片
    drawing() {
      let width = this.$innerWidth()
      let height = (this.$innerWidth() / 1080) * 1600
      let that = this
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = that.photo + that.$qiniuCompress()
      // let url =
      //   'https://cdn.xingstation.cn/fe/marketing/img/christmas/666.jpg'
      mc.background(that.baseUrl + 'frame3.png', {
        left: 0,
        top: 0,
        type: 'origin',
        width: "100%",
        pos: {
          x: '0%',
          y: '0%'
        }
      })
        .add(url, {
          width: '78%',
          color: '#000000',
          pos: {
            x: '10%',
            y: '5%'
          }
        })
        .add(that.baseUrl + 'frame3.png', {
          width: '100%',
          pos: {
            x: '0%',
            y: '0%'
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
            let url = canvas.toDataURL('image/png')
            let img = document.getElementById('test')
            img.src = url
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
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/christmas/";
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
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  img {
    pointer-events: auto;
    user-select: auto;
  }
  .save {
    width: 45%;
    position: relative;
    margin-top: -16%;
    pointer-events: none;
    user-select: none;
  }
}
</style>
