<template>
  <div class="phone-content" id="phoneContent">
    <canvas class="canvas" id="canvas"></canvas>
      <img class="photo" src="" id="photo"/>
      <div class="mask" v-show="mask">
          <div class="ice_all" id="ice">
            <div class="ice-drop">
                <div class="run1" v-for="(item,index) in 30" :key="item.id" 
                :style="'left:'+ (index%5*27-20) +'%;top:'+ (Math.floor(index/5)*20-300) +'%'">
                  <img :src="IMGURL + '/ice' + item%3 + '.png'" :style="'transform:rotate(' +  Math.ceil(Math.random()*360)  + 'deg)'"/>
                </div>
                <div class="run2" v-for="(item,index) in 30" :key="item.id" 
                :style="'left:'+ (index%5*27) +'%;top:'+ (Math.floor(index/5)*20-350) +'%'">
                  <img :src="IMGURL + '/ice' + item%3 + '.png'" :style="'transform:rotate(-' +  Math.ceil(Math.random()*360)  + 'deg)'"/>
                </div>
            </div>
            <div class="over-ice"></div>
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
import $ from 'jquery'

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
        title: '让你的夏天清爽一下',
        desc: '来星视度获取您的夏日照片',
        imgUrl: IMG_SERVER + '/summer/icon.png',
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
    this.getInfoById()
    this.iceDrop()
    // this.init()
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
      ice.off('touchstart', fingerDown)
      ice.on('touchstart', fingerDown)
      function fingerDown(e) {
        that.text = false
        ice.on('touchmove', fingerMove)
        ice.on('touchend', fingerUp)
      }
      function fingerMove(e) {
        let moveX = e.originalEvent.touches[0].clientX
        that.run = true

        $('.mask').animate(
          {
            opacity: 0
          },
          800,
          function() {
            that.mask = false
          }
        )
      }
      function fingerUp() {
        ice.off('touchmove', fingerMove)
        that.text = !that.run
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
    },
    iceDrop() {
      $('.run1').each(function(index, element) {
        $(this)
          .delay(200)
          .animate(
            {
              top: index * 3 - 15 + '%'
            },
            500 + Math.ceil(Math.random() * 500)
          )
      })
      $('.run2').each(function(index, element) {
        $(this)
          .delay(200)
          .animate(
            {
              top: index * 3 - 5 + '%'
            },
            800 + Math.ceil(Math.random() * 300)
          )
      })
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
    margin-top: 3.2%;
    margin-bottom: 7%;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
        animation: water2 0.8s ease-in infinite alternate;
      }
      .ice2 {
        left: 53%;
        top: 65%;
        width: 20%;
        animation: water2 0.9s ease-out infinite alternate-reverse;
      }
      .juice {
        left: 59%;
        top: 5%;
        width: 34%;
        animation: water2 0.9s linear infinite alternate;
      }
      .fruit {
        left: 14%;
        top: 68%;
        width: 25%;
        animation: water1 1.2s ease-in-out infinite alternate;
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
      canvas {
        z-index: 0;
      }
      .ice-drop {
        position: absolute;
        left: 50%;
        top: 0;
        z-index: 999;
        width: 130%;
        transform: translate(-50%, 0);
        height: 100%;
        div {
          width: 27%;
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          margin-left: -5%;
          img {
            max-width: 100%;
          }
        }
      }
      .over-ice {
        position: absolute;
        //top: 0;
        top: 68%;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 100%;
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

@keyframes water1 {
  0% {
    transform: translate(0, 5px) rotate(-4deg);
  }
  100% {
    transform: translate(0, -15px) rotate(4deg);
  }
}
@keyframes water2 {
  0% {
    transform: translate(0, 5px) rotate(2deg);
  }
  100% {
    transform: translate(0, -5px) rotate(-2deg);
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
@keyframes bgrun {
  0% {
    top: 68%;
  }
  100% {
    top: -10%;
  }
}
@keyframes myrotate {
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(45deg);
  }
}
@keyframes allrun {
  0% {
    transform: translate(5%, -550%);
  }
  100% {
    transform: translate(-5%, 0%);
  }
}
</style>