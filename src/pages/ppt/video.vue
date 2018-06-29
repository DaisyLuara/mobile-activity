<template>
<div class="video-content" id="content" >
    <div class="container">
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      <!-- 标签组 -->
      <swiper :options="labelOption" ref="Swiper2" class="labels">
        <swiper-slide v-for="(item,index) of videoData" :key="index" class="slider2">
          <img :src="IMGURL + 'label.png'" class="label-bg"/>
          <img :src="IMGURL + 'left.png'" class="toleft"/>
          <p class="label-text">{{item.labelText}}</p>
          <img :src="IMGURL + 'right.png'" class="toright"/>
        </swiper-slide>
      </swiper>
      <!-- 背景图组 -->
      <swiper :options="swiperOption" ref="Swiper1" class="vSwiper">
        <swiper-slide v-for="(item,index) in videoData" :key="index" class="slider1">
          <video  :id="'video'+index"  webkit-playsinline="true" playsinline="true" x-webkit-airplay="true"  controls width="100%" height="100%" v-show="!bgshow">
            <source :src="item.vUrl" type="video/mp4">
              您的浏览器不支持video标签.
          </video>
          <img :src="item.bgUrl" class="vbg" v-show="bgshow">
          <a @click="vPlay(index)" class="vplay" v-show="bgshow"><img :src="IMGURL + 'video/play.png'"/></a>
        </swiper-slide>
      </swiper>
    </div>
    <a @click="returnMenu" class="home"><img :src="IMGURL + 'home.png'"/></a>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
</div>
</template>

<script>
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/'
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      videoData: null,
      vType: this.$route.query.vtype,
      playNow: null,
      bgshow: true,
      left: false,
      right: false,
      swiperOption: {
        slideToClickedSlide: true,
        centeredSlides: true,
        preventLinksPropagation: true,
        paginationClickable: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
          renderBullet: function(index, className) {
            return (
              '<span style="background:#fff;margin:0px 5px;" class="' +
              className +
              '">' +
              '' +
              '</span>'
            )
          }
        },
        on: {
          init: () => {},
          slideChange: () => {
            this.playNow = document.getElementById(
              'video' + this.$refs.Swiper1.swiper.previousIndex
            )
            this.playNow.pause()
            this.playNow.currentTime = 0
            scrollTo(0, 0)
          }
        }
      },
      labelOption: {
        centeredSlides: true,
        slidesPerView: 3,
        slideToClickedSlide: true,
        on: {
          init: () => {},
          slideChange: () => {
            scrollTo(0, 0)
            this.toPointer()
          }
        }
      },
      //微信分享
      wxShareInfo: {
        title: '星视度',
        desc: '星视度 创想新视界',
        imgUrl: IMAGE_SERVER + '/pages/promotion/icon.jpg',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  created() {
    this.getDataByType()
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    this.$refs.Swiper1.swiper.controller.control = this.$refs.Swiper2.swiper
    this.$refs.Swiper2.swiper.controller.control = this.$refs.Swiper1.swiper
    let w = document.documentElement
    let a = w.getBoundingClientRect().width
    if (a > 750) {
      a = 750
    }
    let rem = a / 7.5
    w.style.fontSize = rem + 'px'
    this.getDataByType()
  },
  methods: {
    returnMenu() {
      // window.location.href =
      //   window.location.origin + '/marketing/ppt_index?utm_source=20'
      this.$router.push({
        path: 'ppt_index?utm_source=20'
      })
    },
    vPlay(index) {
      let that = this
      this.playNow = document.getElementById('video' + index)
      this.playNow.play()
      this.bgshow = false
      this.playNow.onplay = function() {
        that.playNow.currentTime = 0
      }
      this.playNow.onended = function() {
        that.bgshow = true
      }
      this.playNow.onpause = function() {
        that.bgshow = true
      }
    },
    getDataByType() {
      let query = {
        vType: this.vType
      }
      parseService
        .get(this, REQ_URL + 'promotion?where=' + JSON.stringify(query))
        .then(data => {
          this.videoData = data.results
          console.log(data.results)
          this.toPointer()
        })
        .catch(err => {
          console.log(err)
        })
    },
    toPointer() {
      let index = this.$refs.Swiper2.swiper.activeIndex
      index = Number(index)
      let all = $('.slider2')
      let active = $('.slider2:eq(' + index + ')')
      index < this.videoData.length - 1
        ? all.removeClass('slider2-right') && active.addClass('slider2-right')
        : all.removeClass('slider2-right')
      index > 0
        ? all.removeClass('slider2-left') && active.addClass('slider2-left')
        : all.removeClass('slider2-left')
      active = null
    }
  },
  components: {
    WxShare,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less" scoped>
@imgURL: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/promotion/';
html,
body {
  overflow-x: hidden;
  text-align: center;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.video-content {
  width: 100%;
  text-align: center;
  overflow-x: hidden;
  position: relative;
  background-color: #11181e;
  .vSwiper {
    width: 100%;
    text-align: center;
    margin-top: 3%;
    .slider1 {
      margin: 0 auto;
      text-align: center;
      position: relative;
      video {
        width: 100%;
        position: relative;
        z-index: 0;
      }
      .vbg {
        width: 80%;
        // filter: url(blur.svg#blur); /* FireFox, Chrome, Opera */
        filter: blur(10px);
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
        overflow: hidden;
      }
      .vplay {
        width: 30%;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        img {
          max-width: 100%;
        }
      }
    }
  }
  .labels {
    width: 100%;
    height: 3.4%;
    // margin-bottom: 10%;
    margin-top: 13%;
    .slider2 {
      //background: url('@{imgURL}label.png') center center/auto 90% no-repeat;
      width: 33.3%;
      height: 100%;
      color: #fff;
      text-align: center;
      font-size: 14px;
      opacity: 0.6;
      position: relative;
      .label-bg {
        width: 100%;
        height: auto;
        position: relative;
        margin: 0 auto;
        z-index: 0;
      }
      .label-text {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
        font-size: 0.14rem;
        margin: 0;
      }
      .toleft {
        height: 65%;
        width: auto;
        position: absolute;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
        z-index: 99;
        //display:none;
        opacity: 0;
      }
      .toright {
        height: 65%;
        width: auto;
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        z-index: 99;
        //display:none;
        opacity: 0;
      }
    }
    .slider2-left {
      .toleft {
        opacity: 1;
        animation: shake 0.5s linear infinite alternate;
      }
    }
    .slider2-right {
      .toright {
        opacity: 1;
        animation: shake 0.5s linear infinite alternate;
      }
    }
    .swiper-slide-active {
      transform: scale(1.4, 1.4) !important;
      opacity: 1 !important;
    }
  }
  .swiper-pagination {
    width: 100%;
    top: -2%;
  }

  .home {
    display: inline-block;
    width: 13%;
    position: fixed;
    left: 10px;
    bottom: 20px;
    z-index: 99999999;
    img {
      width: 100%;
    }
  }
}
@keyframes shake {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
