<template>
  <div 
    id="content" 
    class="video-content" >
    <div class="container">
      <div 
        slot="pagination" 
        class="swiper-pagination swiper-pagination-white"/>
      <!-- 标签组 -->
      <swiper 
        ref="Swiper2" 
        :options="labelOption" 
        class="labels">
        <swiper-slide 
          v-for="(item,index) of videoData" 
          :key="index" 
          class="slider2">
          <img 
            :src="IMGURL + 'label.png'" 
            class="label-bg">
          <img 
            :src="IMGURL + 'left.png'" 
            class="toleft">
          <p class="label-text">{{ item.labelText }}</p>
          <img 
            :src="IMGURL + 'right.png'" 
            class="toright">
        </swiper-slide>
      </swiper>
      <!-- 图组 -->
      <swiper 
        ref="Swiper1" 
        :options="swiperOption" 
        class="vSwiper">
        <swiper-slide 
          v-for="(item,index) in videoData" 
          :key="index" 
          class="slider1">
          <img
            src="http://p22vy0aug.bkt.clouddn.com/image/ppt_video/loading.gif"
            :data-url="item.mUrl"
            class="mImg loading">
        </swiper-slide>
      </swiper>
    </div>
    <a 
      class="home" 
      @click="returnMenu"><img :src="IMGURL + 'home.png'"></a>
  </div>
</template>

<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { parseService } from 'services'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import $ from 'jquery'
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      videoData: null,
      vType: this.$route.query.vtype,
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
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getDataByType()
  },
  mounted() {
    this.handleWechatShare()
    let height = this.$innerHeight()
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
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    returnMenu() {
      this.$router.push({
        path: 'ppt_index?utm_source=20'
      })
    },
    getDataByType() {
      let query = {
        vType: this.vType
      }
      parseService
        .get(REQ_URL + 'promotion?where=' + JSON.stringify(query))
        .then(data => {
          this.videoData = data.results
          this.toPointer()
          let imgs = document.querySelectorAll('.mImg')
          Array.from(imgs).forEach(item => {
            let img = new Image()
            let url = item.getAttribute('data-url')
            img.onload = function() {
              item.setAttribute('src', url)
              item.setAttribute('class', 'mImg')
            }
            img.src = url
          })
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

      img {
        // width: 90%;
        width: 67%;
        position: relative;
        z-index: 0;
        margin-bottom: 3%;
      }
      .loading {
        width: 30px;
        margin-top: 50%;
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
