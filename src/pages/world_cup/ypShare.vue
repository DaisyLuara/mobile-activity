<template>
    <div 
      class="content" 
      :style="style.root">
       <audio id="voice" autobuffer autoloop loop autoplay hidden>
				<source :src="audioUrl">
			</audio>
      <div class="main">
        <!-- <img class="bg" :src="imgServerUrl + '/pages/yp/bg1.png'"> -->
        <div class="title">
          <img class="tit1" :src="imgServerUrl + '/pages/yp/tit1.png'">
          <img class="tit2" :src="imgServerUrl + '/pages/yp/tit2.png'">
          <img class="tit3" :src="imgServerUrl + '/pages/yp/tit3.png'">
        </div>
        <img class="mplay music" id="mbtn" :src="imgServerUrl + '/pages/yp/music.png'"  @click="playOrNot()">
        <img class="ball1" :src="imgServerUrl + '/pages/yp/ball.png'">
        <img class="ball2" :src="imgServerUrl + '/pages/yp/ball.png'">
        <div class="photo-area">
          <img class="kuang" :src="imgServerUrl + '/pages/yp/kuang3.png'">
          <img class="kuang2" :src="imgServerUrl + '/pages/yp/kuang4.png'">
          <img class="save" :src="imgServerUrl + '/pages/yp/save.png'">
          <img  class="photo" :src="resultImgUrl" alt=""/>
          <!-- <img class="photo" :src="imgServerUrl + '/pages/yp/111.png'"> -->
        </div>
        <!-- <div class="ad">
          <img :src="imgServerUrl + '/pages/yp/ad.png'">
        </div> -->
      </div>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
</template>
<script>
const wih = window.innerHeight
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
const URL = 'http://h5.xingstation.com'
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
        title: '瞬感世界杯，冠军我来猜',
        desc: '...',
        link:
          window.location.origin +
          '/marketing/yp_share?id=' +
          this.$route.query.id,
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/yapei_share_icon.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = ''
  },
  created() {},
  mounted() {
    this.getImageById()
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    },
    playAudio() {
      let mbtn = document.getElementById('content')
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
  },
  components: {
    WxShare
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
  .music {
    width: 10%;
    position: absolute;
    left: 9%;
    z-index: 7;
    top: 14%;
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
    background: url('@{imgUrl}bg1.png') center top / 100% 100% no-repeat;
    // .bg {
    //   width: 100%;
    //   z-index: 1;
    //   position: relative;
    // }
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
      top: 1%;
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
        left: 14%;
        top: 29%;
        animation: titMove 1s linear infinite;
      }
      .tit3 {
        width: 54%;
        position: absolute;
        left: 25%;
        top: 0;
        // animation: titMove 1s linear infinite;
      }
    }
    .ball1 {
      position: absolute;
      left: 4%;
      top: 63%;
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
      top: 17.3%;
      width: 100%;
      text-align: center;
      z-index: 4;
      .kuang2 {
        position: absolute;
        left: 11%;
        top: 0;
        opacity: 0;
        animation: opacityKuang 2s linear infinite alternate;
      }
      .save {
        width: 14%;
        position: absolute;
        left: 7%;
        top: 9%;
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
      top: 85%;
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
