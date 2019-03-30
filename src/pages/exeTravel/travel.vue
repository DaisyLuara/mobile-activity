<template>
  <div class="travel-content">
    <div class="photo-content">
      <audio 
        id="voice" 
        autobuffer 
        autoloop 
        loop 
        autoplay 
        hidden>
        <source :src="audioUrl+'travelBGM.mp3'">
      </audio>
      <img 
        id="mbtn" 
        :src="imgPath+'kaide/yinyue.png'" 
        class="mplay" 
        @click="playOrNot">
      <div class="boots-wrap">
        <div class="slide-wrap pos-common">
          <img 
            :src="imgPath+'travel/line.png'" 
            class="boot-line"> 
          <img 
            :src="imgServerUrl+'/boot-text.png'" 
            class="boot-text pos-common">
          <img 
            :src="imgServerUrl+'/gesture-img.png'" 
            class="gesture-img"> 
          <div class="boot-img"/>
        </div>
      </div>
      <div class="photo-wrap">
        <img 
          :src="imgServerUrl+'/photo_frame.png'" 
          class="envelope-bg">
        <img 
          :src="photo" 
          class="photo-img">
      </div>
      <div class="photo-cover">
        <img 
          :src="imgServerUrl+'/photo-cover2.png'" 
          class="cover-img">
      </div>
    </div>
    <div class="save-img">
      <img 
        :src="imgServerUrl+'/save-img3.png'" 
        class="hint">
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
const BASE_URL = process.env.CDN_URL
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  mixins: [normalPages],
  data() {
    return {
      imgPath: BASE_URL + '/image/',
      imgServerUrl: IMAGE_SERVER + '/pages/psbh_travel',
      audioUrl: BASE_URL + '/audio/mp3/',
      photo: null,
      wxShareInfoValue: {
        title: '好物相伴，萌游世界',
        desc: '有人@你',
        imgUrl: BASE_URL + 'image/travel/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '旅行通用版'
  },
  mounted() {
    $('.photo-content').css('min-height', $(window).height())
    this.init()
    this.playAudio()
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
      slogen_hei = (wid * 330) / 750

      boot_hei = (wid * 267) / 750
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
          setTimeout(function() {
            $('.boots-wrap').addClass('hide')
          }, 500)

          $('.photo-wrap').addClass('appear')
          $('.photo-content').addClass('appear')
          $('.slide-wrap').addClass('slide')
          boot_obj.off('touchstart', enter)
          boot_obj.off('touchmove', move)
          boot_obj.off('touchend', end)
        }
        percent = (curr_pos / (start_pos - end_pos)) * 100
        if (percent > 100) {
          $('.cover-img').css('transform', 'translateX(0)')
          return
        } else if (percent >= 0) {
          $('.cover-img').css(
            'transform',
            'translateX(-' + (100 - percent) + '%)'
          )
        } else {
          $('.cover-img').css('transform', 'translateX(-100%)')
        }
        boot_obj.css('left', curr_pos)

        // console.dir('diff ' + diff + 'moveX' + moveX)
      }

      function end() {
        boot_obj.off('touchmove', move)
      }
    },
    playAudio() {
      let voice = document.getElementById('voice')
      let mbtn = document.getElementById('mbtn')
      if (!voice) {
        return
      }
      //调用 <audio> 元素提供的方法 play()
      voice.play()
      if (voice.paused) {
        mbtn.setAttribute('class', ' ')
      }
      //判斷 WeixinJSBridge 是否存在
      if (
        typeof WeixinJSBridge == 'object' &&
        typeof WeixinJSBridge.invoke == 'function'
      ) {
        voice.play()
      } else {
        //監聽客户端抛出事件"WeixinJSBridgeReady"
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            function() {
              voice.play()
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', function() {
            voice.play()
          })
          document.attachEvent('onWeixinJSBridgeReady', function() {
            voice.play()
          })
        }
      }

      //voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
      var voiceStatu = true
      //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
      document.addEventListener(
        'touchstart',
        function(e) {
          if (voiceStatu) {
            voice.play()
            voiceStatu = false
          }
        },
        false
      )
      voice.onplay = function() {
        mbtn.setAttribute('class', 'mplay')
      }
      voice.onpause = function() {
        mbtn.setAttribute('class', ' ')
      }
    },
    playOrNot() {
      // 依據 audio 的 paused 属性返回音频是否已暂停來判斷播放還是暫停音频。
      let voice = document.getElementById('voice')
      if (voice.paused) {
        voice.play()
      } else {
        voice.pause()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://cdn.xingstation.cn/image/travel';
@imgServerUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/psbh_travel';
.travel-content {
  width: 100%;
  background-color: #faf4e8;
  text-align: center;
  .photo-content {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    text-align: center;
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
      left: 50%;
      top: 3.5%;
      height: 92.5%;
      margin: 0 auto;
      z-index: 5;
      overflow: hidden;
      transform: translateX(-50%);
      .cover-img {
        height: 100%;
        width: auto;
        max-width: none;
      }
    }
    .photo-wrap {
      margin: 0 auto;
      margin-top: 5%;
      height: 93%;
      position: relative;
      .envelope-bg {
        height: 100%;
        width: auto;
        margin-left: 2px;
      }
      .photo-img {
        position: absolute;
        top: 0;
        left: 0.5%;
        right: 0;
        z-index: 4;
        margin: 0 auto;
        height: 99.5%;
        width: auto;
        padding: 2px;
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
          width: 25%;
          z-index: 5;
          background-repeat: no-repeat;
          background-size: 100%;
          background-image: url('@{imgUrl}/plane.png');
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
    .photo-cover {
      z-index: 6;
    }
  }
  .save-img {
    margin: 0 auto;
    animation: arrowMotion 0.6s infinite alternate;
    z-index: 8;
    margin-top: -5%;
    padding-bottom: 5%;
    .hint {
      width: 60%;
      height: 100%;
    }
  }
}
#mbtn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 30px;
  height: 30px;
  z-index: 9999;
}
.mplay {
  animation: mycir 2s linear infinite;
}

@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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