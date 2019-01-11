<template>
  <div
    id="content"
    :style="style.root"
    class="content"
  >
    <canvas id="canvas" />
    <div
      v-show="Boolean(photo)"
      class="line"
    />
    <div
      v-show="Boolean(photo)"
      class="printer"
    >
      <span class="dolt" />
      <img
        :src="IMG_URL + '/cover.png'"
        class="cover"
      >
      <img
        :src="IMG_URL + '/card.png'"
        class="card"
      >
      <img
        :src="IMG_URL + '/shadow.png'"
        class="shadow"
      >
      <img
        :src="IMG_URL + '/slider.png'"
        class="topRect"
      >
      <img
        :src="IMG_URL + '/bottom.png'"
        class="bottom"
      >
    </div>
    <div
      v-show="tostart"
      class="photo"
    >
      <img
        id="mImg"
        src=""
      >
    </div>
    <img
      v-show="tostart"
      :src="IMG_URL +'/press.png'"
      class="press"
    >
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMG_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages'
export default {
  mixins: [normalPages],
  data() {
    return {
      IMG_URL: IMG_SERVER + '/circus',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      tostart: false,
      //微信分享
      wxShareInfoValue: {
        title: '欢迎来到近铁马戏城！',
        desc: '旋转、跳跃、我闭着眼！',
        imgUrl: IMG_SERVER + '/circus/share.png'
      }
    }
  },
  watch: {
    photo() {
      this.drawCanvas(this.photo)
    }
  },
  methods: {
    drawCanvas(image) {
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let frame = new Image()
      frame.src = '/static/circus/frame.png'
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')

      frame.onload = function () {
        canvas.width = frame.width
        canvas.height = frame.height
        mImg.onload = function () {
          ctx.drawImage(mImg, 0, 0, frame.width, frame.height)
          ctx.drawImage(frame, 0, 0)
          let url = canvas.toDataURL('image/png')
          let img = document.querySelector('#mImg')
          img.src = url
          that.tostart = true
        }
        mImg.src = image + that.$qiniuCompress()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/circus/";
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
  background: url("@{imgUrl}bg.png") center top / 100% auto no-repeat;
  #canvas {
    display: none;
    height: 100%;
    width: 100%;
  }
  .line {
    width: 0px;
    position: relative;
    margin: 0 auto;
    z-index: 9999;
    margin-top: -1px;
    background-color: #ffd649;
    animation: myline 0.8s;
  }
  .printer {
    width: 100%;
    position: relative;
    margin: 0 auto;
    text-align: center;
    transform: translate3d(0, -300px, 0);
    animation: slider 0.4s forwards;
    z-index: 0;
    img {
      width: 80%;
      position: relative;
      font-size: 0;
      padding: 0;
      margin: 0 auto;
      pointer-events: none;
      user-select: none;
    }

    .dolt {
      position: absolute;
      top: 32%;
      right: 17%;
      z-index: 999;
      width: 13px;
      height: 15px;
      background: url("@{imgUrl}yellow.png") center top / 90% auto no-repeat;
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
      top: 33.6%;
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
    animation: photo 1.2s 3.2s 1 forwards;
    z-index: 99999;
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
    pointer-events: none;
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
  0% {
    width: 0px;
    height: 5px;
  }
  85% {
    width: 800px;
    height: 5px;
  }
  100% {
    width: 1000px;
    height: 0px;
  }
}
@keyframes bgshake {
  0% {
    background-image: url("@{imgUrl}yellow.png");
  }
  10% {
    background-image: url("@{imgUrl}red.png");
  }
  20% {
    background-image: url("@{imgUrl}yellow.png");
  }
  30% {
    background-image: url("@{imgUrl}red.png");
  }
  40% {
    background-image: url("@{imgUrl}yellow.png");
  }
  50% {
    background-image: url("@{imgUrl}red.png");
  }
  60% {
    background-image: url("@{imgUrl}yellow.png");
  }
  70% {
    background-image: url("@{imgUrl}red.png");
  }
  80% {
    background-image: url("@{imgUrl}yellow.png");
  }
  90% {
    background-image: url("@{imgUrl}red.png");
  }
  100% {
    background-image: url("@{imgUrl}yellow.png");
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
    //width: 37%;
    width: 0%;
    transform: translateY(-110%);
    opacity: 0;
  }
  // 20% {
  //   width: 37%;
  //   transform: translateY(-70%);
  //   opacity: 0.4;
  // }
  // 40% {
  //   width: 37%;
  //   transform: translateY(-50%);
  //   opacity: 0.7;
  // }
  // 60% {
  //   width: 37%;
  //   transform: translateY(-30%);
  //   opacity: 0.9;
  // }
  // 80% {
  //   width: 57%;
  //   transform: translateY(-10%);
  //   opacity: 1;
  // }
  100% {
    width: 77%;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
