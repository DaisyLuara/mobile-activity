<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg">
    <div class="center">
      <!-- 左边南瓜 -->
      <img 
        v-show="control.nangualeft.one" 
        :src="baseUrl + 'nangua_left_1.png'+ this.$qiniuCompress()"
        class="left">
      <img 
        v-show="control.nangualeft.two" 
        :src="baseUrl + 'nangua_left_2.png'+ this.$qiniuCompress()"
        class="left">
      <!-- 右边南瓜 -->
      <img 
        v-show="control.nanguaRight.one" 
        :src="baseUrl + 'nangua_right_1.png'+ this.$qiniuCompress()"
        class="right">
      <img 
        v-show="control.nanguaRight.two" 
        :src="baseUrl + 'nangua_right_2.png'+ this.$qiniuCompress()"
        class="right">
      <img 
        :src="baseUrl + 'nvwu.png'+ this.$qiniuCompress()"
        class="people">
      <img 
        :src="baseUrl + 'mid.png'+ this.$qiniuCompress()"
        :class="{'x-mid':iphoneX,'mid':!iphoneX}"
        class="mid">
      <!-- :src="baseUrl + '666.jpg'+ this.$qiniuCompress()" -->
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo">
      <img 
        :src="baseUrl + 'arrow.png'+ this.$qiniuCompress()"
        :class="{'x-arrow':iphoneX,'arrow':!iphoneX}"
        class="arrow">
      <img 
        :src="baseUrl + 'title.png'+ this.$qiniuCompress()"
        :class="{'x-tit':iphoneX,'tit':!iphoneX}"
        class="tit">
    </div>
    <img 
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      :class="{'x-btImg':iphoneX,'btImg':!iphoneX}"
      class="btImg">
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
      baseUrl: cdnUrl + '/fe/marketing/img/hallowmas/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      iphoneX: false,
      control: {
        nangualeft: {
          one: true,
          two: false
        },
        nanguaRight: {
          one: true,
          two: false
        }
      },
      count: 0,
      wxShareInfoValue: {
        title: '鬼马万圣节',
        desc: '我们一起扮鬼脸！',
        link: process.env.AD_API+'/api/s/RgR' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/hallowmas/icon.png',
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
    this.playAim()
  },
  methods: {
    playAim() {
      this.count++
      if (this.count % 6 === 0) {
        this.control.nangualeft.one = false
        this.control.nangualeft.two = true
        this.control.nanguaRight.one = false
        this.control.nanguaRight.two = true
      }
      if (this.count % 6 === 1) {
        this.control.nangualeft.one = true
        this.control.nangualeft.two = false
        this.control.nanguaRight.one = true
        this.control.nanguaRight.two = false
      }
      setTimeout(() => {
        requestAnimationFrame(this.playAim)
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/hallowmas/';
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
  .center {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    .left {
      position: absolute;
      left: 2%;
      top: -15%;
      width: 25%;
    }
    .right {
      position: absolute;
      right: 2%;
      top: -15%;
      width: 25%;
    }
    .people {
      width: 30%;
      position: absolute;
      right: -5%;
      bottom: 40%;
      animation: arrow 0.8s linear infinite alternate;
      z-index: 100;
    }
    .photo {
      width: 52.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      user-select: auto;
      pointer-events: auto;
    }
    .x-photo {
      width: 62.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -47.8%);
      z-index: 99;
      user-select: auto;
      pointer-events: auto;
    }
    .arrow {
      width: 10%;
      position: absolute;
      left: 44%;
      bottom: 4%;
      z-index: 100;
      animation: arrow 0.5s linear infinite alternate;
    }
    .x-arrow {
      width: 10%;
      position: absolute;
      left: 44%;
      bottom: 1%;
      z-index: 100;
      animation: arrow 0.5s linear infinite alternate;
    }
    .tit {
      width: 50%;
      position: absolute;
      left: 24%;
      bottom: -4%;
      z-index: 100;
      animation: arrow 0.5s linear infinite alternate;
    }
    .x-tit {
      width: 50%;
      position: absolute;
      left: 24%;
      bottom: -6%;
      z-index: 100;
      animation: arrow 0.5s linear infinite alternate;
    }
    .mid {
      width: 85%;
      margin-top: -3%;
    }
    .x-mid {
      width: 100%;
      margin-top: 0;
    }
  }

  .btImg {
    width: 100%;
    position: relative;
    margin-top: -48.6%;
  }
  .x-btImg {
    width: 100%;
    height: 45%;
    position: relative;
    margin-top: -58%;
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
