<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      v-show="uploadImgYellow"
      class="upload">
      <input 
        type="file" 
        accept="image/*"
        class="camera"
        @change="toUpLoad">
      <img
        v-show="uploadImgYellow"
        :src="base +'icon_n.png'">
    </div>
    <div 
      v-show="gonglueImg"
      class="gonglue"
      @click="go()">
      <img
        :src="base +'gonglue2.png'">
    </div>
    <!-- 音乐icon -->
    <div 
      class="music" 
      @click="playOrNot()">
      <img
        :src="base +'bg.png'"
        class="img1">
      <img
        id="mbtn"
        :src="base +'music.png'"
        class="img2">
    </div>
    <!-- audio -->
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden>
      <source :src="base+'yqh.mp3'">
    </audio>
    <!-- 箭头图片 -->
    <div 
      v-show="jiantou1"
      class="tab"
      @click="tab()"/>
    <div 
      v-show="jiantou2"
      class="tab2"
      @click="tab2()"/>
    <img
      v-show="jiantou1"
      :src="base + 'arrow1.png'"
      class="pointer">
    <img
      v-show="jiantou2"
      :src="base + 'arrow2.png'"
      class="pointer2"> 
    <!-- 底部文字 -->
    <img
      v-show="word"
      :src="base + 'font.png'"
      class="font">
    <!-- 动画 -->
    <div 
      id="anim"
      class="page anim"
    />
  </div>
</template>
<script>
import lottie from 'lottie-web'
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  getImage
} from 'services'
import $ from 'jquery'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/wxc_letter/',
      userId: null,
      icon: 'icon5',
      pointer: {
        start: null,
        move: null,
        end: null
      },
      uploadImgYellow: false,
      gonglueImg: false,
      jiantou1: true,
      jiantou2: false,
      word: true,
      arrIndex: 0,
      framesArr: [
        [0, 150],
        [151, 300],
        [301, 454],
        [455, 614],
        [615, 846],
        [847, 1001],
        [1002, 1167],
        [1168, 1324]
      ],
      framesArr2: [
        [0, 150],
        [170, 300],
        [319, 454],
        [476, 614],
        [643, 846],
        [873, 1001],
        [1038, 1167],
        [1183, 1324]
      ],
      //分享
      wxShareInfoValue: {
        title: '贵客齐聚，共赴好宴│11.23厦门万象城正式揭幕',
        desc: '敬致：永新豪觅。用心好物',
        link: process.env.AD_API+'/api/s/qYr' + window.location.search,
        imgUrl: 'https://cdn.exe666.com/fe/image/wxc_letter/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      document.querySelector('.anim').style.marginTop = '0%'
    }
    this.doAnim()
    this.playAudio()
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    go() {
      window.location.href = process.env.AD_API+'/api/s/xvr'
    },
    doAnim() {
      const el = document.getElementById('anim')
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: false,
        assetsPath: that.base + 'data8/images/',
        path: that.base + 'data7/data.json'
      })
      this.animation = anim
      anim.addEventListener('DOMLoaded', function() {
        // 播放0-100帧动画,第一屏动画
        anim.playSegments([0, 100], true)
      })
    },
    toLeft() {
      this.jiantou1 = true
      this.uploadImgYellow = false
      // 向左滑
      this.animation.playSegments(this.framesArr2[this.arrIndex - 1], true)
      this.arrIndex--
      if (this.arrIndex == 0) {
        this.jiantou2 = false
      }
      if (this.arrIndex == this.framesArr2.length - 2) {
        this.uploadImgYellow = true
        this.gonglueImg = false
      }
    },
    tab() {
      this.toRight()
    },
    tab2() {
      this.toLeft()
    },
    toRight() {
      this.jiantou2 = true
      this.uploadImgYellow = false
      // 向右滑
      this.animation.playSegments(this.framesArr[this.arrIndex + 1], true)
      this.arrIndex++
      if (this.arrIndex >= this.framesArr.length - 1) {
        this.jiantou1 = false
        this.gonglueImg = true
      }
      if (this.arrIndex >= this.framesArr.length - 2) {
        this.uploadImgYellow = true
      }
    },
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
      }
    },
    toUpLoad(event) {
      let formData = new FormData()
      formData.append('image', event.target.files[0])
      formData.append('type', 'avatar')
      getImage(formData)
        .then(res => {
          console.log(res)
          alert('头像上传成功')
          this.icon = 'icon2'
        })
        .catch(err => {
          alert('头像上传失败！请重新上传，只支持jpg,png格式')
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
      var voice = document.getElementById('voice')
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
@imgUrl: 'https://cdn.exe666.com/fe/image/wxc_letter/';
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  max-width: 750px;
  overflow: hidden;
  position: relative;
  .anim {
    width: 100%;
  }
  .swiper {
    position: relative;
  }
  .page {
    position: relative;
    z-index: 0;
  }
  .logo {
    position: absolute;
    top: 6%;
    left: 5%;
    width: 33.5%;
    z-index: 99;
  }
  .upload {
    display: inline-block;
    width: 13%;
    position: absolute;
    top: 12%;
    right: 5%;
    z-index: 999;
    animation: scale 2s linear infinite alternate;
    img {
      position: relative;
      z-index: 0;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      opacity: 0;
    }
  }
  .gonglue {
    display: inline-block;
    width: 13%;
    position: absolute;
    top: 24%;
    right: 5%;
    z-index: 999;
    animation: scale 2s linear infinite alternate;
    img {
      position: relative;
      z-index: 0;
    }
  }
  .music {
    display: block;
    width: 8%;
    position: absolute;
    top: 5%;
    right: 8%;
    z-index: 999;
    .img1 {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .img2 {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
  }
  .mplay {
    animation: mycir 2s linear infinite;
  }
  .font {
    width: 32%;
    position: absolute;
    // top: 80%;
    bottom: 5%;
    right: 5%;
    z-index: 99;
  }
  .tab {
    width: 30%;
    height: 30%;
    position: absolute;
    top: 35%;
    right: 0%;
    z-index: 1000;
  }
  .tab2 {
    width: 30%;
    height: 30%;
    position: absolute;
    top: 35%;
    left: 0%;
    z-index: 1000;
  }
  .pointer {
    width: 5%;
    position: absolute;
    top: 50%;
    right: 2%;
    animation: pointer 0.8s linear infinite alternate;
    z-index: 999;
  }
  .pointer2 {
    width: 5%;
    position: absolute;
    top: 50%;
    left: 2%;
    animation: pointer2 0.8s linear infinite alternate;
    z-index: 999;
  }
}
@keyframes pointer {
  0% {
    transform: translate(5px, -50%);
  }
  100% {
    transform: translate(-5px, -50%);
  }
}
@keyframes pointer2 {
  0% {
    transform: translate(-5px, -50%);
  }
  100% {
    transform: translate(5px, -50%);
  }
}
@keyframes scale {
  from {
    transform: scale(0.8, 0.8);
  }
  50% {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.8, 0.8);
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


