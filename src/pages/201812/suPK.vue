<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base + 'kuang.png' + this.$qiniuCompress()"
      class="kuang"
    >
    <img
      :src="photo + this.$qiniuCompress()"
      class="photo"
    >
    <a
      class="winbtn animated linear infinite tada"
      @click="()=>{mask1 = true;}"
    >
      <img :src="base + 'win.png'">
    </a>
    <a
      class="btn-left"
      @click="()=>{ mask2 = true;}"
    >
      <img :src="base + 'btn2.png'">
    </a>
    <a
      href=""
      class="btn-right"
    >
      <img :src="base + 'btn1.png'">
    </a>
    <div
      :style="style.root"
      v-show="mask1"
      class="mask1"
    >
      <div class="main">
        <!-- 卡片背景 -->
        <img
          :src="base + 'ka.png'+ this.$qiniuCompress()"
          class="kabg"
        >
        <img
          :src="base + 'icon.png'+ this.$qiniuCompress()"
          class="iconbg"
        >
        <button
          class="close"
          @click="()=>{mask1=false;}"
        ></button>
        <!-- 头像 -->
        <div
          id="clip"
          class="clip"
        >
          <img :src="photo + this.$qiniuCompress()">
        </div>
        <img
          :src="base + 'pic.png' +  this.$qiniuCompress()"
          class="coverbg"
        >
        <!-- 年龄，颜值分数-->
        <span class="year">{{ year }}岁颜值</span>
        <span class="yz-score">{{ score }}</span>
        <a
          v-show="pkshow"
          class="topk"
          @click="toPK"
        >
          <img :src="base + btn + '.png'+ this.$qiniuCompress()">
        </a>
      </div>
    </div>
    <div
      v-show="mask2"
      class="mask2"
      @click.self="()=>{mask2=false;}"
    >
      <img
        :src="base + 'kuang.png' + this.$qiniuCompress()"
        class="kuang"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        :src="base + 'note.png' + this.$qiniuCompress()"
        class="note"
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
import "animate.css";
const IMGSERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: IMGSERVER + '/fe/image/supk/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      pkshow: false,
      mask1: false,
      mask2: false,
      year: 22,
      score: 89,
      btn: 'btn',
      //分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: IMGSERVER + '/fe/image/supk/share.png',
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
  watch: {
    photo() {
      this.pkshow = true
    },
    parms() {
      this.year = this.parms.year
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
    toPK() {
      let args = {
        belong: this.belong,
        image_url: this.photo,
        score: this.score,
        qiniu_id: this.$route.query.id,
        gender: this.gender
      }
      userGame(args, this.userId)
        .then(res => {
          console.log(res)
          this.btn = 'btned'
        })
        .catch(e => {
          console.log(e)
        })
      let oid = this.oid
      this.$http.post(
        'http://exelook.com:8010/pushdiv/?oid=' +
        oid +
        '&belong=' +
        this.belong +
        '&url=&name=&image=&api=json'
      )
    }
  }
}
</script>
<style lang="less" scoped>
@url: "http://cdn.exe666.com/fe/image/supk/";
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
  margin: 0 auto;
  font-size: 0;
}
a {
  display: inline-block;
  cursor: pointer;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow: hidden;
  background-image: url("@{url}bg.png");
  background-size: 100% 100%;
  background-position: center top;
  background-repeat: no-repeat;
  position: relative;
  .kuang {
    width: 72.5%;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }
  .photo {
    width: 69%;
    position: absolute;
    top: 6%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    pointer-events: auto;
    user-select: none;
  }
  .winbtn {
    width: 27.5%;
    position: absolute;
    top: 2%;
    right: 1.5%;
    z-index: 99;
  }
  .btn-left {
    position: absolute;
    width: 42%;
    left: 6%;
    bottom: 5%;
    z-index: 99;
  }
  .btn-right {
    position: absolute;
    width: 42%;
    right: 6%;
    bottom: 5%;
    z-index: 99;
  }
  .mask1 {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0%;
    right: 0%;
    bottom: 0%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: url("@{url}top.png"), url("@{url}bottom.png");
    background-position: right top, left bottom;
    background-size: 49% auto, 35% auto;
    background-repeat: no-repeat, no-repeat;
    .main {
      width: 68%;
      position: relative;
      margin-top: 20%;
      text-align: center;
      .kabg {
        position: relative;
        z-index: 0;
      }
      .iconbg {
        width: 10%;
        position: relative;
        z-index: 0;
      }
      .close {
        width: 9vw;
        height: 9vw;
        position: absolute;
        top: 93%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99;
        border-radius: 50%;
        background: transparent;
      }
      span {
        position: absolute;
        z-index: 99;
      }
      .year {
        width: 12vw;
        line-height: normal;
        text-align: center;
        font-size: 4.5vw;
        color: #fff;
        font-weight: 600;
        top: 50%;
        left: 24%;
      }
      .yz-score {
        width: 18%;
        text-align: left;
        font-size: 15vw;
        color: #fff;
        top: 48%;
        left: 42%;
      }
      .clip {
        width: 31vw;
        height: 31vw;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
        border-radius: 50%;
        overflow: hidden;
      }
      .coverbg {
        width: 43vw;
        position: absolute;
        top: 20%;
        left: 26%;
        z-index: 99;
      }
      .topk {
        width: 49vw;
        position: absolute;
        z-index: 999;
        top: 65%;
        left: 50%;
        // transform: translateX(-50%);
        animation: mybig 0.6s linear infinite alternate;
      }
    }
  }
  .mask2 {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0%;
    right: 0%;
    bottom: 0%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.9);
    .note {
      width: 35%;
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
@keyframes mybig {
  0% {
    transform: translateX(-50%) scale(0.9);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}
</style>


