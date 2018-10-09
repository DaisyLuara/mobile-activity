<template>
  <div
    :style="style.root"
    class="content">
    <div
      :class="{picture:true,iphoneX:iphoneX}">
      <img 
        :src="base + 'kuang.png'"
        class="frame">
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo">
    </div>
    <div 
      class="bottom">
      <img
        :src="base + 'di.png'"
        class="light">
      <img
        :src="base + 'save.png'"
        class="note">
    </div>
  </div>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/dgm/',
      photo: null,
      iphoneX: false,
      //微信分享
      wxShareInfoValue: {
        title: '相约大光明',
        desc: '你就是今日之星',
        link: 'http://papi.xingstation.com/api/s/Mj3' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/dgm/icon.png',
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
@base: 'http://cdn.exe666.com/fe/image/dgm/';
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
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #210707;
  .picture {
    position: relative;
    z-index: 0;
    margin-top: -2.5%;
    .frame {
      width: 88.5%;
      position: relative;
      z-index: 0;
      margin-left: -3.5%;
    }
    .photo {
      position: absolute;
      width: 76.5%;
      top: 6%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .bottom {
    width: 100%;
    overflow-x: hidden;
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 99;
    margin-top: 2%;
    .light {
      width: 120%;
      position: relative;
      z-index: 0;
      margin: 0 auto;
    }
    .note {
      width: 34%;
      position: relative;
      z-index: 9;
      margin-top: -12%;
    }
  }
}
.iphoneX {
  margin-top: 16%;
}
</style>


