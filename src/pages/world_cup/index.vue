<template>
    <div class="content" id="content">
        <canvas id="canvas"></canvas>
        <div class="ballDiv">
          <img class="bg" :src="IMG_URL + '/bg.png'"/>
          <img class="ball" :src="IMG_URL + '/ball.png'"/>
          <img class="pao" :src="IMG_URL + '/pao.png'"/>
          <img class="gogo" :src="IMG_URL + '/gogo.png'"/>
        </div>
        <div class="photo">
          <img class="mImg" src=""/>
        </div>
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
      IMG_URL: IMG_SERVER + '/world_bei',
      //微信分享
      wxShareInfo: {
        title: '世界杯',
        desc: '镜世界通用模板',
        imgUrl: IMG_SERVER + '/world_bei/share.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '世界杯'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.innerHeight = height + 'px'
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          //this.mImg = res.image
          this.drawCanvas(res.image)
        })
        .catch(err => {})
    },
    drawCanvas(image) {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let border = new Image()
      let mImg = new Image()
      border.src = '/static/world_cup/border.png'
      border.onload = function() {
        canvas.width = border.width
        canvas.height = border.height
        mImg.onload = function() {
          ctx.drawImage(border, 0, 0)
          ctx.drawImage(
            mImg,
            0,
            0,
            mImg.width,
            mImg.height,
            14,
            20,
            border.width - 28,
            border.height - 39
          )
          let url = canvas.toDataURL('image/png')
          let img = document.querySelector('.mImg')
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
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_bei/';
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
  height: 100%;
  overflow: hidden;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0;
  position: relative;
  #canvas {
    width: 100%;
    height: 100%;
    display: none;
  }
  .ballDiv {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
    img {
      user-select: none;
    }
    .bg {
      width: 100%;
      opacity: 0;
      position: relative;
      z-index: 9;
      animation: toShow 1s 1 forwards;
    }
    .ball {
      width: 11.5%;
      position: absolute;
      top: 35%;
      left: 32%;
      z-index: 99;
      animation: step1 2s 1 forwards;
      animation: step2 1s 2s 1 forwards;
    }
    .pao {
      width: 69%;
      position: absolute;
      top: 35.5%;
      left: 32%;
      z-index: 999;
      opacity: 0;
      animation: toShow 0.3s 2s 1;
    }
    .gogo {
      width: 86%;
      position: absolute;
      top: 22%;
      left: 7.5%;
      opacity: 0;
      animation: toShow 0.3s 2.3s 1;
    }
  }
  .photo {
    width: 95%;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    z-index: 9999;
    background-color: #033bb2;
    background-image: url('@{imgUrl}bgborder.png');
    background-position: center 35%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    animation: slider 0.8s 2.2s 1 forwards;
    .mImg {
      width: 93.5%;
      margin: 0 auto;
      margin-top: 3.5%;
      margin-bottom: 30%;
    }
  }
}

@keyframes step1 {
  0% {
    width: 11.5%;
    top: 35%;
    left: 32%;
  }

  20% {
    width: 11.5%;
    top: 35%;
    left: 32%;
  }
  50% {
    width: 22%;
    top: 37.5%;
    left: 39%;
  }
  80% {
    width: 29.5%;
    top: 42%;
    left: 48.5%;
  }
  100% {
    width: 41%;
    top: 46%;
    left: 37%;
  }
}
@keyframes step2 {
  0% {
    width: 41%;
    top: 46%;
    left: 37%;
  }
  100% {
    width: 15%;
    top: 100%;
    left: 73%;
  }
}
@keyframes toShow {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slider {
  0% {
    top: 100%;
  }
  100% {
    top: 3.5%;
  }
}
</style>
