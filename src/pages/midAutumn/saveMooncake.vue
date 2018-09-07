<template>
  <div
    :style="style.root" 
    class="root">
    
    
  </div>
</template>

<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/save_moonCake/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        photoHei: {
          height: window.innerWidth * 1.45 + 'px'
        }
      },
      title: {
        title1: false,
        title2: false,
        title3: false
      },
      shade: true,
      playNow: null,
      buttonshow: true,
      photo: null,
      wxShareInfoValue: {
        title: '中秋天灯',
        desc: '嫦娥：天灯已收到，感谢',
        link: 'http://papi.xingstation.com/api/s/31M' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/save_moonCake/icon.jpeg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.randomImg()
    this.getInfoById()
    let that = this
    setTimeout(function() {
      that.shade = false
    }, 5800)
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          console.log(res)
          this.photo = res.url
          console.log(this.photo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //手机摇一摇
    initShack() {
      var last_update = '',
        x,
        y,
        z,
        last_x,
        last_y,
        last_z = 0,
        SHAKE_THRESHOLD = 3000,
        that = this
      if (window.DeviceMotionEvent) {
        // 移动浏览器支持运动传感事件
        window.addEventListener('devicemotion', deviceMotionHandler, false)
      } else {
        // 移动浏览器不支持运动传感事件
        alert('移动浏览器不支持运动传感事件')
      }
      function deviceMotionHandler(eventData) {
        // 获取含重力的加速度
        var acceleration = eventData.accelerationIncludingGravity
        // 获取当前时间
        var curTime = new Date().getTime()
        var diffTime = curTime - last_update
        // 固定时间段
        if (diffTime > 10) {
          last_update = curTime
          x = acceleration.x
          y = acceleration.y
          z = acceleration.z
          var speed =
            Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000
          if (speed > SHAKE_THRESHOLD) {
            //TODO:在此处可以实现摇一摇之后所要进行的数据逻辑操作
            that.noteShow = false
            that.shake = false
          }
          last_x = x
          last_y = y
          last_z = z
        }
      }
    },
    //文字随机出现
    randomImg() {
      let that = this
      let num = Math.floor(Math.random() * 3)
      switch (num) {
        case 1:
          that.title.title1 = true
          break
        case 2:
          that.title.title2 = true
          break
        default:
          that.title.title3 = true
      }
    },
    //播放视频
    playVideo() {
      let that = this
      this.playNow = document.getElementById('video')
      this.playNow.play()
      this.buttonshow = false
      this.playNow.onplay = function() {
        that.playNow.currentTime = 0
      }
      this.playNow.onended = function() {
        that.buttonshow = true
      }
      this.playNow.onpause = function() {
        that.buttonshow = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/save_moonCake/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  background: #05192a;
  overflow: hidden;
  .shade-contain {
    width: 100%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .shade {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.8;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
    }
    .title1,
    .title2,
    .title3 {
      width: 22.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -53%);
      z-index: 101;
      -webkit-animation-name: opacity;
      -webkit-animation-duration: 3s;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 3.5s;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-fill-mode: forwards;
      -webkit-animation-direction: normal;
    }
    .light {
      width: 45%;
      position: absolute;
      right: 4%;
      top: 2%;
      z-index: 101;
      -webkit-animation-name: light, fly;
      -webkit-animation-duration: 2s, 4s;
      -webkit-animation-timing-function: linear, linear;
      -webkit-animation-delay: 0s, 4s;
      -webkit-animation-iteration-count: infinite, 1;
      -webkit-animation-fill-mode: forwards, forwards;
      -webkit-animation-direction: alternate, normal;
    }
    .moon {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 100;
      transform: translate(-50%, -50%);
      -webkit-animation-name: opacity;
      -webkit-animation-duration: 3s;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 3.5s;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-fill-mode: forwards;
      -webkit-animation-direction: normal;
    }
  }
  .photo {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -53%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .grounding {
      width: 90%;
    }
    .photo-real {
      width: 90%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
    }
    .play {
      width: 24%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      user-select: auto;
      pointer-events: auto;
    }
  }
  .bottom {
    width: 100%;
    height: 10%;
    position: absolute;
    left: 50%;
    bottom: 1%;
    transform: translate(-50%, 0%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .tip {
      width: 55%;
    }
  }
}
@keyframes light {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
@keyframes fly {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-500px);
  }
}
@keyframes fly2 {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(1000px);
  }
}
@keyframes opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
