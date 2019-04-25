<template>
  <div
    :style="style.root" 
    class="root">
    <div 
      v-show="shade"
      class="shade">
      <img 
        :src="baseUrl + 'fake.png'+ this.$qiniuCompress()"
        :class="{'X-photoHide':iphoneX}"
        class="photo-hide" >
      <div 
        class="hint">
        <img 
          :src="baseUrl + 'hint2.png'+ this.$qiniuCompress()"
          class="hint2" > 
        <img 
          v-if="hint1"
          :src="baseUrl + 'hint1.png'+ this.$qiniuCompress()"
          class="hint1" > 
        <img 
          v-if="hint3"
          :src="baseUrl + 'hint3.png'+ this.$qiniuCompress()"
          class="hint3" > 
      </div>
      <img 
        v-if="iceShow.iceOne"
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="ice-01" >
      <img 
        v-if="iceShow.iceTwo"
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="ice-02" >
      <img 
        v-if="iceShow.iceThree"
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        class="ice-02" >
    </div>
    <div 
      v-show="realContent"
      class="real-content">
      <img 
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save" >
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        :class="{'X-photo':iphoneX}"
        class="photo" >
    </div>
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
      baseUrl: cdnUrl + '/fe/marketing/img/ice/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      shade: true,
      realContent: false,
      hint3: false,
      hint1: true,
      iceShow: {
        iceOne: false,
        iceTwo: false,
        iceThree: false
      },
      touchNumber: 0,
      iphoneX: false,
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        link: process.env.AD_API+'/api/s/o2j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/ice/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    document.addEventListener('touchstart', this.touch, false)
    document.addEventListener('touchmove', this.touch, false)
    document.addEventListener('touchend', this.touch, false)
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {
    touch(event) {
      var event = event || window.event
      switch (event.type) {
        case 'touchstart':
          break
        case 'touchend':
          this.touchNumber++
          if (this.touchNumber == 1) {
            this.iceShow.iceOne = true
          } else if (this.touchNumber == 2) {
            this.iceShow.iceTwo = true
            this.iceShow.iceOne = false
            this.hint1 = false
            this.hint3 = true
          } else if (this.touchNumber == 3) {
            this.iceShow.iceThree = true
            this.iceShow.iceTwo = false
            this.hint1 = false
            this.hint3 = true
          } else {
            this.iceShow.iceThree = false
            this.realContent = true
            this.shade = false
          }
          break
        case 'touchmove':
          // 执行滑动事件
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/ice';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  .shade {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('@{imageHost}/0.jpg');
    background-size: 100% 100%;
    .photo-hide {
      width: 56%;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      transform: translate(-50%, -45%);
    }
    .X-photoHide {
      width: 65%;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      transform: translate(-50%, -45%);
    }
    .hint {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      z-index: 5;
      .hint2 {
        width: 30%;
        display: block;
        margin: 0 auto;
        animation: fingerScale 2s ease-out infinite forwards;
        -webkit-touch-callout: none;
        user-select: none;
        pointer-events: none;
      }
      .hint1,
      .hint3 {
        width: 50%;
        -webkit-touch-callout: none;
        user-select: none;
        pointer-events: none;
      }
    }
    .ice-01 {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55%);
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .ice-02 {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55%);
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .ice-03 {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55%);
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
  }
  .real-content {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('@{imageHost}/4.jpg');
    background-size: 100% 100%;
    .save {
      width: 60%;
      position: absolute;
      left: 50%;
      top: 14%;
      transform: translate(-50%, 0%);
      z-index: 5;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .photo {
      width: 56%;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      transform: translate(-50%, -45%);
    }
    .X-photo {
      width: 65%;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      transform: translate(-50%, -45%);
    }
  }
}
@keyframes fingerScale {
  from {
    transform: scale(1.05, 1.05);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  to {
    transform: scale(1.05, 1.05);
  }
}
</style>
