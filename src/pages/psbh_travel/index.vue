<template>
  <div class="psbh-travel-wrap">
    <img 
      :src="imgServerUrl + '/ad_0731.jpeg'" 
      class="psbh-img" 
      alt=""
    >
    <div class="photo-content">
      <div class="boots-wrap">
        <div class="slide-wrap pos-common">
          <img 
            :src="imgServerUrl + '/boot-line.png'" 
            class="boot-line pos-common"
          >
          <img 
            :src="imgServerUrl + '/boot-text.png'" 
            class="boot-text pos-common"
          >
          <img 
            :src="imgServerUrl + '/gesture-img.png'" 
            class="gesture-img pos-common"
          >
          <div class="boot-img" />
        </div>
      </div>
      <div class="photo-wrap">
        <img 
          :src="imgServerUrl + '/photo_frame.png'" 
          class="envelope-bg"
        >
        <img 
          :src="photo" 
          class="photo-img"
        >
        <div class="photo-cover">
          <img 
            :src="imgServerUrl + '/photo-cover2.png'" 
            class="cover-img"
          >
        </div>
        <img 
          :src="imgServerUrl + '/save-img3.png'" 
          class="save-img"
        >
      </div>
      <img 
        :src="imgServerUrl + '/slogan.png'" 
        class="slogan"
      >
    </div>
    <!-- <img class="psbh-img" :src="imgServerUrl + '/ad_0622_3.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/ad_0622_4.jpg'" alt=""> -->
    
    <!-- <img class="psbh-img" :src="imgServerUrl + '/img1.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img2.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img3.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img4.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img5.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img6.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img7.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/img8.jpg'" alt=""> -->
    <!-- <img class="psbh-img" :src="imgServerUrl + '/ad_0526_3.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/ad_0526_4.jpg'" alt="">
    <img class="psbh-img" :src="imgServerUrl + '/ad_0526_5.jpg'" alt=""> -->
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import $ from 'jquery'
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      photo: '',
      imgServerUrl: IMAGE_SERVER + '/pages/psbh_travel',
      wxShareInfo: {
        title: '浦商百货折上折',
        desc: '体验异域风情 尽享优惠折扣',
        imgUrl: IMAGE_SERVER + '/wx_share_icon/psbh_travel_share_icon.jpeg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '浦商百货'
  },
  mounted() {
    $('.photo-content').css('min-height', $(window).height())
    this.init()
  },
  methods: {
    init() {
      let wid = 0,
        slogen_hei = 0,
        adv_hei = 0,
        bubble_hei = 0,
        boot_hei = 0,
        slide_wid = $('.slide-wrap').width(),
        boot_obj = $('.boot-img'),
        start_pos = $('.slide-wrap').offset().left,
        end_pos = start_pos + slide_wid - $('.boot-img').width()

      wid = $(window).width() > 640 ? 640 : $(window).width()
      boot_hei = wid * 267 / 750
      $('.boots-wrap').height(boot_hei)

      document.addEventListener('touchstart', function() {}, true)

      boot_obj.off('touchstart', enter)
      boot_obj.on('touchstart', enter)

      function enter(e) {
        e.preventDefault()
        boot_obj.on('touchmove', move)
        boot_obj.on('touchend', end)
      }

      function move(e) {
        let moveX = e.originalEvent.touches[0].clientX,
          diff = moveX - start_pos,
          curr_pos = 0,
          percent = 0

        $('.gesture-img').addClass('disappear')
        if (diff <= 0 || boot_obj.offset().left < start_pos) {
          curr_pos = 0
        } else {
          curr_pos = diff - boot_obj.width() / 2
        }

        if (diff > end_pos) {
          curr_pos = end_pos - start_pos
          setTimeout(function() {
            $('.boots-wrap').addClass('hide')
            $('.boots-btn-wrap').addClass('show')
          }, 500)
          $('.photo-wrap').addClass('appear')
          $('.slide-wrap').addClass('slide')
          boot_obj.off('touchstart', enter)
          boot_obj.off('touchmove', move)
          boot_obj.off('touchend', end)
        }
        percent = curr_pos / (end_pos - start_pos) * 100
        if (percent < 0) {
          $('.cover-img').css('transform', 'translateX(0)')
        } else {
          $('.cover-img').css('transform', 'translateX(' + percent + '%)')
        }
        boot_obj.css('left', curr_pos)
      }

      function end() {
        boot_obj.off('touchmove', move)
      }
    }
  }
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
@imgServerUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/psbh_travel';
.psbh-travel-wrap {
  .photo-content {
    width: 100%;
    position: relative;
    background-color: #faf4e8;
    padding-top: 10px;
    overflow: hidden;
    text-align: center;
    .slogen-wrap {
      position: relative;
      width: 100%;
      text-align: center;
      overflow-x: hidden;
      margin-bottom: 10px;
      .logo {
        width: 30%;
      }
      .sun-img {
        position: absolute;
        top: 3%;
        right: 8%;
        width: 14.3%;
        z-index: 1;
        animation: sunMotion 12s linear infinite;
      }
      .cloud-left {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 23.85%;
        z-index: 5;
        transform: translateX(-15%);
        animation: cloudLeftMotion 3s linear infinite alternate;
      }
      .cloud-right {
        position: absolute;
        top: 31%;
        right: 0;
        width: 20.4%;
        z-index: 3;
        animation: cloudRightMotion 3s linear infinite alternate;
      }
      .slogen-img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        width: 98%;
        z-index: 2;
        margin: 0 auto;
      }
    }

    .advertisement-wrap {
      text-align: center;
      position: relative;
      margin-top: 20px;
      height: 400px;
      .frame-wrap {
        display: inline-block;
        position: relative;
        overflow: hidden;
        position: absolute;
        .placeholder-img {
          width: 100%;
          opacity: 0;
        }
        .frame-common {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
        }
        .mask {
          background-size: 99%;
          z-index: 2;
          -webkit-mask-repeat: no-repeat;
          background-repeat: no-repeat;
          -webkit-mask-size: 100%;
          background-color: #2b76ac;
          opacity: 0;
        }
        .outer {
          width: 100%;
          z-index: 3;
          background-repeat: no-repeat;
          background-size: 100%;
        }
        &.frame1 {
          width: 43.2%;
          left: 7.5%;
          top: 0;
          .mask {
            background-size: 102%;
            background-position-x: -5px;
            background-image: url('@{imgServerUrl}/adv2-img.png');
            -webkit-mask-image: url('@{imgServerUrl}/mask2-img.png');
            background-position: 50% 50%;
            animation: moveFromRight 1s 0.2s 1 forwards;
          }
          .outer {
            background-image: url('@{imgServerUrl}/frame2-img.png');
          }
        }
        &.frame3 {
          width: 40.26%;
          left: 7.5%;
          top: 53%;
          .mask {
            background-position: -5px -10px;
            background-image: url('@{imgServerUrl}/adv3-img.png');
            -webkit-mask-image: url('@{imgServerUrl}/mask3-img.png');
            animation: moveFromLest 1s 0.5s 1 forwards;
          }
          .outer {
            background-image: url('@{imgServerUrl}/frame3-img.png');
          }
        }
        &.frame4 {
          width: 48.8%;
          left: 44%;
          top: 56.5%;
          .mask {
            opacity: 1;
            -webkit-mask-image: url('@{imgServerUrl}/mask4-img.png');
          }
          .outer {
            background-image: url('@{imgServerUrl}/frame4-img.png');
            .finger-img {
              position: absolute;
              left: 13%;
              bottom: 0;
              width: 22.4%;
              transform: translateY(100%);
              animation: fingerMotion 0.3s 1.3s ease-out 1 forwards;
            }
            .text1-img {
              position: absolute;
              left: 36%;
              top: 14%;
              width: 23.77%;
              opacity: 0;
              animation: textMotion 0.3s 1.6s ease-out 1 forwards;
            }
            .text2-img {
              position: absolute;
              left: 36%;
              top: 44%;
              width: 57.38%;
              opacity: 0;
              animation: textMotion 0.3s 1.8s ease-out 1 forwards;
            }
            .text3-img {
              position: absolute;
              right: 6.5%;
              bottom: 8.5%;
              width: 30%;
              opacity: 0;
              animation: textMotion 0.3s 2s ease-out 1 forwards;
            }
          }
        }
      }
    }
    .boots-wrap {
      margin-top: -5%;
      opacity: 1;
      transition: opacity 0.5s;
      position: absolute;
      top: 51%;
      width: 100%;
      left: 0px;
      right: 0px;
      margin: 0px auto;
      z-index: 99;
      &.hide {
        opacity: 0;
        z-index: 0;
      }
      .pos-common {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      .horizon-img {
        width: 86%;
        z-index: 1;
        bottom: 0;
      }
      .slide-wrap {
        width: 86%;
        top: 0;
        bottom: 0;
        z-index: 2;
        .boot-line {
          width: 75%;
          z-index: 4;
          top: 3%;
        }
        .boot-text {
          width: 39.08%;
          z-index: 4;
          top: 25%;
        }
        .gesture-img {
          width: 11.78%;
          top: 5%;
          left: 7%;
          margin: 0;
          z-index: 10;
          animation: gestureMotion 5s infinite;
          &.disappear {
            display: none;
          }
        }
        .coupon-img {
          width: 26.72%;
          left: auto;
          right: 7%;
          top: 11%;
          z-index: 11;
          display: none;
          &.appear {
            display: inline-block;
          }
        }
        .boot-img {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -10px;
          width: 20%;
          z-index: 5;
          background-repeat: no-repeat;
          background-size: 100%;
          background-image: url('@{imgServerUrl}/plane.png');
          &.proccess1 {
            background-image: url('@{imgServerUrl}/boot2-img.png');
          }
          &.proccess2 {
            background-image: url('@{imgServerUrl}/boot3-img.png');
          }
          &.proccess3 {
            background-image: url('@{imgServerUrl}/boot4-img.png');
          }
          transition: background 0.5s;
        }
        &.slide {
          .gesture-img,
          .boot-line,
          .boot-text {
            display: none;
          }
        }
      }
    }
    .boots-btn-wrap {
      text-align: center;
      position: absolute;
      top: 43%;
      left: 0px;
      right: 0px;
      z-index: 96;
      width: 50%;
      opacity: 0;
      margin: 0px auto;
      &.show {
        opacity: 1;
        z-index: 100;
        .boots-btn-bg {
          animation: changeOpacity 1.1s infinite ease-in-out;
        }
      }
      .boots-btn {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 2;
        margin: 0 auto;
        &.placeholder {
          position: relative;
          opacity: 0;
        }
      }
      .boots-btn-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1;
        margin: 0 auto;
      }
    }
    .coupon-btn {
      position: relative;
      width: 100%;
      margin: 40px auto 20px;
      display: block;
      text-align: center;
      .boots-btn {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 80%;
        z-index: 2;
        margin: 0 auto;
        &.placeholder {
          position: relative;
          opacity: 0;
        }
      }
      .boots-btn-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 80%;
        z-index: 1;
        margin: 0 auto;
      }
    }
    .arrow-wrap {
      position: relative;
      text-align: center;
      margin: 5% 0 10%;
      .arrow-bg {
        width: 76.26%;
      }
      .arrow-img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: 0 auto;
        z-index: 10;
        width: 9.3%;
        animation: arrowDownMotion 0.6s infinite alternate;
      }
    }

    .photo-wrap {
      position: relative;
      text-align: center;
      margin-bottom: 8%;
      width: 87%;
      margin: 0 auto;
      .envelope-bg {
        width: 83%;
        margin-left: 2px;
      }
      .photo-img {
        position: absolute;
        left: 0;
        right: 0;
        width: 81%;
        z-index: 4;
        margin: 0 auto;
        top: 3px;
      }
      .seal-img {
        position: absolute;
        opacity: 0;
        z-index: 6;
        &.seal1-img {
          left: 12%;
          top: 10%;
          width: 18.93%;
        }
        &.seal2-img {
          right: 11%;
          bottom: 31%;
          width: 24%;
        }
        &.seal3-img {
          left: 12%;
          bottom: 15%;
          width: 20.93%;
        }
        &.seal4-img {
          right: 12%;
          bottom: 19%;
          width: 29.33%;
          z-index: 7;
        }
      }
      .photo-cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 2px;
        width: 81.3%;
        margin: 0 auto;
        z-index: 5;
        overflow: hidden;
        .cover-img {
          width: 100%;
        }
      }
      .save-img {
        position: absolute;
        bottom: -7%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 71.2%;
        animation: arrowMotion 0.6s infinite alternate;
        opacity: 0;
        z-index: 8;
      }
      &.appear {
        .seal-img {
          animation: sealMotion 0.5s 1 forwards;
        }
        .save-img {
          opacity: 1;
        }
        .photo-cover {
          display: none;
        }
      }
    }
    .slogan {
      width: 48%;
      margin: 50px auto 0;
    }

    .bubbles-wrap {
      position: relative;
      margin-top: 13%;
      margin-bottom: 20px;
      .bubble-wrap {
        position: absolute;
        top: 0;
        .placeholder-img {
          width: 100%;
          opacity: 0;
        }
        .bubble-common {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: 100%;
        }
        .bublle-frame {
          z-index: 6;
        }
        &.bubble-left {
          width: 52.4%;
          left: 8.5%;
          .mask {
            background-image: url('@{imgServerUrl}/bubble1-bg.png');
            -webkit-mask-size: 100%;
            -webkit-mask-image: url('@{imgServerUrl}/bubble1-mask.png');
            z-index: 2;
          }
          .bubble-animate {
            position: absolute;
            left: 56%;
            top: 46%;
            width: 67%;
            z-index: 7;
            transform: scale(0);
            &.appear {
              animation: bubbleImgAppear 0.3s 1 forwards;
            }
          }
        }
        &.bubble-right {
          width: 41.2%;
          right: 8.5%;
          .mask {
            background-image: url('@{imgServerUrl}/bubble2-bg.png');
            -webkit-mask-size: 100%;
            -webkit-mask-image: url('@{imgServerUrl}/bubble2-mask.png');
            z-index: 3;
          }
        }
      }
    }

    .compass-wrap {
      position: relative;
      text-align: center;
      margin-top: 5px;
      padding-bottom: 5px;
      .earth-img {
        width: 56%;
        animation: sunMotion 15s linear infinite;
      }
      .compass-img-active,
      .compass-img {
        position: absolute;
        left: 0;
        right: 0;
        top: 24%;
        bottom: 0;
        width: 29.06%;
        margin: 0 auto;
        z-index: 1;
      }
      .compass-img {
        background-image: url('@{imgServerUrl}/compass-img.png');
        background-repeat: no-repeat;
        background-size: 100%;
        z-index: 5;
        opacity: 1;
        &:active {
          opacity: 0;
        }
      }
      .text-left {
        position: absolute;
        left: 8%;
        top: 40%;
        z-index: 3;
        width: 22.8%;
      }
      .text-right {
        position: absolute;
        right: 9%;
        top: 38%;
        z-index: 3;
        width: 18.4%;
      }
    }
  }

  @keyframes sunMotion {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes cloudLeftMotion {
    0% {
      transform: translateX(-15%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  @keyframes cloudRightMotion {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(15%);
    }
  }
  @keyframes moveFromLest {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes moveFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes fingerMotion {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes textMotion {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes sealMotion {
    0% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes bubbleImgAppear {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes arrowDownMotion {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @keyframes arrowMotion {
    0% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @keyframes gestureMotion {
    0% {
      left: 7%;
    }
    100% {
      left: 85%;
    }
  }

  @keyframes changeOpacity {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>


