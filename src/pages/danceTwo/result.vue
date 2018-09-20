<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}" 
      class="frame">
    <img 
      :src="baseUrl + 'text.png'+ this.$qiniuCompress()"
      :class="{'x-text':iphoneX,'text':!iphoneX}"
      class="text">
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photoImg':iphoneX,'photoImg':!iphoneX}"
      class="photoImg">
  </div>
</template>
<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/xsd_ad/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '舞王battle',
        desc: '不舞不型 全民街舞',
        link: 'http://papi.xingstation.com/api/s/pg2' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/xsd_ad/icon.png',
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/xsd_ad/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}back.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photoImg {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -54%);
    -webkit-user-select: auto;
    pointer-events: auto;
  }
  .x-photoImg {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    -webkit-user-select: auto;
    pointer-events: auto;
  }
  .text {
    width: 65%;
    position: absolute;
    left: 50%;
    bottom: 1%;
    transform: translate(-50%, 0%);
    z-index: 2;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-text {
    width: 65%;
    position: absolute;
    left: 50%;
    bottom: 9%;
    transform: translate(-50%, 0%);
    z-index: 2;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
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
</style>
