<template>
  <div class="warp">
    <!-- 标题 -->
    <img
      :src="base + 'pic_01.jpg'"
      class="tit"
    >

    <!-- 照片 -->
    <div class="pictures">
      <img
        :src="base + 'photoframe.png'"
        class="bgcover"
      >
      <img
        :src="photo"
        class="center photo"
      >
      <img
        :src="base + 'pic_02.jpg'"
        class="gear-cover"
      >
      <img
        v-for="item in 11"
        :key="item"
        :src="base + 'gear'+(item>9?item:'0'+item)+ '.png'"
        :class="'gear'+item"
      >

    </div>
    <!-- 关于我们 -->
    <div class="about">
      <div class="us">
        <img
          :src="base + 'pic_03.jpg'"
          class="tit"
        >
        <img
          :src="base + 'arrow.png'"
          class="center arrow-us"
        >
      </div>
      <img
        :src="base + 'pic_04.jpg'"
        class="bg"
      >
      <!-- 关于我们 slider -->
      <div class="us-container">
        <swiper
          ref="Swiper1"
          :options="sOption1"
          class="swiper1"
        >
          <swiper-slide
            v-for="item in usList"
            :key="item.key"
          >
            <img :src="item">
          </swiper-slide>
        </swiper>
        <div
          class="swiper-button-prev"
          slot="button-prev"
        ></div>
        <!--左箭头-->
        <div
          class="swiper-button-next"
          slot="button-next"
        ></div>
        <!--右箭头-->
      </div>
      <img
        :src="base + 'picture_text.png'"
        class="center cover-text"
      >
    </div>
    <!-- 招聘职位 -->
    <div class="job-container">
      <img
        :src="base + 'pic_05.jpg'"
        class="bg"
      >
      <swiper
        ref="Swiper2"
        :options="sOption2"
        class="swiper2"
      >
        <swiper-slide
          v-for="item in jobList"
          :key="item.key"
        >
          <img :src="item">
        </swiper-slide>
      </swiper>
      <div
        class="swiper-button-prev swiper-prev"
        slot="prev"
      ></div>
      <!--左箭头-->
      <div
        class="swiper-button-next swiper-next"
        slot="next"
      ></div>
      <!--右箭头-->
    </div>
    <img
      :src="base + 'pic_06.jpg'"
      class="footer"
    >
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const cdnUrl = process.env.CDN_URL;
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + '/fe/image/apply/',
      sOption1: {
        autoplay: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      sOption2: {
        autoplay: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        },
      },
      gears: [cdnUrl + '/fe/image/apply/gear01.png', cdnUrl + '/fe/image/apply/gear02.png', cdnUrl + '/fe/image/apply/gear03.png', cdnUrl + '/fe/image/apply/gear04.png', cdnUrl + '/fe/image/apply/gear05.png', cdnUrl + '/fe/image/apply/gear06.png', cdnUrl + '/fe/image/apply/gear07.png', cdnUrl + '/fe/image/apply/gear08.png', cdnUrl + '/fe/image/apply/gear09.png', cdnUrl + '/fe/image/apply/gear10.png', cdnUrl + '/fe/image/apply/gear11.png',],
      usList: [cdnUrl + '/fe/image/apply/picture01.png', cdnUrl + '/fe/image/apply/picture02.png', cdnUrl + '/fe/image/apply/picture03.png', cdnUrl + '/fe/image/apply/picture04.png', cdnUrl + '/fe/image/apply/picture05.png', cdnUrl + '/fe/image/apply/picture06.png',],
      jobList: [cdnUrl + '/fe/image/apply/01.png', cdnUrl + '/fe/image/apply/02.png', cdnUrl + '/fe/image/apply/03.png', cdnUrl + '/fe/image/apply/04.png', cdnUrl + '/fe/image/apply/05.png'],
      //微信分享
      wxShareInfoValue: {
        title: "2019年春季招聘会",
        desc: "释放天赋",
        link: window.location.href,
        imgUrl: cdnUrl + "/fe/image/apply/icon.png"
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/apply/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  max-width: 750px;
}
* {
  padding: 0;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
  position: relative;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.bg {
  position: relative;
  z-index: 0;
}
.warp {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-color: #000;
  .pictures {
    width: 100%;
    position: relative;
    .bgcover {
      width: 100%;
      z-index: 99;
      position: relative;
    }
    .photo {
      width: 85%;
      top: 22.3%;
      pointer-events: auto;
      user-select: auto;
      z-index: 999;
    }
    .gear-cover {
      position: absolute;
      top: 0%;
      left: 0%;
      z-index: 0;
    }
    .gear1 {
      position: absolute;
      width: 14%;
      top: -1%;
      left: 4%;
      z-index: 0;
      animation: myreverse 1s linear infinite;
    }
    .gear2 {
      position: absolute;
      width: 14%;
      top: 17%;
      left: -5%;
      z-index: 0;
      animation: myrotate 1.3s linear infinite;
    }
    .gear3 {
      position: absolute;
      width: 9%;
      top: 38%;
      left: -2%;
      z-index: 0;
      animation: myreverse 1.6s linear infinite;
    }
    .gear4 {
      position: absolute;
      width: 18%;
      top: 16%;
      left: 7%;
      z-index: 9;
      animation: myreverse 1.5s linear infinite;
    }
    .gear5 {
      position: absolute;
      width: 12%;
      top: 2%;
      left: 18%;
      z-index: 0;
      animation: myrotate 1.2s linear infinite;
    }
    .gear6 {
      position: absolute;
      width: 12%;
      top: 5%;
      left: -4%;
      z-index: 9;
      animation: myrotate 1.8s linear infinite;
    }
    .gear7 {
      position: absolute;
      width: 12%;
      bottom: 12%;
      right: 21%;
      z-index: 0;
      animation: myrotate 1.7s linear infinite;
    }
    .gear8 {
      position: absolute;
      width: 9%;
      bottom: 4%;
      right: 16%;
      z-index: 0;
      animation: myreverse 1.5s linear infinite;
    }
    .gear9 {
      position: absolute;
      width: 19%;
      bottom: 4%;
      right: -2%;
      z-index: 9;
      animation: myrotate 1.8s linear infinite;
    }
    .gear10 {
      position: absolute;
      width: 14%;
      bottom: 0%;
      right: 31%;
      z-index: 9;
      animation: myreverse 1.4s linear infinite;
    }
    .gear11 {
      position: absolute;
      width: 12%;
      top: 15%;
      right: 3%;
      z-index: 0;
      animation: myrotate 1.3s linear infinite;
    }
  }
  .about {
    width: 100%;
    .arrow-us {
      width: 9%;
      top: 53%;
      z-index: 99;
      animation: myfloat linear 0.4s infinite alternate-reverse;
    }
    .us-container {
      width: 80%;
      position: absolute;
      top: 70.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      .swiper-button-prev {
        background-image: url("@{img}arrowL.png");
        position: absolute;
        top: 50%;
        left: -11%;
        transform: translateY(-50%) scale(0.9);
      }
      .swiper-button-next {
        background-image: url("@{img}arrowR.png");
        position: absolute;
        top: 50%;
        right: -11%;
        transform: translateY(-50%) scale(0.9);
      }
    }
    .cover-text {
      width: 17.5%;
      bottom: 1.5%;
      z-index: 999;
    }
  }
  .job-container {
    position: relative;
    .swiper2 {
      width: 95%;
      position: absolute;
      top: 11%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      img {
        pointer-events: auto;
        user-select: auto;
      }
    }
    .swiper-prev {
      background-image: url("@{img}buttonL.png");
      background-size: 100% auto;
      position: absolute;
      top: 50%;
      left: 1%;
      z-index: 999;
      transform: scale(1.2);
    }
    .swiper-next {
      background-image: url("@{img}buttonR.png");
      background-size: 100% auto;
      position: absolute;
      top: 50%;
      right: 1%;
      z-index: 999;
      transform: scale(1.2);
    }
  }
}
@keyframes myfloat {
  0% {
    top: 53%;
  }
  100% {
    top: 65%;
  }
}
@keyframes myrotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes myreverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>


