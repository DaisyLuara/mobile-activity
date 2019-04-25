<template>
  <div
    :style="style.root" 
    class="root">
    <div class="root-t">
      <img 
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="topImg"> 
      <img 
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"> 
      <!--  :src="baseUrl + '666.png'+ this.$qiniuCompress()" -->
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo">
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="real-photo">
    </div>
    
    <img 
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save"> 
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
      baseUrl: cdnUrl + '/fe/marketing/img/baoli_general/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: '万圣之夜',
        desc: '让我们一起搞鬼',
        link: process.env.AD_API+'/api/s/P1n' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/baoli_general/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/baoli_general/';
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
  overflow: hidden;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .root-t {
    width: 100%;
    position: relative;
    .topImg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
    }
    .frame {
      width: 75%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: 10%;
    }
    .photo {
      width: 71.6%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      user-select: auto;
      pointer-events: auto;
      margin-top: 11.2%;
    }
    .real-photo {
      width: 71.6%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      user-select: auto;
      pointer-events: auto;
      z-index: 99;
      opacity: 0;
      margin-top: 11.2%;
    }
  }
  .save {
    width: 60%;
    position: absolute;
    left: 19%;
    bottom: 0.5%;
    animation: arrow 0.5s linear infinite alternate;
  }
  .x-save {
    width: 62%;
    position: absolute;
    left: 18%;
    bottom: 14.5%;
    animation: arrow 0.5s linear infinite alternate;
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
</style>
