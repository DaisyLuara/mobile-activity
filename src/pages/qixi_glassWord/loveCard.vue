<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'BG.png'+ this.$qiniuCompress()"
      class="bg" >
    <div class="top">
      <img 
        :src="baseUrl + 'Front.png'+ this.$qiniuCompress()"
        class="door" >
      <img 
        :src="baseUrl + 'cloud1.png'+ this.$qiniuCompress()"
        class="cloud1" >
      <img 
        :src="baseUrl + 'cloud2.png'+ this.$qiniuCompress()"
        class="cloud2" >
      <div class="photo">
        <img 
          v-if="photo !== null" 
          :src="photo + this.$qiniuCompress()"
          class="potto-inner">
      </div>
    </div>
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      class="potto-real">

    <div 
      :class="{'x-bottom':iphoneX}"
      class="bottom">
      <img 
        :src="baseUrl + 'A.gif'"
        class="jiantou" >
      <img 
        :src="baseUrl + 'Save.png'+ this.$qiniuCompress()"
        class="save" >
    </div>
      
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
      baseUrl: cdnUrl + '/fe/marketing/img/loveCard/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: '这个七夕，我们一起领“证”吧！',
        desc: '星视度-七夕办证中心限时开放中',
        link: process.env.AD_API+'/api/s/ADO' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/loveCard/icon.jpg',
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
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/loveCard';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  overflow-x: hidden;
  .bg {
    width: 100%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .top {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, 0%);
    .door {
      width: 100%;
      height: 100%;
      z-index: -1;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .cloud1 {
      width: 60%;
      position: absolute;
      left: -40%;
      bottom: 0;
      animation: cloud1 1s linear infinite alternate;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .cloud2 {
      width: 60%;
      position: absolute;
      right: -40%;
      bottom: 42%;
      animation: cloud2 1s linear infinite alternate;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .photo {
      width: 77%;
      height: 75%;
      position: absolute;
      left: 11.5%;
      top: 24%;
      z-index: -1;
      .potto-inner {
        width: 100%;
      }
    }
  }
  .potto-real {
    width: 70%;
    position: absolute;
    left: 15%;
    top: 17%;
    z-index: 999;
    opacity: 0;
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 40%;
    top: 105%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    .jiantou {
      width: 13%;
      display: block;
      margin-left: 3%;
    }
    .save {
      width: 45%;
      display: block;
      margin-left: -13%;
    }
  }
  .x-bottom {
    width: 100%;
    position: absolute;
    left: 40%;
    top: 92%;
  }
}
@keyframes cloud1 {
  0% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}
@keyframes cloud2 {
  0% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-5px);
  }
}
</style>
