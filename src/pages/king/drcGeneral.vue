<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'flower.png'+ this.$qiniuCompress()"
      class="topImg">
    <img 
      :src="baseUrl + 'tree.png'+ this.$qiniuCompress()"
      class="btImg">
    <img 
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save">
    <!-- :src="baseUrl + '666.png'+ this.$qiniuCompress()" -->
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame">
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
      baseUrl: cdnUrl + '/fe/marketing/img/drc_snow/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '甜蜜冬日',
        desc: '不给糖就捣蛋',
        link: process.env.AD_API+'/api/s/Q1Y' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/drc_snow/share.png',
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
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/drc_snow/';
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
  .topImg {
    width: 100%;
  }
  .btImg {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .save {
    width: 62%;
    position: absolute;
    left: 19%;
    top: 3%;
    animation: arrow 0.5s linear infinite alternate;
    z-index: 10;
  }
  .x-save {
    width: 68%;
    position: absolute;
    left: 17%;
    top: 6.5%;
    animation: arrow 0.5s linear infinite alternate;
    z-index: 10;
  }
  .frame {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49%);
    z-index: 4;
  }
  .x-frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -46%);
    z-index: 4;
  }
  .photo {
    width: 67%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49%);
    z-index: 5;
    user-select: auto;
    pointer-events: auto;
  }
  .x-photo {
    width: 77%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -46%);
    z-index: 5;
    user-select: auto;
    pointer-events: auto;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>
