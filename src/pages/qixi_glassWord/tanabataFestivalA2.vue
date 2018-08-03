<template>
  <div
    :style="style.root" 
    class="root">
    <div
      v-if="shade"
      class="shade"
      @click="goLink()">
      <img 
        :src="baseUrl + 'shade.png'+this.$qiniuCompress()"
        class="shade-ad">
    </div>
    <div 
      v-if="close"
      class="close">
      <img 
        :src="baseUrl + 'x.png'+this.$qiniuCompress()"
        class="close"
        @click="closeAd()">
    </div>
    <div  
      class="bg">
      <img 
        :src="baseUrl + 'bg.png?v=111'">
    </div>
    <div 
      class="photo">
      <img  
        v-if="photo!== null" 
        :src="photo+ this.$qiniuCompress()" 
        alt="">
    </div>  
    <div 
      class="real-photo">
      <img 
        v-if="photo!== null" 
        :src="photo+ this.$qiniuCompress()" 
        alt="">
    </div>  
    <img 
      :src="baseUrl + 'fu_17.png'+this.$qiniuCompress()"
      class="fu-17">
    <img 
      :src="baseUrl + 'fu_2.png'+this.$qiniuCompress()"
      class="fu-2">
    <img 
      :src="baseUrl + 'fu_3.png'+this.$qiniuCompress()"
      class="fu-3">
    <img 
      :src="baseUrl + 'fu_7.png'+this.$qiniuCompress()"
      class="fu-7">
    <img 
      :src="baseUrl + 'fu_16.png'+this.$qiniuCompress()"
      class="fu-16">
    <div 
      class="arrow">
      <img  
        :src="baseUrl + 'img_0.png'+this.$qiniuCompress()"> 
    </div>
    <div 
      class="bottom">
      <img 
        :src="baseUrl + 'img_1.png'+this.$qiniuCompress()"
        class="title" > 
    </div>
  </div>
</template>
<script>
import lottie from 'lottie-web'
import { wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/tanabataFestival/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      shade: true,
      close: true,
      photo: '',
      wxShareInfoValue: {
        title: '七夕，我们谈个恋爱吧！',
        desc: '用一生说我爱你',
        imgUrl: cdnUrl + '/fe/marketing/img/tanabataFestival/share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    goLink() {
      window.location.href =
        'https://m.51jiabo.com/sh/vipCoupon/29.html?from=singlemessage&isappinstalled=0'
    },
    closeAd() {
      this.shade = false
      this.close = false
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/tanabataFestival';
.root {
  width: 100%;
  background: #ec7ca9;
  position: relative;
  overflow: hidden;
  .shade {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.8;
    z-index: 999;
    position: absolute;
    left: 0;
    top: 0;
    .shade-ad {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }
  }
  .close {
    position: absolute;
    right: 0%;
    top: 23%;
    z-index: 10001;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .photo {
    width: 70.5%;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .real-photo {
    width: 70.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    z-index: 998;
    opacity: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .fu-17 {
    position: absolute;
    right: 0;
    top: 13%;
    z-index: 0;
    width: 35%;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;
  }
  .fu-2 {
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 0;
    width: 16%;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;
  }
  .fu-3 {
    position: absolute;
    left: 0;
    top: 13%;
    z-index: 0;
    width: 30%;
    z-index: 3;
    animation: loveScale 2s ease-out infinite forwards;
  }
  .fu-7 {
    position: absolute;
    left: -3%;
    bottom: 1%;
    z-index: 0;
    width: 37%;
    z-index: 3;
    animation: loveScale 2s ease-out infinite forwards;
  }
  .fu-16 {
    position: absolute;
    right: -3%;
    bottom: 1%;
    z-index: 0;
    width: 37%;
    z-index: 3;
    animation: loveScale 2s ease-out infinite forwards;
  }
  .arrow {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 13%;
    text-align: center;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;
    img {
      width: 24%;
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 8.5%;
    text-align: center;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;

    .title {
      width: 77%;
    }
  }
}
@keyframes arrow {
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
@keyframes loveScale {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  to {
    transform: scale(1.1, 1.1);
  }
}
</style>