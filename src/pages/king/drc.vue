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
    <img 
      :src="baseUrl + 'logo.png'+ this.$qiniuCompress()"
      class="logo">
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
      baseUrl: cdnUrl + '/fe/marketing/img/drc_snow/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '愿你三冬暖 愿你春不寒',
        desc: '融城陪你一起温暖过冬',
        link: 'http://papi.xingstation.com/api/s/GZ0' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/drc_snow/share.png',
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/drc_snow/';
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
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
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
  .save {
    width: 62%;
    position: absolute;
    left: 50%;
    top: 3%;
    transform: translate(-50%, 0);
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .x-save {
    width: 68%;
    position: absolute;
    left: 50%;
    top: 6.5%;
    transform: translate(-50%, 0);
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .frame {
    width: 70%;
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
  .x-frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -46%);
    z-index: 4;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .logo {
    width: 20%;
    position: absolute;
    left: 37%;
    bottom: 5%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
}
</style>
