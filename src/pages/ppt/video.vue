<template>
<div class="video-content" id="content" >
    <div class="container">
      <swiper :options="swiperOption" ref="Swiper1" class="vSwiper">
        <swiper-slide v-for="(item,index) in videoData" :key="index" class="slider1">
          <video  :id="'video'+index"  webkit-playsinline="true" playsinline="true" x-webkit-airplay="true"  controls width="100%" height="100%" v-show="!bgshow">
            <source :src="item.vUrl" type="video/mp4">
              您的浏览器不支持video标签.
          </video>
          <img :src="item.bgUrl + '?1212'" class="vbg" v-show="bgshow">
          <a @click="vPlay(index)" class="vplay" v-show="bgshow"><img :src="IMGURL + 'video/play.png'"/></a>
        </swiper-slide>
      </swiper>
      <swiper :options="labelOption" ref="Swiper2" class="labels">
        <swiper-slide v-for="(item,index) of videoData" :key="index" class="slider2">
         {{item.labelText}}
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </div>
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
export default {
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      videoData: null,
      vType: this.$route.query.vtype,
      playNow: null,
      bgshow: true,
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
  beforeCreate() {
    document.title = '星视度'
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
  },
  methods: {
    returnMenu() {
      window.location.href =
        window.location.origin + '/marketing/ppt?utm_source=0'
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
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    WxShare
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
    margin-top: 5%;
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
        width: 70%;
        // filter: url(blur.svg#blur); /* FireFox, Chrome, Opera */
        filter: blur(10px);
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
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
    margin-bottom: 10%;
    .slider2 {
      background: url('@{imgURL}label.png') center center/auto 90% no-repeat;
      width: 33.3%;
      height: 100%;
      color: #fff;
      text-align: center;
      font-size: 14px;
      padding: 5% 0 5% 0;
      opacity: 0.6;
      // transform: translate(40%, 0);
    }
    .swiper-slide-active {
      // transform: translate(40%, 0) scale(1.4, 1.4);
      transform: scale(1.4, 1.4) !important;
      opacity: 1 !important;
    }
  }
  .swiper-pagination {
    width: 100%;
    top: 95%;
    // bottom: 3%;
  }
}
</style>
