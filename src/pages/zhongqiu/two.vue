<template>
  <div
    :style="style.root"
    class="content"
  >
    <div
      v-show="Boolean(share_audio)"
      :class="{audio:true,circle:circle}"
      @click="playOrNot"
    >
      <img :src="origin + '/3/' + music + '.png'">
      <audio
        id="vshare"
        loop
        autobuffer
        autoplay
        hidden
      >
        <source :src="origin + 'mp3/' + share_audio + '.mp3'">
      </audio>
    </div>
    <div class="one">
      <img
        :src="base+'bg1.png'"
        class="bg"
      >
      <img
        :src="base+'ggift.png'"
        class="gift"
      >
      <img
        :src="origin + 'people/people' + people_type + '.png'"
        class="people"
      >
      <span class="text">{{ text }}</span>
      <a
        class="btn"
        @click="checkPop"
      >
        <img :src="base + tobtn + '.png'">
      </a>
      <div
        v-show="popUp"
        class="pop"
      >
        <ul>
          <li
            v-for="item in 6"
            :key="item.id"
          >
            <div v-if="item==5" />
            <div
              v-else
              class="sound-icon"
            >
              <a
                class="iconbox"
                @click="playVoice(item)"
              >
                <img
                  :src="base + 'icon_mask.png'"
                  :class="{icon_mask:true,active:item==ins}"
                >
                <img
                  :src="base + 'icon' + item + '.png?111'"
                  class="icon"
                >
                <label>
                  <img :src="base + 'iconbg.png?111'">
                  <span>{{ audio.text[item] }}</span>
                </label>
              </a>
            </div>
          </li>
        </ul>
        <div :class="{voices:true,playvoice:startvoice}">
          <audio
            id="voice"
            autobuffer
            autoplay
          >
            <source src="">
          </audio>
        </div>
        <a
          class="sub"
          @click="toSub"
        >
          <img :src="base+'sub.png'">
        </a>
      </div>
      <div
        v-show="shareNote"
        class="share-note"
        @click="()=>{shareNote=false;}"
      >
        <img :src="base+'share_note.png'">
      </div>
    </div>
    <div class="two">
      <img
        :src="base+'bg2.png'"
        class="bg"
      >
      <img
        :src="base + 'pic.png'"
        class="frame"
      >
      <img
        :src="photo"
        class="photo"
      >
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
  getGame,
  getParamsMap,
  getParameter,
  setParameter
} from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMG_SERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      origin: IMG_SERVER + '/image/zhongqiu/',
      base: IMG_SERVER + '/image/zhongqiu/2/',
      deUrl:
        'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
      userId: null,
      headImgUrl: null,
      mask: false,
      startvoice: false,
      people_type: null,
      text: null,
      cake_type_a: null,
      cake_type_b: null,
      ins: 0,
      circle: true,
      share_audio: null,
      audioUrl: null,
      shareNote: false,
      popUp: false,
      music: 'music_open',
      audio: {
        text: ['', '萝莉', '大叔', '搞怪', '龟速', '', '机器'],
        url: ['', 'shaonv', 'dashu', 'gaoguai', 'guisu', '', 'jiqiqi']
      },
      task: {
        left: '11',
        right: '33'
      },
      photo: null,
      tobtn: 'btn1',
      //微信分享
      wxShareInfoValue: {
        title: '中秋快乐',
        desc: '采购中秋月饼,送吃送祝福',
        link: 'http://papi.xingstation.com/api/s/Z6J' + window.location.search,
        imgUrl: 'http://cdn.xingstation.com/image/zhongqiu/2/share.png',
      }
    }
  },
  watch: {
    parms() {
      this.people_type = this.parms.people_type
      this.text = this.parms.cake_name
      this.share_audio = this.parms.share_audio
      this.cake_type_a = this.parms.cake_type_a
      this.cake_type_b = this.parms.cake_type_b
      this.playAudio()
      this.handlePost()
      this.createGame(this.belong, this.userId)
      this.userGame()
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
        this.createGame(this.belong, this.userId)
        this.userGame()
        // this.handlePost()
      }
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
        if (r.belong === 'WhoTakeMoonCake') {
          this.task.right = '3'
        }
      })
    },
    checkPop() {
      if (this.tobtn == 'share_btn') {
        this.shareNote = true
        return
      }
      this.popUp = true
    },
    handlePost() {
      let id = this.$route.query.id
      let url =
        `oid=563,213,387,229,427,220,544,475,435&belong=WhoTakeMoonCake&id=` +
        id +
        "&url={'cakeID':0,'cake_type_a':" +
        this.cake_type_a +
        ",'cake_type_b':" +
        this.cake_type_b +
        ",'people_type':" +
        this.people_type +
        '}&name&image&api=json'
      handleDataPost(url).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    playAudio() {
      let vshare = document.getElementById('vshare')
      let voice = document.getElementById('voice')
      let that = this
      if (!vshare) {
        return
      }
      //调用 <audio> 元素提供的方法 play()
      vshare.play()
      if (vshare.paused) {
        that.music = 'music_close'
        that.circle = false
      }
      //判斷 WeixinJSBridge 是否存在
      if (
        typeof WeixinJSBridge == 'object' &&
        typeof WeixinJSBridge.invoke == 'function'
      ) {
        vshare.play()
      } else {
        //監聽客户端抛出事件"WeixinJSBridgeReady"
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            function () {
              vshare.play()
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', function () {
            vshare.play()
          })
          document.attachEvent('onWeixinJSBridgeReady', function () {
            vshare.play()
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
            vshare.play()
            voiceStatu = false
          }
        },
        false
      )
      vshare.onplay = function () {
        that.music = 'music_open'
        that.circle = true
        that.voice.pause()
      }
      vshare.onpause = function () {
        that.music = 'music_close'
        that.circle = false
      }
    },
    playOrNot() {
      // 依據 audio 的 paused 属性返回音频是否已暂停來判斷播放還是暫停音频。
      let vshare = document.getElementById('vshare')
      if (vshare.paused) {
        vshare.play()
      } else {
        vshare.pause()
      }
    },
    playVoice(item) {
      this.ins = item
      let that = this
      this.audioUrl = this.audio.url[item]
      // 依據 audio 的 paused 属性返回音频是否已暂停來判斷播放還是暫停音频。
      let vshare = document.getElementById('vshare')
      vshare.pause()
      let voice = document.getElementById('voice')
      voice.src = this.origin + 'mp3/' + this.audio.url[item] + '.mp3'
      voice.currentTime = 0
      voice.play()
      voice.onplay = function () {
        that.startvoice = true
      }
      voice.onpause = function () {
        that.startvoice = false
      }
      voice.onended = function () {
        that.startvoice = false
      }
    },
    toSub() {
      this.popUp = false
      this.tobtn = 'share_btn'
      this.wxShareInfoValue.link = setParameter(
        'share_voice',
        encodeURIComponent(this.audioUrl)
      )
      let voice = document.getElementById('voice')
    }
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.xingstation.com/image/zhongqiu/2/";
/*声明 WebFont*/
@font-face {
  font-family: "huakang";
  src: url("http://cdn.xingstation.com/image/zhongqiu/font/huakang.ttf");
  src: url("http://cdn.xingstation.com/image/zhongqiu/font/huakang.eot"),
    url("http://cdn.xingstation.com/image/zhongqiu/font/huakang.woff"),
    url("http://cdn.xingstation.com/image/zhongqiu/font/huakang.ttf"),
    url("http://cdn.xingstation.com/image/zhongqiu/font/huakang.svg");
  font-weight: normal;
  font-style: normal;
}

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
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .audio {
    position: absolute;
    top: 1%;
    left: 2.27%;
    width: 8%;
    z-index: 9999;
  }
  .circle {
    animation: circle 1s linear infinite;
  }
  .one {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    z-index: 9;

    .gift {
      width: 73%;
      position: absolute;
      top: 25%;
      left: 23%;
      z-index: 9;
    }
    .people {
      width: 15%;
      position: absolute;
      top: 51.9%;
      left: 28.5%;
      border-radius: 50%;
      z-index: 99;
      transform: rotate(10deg);
    }
    .text {
      font-family: "huakang";
      position: absolute;
      top: 32%;
      left: 58%;
      font-size: 7vw;
      color: #9f5b38;
      z-index: 999;
    }
    .btn {
      display: inline-block;
      width: 50%;
      position: absolute;
      bottom: 14.5%;
      left: 25%;
      animation: toscale 0.8s linear infinite alternate;
    }
    .pop {
      position: absolute;
      top: 35.8%;
      left: 50%;
      transform: translateX(-50%);
      width: 78%;
      background-image: url("@{base}out.png");
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 9999;
      ul {
        width: 100%;
        display: inline-block;
        padding-top: 3%;
        z-index: 9;
        li {
          display: inline-block;
          width: 30%;
          height: 100%;
          padding: 5px 0px;
          .sound-icon {
            padding: 5px;
            position: relative;
            .iconbox {
              display: inline-block;
              width: 100%;
              position: relative;
              .icon_mask {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 9;
                opacity: 0;
              }
              .active {
                opacity: 1;
              }
              .icon {
                position: relative;
                z-index: 0;
              }
              label {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -20%;
                // background-image: url('@{base}iconbg.png');
                // background-position: center center;
                // background-size: 100% auto;
                // background-repeat: no-repeat;
                text-align: center;
                color: #ffcb4f;
                width: 70%;
                z-index: 999;
                img {
                  position: relative;
                }
                span {
                  width: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-family: "huakang";
                  font-size: 0.4vw;
                  letter-spacing: 1px;
                }
              }
            }
          }
          .music-icon {
            padding: 5px;
          }
        }
      }
      .voices {
        width: 25%;
        height: 25%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        background-image: url("@{base}voice4.png");
        background-position: center center;
        background-size: 100% auto;
        background-repeat: no-repeat;
        z-index: 99;
        audio {
          position: relative;
          width: 5px;
          height: 5px;
          opacity: 0;
        }
      }
      .playvoice {
        animation: voice 1s linear alternate infinite;
      }
      .sub {
        position: relative;
        z-index: 9;
        display: inline-block;
        width: 53.2%;
        margin-top: 5%;
        margin-bottom: 7%;
      }
    }
    .share-note {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      background-color: rgba(0, 0, 0, 0.4);
      img {
        width: 65%;
        margin-left: 15%;
        margin-top: 10%;
      }
    }
  }
  .two {
    position: relative;
    z-index: 0;
    .photo {
      width: 57%;
      position: absolute;
      top: 3.7%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      pointer-events: auto;
      user-select: auto;
    }
    .frame {
      width: 68%;
      position: absolute;
      top: 0%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .task-group {
      width: 100%;
      overflow: hidden;
      position: absolute;
      bottom: 8%;
      z-index: 9;
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
}
@keyframes voice {
  0% {
    background-image: url("@{base}voice4.png");
  }
  25% {
    background-image: url("@{base}voice3.png");
  }
  50% {
    background-image: url("@{base}voice2.png");
  }
  75% {
    background-image: url("@{base}voice1.png");
  }
  100% {
    background-image: url("@{base}voice4.png");
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
@keyframes toscale {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
</style>


