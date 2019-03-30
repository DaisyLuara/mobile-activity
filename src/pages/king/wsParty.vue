<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'T2.png'+ this.$qiniuCompress()"
      class="topImg">
    <img 
      :src="baseUrl + 'hand.png'+ this.$qiniuCompress()"
      class="btImg">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame">
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo">
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
      baseUrl: cdnUrl + '/fe/marketing/img/ws_party/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: 'Happy Halloween ',
        desc: '万圣狂欢 等你来Halloween',
        link: 'http://papi.xingstation.com/api/s/Yvp' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/ws_party/share.png',
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/ws_party/';
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
    position: relative;
  }
  .btImg {
    width: 100%;
    position: relative;
    margin-top: 25%;
  }
  .frame {
    width: 56%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40%);
  }
  .x-frame {
    width: 72%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -44%);
  }
  .photo {
    width: 53.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40.5%);
    user-select: auto;
    pointer-events: auto;
  }
  .x-photo {
    width: 69%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-49.8%, -44.5%);
    user-select: auto;
    pointer-events: auto;
  }
  .save {
    width: 58%;
    position: absolute;
    left: 21%;
    bottom: 1%;
    animation: arrow 0.5s linear infinite alternate;
    z-index: 9;
  }
  .x-save {
    width: 68%;
    position: absolute;
    left: 16%;
    bottom: 4%;
    animation: arrow 0.5s linear infinite alternate;
    z-index: 9;
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
