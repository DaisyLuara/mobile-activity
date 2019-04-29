<template>
  <div 
    id="content" 
    class="tel-content"
  >
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    >
      <source :src="audioUrl+'/spring.mp3'">
    </audio>
    <img 
      id="mbtn" 
      :src="imgUrl+'kaide/yinyue.png'" 
      class="mplay" 
      @click="playOrNot"
    >
    <div class="telform">
      <p class="msg">
        {{ errMsg }}
      </p>
      <input 
        id="tel" 
        type="tel" 
        maxlength="11" 
        placeholder="请输入手机号"
      >
      <input 
        id="button" 
        type="button" 
        @click="redirectToPhoto"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      audioUrl: BASE_URL + 'audio/mp3',
      errMsg: null,
      mobile: null,
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
    document.title = '狗年大吉'
  },
  mounted() {
    this.handleWechatShare()
    this.playAudio()
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var content = document.getElementById('content')
    content.style.minHeight = h + 'px'
    if (window.localStorage.getItem('springtel')) {
      this.linkToPhoto(window.localStorage.getItem('springtel'))
    }
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
    redirectToPhoto() {
      let input = document.getElementById('tel')
      let id = this.$route.query.id
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!this.$route.query.id) {
        alert('没有照片信息，请重新扫描二维码!')
        return
      }
      if (!reg.test(input.value)) {
        alert('请输入11位有效的手机号码')
        return
      }
      if (window.localStorage) {
        window.localStorage.setItem('springtel', input.value)
      }
      this.linkToPhoto(input.value)
    },
    linkToPhoto(mobile) {
      this.$router.push({
        path: 'spring/result?id=' + this.$route.query.id + '&mobile=' + mobile
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
.tel-content {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-image: url('@{imgUrl}indextitle.png'),
    url('@{imgUrl}indexback.jpg');
  background-repeat: no-repeat, no-repeat;
  background-size: 75% auto, 100% 100%;
  background-position: center 20px, center top;
  .telform {
    width: 57%;
    text-align: center;
    margin: 0 auto;
    margin-top: 90%;
    .msg {
      font-size: 12px;
      line-height: 28px;
      letter-spacing: 2px;
      color: #ffefaf;
      font-family: '楷体';
      width: 100%;
      height: 28px;
      margin-top: 10px;
    }
    #tel {
      text-align: center;
      margin-bottom: 15px;
      height: 30px;
      color: #686868;
      letter-spacing: 2px;
      font-size: 14px;
      line-height: 30px;
      width: 100%;
      background: url('@{imgUrl}input.png') center center/100% 100% no-repeat;
    }
    #button {
      width: 100%;
      height: 30px;
      color: #f5845c;
      letter-spacing: 2px;
      font-size: 14px;
      line-height: 30px;
      background: url('@{imgUrl}button.png') center center/100% 100% no-repeat;
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


