<template>
    <div class="content" id="content">
      <canvas id="canvas"></canvas>
        <div class="line"></div>
        <div class="printer">
          <span class="dolt"></span>
          <img class="cover" :src="IMG_URL + '/cover.png'"/>
          <img class="card" :src="IMG_URL + '/card.png'"/>
          <img class="shadow" :src="IMG_URL + '/shadow.png'"/>
          <img class="topRect" :src="IMG_URL + '/slider.png'"/>
          <img class="bottom" :src="IMG_URL + '/bottom.png'"/>
        </div>
        <div class="photo"><img id="mImg"  src=""/></div>
        <img class="press" :src="IMG_URL +'/press.png'" v-show="press"/>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMG_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages'
export default {
  data() {
    return {
      IMG_URL: IMG_SERVER + '/circus',
      press: false,
      //微信分享
      wxShareInfo: {
        title: '欢迎来到近铁马戏城！',
        desc: '旋转、跳跃、我闭着眼！',
        imgUrl: IMG_SERVER + '/circus/share.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '马戏团'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.drawCanvas(res.image)
          this.press = true
        })
        .catch(err => {})
    },
    drawCanvas(image) {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let frame = new Image()
      frame.src = '/static/circus/frame.png'
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')

      frame.onload = function() {
        canvas.width = frame.width
        canvas.height = frame.height
        mImg.onload = function() {
          ctx.drawImage(mImg, 0, 0, frame.width, frame.height)
          ctx.drawImage(frame, 0, 0)
          let url = canvas.toDataURL('image/png')
          let img = document.querySelector('#mImg')
          img.src = url
        }
        mImg.src = image
      }
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/circus/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0;
  background: url('@{imgUrl}bg.png') center top / 100% auto no-repeat;
  #canvas {
    display: none;
    height: 100%;
    width: 100%;
  }
  .line {
    height: 5px;
    position: relative;
    z-index: 9999;
    margin: 0 auto;
    margin-top: -1px;
    background-color: #ffd649;
    animation: myline 1.5s 1 forwards;
  }
  .printer {
    width: 100%;
    position: relative;
    margin: 0 auto;
    text-align: center;
    transform: translate3d(0, -300px, 0);
    animation: slider 0.5s linear forwards;
    z-index: 0;
    img {
      width: 80%;
      position: relative;
      font-size: 0;
      padding: 0;
      margin: 0 auto;
      user-select: none;
    }

    .dolt {
      position: absolute;
      top: 32%;
      right: 17%;
      z-index: 999;
      width: 13px;
      height: 15px;
      background: url('@{imgUrl}yellow.png') center top / 90% auto no-repeat;
      animation: bgshake 3s 0.5s 1 forwards;
    }
    .card {
      position: absolute;
      top: 33%;
      left: 30%;
      width: 7%;
      z-index: 4;
      animation: card 3s 0.5s 1 forwards;
    }
    .cover {
      margin-bottom: -1px;
      z-index: 8;
    }
    .shadow {
      width: 48.5%;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 5;
    }
    .topRect {
      width: 37.8%;
      position: absolute;
      top: 36%;
      left: 50%;
      transform: translate(-50%, -100%);
      z-index: 3;
      animation: printer 3s 0.4s 1 forwards;
    }
    .bottom {
      margin-top: -1px;
      z-index: 0;
    }
  }
  .photo {
    opacity: 0;
    position: relative;
    margin: 15px auto;
    text-align: center;
    animation: photo 1.2s 3s 1 forwards;
    img {
      max-width: 100%;
    }
  }
  .press {
    width: 53%;
    margin: 0 auto;
    margin-bottom: 20px;
    opacity: 0;
    animation: toShow 0.5s 5s 1 forwards;
    user-select: none;
  }
}

@keyframes sliderDown {
  0% {
    transform: translate3d(0, -116%, 0);
  }
  100% {
    transform: none;
  }
}
@keyframes card {
  0% {
    left: 30%;
  }
  10% {
    left: 60%;
  }
  20% {
    left: 30%;
  }
  30% {
    left: 60%;
  }
  40% {
    left: 30%;
  }
  50% {
    left: 60%;
  }
  60% {
    left: 30%;
  }
  70% {
    left: 60%;
  }
  80% {
    left: 30%;
  }
  90% {
    left: 60%;
  }
  100% {
    left: 30%;
  }
}
@keyframes toShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slider {
  0% {
    transform: translate3d(0, -300px, 0);
  }
  100% {
    transform: none;
  }
}
@keyframes myline {
  from {
    width: 0px;
  }
  to {
    width: 1000px;
  }
}
@keyframes bgshake {
  0% {
    background-image: url('@{imgUrl}yellow.png');
  }
  10% {
    background-image: url('@{imgUrl}red.png');
  }
  20% {
    background-image: url('@{imgUrl}yellow.png');
  }
  30% {
    background-image: url('@{imgUrl}red.png');
  }
  40% {
    background-image: url('@{imgUrl}yellow.png');
  }
  50% {
    background-image: url('@{imgUrl}red.png');
  }
  60% {
    background-image: url('@{imgUrl}yellow.png');
  }
  70% {
    background-image: url('@{imgUrl}red.png');
  }
  80% {
    background-image: url('@{imgUrl}yellow.png');
  }
  90% {
    background-image: url('@{imgUrl}red.png');
  }
  100% {
    background-image: url('@{imgUrl}yellow.png');
  }
}
@keyframes printer {
  0% {
    transform: translate(-50%, -100%);
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -80%);
    opacity: 1;
  }
  40% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  60% {
    transform: translate(-50%, -30%);
    opacity: 1;
  }
  80% {
    transform: translate(-50%, -10%);
    opacity: 1;
  }
  99% {
    transform: translate(-50%, -5%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -5%);
    opacity: 0;
  }
}
@keyframes photo {
  0% {
    width: 37%;
    transform: translateY(-100%) rotateX(0deg);
    opacity: 0;
  }
  20% {
    width: 37%;
    transform: translateY(-70%) rotateX(30deg);
    opacity: 0.4;
  }
  40% {
    width: 37%;
    transform: translateY(-50%) rotateX(60deg);
    opacity: 0.7;
  }
  60% {
    width: 37%;
    transform: translateY(-30%) rotateX(90deg);
    opacity: 0.9;
  }
  80% {
    width: 57%;
    transform: translateY(-10%) rotateX(0deg);
    opacity: 1;
  }
  100% {
    width: 77%;
    transform: translateY(0) rotateX(0deg);
    opacity: 1;
  }
}
</style>
