<template>
  <div class="phone-content" id="phoneContent">
    <canvas class="canvas" id="canvas"></canvas>
      <img class="photo" src="" id="photo"/>
      <div class="mask" v-show="mask">
          <div class="ice_all" id="ice">
            <div :class="{group:true,left:run}"></div>
            <div :class="{group:true, right:run}"></div>
            <a class="slide" v-show="text"><img :src="IMGURL + '/note.png'"/></a>
          </div>
          <div class="water">
            <img class="ice1" :src="IMGURL + '/water_ice1.png'"/>
            <img class="ice2" :src="IMGURL + '/water_ice2.png'"/>
            <img class="juice" :src="IMGURL + '/ice_juice.png'"/>
            <img class="fruit" :src="IMGURL + '/fruit_bottom.png'"/>
            <img class="cover" :src="IMGURL + '/water_cover.png'"/>
          </div>
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
      IMGURL: IMG_SERVER + '/summer',
      photo: null,
      mask: true,
      mImg: null,
      text: true,
      run: false,
      //微信分享
      wxShareInfo: {
        title: '',
        desc: '',
        imgUrl: '',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '夏天'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let phone = document.getElementById('phoneContent')
    let photo = document.getElementById('photo')
    phone.style.minHeight = height + 'px'
    photo.style.height = height * 0.93 + 'px'
    console.log(height)
    if (height >= 700) {
      photo.style.paddingTop = '5.5%'
      photo.style.paddingBottom = '18.5%'
    }
    // this.drawCanvas()
    // this.init()
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          console.log(res)
          //this.photo = res.image
          this.init()
          this.drawCanvas(res.image)
        })
        .catch(err => {
          console.log(err)
        })
    },
    init() {
      let ice = $('.mask'),
        that = this
      document.addEventListener('touchstart', function() {}, true)
      ice.on('click', fingerDown)
      ice.off('touchstart', fingerDown)
      ice.on('touchstart', fingerDown)
      function fingerDown(e) {
        that.text = console.log('text')
        ice.on('touchmove', fingerMove)
        ice.on('touchend', fingerUp)
        console.log(1)
      }
      function fingerMove(e) {
        let moveX = e.originalEvent.touches[0].clientX
        that.run = true
        console.log(2)
        $('.mask').animate(
          {
            opacity: 0
          },
          1200,
          function() {
            that.mask = false
          }
        )
      }
      function fingerUp() {
        ice.off('touchmove', fingerMove)
        console.log(3)
      }
    },
    drawCanvas(photo) {
      let canvas = document.getElementById('canvas')
      let frame = new Image()
      frame.src = '/static/summer/frame.png'
      let ctx = canvas.getContext('2d')
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')
      frame.onload = function() {
        canvas.width = frame.width
        canvas.height = frame.height
        ctx.drawImage(frame, 0, 0)
        mImg.onload = function() {
          ctx.drawImage(mImg, 1, 1, mImg.width, mImg.height, 48, 40, 600, 1070)
          let url = canvas.toDataURL('image/png')
          let img = document.getElementById('photo')
          img.src = url
        }
        // mImg.src =
        //   'http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg'
        mImg.src = photo
      }
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/summer';
html,
body {
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.phone-content {
  text-align: center;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  background: url('@{imgUrl}/bg.jpg') center center / 100% 100% no-repeat;
  .canvas {
    display: none;
    height: 100%;
    width: 100%;
  }
  .photo {
    width: 92%;
    margin-top: 3%;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    img {
      pointer-events: none;
      user-select: none;
    }
    .water {
      width: 100%;
      height: 39%;
      position: absolute;
      bottom: 0;
      z-index: 9999;
      background: url('@{imgUrl}/water_bottom.png') center bottom/100% auto
        no-repeat;
      img {
        position: absolute;
        z-index: 2;
      }
      .ice1 {
        left: -7%;
        top: 22%;
        width: 25%;
      }
      .ice2 {
        left: 53%;
        top: 65%;
        width: 20%;
      }
      .juice {
        left: 59%;
        top: 5%;
        width: 34%;
      }
      .fruit {
        left: 14%;
        top: 68%;
        width: 25%;
      }
      .cover {
        left: 0;
        width: 100%;
        top: 33%;
        z-index: 10;
      }
    }
    .ice_all {
      position: relative;
      width: 100%;
      overflow: hidden;
      height: 100%;
      z-index: 0;
      .group {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('@{imgUrl}/sprite.png');
        background-size: 1241px 736px;
        background-repeat: no-repeat;
        background-position: 0 0;
        animation: ice 1s steps(3) infinite;
      }
      .left {
        transform: translate(0, 0);
        animation: myleft 1.2s linear forwards alternate;
      }
      .right {
        transform: translate(0, 0);
        animation: myright 1.2s linear forwards alternate;
      }
    }
    .slide {
      display: inline-block;
      width: 85%;
      position: absolute;
      left: 0;
      top: 40%;
      transform: translate(0, -50%);
      animation: slider 0.8s linear infinite alternate;
      z-index: 999999;
      img {
        width: 100%;
      }
    }
  }
}
@keyframes updown {
  0% {
    background-position: center 87%, -12% 35%, 91% 5%, 62% 45%, 18% 46%,
      center bottom;
  }
  80% {
    background-position: center 87%, -12% 58%, 91% 26%, 62% 109%, 18% 126%,
      center bottom;
  }
  100% {
    background-position: center 87%, -12% 50%, 91% 19%, 62% 100%, 18% 112%,
      center bottom;
  }
}
@keyframes slider {
  0% {
    left: 0;
  }
  100% {
    left: 15%;
  }
}
@keyframes ice {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1241px 0;
  }
}
@keyframes myleft {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
@keyframes myright {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}
</style>