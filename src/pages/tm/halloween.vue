<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- tab切换区域显示-->
    <div class="group">
      <ul
        :class="{'x-list':iphoneX,'list':!iphoneX}"
        class="list"
      >
        <li
          v-show="tab.one"
          class="one"
        >
          <img
            :src="baseUrl + 'card01.png'+ this.$qiniuCompress()"
            class="card01"
          >
          <img
            v-if="!gameData.projectOne"
            :src="baseUrl + 'card01_unlocked.png'+ this.$qiniuCompress()"
            class="card01-unlocked"
          >
          <video
            v-if="gameData.projectOne"
            id="video"
            class="photo"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="true"
            preload="auto"
            width="100%"
            height="100%"
          >
            <source
              :src="photoImage.img1"
              type="video/mp4"
            >
            您的浏览器不支持video标签.
          </video>
          <img
            v-show="buttonshow"
            v-if="gameData.projectOne"
            src="https://cdn.xingstation.cn/fe/marketing/img/save_moonCake/play2.png"
            class="play"
            @click="playVideo()"
          >
        </li>
        <li
          v-show="tab.two"
          class="two"
        >
          <img
            :src="baseUrl + 'card02.png'+ this.$qiniuCompress()"
            class="card02"
          >
          <img
            v-if="!gameData.projectTwo"
            :src="baseUrl + 'card02_unlocked.png'+ this.$qiniuCompress()"
            class="card02-unlocked"
          >
          <img
            v-if="gameData.projectTwo"
            :src="photoImage.img2 + this.$qiniuCompress()"
            class="photo"
          >
        </li>
        <li
          v-show="tab.three"
          class="three"
        >
          <img
            :src="baseUrl + 'card03.png'+ this.$qiniuCompress()"
            class="card03"
          >
          <img
            v-if="!gameData.projectThree"
            :src="baseUrl + 'card03_unlocked.png'+ this.$qiniuCompress()"
            class="card03-unlocked"
          >
          <img
            v-if="gameData.projectThree"
            :src="photoImage.img3 + this.$qiniuCompress()"
            class="photo"
          >
        </li>
      </ul>
      <!-- 右边栏的button -->
      <div
        v-if="!wechat"
        :class="{'x-button':iphoneX,'button':!iphoneX}"
        class="button"
      >
        <a @click.self="tabClick('TrickHalloweenLD',true)">
          <img
            v-if="tab.one"
            :src="baseUrl + 'card01_tag01.png'+ this.$qiniuCompress()"
            class="card01-tag01"
          >
          <img
            v-if="!tab.one"
            :src="baseUrl + 'card01_tag02.png'+ this.$qiniuCompress()"
            class="card01-tag02"
          >
        </a>
        <a @click.self="tabClick('HallowCandyLD',true)">
          <img
            v-if="tab.two"
            :src="baseUrl + 'card02_tag01.png'+ this.$qiniuCompress()"
            class="card02-tag01"
          >
          <img
            v-if="!tab.two"
            :src="baseUrl + 'card02_tag02.png'+ this.$qiniuCompress()"
            class="card02-tag02"
          >
        </a>
        <a @click.self="tabClick('GhostHunterLD',true)">
          <img
            v-if="tab.three"
            :src="baseUrl + 'card03_tag01.png'+ this.$qiniuCompress()"
            class="card03-tag01"
          >
          <img
            v-if="!tab.three"
            :src="baseUrl + 'card03_tag02.png'+ this.$qiniuCompress()"
            class="card03-tag02"
          >
        </a>
      </div>
    </div>
    <!-- 解锁区域 -->
    <div
      v-if="!wechat"
      :class="{'x-unlockArea':iphoneX,'unlockArea':!iphoneX}"
      class="unlockArea"
    >
      <div class="unlock">
        <span v-if="gameData.projectOne">
          <img
            :src="baseUrl + 'game01_1.png'+ this.$qiniuCompress()"
            class="game01-1"
          >
          <img
            :src="baseUrl + 'great.png'+ this.$qiniuCompress()"
            :class="{'bounce':isMotion.one}"
            class="great"
          >
        </span>
        <span v-if="!gameData.projectOne">
          <img
            :src="baseUrl + 'game01_2.png'+ this.$qiniuCompress()"
            class="game01-2"
          >
          <img
            :src="baseUrl + 'question_mark.png'+ this.$qiniuCompress()"
            :class="{'tada':isMotion.one}"
            class="question "
          >
        </span>
      </div>
      <div class="unlock">
        <span v-if="gameData.projectTwo">
          <img
            :src="baseUrl + 'game02_1.png'+ this.$qiniuCompress()"
            class="game02-1"
          >
          <img
            :src="baseUrl + 'great.png'+ this.$qiniuCompress()"
            :class="{'bounce':isMotion.two}"
            class="great"
          >
        </span>
        <span v-if="!gameData.projectTwo">
          <img
            :src="baseUrl + 'game02_2.png'+ this.$qiniuCompress()"
            class="game02-2"
          >
          <img
            :src="baseUrl + 'question_mark.png'+ this.$qiniuCompress()"
            :class="{'tada':isMotion.two}"
            class="question"
          >
        </span>
      </div>
      <div class="unlock">
        <span v-if="gameData.projectThree">
          <img
            :src="baseUrl + 'game03_1.png'+ this.$qiniuCompress()"
            class="game03-1"
          >
          <img
            :src="baseUrl + 'great.png'+ this.$qiniuCompress()"
            :class="{'bounce':isMotion.three}"
            class="great"
          >
        </span>
        <span v-if="!gameData.projectThree">
          <img
            :src="baseUrl + 'game03_2.png'+ this.$qiniuCompress()"
            class="game03-2"
          >
          <img
            :src="baseUrl + 'question_mark.png'+ this.$qiniuCompress()"
            :class="{'tada':isMotion.three}"
            class="question"
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  getInfoById,
  userGame,
  getGame
} from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/halloween/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      photoImage: {
        img1: null,
        img2: null,
        img3: null
      },
      isMotion: {
        one: false,
        two: false,
        three: false
      },
      buttonshow: true,
      wechat: false,
      iphoneX: false,
      params: {
        userId: null,
        belong: this.$route.query.utm_campaign,
        id: this.$route.query.id,
        score: this.$route.query.score
      },
      tab: {
        one: true,
        two: false,
        three: false
      },
      // 节目数据，是否已玩
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false
      },
      //分享
      wxShareInfoValue: {
        title: 'HALLOWEEN万圣节',
        desc: '快来陪我玩吧，嘿嘿嘿~',
        link:
          'http://papi.xingstation.com/api/s/ZV6' +
          window.location.search +
          '&type=WeChat',
        imgUrl: cdnUrl + '/fe/marketing/img/halloween/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() { },
  mounted() {
    //分享页面处理
    if (this.$route.query.type != null && this.$route.query.type != undefined) {
      this.wechat = true
    }
    //适配
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
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
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          console.log(res)
          this.params.belong = res.belong
          this.params.score = res.parms.split('=')[1]
          this.photo =
            this.params.belong === 'TrickHalloweenLD' ? res.url : res.image
          //是否是微信分享
          if (this.wechat) {
            this.photoImage.img1 = this.photo
            if (this.params.belong != 'TrickHalloweenLD') {
              this.photoImage.img2 = this.photo
              this.photoImage.img3 = this.photo
            }
            if (this.params.belong === 'TrickHalloweenLD') {
              this.gameData.projectOne = true
            }
            if (this.params.belong === 'HallowCandyLD') {
              this.gameData.projectTwo = true
            }
            if (this.params.belong === 'GhostHunterLD') {
              this.gameData.projectThree = true
            }
          } else {
            this.userGame()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //播放视频
    playVideo() {
      let that = this
      this.playNow = document.getElementById('video')
      this.playNow.play()
      this.buttonshow = false
      this.playNow.onplay = function () {
        that.playNow.currentTime = 0
      }
      this.playNow.onended = function () {
        that.buttonshow = true
      }
      this.playNow.onpause = function () {
        that.buttonshow = true
      }
    },
    tabClick(adName, isInit) {
      console.log(adName)
      if (adName === 'TrickHalloweenLD') {
        this.isMotion.one = isInit ? true : false
        this.tab.one = true
        this.tab.two = false
        this.tab.three = false
      }
      if (adName === 'HallowCandyLD') {
        this.isMotion.two = isInit ? true : false
        this.tab.one = false
        this.tab.two = true
        this.tab.three = false
      }
      if (adName === 'GhostHunterLD') {
        this.isMotion.three = isInit ? true : false
        this.tab.one = false
        this.tab.two = false
        this.tab.three = true
      }
      let ref = this
      setTimeout(function () {
        ref.isMotion.one = false
        ref.isMotion.two = false
        ref.isMotion.three = false
      }, 1000)
    },
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
        this.params.userId = Cookies.get('user_id')
        this.params.belong = this.$route.query.utm_campaign
        this.tabClick(this.params.belong, false)
        //判断是否是微信分享链接 决定是否向后台发送数据
        this.getInfoById()
      }
    },
    userGame() {
      let args = {
        belong: this.params.belong,
        image_url: this.photo,
        qiniu_id: this.params.id,
        score: this.params.score
      }
      userGame(args, this.params.userId)
        .then(res => {
          console.log(res)
          this.getGame()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame() {
      let args = {
        params: {
          belong: 'TrickHalloweenLD,HallowCandyLD,GhostHunterLD'
        }
      }
      let userId = this.params.userId
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list) {
      let data = list
      console.log(list)
      data.map(r => {
        // 节目1，搞怪万圣节 TrickHalloweenLD
        if (r.belong === 'TrickHalloweenLD') {
          this.photoImage.img1 = r.image_url
          this.gameData.projectOne = true
        }
        // 节目2，不给糖就捣蛋 HallowCandyLD
        if (r.belong === 'HallowCandyLD') {
          this.photoImage.img2 = r.image_url
          this.gameData.projectTwo = true
        }
        // 节目3,抓鬼大冒险 GhostHunterLD
        if (r.belong === 'GhostHunterLD') {
          this.photoImage.img3 = r.image_url
          this.gameData.projectThree = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/halloween/";
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
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .group {
    width: 100%;
    position: relative;
    .list {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0);
      margin-top: 18%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
      li {
        img {
          width: 85%;
        }
        .card01-unlocked,
        .card02-unlocked,
        .card03-unlocked {
          width: 40%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .photo {
          width: 81%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50.2%);
          user-select: auto;
          pointer-events: auto;
        }
        .play {
          width: 24%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          user-select: auto;
          pointer-events: auto;
          z-index: 10;
        }
      }
    }
    .x-list {
      width: 90%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0);
      margin-top: 25%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .button {
      width: 32%;
      position: absolute;
      right: -15.9%;
      margin-top: 18%;
      a {
        display: block;
        img {
          width: 30%;
          display: block;
        }
      }
    }
    .x-button {
      width: 32%;
      position: absolute;
      right: -19.9%;
      margin-top: 25%;
    }
  }
  .unlockArea {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0.8%;
    display: flex;
    justify-content: space-around;
    padding: 0 5%;
    .unlock {
      position: relative;
      .game01-1,
      .game02-1,
      .game03-1 {
        width: 100%;
      }
      .great {
        width: 70%;
        position: absolute;
        left: 37%;
        top: 12%;
        z-index: 9;
      }
      .question {
        width: 32%;
        position: absolute;
        left: 55%;
        top: 10%;
      }
    }
  }
  .x-unlockArea {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 3%;
    display: flex;
    justify-content: space-around;
    padding: 0 5%;
  }
  .tada {
    animation: Tada 1s linear alternate;
    animation-fill-mode: forwards;
  }
  .bounce {
    animation: bounceIn 0.5s linear alternate;
    animation-fill-mode: forwards;
  }
}

@keyframes Tada {
  0% {
    transform: scale(1);
    transform: scale(1);
  }

  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
    transform: scale(0.9) rotate(-3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
    transform: scale(1.1) rotate(3deg);
  }

  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
    transform: scale(1.1) rotate(-3deg);
  }

  100% {
    transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }
}
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.2) translate3d(0, 0, 0);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 1;
    transform: scale(0.79);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
}
</style>


