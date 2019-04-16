<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg">
    <img 
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      :class="{'x-btImg':iphoneX,'btImg':!iphoneX}"
      class="btImg">
    <img 
      :src="baseUrl + 'T .png'+ this.$qiniuCompress()"
      class="title">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame">
    <!-- :src="'http://cdn.exe666.com/fe/marketing/img/sz/666.jpeg'+ this.$qiniuCompress()" -->
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
      baseUrl: cdnUrl + '/fe/marketing/img/etam/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '爱秀才会赢',
        desc: '秀出最美的“我”！',
        link: process.env.AD_API+'/api/s/6R9' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/etam/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/etam/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  .topImg {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .btImg {
    width: 100%;
    position: relative;
    margin-top: 30%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .x-btImg {
    width: 100%;
    position: relative;
    margin-top: 50%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .title {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .frame {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -34%);
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .x-frame {
    width: 98%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 85%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -33.2%);
    user-select: auto;
    pointer-events: auto;
  }
  .x-photo {
    width: 92.8%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45.2%);
    user-select: auto;
    pointer-events: auto;
  }
  .save {
    width: 48%;
    position: absolute;
    left: 25%;
    bottom: 4%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    animation: arrow 0.5s linear infinite alternate;
  }
  .x-save {
    width: 51%;
    position: absolute;
    left: 25%;
    bottom: 13%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    animation: arrow 0.5s linear infinite alternate;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-7px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(7px);
  }
}
</style>
