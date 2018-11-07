<template>
  <div 
    :style="style.root"
    class="content">
    <swiper
      ref="Swiper"
      class="swiper">
      <swiper-slide>
        <img
          :src="base + 'page1.png'"
          class="page">
        <img
          :src="base + 'nav.png'"
          class="pointer">
      </swiper-slide>
      <swiper-slide>
        <img
          :src="base + 'page2.png'"
          class="map">
        <div class="alinks">
          <ul  
            class="ul-icon">
            <li 
              v-for="item in 4"
              :key="item.id"
              @click="toLink(item)">
              <img 
                :src="base + 'icon' + item + '.png'"/>
            </li>
          </ul>
          <!-- 厦门爱乐乐团 -->
          <a
            class="local-link local1"
            @click="toAlert(1)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
          <!-- 高参 -->
          <a
            class="local-link local2"
            @click="toAlert(2)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
          <!-- 揭幕流程 -->
          <a
            class="local-link local3"
            @click="toAlert(3)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
          <!-- 夏国璋龙狮团 -->
          <a
            class="local-link local4"
            @click="toAlert(4)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
          <!-- 豪觅邮局 -->
          <a
            class="local-link local5"
            @click="toAlert(5)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
          <!-- 永新早食 -->
          <a
            class="local-link local6"
            @click="toAlert(6)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
          <!-- 华润80年，润物耕心 -->
          <a
            class="local-link local7"
            @click="toAlert(7)">
            <img
              :src="base + 'yuan.png'"
              class="ding"/>
          </a>
        </div>
      </swiper-slide>
    </swiper>
    <img 
      v-show="jian"
      :src="base + 'jian.png'"
      :class="{jian:true,iphoneX:iphoneX}">
    <div 
      v-show="mask"
      class="mask"
      @click.self="()=>{mask = false; alert1 = false;alert2 = false;}">
      <div 
        v-show="alert1"
        class="center alert1">
        <img 
          :src="base + pro"
          :class="{pro:pro_img}">
      </div>
      <div
        v-show="alert2"
        class="center alert2">
        <img 
          :src="base + timg"
          class="timg">
        <div
          class="text">
          <div 
            class="scroll-text">
            <img 
              :src="base + ttext"
              class="ttext">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/wxc_map/',
      pro: 'wc.png',
      mask: false,
      alert1: false,
      alert2: false,
      jian: false,
      timg: 't1.png',
      ttext: 'text1.png',
      pro_img: false,
      iphoneX: false,
      //分享
      wxShareInfoValue: {
        title: '厦门万象城', //暂无
        desc: '厦门万象城', //暂无
        link: 'http://papi.xingstation.com/api/s/xvr' + window.location.search,
        imgUrl: 'https://cdn.exe666.com/fe/image/wxc_map/icon.png', //暂无
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    }
  },
  methods: {
    toLink(num) {
      this.pro_img = false
      this.mask = true
      this.alert1 = true
      this.jian = false
      if (num === 1) {
        // 跳转公众号
        this.pro = 'ewm.png'
        return
      }
      if (num === 2) {
        this.pro = 'wc.png' //暂无
        return
      }
      if (num === 3) {
        this.pro = 'hospital.png'
        return
      }
      if (num === 4) {
        this.mask = false
        this.alert1 = false
        this.jian = true
        return
      }
    },
    toAlert(item) {
      this.mask = true
      this.pro_img = false
      this.jian = false
      if (item === 1) {
        this.alert2 = true
        this.timg = 'tt1.png'
        this.ttext = 'text1.png'
        return
      }
      if (item === 2) {
        this.alert2 = true
        this.timg = 'tt3.png'
        this.ttext = 'text3.png'
        return
      }
      if (item === 3) {
        this.alert1 = true
        this.pro = 'jiemu.png'
        return
      }
      if (item === 4) {
        this.alert2 = true
        this.timg = 'tt2.png'
        this.ttext = 'text2.png'
        return
      }
      if (item === 5) {
        this.alert1 = true
        this.pro_img = true
        this.pro = 'yongxin.png'
        return
      }
      if (item === 6) {
        this.alert1 = true
        this.pro_img = true
        this.pro = 'haomi.png'
        return
      }
      if (item === 7) {
        this.alert1 = true
        this.pro = 'huarui.png'
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: 'https://cdn.exe666.com/fe/image/wxc_map/';
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
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
  max-width: 750px;
  overflow: hidden;
  position: relative;
  background-color: #f0b0ae;
  .swiper {
    position: relative;
    z-index: 0;
  }
  .map {
    width: 100%;
    position: relative;
    z-index: 0;
    margin-top: -5%;
  }
  .alinks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .ul-icon {
      display: inline-block;
      text-align: left;
      padding-top: 10px;
      li {
        display: inline-block;
        width: 12%;
        margin-left: 10px;
        border-radius: 50%;
        position: relative;
      }
    }
    .local-link {
      display: inline-block;
      width: 15vw;
      height: 25vw;
      border-radius: 50%;
      // border: solid 1px red;
      position: absolute;
      z-index: 99;
      .ding {
        width: 7vw;
        position: relative;
        animation: yuan 0.6s linear infinite alternate;
      }
    }
    .local1 {
      // top: 30%;
      top: 26%;
      left: 1%;
    }
    .local2 {
      // top: 22%;
      height: 22vw;
      top: 19%;
      left: 20%;
    }
    .local3 {
      height: 18vw;
      top: 27%;
      left: 35%;
    }
    .local4 {
      width: 18vw;
      // height: 25vw;
      top: 15%;
      right: 24%;
    }
    .local5 {
      height: 20vw;
      top: 46%;
      left: 28%;
    }
    .local6 {
      width: 18vw;
      height: 20vw;
      top: 57%;
      left: 22%;
    }
    .local7 {
      height: 25vw;
      top: 40%;
      right: 24%;
    }
  }
  .pointer {
    width: 37%;
    position: absolute;
    bottom: 30%;
    right: 19%;
    animation: pointer 0.8s linear infinite alternate;
    z-index: 999;
  }
  .jian {
    width: 25%;
    position: absolute;
    top: 81%;
    left: 26%;
    z-index: 999;
  }
  .iphoneX {
    top: 70%;
    left: 22%;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    .center {
      width: 71vw;
      height: 81vw;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      background-image: url('@{img}probg.png');
      background-position: center top;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    .alert1 {
      img {
        width: 90%;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 15px;
      }
      .pro {
        width: 50%;
        border-radius: none;
      }
    }
    .alert2 {
      overflow: hidden;
      padding-top: 2%;
      .timg {
        width: 40%;
        margin: 0 auto;
        position: relative;
      }
      .text {
        width: 100%;
        height: 38%;
        border-radius: 15px;
        position: relative;
        margin-top: 5%;
        overflow: hidden;
        .scroll-text {
          overflow-y: scroll;
          width: 100%;
          height: 100%;
          position: relative;
          .ttext {
            width: 85%;
            margin: 0 auto;
            position: relative;
          }
        }
      }
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
@keyframes yuan {
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>


