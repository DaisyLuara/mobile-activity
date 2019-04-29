<template>
  <div
    :style="style.root" 
    class="root"
  >
    <img 
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg"
    >
    <img 
      :src="baseUrl + 'logo.png'+ this.$qiniuCompress()"
      :class="{'x-logo':iphoneX,'logo':!iphoneX}"
      class="logo"
    >
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame"
    >
    <!-- :src="baseUrl + '666.jpg'+ this.$qiniuCompress()" -->
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo"
    >
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-real-photo':iphoneX,'real-photo':!iphoneX}"
      class="real-photo"
    >
    <img 
      :src="baseUrl + 'balloon_1.png'+ this.$qiniuCompress()"
      class="balloon1"
    >
    <img 
      :src="baseUrl + 'balloon_2.png'+ this.$qiniuCompress()"
      class="balloon2"
    >
    <img 
      :src="baseUrl + 'balloon_3.png'+ this.$qiniuCompress()"
      class="balloon3"
    >
    <div 
      :class="{'x-bt':iphoneX,'bt':!iphoneX}"
      class="bt"
    >
      <img 
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav"
      >
      <img 
        :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
        class="prompt"
      >
    </div>
    <img 
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="btImg"
    >
  </div>
</template>
<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/hiplay_world/',
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
        link: process.env.AD_API+'/api/s/Lg4' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/hiplay_world/icon.jpeg',
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
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/hiplay_world/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}bg.jpg');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .topImg {
    width: 82%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .logo {
    width: 34%;
    position: absolute;
    left: 50%;
    top: 7%;
    transform: translate(-50%, 0%);
    z-index: 5;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .x-logo {
    width: 42%;
    position: absolute;
    left: 50%;
    top: 7%;
    transform: translate(-50%, 0%);
    z-index: 5;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .frame {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -47%);
    z-index: 4;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .x-frame {
    width: 84%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49%);
    z-index: 4;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 64%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
    user-select: auto;
    pointer-events: auto;
    z-index: 3;
  }
  .x-photo {
    width: 71%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -51%);
    user-select: auto;
    pointer-events: auto;
    z-index: 3;
  }
  .real-photo {
    width: 64%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
    z-index: 99;
    opacity: 0;
    user-select: auto;
    pointer-events: auto;
  }
  .x-real-photo {
    width: 71%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -51%);
    z-index: 99;
    opacity: 0;
    user-select: auto;
    pointer-events: auto;
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
  .bt {
    width: 100%;
    height: 25%;
    position: absolute;
    left: 0;
    bottom: 7%;
    z-index: 5;
    animation: arrow 0.5s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
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
  .x-bt {
    width: 100%;
    height: 25%;
    position: absolute;
    left: 0;
    bottom: 11%;
    z-index: 5;
    animation: arrow 0.5s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
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
  .btImg {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
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
