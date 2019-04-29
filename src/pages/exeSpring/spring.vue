<template>
  <div 
    id="warp" 
    class="spring-content"
  >
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    >
      <source :src="audioUrl + '/xiha.mp3'">
    </audio>
    <img 
      id="mbtn" 
      :src="imgUrl + 'kaide/yinyue.png'" 
      class="mplay" 
      @click="playOrNot"
    >
    <div class="frame">
      <img 
        :src="imgUrl + 'spring/frame.png'" 
        class="border"
      >
      <img 
        id="mImg" 
        :src="mImg" 
        class="photo"
      >
      <img 
        v-show="isShow" 
        :src="imgUrl + 'spring/text.png'" 
        class="text"
      >
      <img 
        v-show="isShow" 
        :src="imgUrl + 'spring/' + word + '.png'" 
        class="words"
      >
      <img 
        v-for="(item, index) in qian" 
        v-show="isShow" 
        :key="index"
        :class="item" 
        :src="imgUrl + 'spring/qian.gif'"
      >
      <img 
        v-show="isShow" 
        :src="imgUrl + 'spring/cloud.png'" 
        class="cloud"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      audioUrl: BASE_URL + 'audio/mp3',
      mImg: null,
      word: null,
      isShow: false,
      qian: ['qian1', 'qian2', 'qian3', 'qian4'],
      //微信分享
      wxShareInfoValue: {
        title: '狗年大吉',
        desc: '祝您新年旺旺旺',
        imgUrl: BASE_URL + 'spring/iicon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    docuemnt.title = '狗年大吉'
  },
  mounted() {
    this.handleWechatShare()
    this.playAudio()
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var warp = document.getElementById('warp')
    warp.style.minHeight = h + 'px'
    this.getInfoById()
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
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          this.word = res.parms.split('=')[1]
          this.isShow = true
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    playAudio() {
      var voice = document.getElementById('voice')
      var mbtn = document.getElementById('mbtn')
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
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/spring/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.spring-content {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background-image: url('@{imgUrl}topnew.png'), url('@{imgUrl}bottom.png'),
    url('@{imgUrl}contentback.jpg');
  background-repeat: no-repeat, no-repeat, repeat;
  background-size: 100% auto, 100% auto, 100% 100%;
  background-position: center top, center bottom, center top;
  text-align: center;
  height: auto;
  text-align: center;
  .frame {
    width: 88%;
    min-height: 63%;
    height: auto;
    margin: 0 auto;
    margin-top: 26.8%;
    margin-bottom: 28%;
    text-align: center;
    position: relative;
    img {
      width: 100%;
      position: relative;
    }
    .photo {
      width: 83.2%;
      position: absolute;
      top: 2.7%;
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
    }
    .text {
      width: 37.5%;
      margin-top: 7px;
      margin-bottom: 12px;
    }
    .qian1,
    .qian2,
    .qian3,
    .qian4 {
      position: absolute;
      width: 8.8%;
    }
    .qian1 {
      left: 17%;
      margin-top: -81%;
    }
    .qian2 {
      right: 17%;
      margin-top: -81%;
    }
    .qian3 {
      left: 10%;
      margin-top: -62%;
      transform: rotateY(55deg);
    }
    .qian4 {
      right: 10%;
      margin-top: -62%;
      transform: rotateY(-55deg);
    }
    .cloud {
      width: 27%;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
#mbtn {
  position: absolute;
  top: 10px;
  right: 10px;
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
</style>
>

