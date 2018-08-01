<template>
  <div
    :style="style.root"
    class="root" 
  >
    <div 
      id="Jswiper"
      class="swiper-container" 
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="slide-page1">
            <img
              v-lazy="serverUrl + 'page1-1.png' + this.$qiniuCompress()" 
              class="page1-header" 
            >
            <div class="page1-title" />
            <img
              v-lazy="serverUrl + 'page1-3.png' + this.$qiniuCompress()" 
              class="page1-footer"
            >
            <img
              v-lazy="serverUrl + 'invitation.png' + this.$qiniuCompress()" 
              class="page1-invatation"
            >
            <img
              v-lazy="serverUrl + 'arrow-black.png' + this.$qiniuCompress()" 
              class="arrow"
              @click="handlePageToNext()"
            >
          </div>
        </div>
        <div class="swiper-slide">
          <div class="slide-page2">
            <img
              v-lazy="serverUrl + 'page2.png' + this.$qiniuCompress()"
              class="page2" >
            <img
              v-lazy="serverUrl + 'arrow-black.png' + this.$qiniuCompress()"
              class="arrow"
              @click="handlePageToNext()" >
          </div>
        </div>
        <div class="swiper-slide">
          <div class="slide-page3">
            <img
              v-lazy="serverUrl + 'page3-1.png' + this.$qiniuCompress()" 
              class="page3"
            >
            <img
              v-lazy="serverUrl + 'arrow-black.png' + this.$qiniuCompress()" 
              class="arrow"
              @click="handlePageToNext()"
            >
          </div>
        </div>
        <div class="swiper-slide">
          <div class="slide-page4 exp">
            <img
              :src="serverUrl + 'page4-title-1.png' + this.$qiniuCompress()" 
              class="page4-1" >
            <div class="page4">
              <!-- <img class="number-icon" :src="serverUrl + 'tip-white.png' + this.$qiniuCompress()" /> -->
              <img v-lazy="serverUrl + 'new-1.png' + this.$qiniuCompress()" >
            </div>
            <div class="page4">
              <img 
                :src="serverUrl + 'tip-white.png' + this.$qiniuCompress()" 
                class="number-icon" >
              <img v-lazy="serverUrl + 'new-2.png' + this.$qiniuCompress()">
            </div>
            <img
              :src="serverUrl + 'arrow-black.png' + this.$qiniuCompress()"
              class="arrow"
              @click="handlePageToNext()" >
          </div>
        </div>
        <div class="swiper-slide">
          <div class="slide-page4">
            <div class="page4">
              <img 
                v-lazy="serverUrl + 'tip-white.png' + this.$qiniuCompress()" 
                class="number-icon" 
              >
              <img 
                v-lazy="serverUrl + 'new-3.png' + this.$qiniuCompress()"
              >
            </div>
            <img
              v-lazy="serverUrl + 'new-4-1.png' + this.$qiniuCompress()"
              class="page4-4"
            >
            <img
              :src="serverUrl + 'arrow-black.png' + this.$qiniuCompress()" 
              class="arrow"
              @click="handlePageToNext()"
            >
          </div>
        </div>
        <div class="swiper-slide">
          <div class="slide-page5">
            <img
              :src="serverUrl + 'page5-bg-tio-1.png' + this.$qiniuCompress()" 
              class="top"
            >
            <img
              :src="serverUrl + 'page5-button.png'" 
              class="p5button"
              @click="handleMapJump"
            >
            <!-- <img
              class="qr-code" 
              src="http://cdn.exe666.com/fe/marketing/meichen/page5-qr.png" /> -->
            <img
              :src="serverUrl + 'bottom-qr.png'" 
              class="bottom"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'mint-ui'
