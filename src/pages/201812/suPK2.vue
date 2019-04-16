<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}"
  >
    <div class="main">
      <!-- 卡片背景 -->
      <img
        :src="base + 'ka.png'+ this.$qiniuCompress()"
        class="kabg"
      >

      <!-- 头像 -->
      <div
        id="clip"
        class="clip"
      >
        <img :src="linkimg + this.$qiniuCompress()">
      </div>
      <img
        :src="base + 'pic.png' + this.$qiniuCompress()"
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
    <img
      :src="base + 'tip2.png'"
      class="tip2"
    >
    <a
      href="http://papi.xingstation.com/api/s/E8N"
      class="btn-right"
    >
      <img :src="base + 'btn1.png'">
    </a>
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  $wechat,
  wechatShareTrack,
  newGameList,
  gameListNeedCheck
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
      iphoneX: false,
      pkshow: false,
      year: '0',
      btn: 'btn',
      linkimg: null,
      //分享
      wxShareInfoValue: {
        title: '魔镜颜值PK擂台',
        desc: '互动扫码 赢取好礼',
        link: process.env.AD_API+'/api/s/J8D' + window.location.search,
        imgUrl: IMGSERVER + '/fe/image/supk/share.png',
      }
    }
  },
  watch: {
    parms() {
      this.linkimg = this.parms.link
      this.pkshow = true
      this.year = this.parms.year || this.awardinfo.age || this.year
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    }
    //微信授权
    // if (isInWechat() === true) {
    //   if (
    //     process.env.NODE_ENV === 'production' ||
    //     process.env.NODE_ENV === 'testing'
    //   ) {
    //     this.handleWechatAuth()
    //   }
    // }
  },
  methods: {
    // handleWechatAuth() {
    //   if (Cookies.get('sign') === null) {
    //     let base_url = encodeURIComponent(String(window.location.href))
    //     let redirct_url =
    //       process.env.WX_API +
    //       '/wx/officialAccount/oauth?url=' +
    //       base_url +
    //       '&scope=snsapi_base'
    //     window.location.href = redirct_url
    //   } else {
    //     this.userId = Cookies.get('user_id')
    //   }
    // },
    toPK() {
      if (!this.awardinfo) {
        this.pkshow = false
        return
      }
      this.btn = 'btned'
      if (this.awardinfo.pass == 0 || this.awardinfo.valuetmp != this.awardinfo.value) {
        gameListNeedCheck(this.awardinfo.auid, this.userinfo.z).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        newGameList(this.awardinfo.akey).then(res => {
          console.log(res)
        }).catch(err => { console.log(err) })
      }
    }

  }
}
</script>
<style lang="less" scoped>
@url: "http://cdn.exe666.com/fe/image/supk/";
@font: "http://cdn.exe666.com/fe/font/";
/*声明 WebFont*/
@font-face {
  font-family: "smallnum";
  src: url("@{font}smallnum.TTF");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "boldnum";
  src: url("@{font}boldnum.TTF");
  font-weight: normal;
  font-style: normal;
}
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
  padding-top: 10%;
  .btn-right {
    position: relative;
    width: 42%;
  }
  .tip2 {
    width: 64%;
    position: relative;
    z-index: 0;
    margin-top: 5%;
    margin-bottom: 8%;
  }
  .main {
    width: 68%;
    position: relative;
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
      border: none;
    }
    span {
      position: absolute;
      z-index: 99;
    }
    .year {
      width: 10vw;
      line-height: normal;
      text-align: center;
      font-size: 3.5vw;
      color: #fff;
      top: 59%;
      left: 28%;
      font-family: "smallnum";
    }
    .yz-score {
      width: 18%;
      text-align: left;
      font-size: 12vw;
      color: #fff;
      top: 57%;
      left: 42%;
      font-family: "boldnum";
    }
    .clip {
      width: 31vw;
      height: 31vw;
      position: absolute;
      top: 22%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
      border-radius: 50%;
      overflow: hidden;
    }
    .coverbg {
      width: 43vw;
      position: absolute;
      top: 22%;
      left: 26%;
      z-index: 99;
    }
    .topk {
      width: 49vw;
      position: absolute;
      z-index: 999;
      top: 73%;
      left: 50%;
      animation: mybig 0.6s linear infinite alternate;
    }
  }
}
.iphoneX {
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


