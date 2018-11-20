<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'snow_01.png'+ this.$qiniuCompress()"
      class="snow1"> 
    <img 
      :src="baseUrl + 'snow_02.png'+ this.$qiniuCompress()"
      class="snow2"> 
    <div 
      class="center" 
      :class="{'x-center':iphoneX,'center':!iphoneX}">
     <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame"> 
    <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo">
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
      baseUrl: cdnUrl + '/fe/marketing/img/christmas/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: '刷脸测一测，你是哪种“潮流偶像”！',
        desc: '星视度潮流制造局，等你来变身。',
        link: 'http://papi.xingstation.com/api/s/N9z' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/christmas/icon.png',
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/christmas/';
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
  background-image: url('@{imageHost}back.jpg');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .snow1 {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .snow2 {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
  .center {
    width: 100%;
    position: relative;
    margin-top: 9%;
    .frame {
      width: 85%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, -0%);
      z-index: 9;
    }
    .x-frame {
      width: 90%;
    }
    .photo {
      width: 71.2%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, -0%);
      z-index: 99;
      margin-top: 4.5%;
      user-select: auto;
      pointer-events: auto;
    }
    .x-photo {
      width: 76.2%;
    }
  }
  .x-center {
    margin-top: 16%;
  }
}
</style>
