<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="main">
      <div 
        class="one">
        <img
          :src="base + 'pic22.png'"
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
        你击败了{{ rank }}%玩家
      </div>
      <div
        class="two">
        <img
          :src="base + 'kuang22.png'"
          class="kuang">
        <ul
          :class="{text:true,nan:nan}">
          <li>
            <img 
              :src="word"
              class="word">
          </li>
          <li 
            v-show="Boolean(sex)">
            <img 
              v-show="Boolean(word)"
              :src="note"
              class="note">
          </li>
        </ul>
        <a 
          v-show="Boolean(sex)"
          class="btn"
          @click="toPK">
          <img
            :src="btn">
        </a>
        <img
          v-show="!Boolean(sex)"
          :src="base+'boy.png'"
          class="boy">
        <span class="code">{{ score }}</span>
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
  userGame,
  $wechat,
  wechatShareTrack
} from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMGSERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: IMGSERVER + '/image/yanzhi/pk/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      photo: null,
      btn: IMGSERVER + 'image/yanzhi/pk/btn.png',
      word: null,
      note: IMGSERVER + 'image/yanzhi/pk/up.png',
      utmCampaign: null,
      userId: null,
      score: null,
      rank: 0,
      nan: false,
      sex: parseInt(this.$route.query.sex),
      rank_url: process.env.SAAS_API + '/user/',
      //分享
      wxShareInfoValue: {
        title: '魔镜，谁是油城最美女神？',
        desc: '是你，抚媚热烈是你，盛世美颜还是你',
        link: 'http://papi.xingstation.com/api/s/G67' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/image/yanzhi/pk/share.png',
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
    this.score = this.$route.query.fraction
    this.word =
      this.score < 91 || this.score > 100
        ? this.base + 'code.png'
        : this.base + this.score + '.png'

    let bg = new Image()
    bg.src = this.base + 'bg.png'
    bg.onload = function() {
      let pic = new Image()
      pic.src = this.base + 'pic22.png'
      pic.onload = function() {
        let kuang = new Image()
        kuang.src = this.base + 'kuang22.png'
        kuang.onload = function() {}
      }
    }
    this.nan = this.$route.query.sex == 0 ? true : false
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
        this.score = this.$route.query.fraction
        this.utmCampaign = this.$route.query.utm_campaign
        this.userId = Cookies.get('user_id')
        this.getRank(this.userId)
      }
    },
    getRank(userId) {
      let query = '?belong=' + this.utmCampaign + '&score=' + this.score
      this.$http
        .get(this.rank_url + userId + '/rank' + query)
        .then(res => {
          this.rank = (parseFloat(res.data.data.rank) * 100).toFixed(2)
        })
        .catch(err => {
          console.log(err)
        })
    },
    toPK() {
      this.btn = this.base + 'clicked.png'
      this.note = this.base + 'uping.png'
      let args = {
        belong: this.utmCampaign,
        image_url: this.photo,
        score: this.score,
        qiniu_id: this.$route.query.id,
        gender: this.$route.query.sex
      }
      userGame(args, this.userId)
        .then(res => {
          if (res.success) {
            this.note = this.base + 'success.png'
          }
        })
        .catch(e => {
          console.log(e)
        })
      let oid = this.$route.query.utm_source
      this.$http
        .post(
          'http://xingstation.cn:8010/pushdiv/?oid=' +
            oid +
            '&belong=' +
            this.utmCampaign +
            '&url=&name=&image=&api=json'
        )
        .then(res => {})
        .catch(err => {})
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://cdn.exe666.com/image/yanzhi/pk/';
html,
body {
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  max-width: 750px;
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
    margin: 3% auto;
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
      .nan {
        top: 17%;
      }
      .btn {
        display: inline-block;
        width: 52%;
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translateX(-50%);
      }
      .boy {
        width: 50%;
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translateX(-50%);
      }
      .code {
        position: absolute;
        bottom: 10.5%;
        left: 52%;
        font-size: 8vw;
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


