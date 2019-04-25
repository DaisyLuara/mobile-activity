<template>
  <div
    :style="style.root" 
    class="root">
    <div 
      v-show="shade" 
      class="shade-contain">
      <div class="shade"/>
      <img 
        v-show="title.title1"
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="title1">
      <img 
        v-show="title.title2"
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="title2 ">
      <img 
        v-show="title.title3"
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        class="title3">
      <img 
        :src="baseUrl + 'light.png'+ this.$qiniuCompress()"
        class="light">
      <img 
        id="animation"
        :src="baseUrl + 'moon.png'+ this.$qiniuCompress()"
        class="moon">
    </div>
    <div 
      class="photo">
      <img 
        :src="baseUrl + 'grounding.png'+ this.$qiniuCompress()"
        class="grounding">
      <!-- http://cdn.xingstation.cn/1007/video/MidautumnSkyLight_112_411_1492921319755.mp4 -->
      <video 
        id="video"
        class="photo-real"
        webkit-playsinline="true" 
        playsinline="true" 
        x-webkit-airplay="true" 
        preload="auto"
        width="100%" 
        height="100%">
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
    <div class="bottom">
      <img 
        :src="baseUrl + 'tip2.png'+ this.$qiniuCompress()"
        class="tip">
    </div>
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
      baseUrl: cdnUrl + '/fe/marketing/img/mid_autumn/',
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
        link: process.env.AD_API+'/api/s/31M' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/mid_autumn/icon.jpeg',
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
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/mid_autumn';
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
      animation-name: opacity;
      animation-duration: 3s;
      animation-timing-function: linear;
      animation-delay: 3.5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: normal;
    }
    .light {
      width: 45%;
      position: absolute;
      right: 4%;
      top: 2%;
      z-index: 101;
      animation-name: light, fly;
      animation-duration: 2s, 4s;
      animation-timing-function: linear, linear;
      animation-delay: 0s, 4s;
      animation-iteration-count: infinite, 1;
      animation-fill-mode: forwards, forwards;
      animation-direction: alternate, normal;
    }
    .moon {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 100;
      transform: translate(-50%, -50%);
      animation-name: opacity;
      animation-duration: 3s;
      animation-timing-function: linear;
      animation-delay: 3.5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: normal;
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
