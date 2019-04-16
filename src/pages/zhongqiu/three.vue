<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base+'frame.png'"
        class="cover"
      >
      <div
        :class="{audio:true,circle:circle}"
        @click="playOrNot"
      >
        <img :src="base + music + '.png'">
        <audio
          id="voice"
          loop
          autobuffer
          autoplay
          hidden
        >
          <source :src="origin + 'mp3/'+m_name[m_num]+'.mp3'">
        </audio>
      </div>
      <div
        v-show="vshow"
        class="showing"
      >
        <video
          id="video"
          webkit-playsinline="true"
          playsinline="true"
          x-webkit-airplay="true"
          x5-video-player-type="h5"
          preload="auto"
          qb-video-float-mode="true"
          style="width: 100%; height:100%; position: absolute; left: 0px; top: 0px;"
        >
          <source
            :src="video"
            type="video/mp4"
          >
          您的浏览器不支持video标签.
        </video>
      </div>
      <img
        v-show="bgshow"
        :src="base + 'vbg.png'+this.$qiniuCompress()"
        class="vbg"
      >
      <div class="playing">
        <a
          v-show="Boolean(video)"
          class="vbtn"
          @click="playVideo"
        >
          <img :src="base + v_status+'.png'">
        </a>
      </div>
    </div>
    <div class="task-group">
      <img
        :src="origin + 'proj/' + task.left + '.png?1212'"
        class="left"
      >
      <img
        :src="origin +'proj/' + task.right + '.png?1212'"
        class="right"
      >
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  $wechat,
  wechatShareTrack,
  getWxUserInfo,
  createGame,
  userGame,
  getInfoById,
  getGame
} from 'services'
import { onlyWechatShare } from '@/mixins/onlyWechatShare'
const IMG_SERVER = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      origin: IMG_SERVER + '/image/zhongqiu/',
      base: IMG_SERVER + '/image/zhongqiu/3/',
      deUrl:
        'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
      userId: null,
      task: {
        left: '11',
        right: '22'
      },
      m_num: Math.round(Math.random() * 4),
      m_name: ['shaonv', 'dashu', 'gaoguai', 'guisu', 'jiqiqi'],
      music: 'music_open',
      circle: true,
      vshow: false,
      v_status: 'play',
      video: null,
      belong: null,
      //'http://cdn.exe666.com/1007/video/WhoTakeMoonCake_235_96_1492926959345.mp4',
      bgshow: true,
      //微信分享
      wxShareInfoValue: {
        title: '中秋快乐 ',
        desc: '月饼被谁吃了',
        link: process.env.AD_API+'/api/s/1wR' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/image/zhongqiu/3/share.png',
      }
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
    this.playAudio()

  },
  methods: {
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
        this.getInfoById()
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.video = res.url
          this.belong = res.belong
          this.createGame(this.belong, this.userId)
          this.userGame()
        })
        .catch(err => {
          console.log(err)
        })
    },
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          this.getGame(userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.deUrl,
        qiniu_id: this.$route.query.id,
        score: 100
      }
      userGame(args, this.userId)
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame(userId) {
      let that = this
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list, userId) {
      let data = list
      data.map(r => {
        if (r.belong === 'MoonCakeFactory') {
          this.task.left = '1'
        }
        if (r.belong === 'GroceryShop') {
          this.task.right = '2'
        }
      })
    },
    playVideo() {
      this.vshow = true
      let video = document.getElementById('video')
      let that = this
      that.bgshow = false
      video.load()
      video.play()

      video.onplay = function () {
        video.currentTime = 0
        that.vshow = true
        that.v_status = 'pause'
      }
      video.onpause = function () {
        that.bgshow = true
        that.vshow = false
        that.v_status = 'play'
      }
      video.onended = function () {
        that.bgshow = true
        that.vshow = false
        that.v_status = 'play'
      }
      if (that.v_status == 'pause') {
        video.pause()
        return
      }
    },
    playAudio() {
      let voice = document.getElementById('voice')
      let that = this
      if (!voice) {
        return
      }
      //调用 <audio> 元素提供的方法 play()
      voice.play()
      if (voice.paused) {
        that.music = 'music_close'
        that.circle = false
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
            function () {
              voice.play()
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', function () {
            voice.play()
          })
          document.attachEvent('onWeixinJSBridgeReady', function () {
            voice.play()
          })
        }
      }

      //voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
      var voiceStatu = true
      //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
      document.addEventListener(
        'touchstart',
        function (e) {
          if (voiceStatu) {
            voice.play()
            voiceStatu = false
          }
        },
        false
      )
      voice.onplay = function () {
        that.music = 'music_open'
        that.circle = true
      }
      voice.onpause = function () {
        that.music = 'music_close'
        that.circle = false
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
@base: "http://cdn.exe666.com/image/zhongqiu/3/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #281765;
  position: relative;
  background-color: #69339b;
  .main {
    position: relative;
    .cover {
      width: 100%;
      position: relative;
      z-index: 999;
    }
    .audio {
      position: absolute;
      top: 16%;
      left: 2.27%;
      width: 8%;
      z-index: 9999;
    }
    .circle {
      animation: circle 1s linear infinite;
    }
    .showing {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: 100% auto;
      }
    }
    .vbg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
    }
    .playing {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99;
      background: rgba(0, 0, 0, 0.2);
      .vbtn {
        width: 80px;
        height: 80px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .task-group {
    width: 100%;
    overflow: hidden;
    margin-top: 5%;
    margin-bottom: 10%;
    img {
      width: 46%;
    }
    .left {
      float: left;
      margin-left: 3%;
    }
    .right {
      float: right;
      margin-right: 3%;
    }
  }
}
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


