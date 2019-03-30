<template>
  <div class="photo-content">
    <div class="boots-wrap">
      <div class="slide-wrap pos-common">
        <img
          :src="imgPath+'line.png'"
          class="boot-line"
        >
        <img
          :src="imgPath+'text1.png'"
          class="boot-text pos-common"
        >
        <img
          :src="imgPath+'gesture-img.png'"
          class="gesture-img"
        >
        <div class="boot-img" />
      </div>
    </div>
    <div class="photo-wrap">
      <img
        :src="imgPath+'frame.png'"
        class="envelope-bg"
      >
      <img
        :src="photo"
        class="photo-img"
      >
    </div>
    <div class="save-img">
      <img
        :src="imgPath+'text.png'"
        class="hint"
      >
    </div>
    <div class="photo-cover">
      <img
        :src="imgPath+'shade.png'"
        class="cover-img"
      >
    </div>
  </div>
</template>
<script>
const IMG_URL = process.env.CDN_URL;
import $ from 'jquery'
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      imgPath: IMG_URL + '/fe/image/xcdog/',
      wxShareInfoValue: {
        title: '我在携程未来旅行空间站，高清硬照求围观！',
        desc: '4月5日-7日，苏州站邀你体验',
        imgUrl: IMG_URL + '/fe/image/xcdog/icon.jpg'
      }
    }
  },
  beforeCreate() {
    document.title = '携程旅行'
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
        end_pos = $('.slide-wrap').offset().left,
        start_pos = end_pos + slide_wid - $('.boot-img').width()

      var realHight = window.innerHeight
      $('.photo-content').height(realHight)

      wid = $(window).width() > 640 ? 640 : $(window).width()
      slogen_hei = wid * 330 / 750

      boot_hei = wid * 267 / 750
      $('.boots-wrap').height(boot_hei)

      document.addEventListener('touchstart', function () { }, true)

      boot_obj.off('touchstart', enter)
      boot_obj.on('touchstart', enter)

      function enter(e) {
        e.preventDefault()
        boot_obj.on('touchmove', move)
        boot_obj.on('touchend', end)
      }

      function move(e) {
        var moveX = e.originalEvent.touches[0].clientX,
          diff = moveX - end_pos,
          curr_pos = 0,
          percent = 0

        $('.gesture-img').addClass('disappear')

        if (diff <= 0 || boot_obj.offset().left < end_pos) {
          curr_pos = 0
        } else {
          curr_pos = diff - boot_obj.width() / 2
        }
        if (diff < end_pos) {
          curr_pos = end_pos - start_pos
          setTimeout(function () {
            $('.boots-wrap').addClass('hide')
            $('.boots-btn-wrap').addClass('show')
          }, 500)

          $('.photo-wrap').addClass('appear')
          $('.photo-content').addClass('appear')
          $('.slide-wrap').addClass('slide')
          boot_obj.off('touchstart', enter)
          boot_obj.off('touchmove', move)
          boot_obj.off('touchend', end)
        }
        percent = curr_pos / (start_pos - end_pos) * 100
        // console.log(percent)
        if (percent < 0) {
          $('.cover-img').css('transform', 'translateX(-100%)')
        } else {
          $('.cover-img').css(
            'transform',
            'translateX(-' + (100 - percent) + '%)'
          )
        }
        boot_obj.css('left', curr_pos)

        // console.dir('diff ' + diff + 'moveX' + moveX)
      }

      function end() {
        boot_obj.off('touchmove', move)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.xingstation.com/fe/image/xcdog";

.photo-content {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url("@{imgUrl}/back.jpg");
  overflow: hidden;
  text-align: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  .photo-cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    margin: 0 auto;
    z-index: 5;
    overflow: hidden;
    .cover-img {
      width: 100%;
      height: 100%;
    }
  }
  .photo-wrap {
    margin-top: 5%;
    width: 100%;
    height: 85%;
    position: relative;
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
    .envelope-bg {
      height: 100%;
      width: auto;
      margin-left: 2px;
    }
    .photo-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 4;
      margin: 0 auto;
      height: 100%;
      width: auto;
      padding: 2px;
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
  }
  .slogan {
    width: 68%;
    margin: 50px 0;
  }
  .save-img {
    margin: 0 auto;
    animation: arrowMotion 0.6s infinite alternate;
    opacity: 0;
    z-index: 8;
    .hint {
      width: 60%;
      height: 100%;
    }
  }
  &.appear {
    .seal-img {
      animation: sealMotion 0.5s 1 forwards;
    }
    .save-img {
      opacity: 1;
      margin-bottom: 5%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      justify-content: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
    }
    .photo-cover {
      display: none;
    }
  }
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
        width: 90%;
        z-index: 4;
        top: 3%;
        left: 2%;
        position: absolute;
      }
      .boot-text {
        width: 51%;
        z-index: 4;
        top: -56%;
      }
      .gesture-img {
        width: 11.78%;
        top: 5%;
        right: 7%;
        margin: 0;
        z-index: 10;
        position: absolute;
        animation: gestureMotion 5s infinite;
        &.disappear {
          display: none;
        }
      }

      .boot-img {
        position: absolute;
        top: -18px;
        bottom: 0;
        right: 0;
        width: 30%;
        z-index: 5;
        background-repeat: no-repeat;
        background-size: 100%;
        background-image: url("@{imgUrl}/logo.png");

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

  .photo-cover {
    z-index: 6;
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
    right: 7%;
  }
  100% {
    right: 85%;
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
</style>