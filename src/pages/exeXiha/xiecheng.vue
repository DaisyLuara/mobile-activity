<template>
  <div 
    id="warp" 
    class="warp"
  >
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    >
      <source :src="audioUrl+'xiha.mp3'">
    </audio>
    <img 
      id="mbtn" 
      :src="imgUrl+'kaide/yinyue.png'" 
      class="mplay" 
      @click="playOrNot"
    >
    <div class="top">
      <img 
        :src="imgUrl+'hiphop/title.png'" 
        class="title1"
      >
      <img 
        :src="imgUrl+'hiphop/title2.png'" 
        class="title2"
      >
    </div>
    <div class="main">
      <img 
        :src="imgUrl+'hiphop/cloud.png'" 
        class="cloud"
      >
      <img 
        :src="imgUrl+'hiphop/jian.png'" 
        class="jian"
      >
      <img 
        :src="imgUrl+'hiphop/guang.png'" 
        class="guang"
      >
      <img 
        :src="imgUrl+'hiphop/jpgbg.png'" 
        class="jpgbg"
      >
      <img 
        id="mImg" 
        :src="mImg" 
        class="photo"
      >
    </div>
    <img 
      v-show="isShow" 
      :src="imgUrl+'hiphop/save.png'" 
      class="press"
    >
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      audioUrl: BASE_URL + 'audio/mp3/',
      mImg: null,
      isShow: false,
      //微信分享
      wxShareInfo: {
        title: '我在携程未来旅行空间站，高清硬照求围观！',
        desc: '4月5日-7日，苏州站邀你体验',
        imgUrl: BASE_URL + 'image/xiecheng/hiphopicon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '携程旅行'
  },
  mounted() {
    this.handleWechatShare()
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    this.playAudio()
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
      let that = this
      getInfoById(id)
        .then(res => {
          that.mImg = res.image
          that.isShow = true
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
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.warp {
  width: 100%;
  min-height: 100%;
  background-image: url('@{imgUrl}/hiphop/bg.jpg');
  background-size: 100% 100%;
  background-position: center top;
  background-repeat: no-repeat;
  text-align: center;
  position: relative;
  #mbtn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    z-index: 9999;
  }
  .mplay {
    animation: mycir 2s linear infinite;
  }
  .top {
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .title1 {
      z-index: 9;
      position: relative;
    }
    .title2 {
      z-index: 999;
      position: absolute;
      top: 0;
      left: 0;
      animation: twinkle 0.4s linear infinite alternate;
    }
  }
  .main {
    width: 90%;
    margin: 0 auto;
    position: relative;
    text-align: center;
    margin-top: -13%;
    .jpgbg {
      width: 100%;
    }
    .photo {
      width: 60.6vw;
      position: absolute;
      top: 6%;
      left: 14.2vw;
      animation: twinkle 0.6s linear;
    }
    .cloud {
      width: 25vw;
      left: -17%;
      top: 4%;
      animation: around 1s linear infinite alternate;
    }
    .jian {
      width: 18.5vw;
      right: -8.3%;
      top: 4%;
      z-index: 99999;
    }
    .guang {
      width: 18.5vw;
      right: -8.3%;
      top: 4%;
      animation: twinkle 0.7s linear infinite alternate;
    }
  }
  .press {
    width: 61%;
    z-index: 99;
    margin-top: -10%;
    margin-bottom: 7%;
    position: relative;
    animation: updown 0.8s linear infinite alternate;
  }

  .cloud,
  .jian,
  .guang {
    position: absolute;
    z-index: 9999;
  }
}
// 闪烁
@keyframes twinkle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// 左右运动
@keyframes around {
  0% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}
// 上下运动
@keyframes updown {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}
// 晃动
@keyframes shake {
  0% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
</style>


