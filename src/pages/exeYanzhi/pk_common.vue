<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base+'title.png'"
      class="title"
    >
    <div class="main">
      <!-- 卡片背景 -->
      <img
        :src="base+'ka.png'+ this.$qiniuCompress()"
        class="kabg"
      >
      <!-- 头像 -->
      <div
        id="clip"
        class="clip"
      >
        <img :src="photo + this.$qiniuCompress()">
      </div>
      <!-- 年龄，颜值分数-->
      <span class="year">{{ year }}岁</span>
      <span class="yz-score">{{ score }}</span>
      <!-- 排名 -->
      <div class="rank">
        你击败了{{ rank }}%玩家
      </div>
      <!-- 文字 -->
      <img
        :src="origin + word + '.png'"
        class="word"
      >
    </div>
    <div class="todo">
      <!-- 女生显示按钮 -->
      <a
        v-show="Boolean(sex)"
        class="btn"
        @click="toPK"
      >
        <img :src="base + btn + '.png'">
      </a>
      <img
        v-show="Boolean(sex)"
        :src="base + note + '.png'"
        class="note"
      >
      <!-- 男生显示 -->
      <img
        v-show="!Boolean(sex)"
        :src="base+'boy.png'"
        class="boy"
      >
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
      origin: IMGSERVER + '/image/yanzhi/pk/',
      base: IMGSERVER + '/image/yanzhi/pk/common/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      photo: null,
      btn: 'btn1',
      word: null,
      note: 'note',
      utmCampaign: null,
      userId: null,
      year: this.$route.query.year,
      score: this.$route.query.score,
      rank: 0,
      nan: false,
      sex: parseInt(this.$route.query.sex),
      rank_url: process.env.SAAS_API + '/user/',
      //分享
      wxShareInfoValue: {
        title: 'Mirror魔镜PK擂台等你来战',
        desc: 'Mirror魔镜PK擂台等你来战',
        link: 'http://papi.xingstation.com/api/s/lO5' + window.location.search,
        imgUrl: 'http://cdn.xingstation.com/image/pk/common/share.png',
        success: function () {
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
    clip.style.width = this.$innerWidth() * 0.265 + 'px'
    clip.style.height = this.$innerWidth() * 0.265 + 'px'
    this.word = this.score < 91 || this.score > 100 ? 'code' : this.score
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
      this.btn = 'btn2'
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
            this.note = 'success'
          }
        })
        .catch(e => {
          console.log(e)
        })
      let oid = this.$route.query.utm_source
      const baseUrl = process.env.EXE_API;
      let url =
        `oid=` + oid + '&belong=' + this.utmCampaign + '&url=&name=&image=&api=json'
      handleDataPost(url).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.com/image/yanzhi/pk/common/";
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
  background-image: url("@{imgUrl}tippng.png"), url("@{imgUrl}bg.png");
  background-size: 60% auto, 100% 100%;
  background-position: center 98%, center top;
  background-repeat: no-repeat, no-repeat;
  position: relative;
  padding-bottom: 10%;
  .title {
    width: 62%;
    margin: 5% auto;
  }
  .main {
    width: 92%;
    position: relative;
    text-align: center;
    margin: 3% auto;
    .kabg {
      position: relative;
      z-index: 0;
    }
    span {
      // font-family: '';
      position: absolute;
      z-index: 99;
    }
    .year {
      width: 10%;
      height: 8.5%;
      line-height: normal;
      text-align: center;
      vertical-align: middle;
      font-size: 3vw;
      color: #fe3ea8;
      top: 12%;
      left: 58%;
    }
    .yz-score {
      width: 15%;
      text-align: center;
      font-size: 8vw;
      color: #fff;
      top: 22%;
      left: 73%;
    }
    .clip {
      width: 25%;
      position: absolute;
      top: 25.5%;
      left: 10.25%;
      z-index: 9;
      border-radius: 50%;
      overflow: hidden;
    }
    .rank {
      width: 48%;
      position: absolute;
      top: 50%;
      left: 44%;
      text-align: center;
      font-size: 4.5vw;
      color: #fff;
    }
    .word {
      width: 41%;
      position: absolute;
      top: 65%;
      left: 47%;
    }
  }
  .todo {
    margin-top: 5%;
    .btn {
      display: inline-block;
      width: 54%;
    }
    .note {
      width: 36%;
      display: block;
      margin: 0 auto;
    }
    .boy {
      width: 62.4%;
      margin-top: 10%;
    }
  }
}
</style>


