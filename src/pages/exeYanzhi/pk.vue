<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="main">
      <div 
        class="one">
        <img
          :src="base + 'pic.png'"
          class="pic">
        <div 
          id="clip" 
          class="clip">
          <img 
            :src="photo + this.$qiniuCompress()">
        </div>
      </div>
      <!-- 排名 -->
      <div 
        class="rank">
        你击败了{{ rank }}玩家
      </div>
      <div
        class="two">
        <img
          :src="base + 'kuang.png'"
          class="kuang">
        <ul
          class="text">
          <li>
            <img 
              :src="word"
              class="word">
          </li>
          <li>
            <img 
              v-show="Boolean(word)"
              :src="note"
              class="note">
          </li>
        </ul>
        <a 
          v-show="Boolean(photo)"
          class="btn"
          @click="toPK">
          <img
            :src="btn">
        </a>
        <span class="code">{{ code }}</span>
      </div>
      <img 
        :src="base+'tips.png'"
        class="tips">
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  createGame,
  $wechat,
  wechatShareTrack
} from 'services'

import { normalPages } from '../../mixins/normalPages'
const IMGSERVER = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  mixins: [normalPages],
  data() {
    return {
      base: IMGSERVER + 'image/yanzhi/pk/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      photo: null,
      code: null,
      btn: IMGSERVER + 'image/yanzhi/pk/btn.png',
      word: null,
      note: IMGSERVER + 'image/yanzhi/pk/up.png',
      utmCampaign: null,
      userId: null,
      rank: '0%',
      rank_url: process.env.SAAS_API + '/user/12/rank',
      //分享
      wxShareInfoValue: {
        title: '魔镜，谁是油城最美女神？',
        desc: '是你，抚媚热烈烈是你，盛世美颜还是你',
        link: 'http://papi.xingstation.com/api/s/G67' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/pk/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      document.querySelector('.main').style.marginTop = '10%'
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

    let clip = document.getElementById('clip')
    clip.style.width = this.$innerWidth() * 0.25 + 'px'
    clip.style.height = this.$innerWidth() * 0.25 + 'px'
    this.code = this.$route.query.fraction
    this.word =
      this.code < 91 || this.code > 100
        ? this.base + 'code.png'
        : this.base + this.code + '.png'
    let bg = new Image()
    bg.src = 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/pk/bg.png'
    bg.onload = function() {
      let pic = new Image()
      pic.src = 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/pk/pic.png'
      pic.onload = function() {
        let kuang = new Image()
        kuang.src = 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/pk/kuang.png'
        kuang.onload = function() {}
      }
    }
    this.getRank()
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('user_id') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.utmCampaign = this.$route.query.utm_campaign
        this.userId = Cookies.get('user_id')
      }
    },
    getRank() {
      let score = this.$route.query.fraction
      let query = '?belong=' + this.utmCampaign + '&score=' + score
      this.$http
        .get(this.rank_url + query)
        .then(res => {
          console.log(res)
          // let rank = res.data.rank
          this.rank = res.data.rank * 100 + '%'
        })
        .catch(err => {
          console.log(err)
        })
    },
    toPK() {
      this.btn = this.base + 'clicked.png'
      this.note = this.base + 'uping.png'
      let gameId = this.$route.query.game_id
      let args = {
        belong: this.utmCampaign,
        image_url: this.photo,
        game_id: gameId
      }
      createGame(args, this.userId)
        .then(res => {
          if (res.success) {
            this.note = this.base + 'success.png'
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/yanzhi/pk/';
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
  text-align: center;
  margin: 0;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url('@{imgUrl}bg.png');
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  position: relative;
  background-color: #020620;
  .main {
    width: 92%;
    position: relative;
    border: solid 2px #fff;
    text-align: center;
    margin: 0 auto;
    margin-top: 3%;
    background-image: url('@{imgUrl}border1.png'), url('@{imgUrl}border2.png'),
      url('@{imgUrl}border3.png'), url('@{imgUrl}border4.png');
    background-size: 10% auto, 10% auto, 10% auto, 10% auto;
    background-position: 1% 1%, 99% 1%, 99% 99%, 1% 99%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    .one {
      width: 100%;
      position: relative;
      text-align: center;
      margin: 0 auto;
      padding-top: 2%;
      .pic {
        width: 90%;
        position: relative;
        z-index: 999;
        margin: 0 auto;
      }
      .clip {
        width: 25%;
        position: absolute;
        top: 29%;
        left: 51%;
        z-index: 9;
        transform: translateX(-50%);
        border-radius: 50%;
        overflow: hidden;
        img {
          max-width: 100%;
        }
      }
    }
    .rank {
      width: 100%;
      position: relative;
      text-align: center;
      font-size: 16px;
      color: #fff;
      height: 25%;
      background: url('@{imgUrl}rankbg.png') center center / 85% auto no-repeat;
      margin-top: -3%;
      opacity: 0.7;
    }
    .two {
      width: 100%;
      text-align: center;
      margin: 0 auto;
      margin-top: -3%;
      position: relative;
      .kuang {
        width: 90%;
        position: relative;
        z-index: 0;
      }
      .text {
        width: 100%;
        display: inline-block;
        position: absolute;
        z-index: 99;
        top: 13%;
        left: 0;
        li {
          display: inline-block;
          width: 100%;
          text-align: center;
        }
        .word {
          width: 35%;
          margin: 0 auto;
        }
        .note {
          width: 32%;
          margin: 2.5% auto;
        }
      }
      .btn {
        display: inline-block;
        width: 52%;
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translateX(-50%);
      }
      .code {
        position: absolute;
        bottom: 10%;
        left: 52%;
        font-size: 30px;
        color: #fff;
        font-size: 900;
        font-family: 'Times New Roman';
      }
    }
    .tips {
      width: 65%;
      margin-bottom: 5%;
    }
  }
}
</style>


