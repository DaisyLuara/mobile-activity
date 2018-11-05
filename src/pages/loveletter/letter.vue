<template>
  <div 
    :style="style.root"
    class="content">
    <img
      :src="base + 'font.png'"
      class="font">
    <img
      :src="base + 'pointer.png'"
      class="pointer">
    <swiper
      ref="Swiper"
      :options="sOption"
      class="swiper">
      <swiper-slide>
        <div 
          id="anim"
          class="page anim"
        />
        <img
          :src="base + 'logo.png'"
          class="logo">
      </swiper-slide>
      <swiper-slide
        v-for="item in pages"
        :key="item.id"
        class="pslider">
        <img
          :src="base + item"
          class="page"/>
        <img
          :src="base + 'logo.png'"
          class="logo">
        <div 
          class="upload"
          >
          <input 
            type="file" 
            accept="image/*"
            class="camera"
            @click="toUpLoad">
          <img
          :src="base + icon +'.png'"/>
        </div>
        
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import lottie from 'lottie-web'
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/wxc_letter/',
      pages: [
        'page2.png',
        'page3.png',
        'page4.png',
        'page5.png',
        'page6.png',
        'page7.png'
      ],
      sOption: {
        initialSlide: 2,
        on: {
          init: () => {},
          slideChange: () => {}
        }
      },
      icon: 'icon1',
      //分享
      wxShareInfoValue: {
        title: '厦门万象城',
        desc: '厦门万象城',
        link: '' + window.location.search,
        imgUrl: '',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    // if (this.$innerHeight() > 672) {
    //   document.querySelector('.anim').style.marginTop = '15%'
    //   document.querySelector('.tips').style.backgroundPosition =
    //     '32% 78%, 45% 72%'
    //   document.querySelector('.save').style.top = '78%'
    // }
    console.log(this.base)
    this.doAnim()
  },
  methods: {
    doAnim() {
      const el = document.getElementById('anim')
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: false,
        assetsPath: that.base + '/images/',
        path: that.base + 'data.json'
      })
      this.animation = anim
    },
    toUpLoad() {
      console.log(111)
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://cdn.exe666.com/fe/image/wxc_letter/';
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow: hidden;
  position: relative;
  .anim {
    width: 100%;
  }
  .swiper {
    position: relative;
    // top: 50%;
    // transform: translateY(-50%);
  }
  .page {
    position: relative;
    z-index: 0;
  }
  .logo {
    position: absolute;
    top: 8%;
    left: 5%;
    width: 33.5%;
    z-index: 99;
  }
  .font {
    width: 32%;
    position: absolute;
    // top: 80%;
    bottom: 5%;
    right: 5%;
    z-index: 99;
  }
  .pointer {
    width: 8%;
    position: absolute;
    top: 50%;
    right: 5%;
    // transform: translateY(-50%);
    animation: pointer 0.8s linear infinite alternate;
    z-index: 999;
  }
  .upload {
    display: inline-block;
    width: 10%;
    position: absolute;
    top: 7%;
    right: 5%;
    z-index: 999;
    img {
      position: relative;
      z-index: 0;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      opacity: 0;
    }
  }
}
@keyframes pointer {
  0% {
    transform: translate(10px, -50%);
  }
  100% {
    transform: translate(-10px, -50%);
  }
}
</style>


