<template>
  <div
    :style="style.root" 
    class="root">
    <div class="shade-contain">
      <div class="shade"></div>
      <img 
        v-show="title.title1"
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="title1">
      <img 
         v-show="title.title2"
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="title2">
      <img 
        v-show="title.title3"
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        class="title3">
      <img 
        :src="baseUrl + 'light.png'+ this.$qiniuCompress()"
        class="light">
       <img 
        :src="baseUrl + 'moon.png'+ this.$qiniuCompress()"
        class="moon">
      <div class="shade-2"></div>
    </div>
    <div 
      class="photo">
       <img 
        :src="baseUrl + 'grounding.png'+ this.$qiniuCompress()"
        class="grounding">
      <img 
        :src="baseUrl + '1111.png'+ this.$qiniuCompress()"
        class="photo-real">
      <img 
        :src="baseUrl + 'play.png'+ this.$qiniuCompress()"
        class="play">

    </div>
    <div class="bottom">
      <img 
        :src="baseUrl + 'tip.png'+ this.$qiniuCompress()"
        class="tip">
    </div>
  </div>
</template>

<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
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
      photo: '',
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        //link: 'http://papi.xingstation.com/api/s/o2j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/mid_autumn/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.randomImg()
  },
  methods: {
    //随机
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
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/mid_autumn';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  background: #05192a;
  overflow: hidden;
  .shade-contain {
    width: 100%;
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
    }
    .light {
      width: 45%;
      position: absolute;
      right: 4%;
      top: 2%;
      z-index: 101;
      animation: light 1.2s linear infinite alternate;
    }
    .moon {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 100;
      transform: translate(-50%, -50%);
    }
    .shade-2 {
      width: 100%;
      height: 56%;
      background: #000;
      border-radius: 50%;
      position: absolute;
      right: -150%;
      opacity: 0.6;
      top: 50%;
      z-index: 100;
      transform: translate(-50%, -50%);
    }
  }
  .photo {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -53%);
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
      width: 40%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .bottom {
    width: 100%;
    height: 10%;
    position: absolute;
    left: 50%;
    bottom: 3%;
    transform: translate(-50%, 0%);
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
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-100px);
  }
}
</style>
