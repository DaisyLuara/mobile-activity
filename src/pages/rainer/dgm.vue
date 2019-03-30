<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}">
    <div
      class="picture">
      <img 
        :src="base + 'kuang.png'"
        class="frame">
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo">
    </div>
    <img
      :src="base + 'save.png'"
      class="note">
    <img
      :src="base + 'di.png'"
      :class="{light:!absolute,absolute:absolute}">
  </div>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
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
      absolute: false,
      //微信分享
      wxShareInfoValue: {
        title: '相约大光明',
        desc: '你就是今日之星',
        link: 'http://papi.xingstation.com/api/s/Mj3' + window.location.search,
        imgUrl: 'http://cdn.xingstation.cn/fe/image/dgm/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    let width = this.$innerWidth()
    if (height > 630) {
      this.absolute = true
    } else {
      this.absolute = false
    }
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    // let light = document.querySelector('.light')
    // light.style.marginTop = height - (width * 1.2) / 314
  }
}
</script>
<style lang="less" scoped>
@base: 'http://cdn.xingstation.cn/fe/image/dgm/';
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
    margin-top: -1.5%;
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
  .note {
    width: 34%;
    position: relative;
    z-index: 999;
    margin-top: 4%;
  }
  .light {
    width: 120%;
    position: relative;
    margin: 0 auto;
    z-index: 99;
    margin-top: -36%;
  }
}
.absolute {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  z-index: 99;
}
.iphoneX {
  .picture {
    margin-top: 12%;
  }
}
</style>


