<template>
    <div class="content" id="content">
        <canvas id="canvas"></canvas>
        <div class="photo">
          <img id="mImg" src=""/>
        </div>
        <div class="ballDiv">
          <img class="ball" :src="IMG_URL + '/ball.png'"/>
          <img class="pao" :src="IMG_URL + '/pao.png'"/>
          <img class="gogo" :src="IMG_URL + '/gogo.png'"/>
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
        title: '你不是一个在战斗',
        desc: '2018世界杯等你 GOOOOOAL!!!!',
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
    let ballDiv = content.querySelector('.ballDiv')
    content.style.minHeight = height + 'px'
    ballDiv.style.minHeight = height + 'px'
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.drawCanvas(res.image)
        })
        .catch(err => {})
    },
    drawCanvas(image) {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let border = new Image()
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
    background: url('@{imgUrl}bg.png') center top / 100% 100% no-repeat;
    opacity: 0;
    animation: toShow 1.5s 1 forwards;
    img {
      user-select: none;
    }
    .ball {
      width: 11.5%;
      position: absolute;
      top: 35%;
      left: 32%;
      z-index: 99;
      animation: step1 0.5s forwards;
    }
    .pao {
      width: 69%;
      position: absolute;
      top: 35.5%;
      left: 32%;
      z-index: 999;
      opacity: 0;
      animation: toShow 0.1s 0.3s;
    }
    .gogo {
      width: 86%;
      position: absolute;
      top: 20%;
      left: 7%;
      opacity: 0;
      animation: toShow 0.1s 0.55s;
    }
  }
  .photo {
    width: 95%;
    position: relative;
    opacity: 0;
    margin: 0 auto;
    transform: translateY(103%);
    text-align: center;
    z-index: 9999;
    background-color: #033bb2;
    background-image: url('@{imgUrl}bgborder.png');
    background-position: center 15%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    animation: slider 0.5s 0.6s 1 forwards;
    #mImg {
      width: 93.5%;
      margin: 0 auto;
      margin-top: 3.5%;
      margin-bottom: 15%;
    }
  }
}

@keyframes step1 {
  0% {
    width: 11.5%;
    top: 35%;
    left: 32%;
    transform: rotate(0deg);
  }
  20% {
    width: 22%;
    top: 37.5%;
    left: 39%;
    transform: rotate(45deg);
  }
  40% {
    width: 29.5%;
    top: 42%;
    left: 48.5%;
    transform: rotate(90deg);
  }
  60% {
    width: 41%;
    top: 46%;
    left: 37%;
    transform: rotate(135deg);
  }
  80% {
    width: 29%;
    top: 64.5%;
    left: 58%;
    transform: rotate(90deg);
  }
  100% {
    width: 18%;
    top: 85%;
    left: 65%;
    transform: rotate(45deg);
  }
}

@keyframes toShow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  30% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slider {
  0% {
    //top: 100%;
    opacity: 0;
    transform: translateY(103%);
  }
  5% {
    //top: 100%;
    opacity: 1;
    transform: translateY(93%);
  }
  100% {
    // top: 3.5%;
    opacity: 1;
    transform: translateY(3%);
  }
}
</style>
