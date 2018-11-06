<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'bg.jpg'+ this.$qiniuCompress()"
      class="bg">
    <div class="top">
      <img 
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg">
    </div>
    <div class="center">
      <img 
      :src="baseUrl + 'button.png'+ this.$qiniuCompress()"
      class="button">
      <img 
      :src="baseUrl + 'banner.png'+ this.$qiniuCompress()"
      class="banner">
      <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      class="frame">
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo">
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-real-photo':iphoneX,'real-photo':!iphoneX}"
      class="real-photo">
    </div>
    <div class="bt">
      <img 
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="btImg">
      <img 
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav">
      <img 
        :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
        class="prompt">
    
    </div>
    
    <!--
    <img 
      :src="baseUrl + 'balloon_1.png'+ this.$qiniuCompress()"
      class="balloon1">
    <img 
      :src="baseUrl + 'balloon_2.png'+ this.$qiniuCompress()"
      class="balloon2"> -->
    <!-- <img 
      :src="baseUrl + 'balloon_3.png'+ this.$qiniuCompress()"
      class="balloon3">
    <div 
      :class="{'x-bt':iphoneX,'bt':!iphoneX}"
      class="bt">
      <img 
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav">
      <img 
        :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
        class="prompt">
    </div>
     -->
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
      baseUrl: cdnUrl + '/fe/marketing/img/hiplay_world_taicha/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '嗨玩全世界',
        desc: '即刻旅行，就现在',
        link: 'http://papi.xingstation.com/api/s/Lg4' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/hiplay_world_taicha/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/hiplay_world_taicha/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow-x: hidden;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .top {
    width: 100%;
    position: relative;
    .topImg {
      width: 100%;
    }
  }
  .center {
    width: 100%;
    position: relative;
    margin-top: 40%;
    .button {
      width: 90%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 42%);
      z-index: 9;
    }
    .banner {
      width: 70%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 73%);
    }
    .frame {
      width: 75%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -2%);
      z-index: 5;
    }
    .photo {
      width: 63%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 2%);
      user-select: auto;
      pointer-events: auto;
      z-index: 3;
    }
    .real-photo {
      width: 64%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 2%);
      z-index: 99;
      opacity: 0;
      user-select: auto;
      pointer-events: auto;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    margin-top: 168.2%;
    .nav {
      width: 15%;
      display: block;
      position: absolute;
      left: 42%;
      bottom: 3%;
    }
    .prompt {
      width: 60%;
      display: block;
      position: absolute;
      left: 21%;
      bottom: -9%;
    }
  }

  .balloon1 {
    width: 16%;
    position: absolute;
    right: 1%;
    top: 8%;
    animation: arrow2 2s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .balloon2 {
    width: 22%;
    position: absolute;
    left: -2%;
    top: 29%;
    z-index: 5;
    animation: arrow2 2s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .balloon3 {
    width: 18%;
    position: absolute;
    right: 6%;
    top: 57%;
    z-index: 5;
    animation: arrow2 2s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
@keyframes arrow2 {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
@keyframes scale {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  to {
    transform: scale(1.2, 1.2);
  }
}
</style>
