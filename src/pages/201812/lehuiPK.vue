<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="all">
      <img
        :src="base+'title.png' + this.$qiniuCompress()"
        class="title"
      >
      <div class="main">
        <!-- 卡片背景 -->
        <img
          :src="url + 'ka.png'+ this.$qiniuCompress()"
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
      </div>
      <img
        :src="url + 't.png' + this.$qiniuCompress()"
        class="tips"
      >
      <div class="todo">
        <a
          class="btn"
          @click="getPhoto"
        >
          <img :src="base + btn + '.png' + this.$qiniuCompress()">
        </a>
        <img
          :src="base + note + '.png' + this.$qiniuCompress()"
          class="note"
        >
      </div>
    </div>
    <div
      v-show="mask"
      :style="style.root"
      class="mask"
    >
      <div class="alert">
        <img
          :src="url + 'alert2.png' + this.$qiniuCompress()"
          class="erbg"
        >
        <img
          :src="url + 'btn.png' + this.$qiniuCompress()"
          class="btn"
        >
        <button
          class="close"
          @click.stop="()=>{ mask = false;}"
        />
      </div>
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
      url: IMGSERVER + '/fe/image/pk/lehui/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      btn: 'btn1',
      note: 'note',
      utmCampaign: null,
      userId: null,
      year: this.$route.query.year,
      score: this.$route.query.score,
      rank: 0,
      mask: true,
      sex: parseInt(this.$route.query.sex),
      rank_url: process.env.SAAS_API + '/user/',
      //分享
      wxShareInfoValue: {
        title: '乐荟豪礼 等你来领',
        desc: '即可领取 嗨翻全场',
        link: process.env.AD_API+'/api/s/5QR' + window.location.search,
        imgUrl: IMGSERVER + '/image/pk/common/share.png'
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
    toLink() {
      window.location.href = ""
    },
    getRank(userId) {
      let query = '?belong=' + this.utmCampaign + '&score=' + this.score
      this.$http
        .get(this.rank_url + userId + '/rank' + query)
        .then(res => {
          console.log(res)
          this.rank = (parseFloat(res.data.data.rank) * 100).toFixed(2)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPhoto() {
      let timer = requestAnimationFrame(this.getPhoto)
      if (this.photo) {
        cancelAnimationFrame(timer)
        this.toPK()
        return
      }

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
          console.log(res)
          if (res.success) {
            this.note = 'success'
          }
          this.note = 'success'
        })
        .catch(e => {
          console.log(e)
        })
      let oid = this.$route.query.utm_source
      const baseUrl = process.env.EXE_API;
      let url = 'oid=' + oid + '&belong=' + this.utmCampaign + '&url=&name=&image=&api=json'
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
@imgUrl: "http://cdn.xingstation.cn/image/yanzhi/pk/common/";
@url: "http://cdn.xingstation.cn/fe/image/pk/lehui/";
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
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: url("@{url}mask1.png"), url("@{url}mask2.png");
    background-repeat: no-repeat, no-repeat;
    background-position: right top, left bottom;
    background-size: 45% auto, 35% auto;
    text-align: center;
    .alert {
      position: relative;
      top: 50%;
      width: 90%;
      margin: 0 auto;
      transform: translateY(-50%);
      .erbg {
        position: relative;
        z-index: 0;
        pointer-events: auto;
      }
      .btn {
        width: 46vw;
        position: absolute;
        top: 63%;
        left: 50%;
        transform: translateX(-50%);
      }
      .close {
        width: 10vw;
        height: 10vw;
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        background: transparent;
        border: none;
      }
    }
  }
  .all {
    width: 100%;
    position: relative;
    z-index: 0;
    overflow-x: hidden;
    .title {
      width: 62%;
      margin: 0 auto;
      margin-top: 3.5%;
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
        font-weight: bold;
        color: #fe3ea8;
        top: 18%;
        left: 56.5%;
      }
      .yz-score {
        width: 18%;
        text-align: center;
        font-size: 8vw;
        color: #fff;
        top: 29%;
        left: 70%;
      }
      .clip {
        width: 31vw;
        height: 31vw;
        position: absolute;
        top: 26.5%;
        left: 7.2%;
        z-index: 9;
        border-radius: 50%;
        overflow: hidden;
        border: solid 5px #fff;
      }
      .rank {
        width: 48%;
        position: absolute;
        top: 61%;
        left: 42%;
        text-align: center;
        font-size: 3.5vw;
        color: #fff;
      }
    }
    .tips {
      position: relative;
      width: 73.5%;
    }
    .todo {
      margin-top: 3.5%;
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
}
</style>


