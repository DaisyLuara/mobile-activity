<template>
  <div class="animal-content">
      <audio id="voice" autobuffer autoloop loop autoplay hidden>
				<source :src="audioUrl+'xiha.mp3'">
			</audio>
		<img class="bg2" :src="imgUrl+'kaide/contentback.jpg'">
		<div class="main">
			<img class="title" :src="imgUrl+'kaide_animal/title.png'">
			<img id="mbtn" class="mplay" :src="imgUrl+'kaide/yinyue.png'" @click="playOrNot" />
			<div class="kuang">
				<img class="kbg1" :src="imgUrl+'kaide/1.png'" />
				<img class="kbg2" :src="imgUrl+'kaide/2.png'" />
				<img class="kbg3" :src="imgUrl+'kaide/3.png'" />
				<img class="kbg4" :src="imgUrl+'kaide/4.png'" />
				<img class="kmask" :src="imgUrl+'kaide/back2.png'">
				<img class="kbg1 boss1" :src="imgUrl+'kaide/rabbit2.png'" />
				<img class="kbg2 boss2" :src="imgUrl+'kaide/cat2.png'" />
				<img class="kbg3 boss3" :src="imgUrl+'kaide/dog2.png'" />
				<img class="kbg4 boss4" :src="imgUrl+'kaide_animal/text3.png'" />
				<img class="text1" :src="imgUrl+'kaide/text1.png'">
				<img class="text2" :src="imgUrl+'kaide/text2.png'">
			</div>
			<div class="picture">
				<img class="imgbg" :src="imgUrl+'kaide/frame.png'">
				<img id="mImg" class="mImg" :src="mImg">
			</div>
			<img class="press" :src="imgUrl+'kaide/prompt.png'" v-show="press">
			<a :href="xlink">
				<img class="xinglink" :src="imgUrl+'kaide/sponsor.png?111'">
			</a>
		</div>
	<wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      audioUrl: BASE_URL + 'audio/mp3/',
      xlink: 'http://m.jingfree.com/marketing/brochure?trace_id=nakvx5',
      mImg: null,
      press: false,
      //微信分享
      wxShareInfoValue: {
        title: '星视度有嘻哈',
        desc: '你就是嘻哈王者',
        imgUrl: BASE_URL + 'image/kaide_animal/icon.png'
      }
    }
  },
  beforeCreate() {
    document.title = '星视度有嘻哈'
  },
  created() {
    this.getInfoById()
  },
  mounted() {
    this.playAudio()
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: function() {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      let that = this
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.mImg = res.image
          that.press = true
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
  }
}
</script>
<style lang="less" scoped>
html,
body {
  text-align: center;
  overflow-x: hidden;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
// 水平居中
.horizon {
  left: 50%;
  transform: translateX(-50%);
}
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes updown {
  0% {
    transform: translate(0, -5px);
  }
  100% {
    transform: translate(0, 5px);
  }
}
@keyframes stext {
  0% {
    transform: scale(0, 0);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes toright {
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes toleft {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
.animal-content {
  width: 100%;
  min-height: 600px;
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  position: relative;
  font-size: 0;
  overflow-x: hidden;

  .xinglink {
    width: 30%;
    margin: 0 auto;
    position: absolute;
    bottom: 20px;
    .horizon;
  }
}

.logo {
  position: absolute;
  bottom: 7.6%;
  width: 29%;
  .horizon;
}

.bg2 {
  width: 100%;
}
.main {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  .title {
    position: relative;
    width: 90%;
    padding: 5% 0 1% 0;
    z-index: 999;
  }
  .xinglink {
    width: 30%;
    margin: 0 auto;
    position: absolute;
    bottom: -25px;
    z-index: 9999;
    .horizon;
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
  .kuang {
    position: relative;
    z-index: 9;
    margin-bottom: -2%;
    margin-top: -5%;
    .kbg1,
    .kbg2,
    .kbg3,
    .kbg4 {
      position: absolute;
      z-index: 9;
    }
    .kmask {
      width: 100%;
      position: relative;
      z-index: 999;
    }
    .kbg1 {
      width: 43.7%;
      left: 7.9%;
      top: 10.5%;
    }
    .kbg2 {
      width: 37.6%;
      right: 8%;
      top: 10.5%;
    }
    .kbg3 {
      width: 41.6%;
      left: 7.9%;
      bottom: 12.6%;
    }
    .kbg4 {
      width: 48%;
      right: 8%;
      bottom: 12.6%;
    }
    .boss1,
    .boss2,
    .boss3,
    .boss4 {
      z-index: 99;
    }
    .boss1 {
      width: 19.7%;
      margin-top: 2%;
      margin-left: 5%;
      transform: translate(-150%, 0);
      animation: toright 0.8s linear forwards;
    }
    .boss2 {
      width: 21.2%;
      margin-top: 2%;
      margin-right: 0%;
      transform: translate(150%, 0);
      animation: toleft 0.6s 0.2s linear forwards;
    }
    .boss3 {
      width: 13.8%;
      margin-top: 2%;
      margin-left: 4%;
      transform: translate(-150%, 0);
      animation: toright 0.6s 0.4s linear forwards;
    }
    .boss4 {
      width: 34.6%;
      right: 12%;
      bottom: 22%;
      transform: translate(150%, 0);
      animation: toleft 0.6s 0.6s linear forwards;
    }
    .text1,
    .text2 {
      position: absolute;
      z-index: 9999;
      transform: scale(0, 0);
    }
    .text1 {
      width: 33.5%;
      top: 33%;
      right: 24%;
      animation: stext 0.6s 0.8s linear forwards;
    }
    .text2 {
      width: 21.9%;
      bottom: 23%;
      left: 28%;
      animation: stext 0.6s 0.8s linear forwards;
    }
  }
  .picture {
    position: relative;
    z-index: 99;
    width: 100%;
    text-align: center;
    .imgbg {
      width: 93.5%;
      margin: 0 auto;
    }
    .mImg {
      position: absolute;
      z-index: 999;
      top: 2.7%;
      width: 79%;
      margin-left: 0.7%;
      .horizon;
    }
  }
  .press {
    width: 70.4%;
    margin: 0 auto;
    padding-top: 2%;
    animation: updown 0.7s ease-in-out infinite alternate;
  }
}
</style>
