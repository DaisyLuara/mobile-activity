<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'bg.jpg'+ this.$qiniuCompress()"
      class="bg">
    <div class="center">
      <img 
        :src="baseUrl + 'kuang.png'+ this.$qiniuCompress()"
        class="kuang">
    </div>
    <!-- :src="baseUrl + '666.jpg'+ this.$qiniuCompress()" -->
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo">
    <div 
      :class="{'x-bottom':iphoneX,'bottom':!iphoneX}" 
      class="bottom">
      <img 
        :src="baseUrl + 'G.gif'+ this.$qiniuCompress()"
        class="gif">
    </div>
    
  </div>
</template>

<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/autumn_bxj/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '中秋变“仙”记 测测你的前世上神是哪位~',
        desc: '喜迎中秋，与星视度一起快乐“变身”吧',
        link: process.env.AD_API+'/api/s/4x1' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/autumn_bxj/icon.jpg',
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
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/autumn_bxj';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .center {
    width: 100%;
    height: 95%;
    position: relative;
    left: 50%;
    top: 50%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    .kuang {
      width: 85%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
    }
  }
  .photo {
    width: 76%;
    position: absolute;
    left: 50%;
    top: 17.28%;
    transform: translate(-50%, 0%);
    -webkit-user-select: auto;
    pointer-events: auto;
  }
  .x-photo {
    width: 76%;
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translate(-50%, 0%);
    -webkit-user-select: auto;
    pointer-events: auto;
  }
  .bottom {
    width: 100%;
    position: relative;
    left: 0;
    bottom: -20%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .gif {
      width: 6.5%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, 0%);
    }
  }
  .x-bottom {
    width: 100%;
    position: relative;
    left: 0;
    bottom: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .gif {
      width: 6.5%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, 0%);
    }
  }
}
</style>