Vue.use(Lazyload)
import {
  $wechat,
  isInWechat,
  basicTrack,
  wechatShareTrack,
  GetParamsFromUrl
} from 'services'
import Swiper from 'swiper/dist/js/swiper.js'
const serverUrl = 'http://cdn.exe666.com/fe/marketing/meichen/'
export default {
  data() {
    return {
      serverUrl: serverUrl,
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        p5button: {
          top:
            this.$innerHeight() > 670
              ? this.$innerWidth() * 1.1 + 'px'
              : this.$innerWidth() * 1.1 + 'px',
          width: this.$innerWidth() * 0.5 + 'px',
          left: this.$innerWidth() * 0.25 + 'px'
        }
      },
      control: {
        hasInited: false
      },
      startScroll: null,
      touchStart: null,
      touchCurrent: null,
      mySwiper: null,
      wxShareInfo: {
        title: `星视度2018美陈展邀你来“嗨玩”`,
        desc: '全中国的商业大咖都在这里！',
        imgUrl: serverUrl + 'share-icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    if (this.$route.query.hasOwnProperty('share_at')) {
      if (Number(GetParamsFromUrl().share_at) < Date.now()) {
        window.location.replace(
          window.location.origin + '/marketing/meichenzhan'
        )
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleMapJump() {
      window.location.href = 'http://f.amap.com/16BNZ_0A42RPm'
    },
    handleSwiperInit() {
      this.mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical'
        // effect: 'fade'
      })
      let that = this
      this.mySwiper.slides.on(
        'touchstart',
        function(e) {
          that.startScroll = this.scrollTop
          that.touchStart = e.targetTouches[0].pageY
        },
        true
      )
      this.mySwiper.slides.on(
        'touchmove',
        function(e) {
          that.touchCurrent = e.targetTouches[0].pageY
          let touchesDiff = that.touchCurrent - that.touchStart
          let slide = this
          let onlyScrolling =
            slide.scrollHeight > slide.offsetHeight &&
            ((touchesDiff < 0 && that.startScroll === 0) ||
              (touchesDiff > 0 &&
                that.startScroll === slide.scrollHeight - slide.offsetHeight) ||
              (that.startScroll > 0 &&
                that.startScroll < slide.scrollHeight - slide.offsetHeight))
          if (onlyScrolling) {
            e.stopPropagation()
          }
        },
        true
      )
    },
    handlePageToNext() {
      this.mySwiper.slideNext()
      console.log('slide to next')
    },
    init() {
      this.handleWechatShare()
      this.handleSwiperInit()
    },
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfo)
          })
          .catch(_ => {
            console.warn(_.message)
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  user-select: none;
  .swiper-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .swiper-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    .swiper-slide {
      .arrow {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 6%;
        width: 7%;
        z-index: 1000;
        animation: start 1.5s infinite ease-in-out;
      }
      height: 100%;
      width: 100%;
      text-align: center;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .slide-page1 {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #ffffff;
        .page1-header {
          width: 100%;
        }
        .page1-title {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-size: cover;
          background-image: url('http://cdn.exe666.com/fe/marketing/meichen/page1-2.png?imageView2/0/q/30');
        }
        .page1-footer {
          width: 100%;
        }
        .page1-invatation {
          position: absolute;
          margin: auto;
          width: 90%;
          top: 0;
          bottom: 15%;
          left: 0;
          right: 0;
          animation: sc 1s infinite;
        }
      }
      .slide-page2 {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #1d1e27;
        .page2 {
          width: 100%;
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      .slide-page3 {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #1d1e27;
        .page3 {
          width: 100%;
          position: absolute;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      .slide-page4 {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #1d1e27;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .page4 {
          width: 90%;
          margin: 4% 0;
          position: relative;
          img {
            width: 100%;
          }
        }
        .page4-1 {
          width: 100%;
          margin-top: -10%;
        }
        .page4-2 {
          width: 90%;
          margin: 2% 0;
        }
        .page4-4 {
          width: 100%;
        }
      }
      .slide-page5 {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #1d1e27;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .top {
          width: 100%;
        }
        .qr-code {
          z-index: 300;
          width: 36%;
          margin-bottom: -16%;
        }
        .p5button {
          animation: button 2s infinite;
          z-index: 200;
          width: 42%;
          margin-bottom: 5%;
        }
        .bottom {
          width: 100%;
        }
        .qr-code-real {
          z-index: 20000;
          width: 40%;
          position: absolute;
          bottom: 10%;
          opacity: 0;
        }
      }
    }
  }
}
@keyframes sc {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes start {
  0%,
  30% {
    opacity: 0;
    -webkit-transform: translateY(-8px);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate(0);
  }

  to {
    opacity: 0;
    -webkit-transform: translateY(10px);
  }
}
@keyframes button {
  0% {
    filter: opacity(1);
  }
  40% {
    filter: opacity(0.2);
  }
  60% {
    filter: opacity(1);
  }
  100% {
    filter: opacity(1);
  }
}
.number-icon {
  position: absolute;
  top: -10%;
  left: 47.5%;
  width: 5% !important;
}
</style>
