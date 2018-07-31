<template>
  <div 
    :style="style.root"
    class="content"
  >
    <div
      class="main">
      <img 
      :src="base_url + 'bottom.png'" 
      class="bottom"/>
      <img 
      :src="mImg" 
      class="mImg"/>
      <img 
      :src="mImg" 
      class="mImg top"/>
      <img 
      :src="base_url + 'frame.png'"
      class="frame" 
      />
      <canvas id="canvas"></canvas>
    </div>
      <img 
      v-show="note"
      :src="base_url + 'save.png'" 
      class="save"/>
  </div>

</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      base_url: IMG_SERVER + 'image/rainer/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      note: false,
      mImg: null,
      //分享
      wxShareInfo: {
        title: '秘密花园 尽显美颜',
        desc: '快来寻找秘密花园，施展你的小小控雨魔法',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/rainer/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.getInfoById()
    this.doCanvas()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          this.note = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    doCanvas() {
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let frame = new Image()
      let i = 0.5
      let flag = true
      frame.setAttribute('crossOrigin', 'Anonymous')
      frame.onload = function() {
        canvas.width = frame.width
        canvas.height = frame.height
        ctx.drawImage(frame, 0, 0)
        doAnim()
      }
      frame.src = 'http://p22vy0aug.bkt.clouddn.com/image/rainer/frame.png'
      let lightImage = function(image, x, y, light) {
        // 绘制图片
        ctx.drawImage(image, x, y)
        // 获取从x、y开始，宽为image.width、高为image.height的图片数据
        // 也就是获取绘制的图片数据
        let imgData = ctx.getImageData(x, y, image.width, image.height)
        for (let i = 0, len = imgData.data.length; i < len; i += 4) {
          // 改变每个像素的R、G、B值
          imgData.data[i + 0] = imgData.data[i + 0] * light
          imgData.data[i + 1] = imgData.data[i + 1] * light
          imgData.data[i + 2] = imgData.data[i + 2] * light
        }
        // 将获取的图片数据放回去。
        ctx.putImageData(imgData, x, y)
      }
      function doAnim() {
        if (i > 4 || i < 0.5) {
          flag = !flag
        }
        i = flag ? i + 0.02 : i - 0.02
        lightImage(frame, 0, 0, i)
        var timer = window.requestAnimationFrame(doAnim)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@baseUrl: 'http://p22vy0aug.bkt.clouddn.com/image/rainer/';

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-image: url('@{baseUrl}/bg.jpg');
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #2b1c17;
  .main {
    width: 100%;
    position: relative;
    .mImg {
      position: absolute;
      width: 67.5%;
      top: 13.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .bottom {
      width: 81%;
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
    }
    .top {
      z-index: 999;
      pointer-events: auto;
      user-select: auto;
      opacity: 0;
    }
    .frame {
      width: 91%;
      opacity: 0;
      position: relative;
      margin: 0 auto;
      margin-top: 1.5%;
      margin-bottom: 2%;
      z-index: 99;
    }
  }
  .save {
    width: 56%;
    margin: 0 auto;
    margin-bottom: 3%;
  }
  #canvas {
    width: 91%;
    position: absolute;
    top: 2%;
    left: 50%;
    z-index: 99;
    transform: translateX(-50%);
  }
}
@keyframes aniBlink120 {
  from {
    margin-left: -60px;
  }
  to {
    margin-left: 520px;
  }
}
</style>


