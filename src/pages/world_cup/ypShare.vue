<template>
  <!-- isAbandoned -->
  <div 
    :style="style.root"
    class="content"
  >
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    >
      <source :src="audioUrl">
    </audio>
    <div 
      class="main"
    >
      <img 
        :src="imgServerUrl + '/pages/yp/bg4.png'"
        class="bg"
      >
      <div 
        class="title"
      >
        <img 
          :src="imgServerUrl + '/pages/yp/tit1.png'"
          class="tit1"
        >
        <img 
          :src="imgServerUrl + '/pages/yp/tit2.png'"
          class="tit2"
        >
        <img 
          :src="imgServerUrl + '/pages/yp/tit4.png'"
          class="tit3"
        >
      </div>
      <img 
        id="mbtn" 
        :src="imgServerUrl + '/pages/yp/music.png'" 
        class="mplay"  
        @click="playOrNot()"
      >
      <img 
        :src="imgServerUrl + '/pages/yp/ball.png'"
        class="ball1"
      >
      <img 
        :src="imgServerUrl + '/pages/yp/ball.png'"
        class="ball2"
      >
      <div 
        class="photo-area"
      >
        <img 
          :src="imgServerUrl + '/pages/yp/kuang3.png'"
          class="kuang"
        >
        <img 
          :src="imgServerUrl + '/pages/yp/save.png'"
          class="save"
        >
        <img 
          :src="resultImgUrl"
          alt=""
          class="photo"
        >
      </div>
      <div 
        class="ad"
      >
        <img 
          :src="imgServerUrl + '/pages/yp/ad.png'"
        >
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
const wih = window.innerHeight
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      audioUrl: 'http://122.112.236.76/mp3/motion.mp3',
      resultImgUrl: '',
      shade: false,
      style: {
        root: {
          height: wih + 'px'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: '瞬感世界杯，冠军我来猜\n享自由，不放纵',
        desc: '...',
        link:
          window.location.origin +
          '/marketing/yp_share?id=' +
          this.$route.query.id,
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/yp_share_icon.jpg',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        link: this.wxShareInfoValue.link,
        success: () => {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  },
  beforeCreate() {
    document.title = ''
  },
  created() {
    this.getImageById()
  },
  mounted() {
    this.playAudio()
    this.handleShare()
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    playAudio() {
      let mbtn = document.getElementById('mbtn')
      let voice = document.getElementById('voice')
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
img {
  width: 100%;
}
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/yp/';
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  #mbtn {
    width: 10%;
    position: absolute;
    left: 9%;
    z-index: 7;
    top: 20%;
  }
  .mplay {
    animation: mycir 2s linear infinite;
  }
  .main {
    position: relative;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    .shade {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.8;
      position: absolute;
      z-index: 8;
      text-align: center;
      .hand-title {
        width: 80%;
        position: fixed;
        left: 50%;
        top: 15%;
        transform: translate(-50%, -50%);
      }
      .hand {
        width: 18%;
        position: fixed;
        right: 10%;
        top: 1%;
        animation: point 0.8s linear infinite alternate;
      }
    }
    .title {
      width: 100%;
      height: 15%;
      position: absolute;
      left: 0;
      top: 2%;
      z-index: 4;
      text-align: center;
      padding: 1%;
      img {
        width: 92%;
      }
      .tit1 {
        width: 96%;
        position: absolute;
        left: 3%;
        top: 0;
        animation: titMove 2s linear infinite;
      }
      .tit2 {
        width: 74%;
        position: absolute;
        left: 13%;
        top: 32%;
        animation: titMove 1s linear infinite;
      }
      .tit3 {
        width: 54%;
        position: absolute;
        left: 25%;
        top: -2%;
      }
    }
    .ball1 {
      position: absolute;
      left: 4%;
      top: 80%;
      z-index: 4;
      width: 15%;
      animation: ballMove 1s ease-out infinite alternate;
    }
    .ball2 {
      position: absolute;
      right: -7%;
      top: 28%;
      z-index: 4;
      width: 22%;
      animation: ballMove 1.5s ease-out infinite alternate;
    }
    .photo-area {
      position: absolute;
      left: 0;
      top: 20.3%;
      width: 100%;
      text-align: center;
      z-index: 4;
      .save {
        width: 14%;
        position: absolute;
        left: 7%;
        top: 14%;
        transform: translate(0, -50%);
        animation: saveMove 1s ease-out infinite alternate;
      }
      .photo {
        position: absolute;
        left: 28%;
        top: 2%;
        width: 57%;
      }
      img {
        width: 78%;
      }
    }
    .ad {
      position: absolute;
      left: 0;
      top: 96%;
      z-index: 4;
      text-align: center;
      img {
        width: 90%;
        margin-left: 5.5%;
      }
    }
  }
}
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
//动画
@keyframes point {
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}
@keyframes titMove {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes saveMove {
  0% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes ballMove {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes opacityKuang {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
