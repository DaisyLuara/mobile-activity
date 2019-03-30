<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 遮罩层 -->
    <div 
      v-show="shade" 
      class="shade-contain">
      <div class="shade"/>
      <img 
        :src="baseUrl + 'moon.png'+ this.$qiniuCompress()"
        class="moon">
      <img 
        :src="baseUrl + 'yuebing.png'+ this.$qiniuCompress()"
        class="yuebing">
      <img 
        :src="baseUrl + 'cloud01.png'+ this.$qiniuCompress()"
        class="clound1">
      <img 
        :src="baseUrl + 'cloud02.png'+ this.$qiniuCompress()"
        class="clound2">
    </div>
    <!-- 页面 -->
    <img 
      v-show="title.title0"
      :src="baseUrl + 'tag01.png'+ this.$qiniuCompress()"
      class="tag01">
    <img 
      v-show="title.title1"
      :src="baseUrl + 'tag02.png'+ this.$qiniuCompress()"
      class="tag02">
    <img 
      v-show="title.title2"
      :src="baseUrl + 'tag03.png'+ this.$qiniuCompress()"
      class="tag03">
    <img 
      v-show="title.title3"
      :src="baseUrl + 'tag04.png'+ this.$qiniuCompress()"
      class="tag04">
    <img 
      v-show="title.title4"
      :src="baseUrl + 'tag05.png'+ this.$qiniuCompress()"
      class="tag05">
    <img 
      v-show="title.title5"
      :src="baseUrl + 'tag06.png'+ this.$qiniuCompress()"
      class="tag06">
    <img 
      v-show="title.title6"
      :src="baseUrl + 'tag07.png'+ this.$qiniuCompress()"
      class="tag07">
    <img 
      v-show="title.title7"
      :src="baseUrl + 'tag08.png'+ this.$qiniuCompress()"
      class="tag08">
    <img 
      v-show="title.title8"
      :src="baseUrl + 'tag09.png'+ this.$qiniuCompress()"
      class="tag09">
    <img 
      v-show="title.title9"
      :src="baseUrl + 'tag010.png'+ this.$qiniuCompress()"
      class="tag10">
    <div class="photo">
      <img 
        :src="baseUrl + 'frame2.png'+ this.$qiniuCompress()"
        class="frame">
      <video 
        id="video"
        class="photo-real"
        webkit-playsinline="true" 
        playsinline="true" 
        x-webkit-airplay="true" 
        preload="auto"
        width="100%" 
        height="100%">
        <!--  src="http://cdn.xingstation.com/1007/video/MidautumnSkyLight_112_411_1492921319755.mp4s" -->
        <source 
          v-if="photo !== null" 
          :src="photo" 
          type="video/mp4">
        您的浏览器不支持video标签.
      </video>
      <img 
        v-show="buttonshow"
        :src="baseUrl + 'play2.png'+ this.$qiniuCompress()"
        class="play"
        @click="playVideo()">
    </div>
    <img 
      :src="baseUrl + 'qiantong.png'+ this.$qiniuCompress()"
      class="qiantong">
    <img 
      :src="baseUrl + 'text.png'+ this.$qiniuCompress()"
      class="text">
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
        }
      },
      title: {
        title0: false,
        title1: false,
        title2: false,
        title3: false,
        title4: false,
        title5: false,
        title6: false,
        title7: false,
        title8: false,
        title9: false
      },
      count: 0,
      shade: true,
      playNow: null,
      buttonshow: true,
      photo: null,
      imgList: [
        'back.png',
        'cloud01.png',
        'cloud02.png',
        'moon.png',
        'frame2.png',
        'qiantong.png',
        'tag01.png',
        'tag02.png',
        'tag03.png',
        'tag04.png',
        'tag05.png',
        'tag06.png',
        'tag07.png',
        'tag08.png',
        'tag09.png',
        'tag010.png',
        'text.png',
        'yuebing.png',
        'icon.png'
      ],
      wxShareInfoValue: {
        title: '拯救月饼',
        desc: '月满中秋.jpg',
        link: 'http://papi.xingstation.com/api/s/82m' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/save_moonCake/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.entry(this.imgList, r => {
      console.dir(r)
      this.getInfoById()
      this.initShack()
      let that = this
      setTimeout(function() {
        that.shade = false
      }, 3000)
      // do next
    })
  },
  methods: {
    //图片预加载
    loadImgs(imgList) {
      let preList = []
      let thisRef = this
      for (let i = 0; i < imgList.length; i++) {
        let pre = new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = function() {
            resolve(img)
          }
          img.src = thisRef.baseUrl + imgList[i]
        })
        preList.push(pre)
      }
      return Promise.all(preList).then(r => {
        return Promise.resolve(r)
      })
    },
    async entry(imgList, cb) {
      try {
        let rs = await this.loadImgs(imgList)
        cb(rs)
      } catch (err) {
        console.log(err)
        cb([])
      }
    },
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
        SHAKE_THRESHOLD = 6000,
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
            that.randomImg()
          }
          last_x = x
          last_y = y
          last_z = z
        }
      }
    },
    //文字随机出现
    randomImg() {
      //摇一次
      this.count++
      if (this.count > 1) {
        return
      }
      let that = this
      let num = Math.floor(Math.random() * 3)
      switch (num) {
        case 0:
          that.title.title0 = true
          break
        case 1:
          that.title.title1 = true
          break
        case 2:
          that.title.title2 = true
          break
        case 3:
          that.title.title3 = true
          break
        case 4:
          that.title.title4 = true
          break
        case 5:
          that.title.title5 = true
          break
        case 6:
          that.title.title6 = true
          break
        case 7:
          that.title.title7 = true
          break
        case 8:
          that.title.title8 = true
          break
        default:
          that.title.title9 = true
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
@imageHost: 'http://cdn.xingstation.com/fe/marketing/img/save_moonCake/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}back.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .shade-contain {
    width: 100%;
    height: 100%;
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
    .yuebing {
      width: 72%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      animation-name: opacity1;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    }
    .clound1 {
      width: 35%;
      position: absolute;
      left: 0%;
      top: 58%;
      z-index: 100;
      animation-name: clound1;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-delay: 2s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    }
    .clound2 {
      width: 35%;
      position: absolute;
      right: 0%;
      top: 28%;
      z-index: 100;
      animation-name: clound2;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-delay: 2s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    }
    .moon {
      width: 95%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      opacity: 0;
      animation-name: opacity2;
      animation-duration: 2.5s;
      animation-timing-function: linear;
      animation-delay: 0.8s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    }
  }
  .qiantong {
    width: 32%;
    position: absolute;
    right: 1%;
    bottom: 6%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .text {
    width: 58%;
    position: absolute;
    left: 16%;
    bottom: 1.6%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 100%;
    height: 83%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -53%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .frame {
      width: 77%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .photo-real {
      width: 90%;
      height: 96%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0);
      z-index: 9;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .play {
      width: 24%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      user-select: auto;
      pointer-events: auto;
      z-index: 10;
    }
  }
  .tag01,
  .tag02,
  .tag03,
  .tag04,
  .tag05,
  .tag06,
  .tag07,
  .tag08,
  .tag09,
  .tag10 {
    width: 20%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -49% 0 0 -11%;
    z-index: 66;
    animation-name: bounceIn, tally;
    animation-duration: 2s, 0.5s;
    animation-timing-function: linear, linear;
    animation-delay: 0s, 2.2s;
    animation-iteration-count: 1, 1;
    animation-fill-mode: forwards, forwards;
    animation-direction: alternate, normal;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
}
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.2) translate3d(0, 0, 0);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 1;
    transform: scale(0.79);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
}
@keyframes tally {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(110%);
  }
  100% {
    transform: translateX(220%);
  }
}
@keyframes clound1 {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-500px);
  }
}
@keyframes clound2 {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(500px);
  }
}

@keyframes opacity1 {
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
@keyframes opacity2 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
@keyframes opacity3 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
