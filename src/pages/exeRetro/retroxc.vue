<template>
  <div 
    id="warp" 
    class="retro-content"
  >
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    >
      <source :src="audioUrl+'oldbgm.mp3'">
    </audio>
    <img 
      id="mbtn" 
      :src="imgUrl+'kaide/yinyue.png'" 
      class="mplay" 
      @click="playOrNot"
    >
    <img 
      id="mImg" 
      :class="shake?noshake:hasshake" 
      :src="mImg" 
      class="photo"
    >
    <img 
      v-show="noteShow" 
      :src="imgUrl+'retro/note.png'" 
      class="note"
    >
    <img 
      v-show="isshow" 
      :src="imgUrl+'retro/save.png'" 
      class="press"
    >
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
// 'http://o9xrbl1oc.bkt.clouddn.com/1007/image/gamexchfg_774_269_1492930592731.jpg'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      audioUrl: BASE_URL + 'audio/mp3/',
      mImg: null,
      isshow: false,
      noteShow: true,
      shake: true,
      noshake: 'noshake',
      hasshake: 'hasshake',
      //微信分享
      wxShareInfo: {
        title: '我在携程未来旅行空间站，高清硬照求围观！',
        desc: '4月5日-7日，苏州站邀你体验',
        imgUrl: BASE_URL + 'image/xiecheng/retroicon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '携程旅行'
  },
  created() {
    this.getInfoById()
  },
  mounted() {
    this.handleWechatShare()
    this.playAudio()
    this.initShack()
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var warp = document.getElementById('warp')
    warp.style.minHeight = h + 'px'
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
    initShack() {
      var last_update = '',
        x,
        y,
        z,
        last_x,
        last_y,
        last_z = 0,
        SHAKE_THRESHOLD = 3000,
        that = this
      if (window.DeviceMotionEvent) {
        // 移动浏览器支持运动传感事件
        window.addEventListener('devicemotion', deviceMotionHandler, false)
      } else {
        // 移动浏览器不支持运动传感事件
        alert('移动浏览器不支持运动传感事件')
      }
      function deviceMotionHandler(eventData) {
        // 获取含重力的加速度
        var acceleration = eventData.accelerationIncludingGravity
        // 获取当前时间
        var curTime = new Date().getTime()
        var diffTime = curTime - last_update
        // 固定时间段
        if (diffTime > 10) {
          last_update = curTime
          x = acceleration.x
          y = acceleration.y
          z = acceleration.z
          var speed =
            Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000
          if (speed > SHAKE_THRESHOLD) {
            //TODO:在此处可以实现摇一摇之后所要进行的数据逻辑操作
            that.noteShow = false
            that.shake = false
          }
          last_x = x
          last_y = y
          last_z = z
        }
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      let that = this
      getInfoById(id)
        .then(res => {
          that.mImg = res.image
          that.isshow = true
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
      console.log('111112222223333')
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
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/';
html,
body {
  overflow-x: hidden;
  text-align: center;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  width: 100%;
  height: 100%;
}
.retro-content {
  width: 100%;
  text-align: center;
  position: relative;
  margin: 0 auto;
  background: url('@{imgUrl}retro/bg.jpg') center center/100% 100% no-repeat;
  font-size: 0;
  .photo {
    margin: 0 auto;
    width: 66.5%;
    height: 66%;
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
  .hasshake {
    animation: twinkle 0.8s linear;
  }
  .noshake {
    animation: twinkle 10s linear;
  }
  .press {
    position: absolute;
    left: 50%;
    bottom: 1%;
    transform: translate(-50%, 0);
    z-index: 99999;
    width: 62.5%;
    margin: 4% auto;
    animation: updown 0.8s linear infinite alternate;
  }
  .note {
    position: absolute;
    width: 60%;
    left: 20%;
    top: 55%;
    animation: shake 0.8s linear infinite alternate;
  }
}
#mbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  z-index: 99999999;
}
.mplay {
  animation: mycir 2s linear infinite;
}
// 上下运动
@keyframes updown {
  0% {
    transform: translate(-50%, -5px);
  }
  100% {
    transform: translate(-50%, 5px);
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
// 闪烁
@keyframes twinkle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
</style>


