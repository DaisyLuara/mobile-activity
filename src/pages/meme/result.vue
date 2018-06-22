<template>
    <div class="content" id="content">
        <div class="main">
                <img class="ceng5 relative title" :src="imgUrl + 'title.png'" /> 
                <div class="ceng2 relative center">
                    <img class="ceng1 relative printer" :src="imgUrl + 'printer.png'"/>
                    <img class="ceng3 relative support" :src="imgUrl + 'support.png'"/>
                    <img class="ceng4 absolute frame" :src="imgUrl + 'frame.png'"/>
                    <img :class="{ceng2:true,border:true}" :src="imgUrl + 'photo.png'"/>
                    <img :class="{mImg:true}" :src="mImg"/>
                </div>
                <img class="ceng1 relative lines" :src="imgUrl + 'lines.png'"/>
                <img class="ceng1 relative explain" :src="imgUrl + explain + '.png'"/>
                <img class="ceng5 absolute logo" :src="imgUrl + 'logo.png'"/>
                <img class="ceng5 absolute arrow" :src="imgUrl + 'arrow.png'" v-show="stopShake"/>
                <img class="ceng5 absolute lightL" :src="imgUrl + 'lightL.png'" v-show="stopShake"/>
                <img class="ceng5 absolute lightR" :src="imgUrl + 'lightR.png'"/>
        </div>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      imgUrl: IMAGE_SERVER + '/pages/meme/',
      mImg: null,
      explain: 'explain01',
      slider1: false,
      slider2: false,
      stopShake: true,
      //微信分享
      wxShareInfo: {
        title: '表情包制造机',
        desc: '表情包制造机',
        imgUrl: IMAGE_SERVER + '/pages/meme/share.png',
        success: () => {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '表情包制造机'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
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
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.mImg = res.image
          let that = this
          that.playAnim(that.mImg)
        })
        .catch(err => {})
    },
    playAnim(image) {
      let that = this
      let border = document.querySelector('.border')
      let img = document.querySelector('.mImg')
      let top = border.offsetTop
      let endTop = border.clientHeight * 0.37
      let opacity = 0
      let timer = null
      if (image) {
        toSlider()
      }
      function toSlider() {
        if (opacity >= 1) {
          that.stopShake = false
          that.explain = 'explain02'
          cancelAnimationFrame(timer)
          return
        }
        top = top >= endTop ? top : top + 5
        opacity = top >= endTop ? opacity + 0.05 : 0
        border.style.top = top + 'px'
        img.style.top = top + 3 + 'px'
        img.style.opacity = opacity
        requestAnimationFrame(toSlider)
      }
    }
  },
  components: {
    WxShare
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
  z-index: 5;
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
  .main {
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
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
        width: 80%;
        position: absolute;
        top: -60%;
        left: 10%;
      }
      .mImg {
        width: 52%;
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
      animation: shake 0.6s linear infinite alternate;
    }
    .lightL {
      width: 3%;
      top: 26.7%;
      right: 19.1%;
      animation: shake 0.6s linear infinite alternate;
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

