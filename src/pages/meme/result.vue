<template>
  <div 
    id="content" 
    class="content"
  >
    <div class="main">
      <img 
        :src="imgUrl + 'title.png'" 
        class="ceng5 relative title"
      > 
      <div class="ceng2 relative center">
        <img 
          :src="imgUrl + 'printer.png'" 
          class="ceng1 relative printer"
        >
        <img 
          :src="imgUrl + 'support.png'" 
          class="ceng3 relative support"
        >
        <img 
          :src="imgUrl + 'frame.png'" 
          class="ceng4 absolute frame"
        >
        <div 
          :class="{ceng2: true, border: true}"
        />
        <img 
          :style="mImgStyle"
          :class="{mImg: true}" 
          :src="mImg"
        >
      </div>
      <img 
        :src="imgUrl + 'lines.png'" 
        class="ceng1 relative lines"
      >
      <img 
        :src="imgUrl + explain + '.png'" 
        class="ceng1 relative explain"
      >
      <img 
        :src="imgUrl + 'logo.png'" 
        class="ceng5 absolute logo"
      >
      <img 
        v-show="stopShake" 
        :src="imgUrl + 'arrow.png'" 
        class="ceng5 absolute arrow"
      >
      <img 
        v-show="stopShake" 
        :src="imgUrl + 'lightL.png'" 
        class="ceng5 absolute lightL"
      >
      <img 
        :src="imgUrl + 'lightR.png'" 
        class="ceng5 absolute lightR"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, getInfoById } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
const wiw =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth
export default {
  data() {
    return {
      imgUrl: IMAGE_SERVER + '/pages/meme/',
      mImg: null,
      explain: 'explain01',
      slider1: false,
      slider2: false,
      stopShake: true,
      mImgStyle: {
        width: wiw * 198 / 375 + 'px',
        height: wiw * 187 / 375 * 'px'
      },
      //微信分享
      wxShareInfo: {
        title: '表情包制造机',
        desc: '表情包制造机',
        imgUrl: IMAGE_SERVER + '/pages/meme/share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '表情包制造机'
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    let content = document.getElementById('content')
    let border = document.querySelector('.border')
    content.style.minHeight = height + 'px'
    let border_width = width * 0.75
    border.style.height = 499 / 604 * border_width + 'px'
    window.requestAnimationFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()
    this.getInfoById()
    $wechat()
      .then(res => {
        res.share(this.wxShareInfo)
      })
      .catch(_ => {
        console.warn(_.message)
        console.dir(_)
      })
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          this.imgsIsLoaded()
        })
        .catch(err => {})
    },
    playAnim(image) {
      let that = this
      let border = document.querySelector('.border')
      let img = document.querySelector('.mImg')
      let top = border.offsetTop
      let endTop = border.clientHeight * 0.456
      let opacity = 0
      let timer = null
      border.style.opacity = 1

      if (image && endTop > 0) {
        toSlider()
      }
      function toSlider() {
        if (opacity >= 1) {
          that.stopShake = false
          // that.explain = 'explain02'
          cancelAnimationFrame(timer)
          return
        }
        opacity >= 0.5 ? (border.style.backgroundColor = '#fff') : ''
        opacity > 0 ? (that.explain = 'explain02') : ''
        top = top >= endTop ? top : top + 5
        opacity = top >= endTop ? opacity + 0.05 : 0
        border.style.top = top + 'px'
        img.style.top = top - 3 + 'px'
        img.style.opacity = opacity
        requestAnimationFrame(toSlider)
      }
    },
    imgsIsLoaded() {
      let imgsUrl = [
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/back.jpg',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/title.png',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/printer.png',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/lines.png',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/explain01.png',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/explain02.png',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/frame.png',
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/support.png'
          // 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/logo.png',
          // 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/arrow.png',
          // 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/lightL.png',
          // 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/lightR.png',
          // 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/photo.png'
        ],
        imgs = [],
        flag = 0,
        that = this
      let total = imgsUrl.length
      for (let i = 0; i < total; i++) {
        imgs[i] = new Image()
        imgs[i].src = imgsUrl[i]
        imgs[i].onload = function() {
          flag++
          if (flag == total) {
            that.playAnim(that.mImg)
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/';
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
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.ceng1 {
  z-index: 0;
}
.ceng2 {
  z-index: 12;
}
.ceng3 {
  z-index: 10;
}
.ceng4 {
  z-index: 50;
}
.ceng5 {
  z-index: 100;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #0d4882;
  background-image: url('@{imgUrl}back.jpg');
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
  position: relative;
  z-index: 10;
  .main {
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    z-index: 11;
    .title {
      width: 84.5%;
      margin-top: 5%;
      margin-bottom: -5%;
    }
    .center {
      width: 100%;
      overflow: hidden;
      top: 21%;
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      .printer {
        width: 97%;
      }
      .border {
        width: 75%;
        position: absolute;
        top: -60%;
        left: 12.5%;
        opacity: 0;
        box-sizing: border-box;
        border-style: solid;
        border-color: #fff;
        border-top-width: 8px;
        border-bottom-width: 8px;
        border-left-width: 11px;
        border-right-width: 11px;
        background-color: #000;
        z-index: 15;
      }
      .mImg {
        // width: 52%;
        position: absolute;
        top: -60%;
        left: 24%;
        pointer-events: auto;
        user-select: auto;
        opacity: 0;
        margin-top: 7%;
        z-index: 999;
      }
      .slider1 {
        animation: slider 1.2s linear 1 forwards;
      }
      .slider2 {
        animation: slider 1.2s linear 1 forwards,
          shake 0.6s 1.2s linear 1 forwards;
      }
      .frame {
        width: 97%;
        top: 0%;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .support {
        width: 95%;
        margin-top: -61%;
      }
    }
    .lines {
      width: 72%;
      margin-top: -2%;
    }
    .explain {
      width: 80.8%;
      margin-bottom: 5%;
      margin-top: -2.5%;
    }

    .logo {
      width: 30%;
      top: 22%;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .arrow {
      width: 5.5%;
      top: 32.5%;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 149;
      animation: shake 0.4s linear infinite alternate;
    }
    .lightL {
      width: 3%;
      top: 26.7%;
      right: 19.1%;
      animation: shake 0.4s linear infinite alternate;
    }
    .lightR {
      width: 3%;
      top: 26.7%;
      right: 16.6%;
    }
  }
}
@keyframes shake {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slider {
  0% {
    transform: translate(-50%, -80%);
  }
  100% {
    transform: translate(-50%, 38%);
  }
}
</style>

