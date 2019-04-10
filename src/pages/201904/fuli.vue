<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      v-show="!divShow.chuang"
      :src="base + 'bg.png'"
      class="bg"
    >
    <div
      v-show="divShow.scene1"
      :style="style.root"
      class="scene1"
    >
      <div class="top">
        <img :src="base + 'tittle.png'">
      </div>
      <div class="main">
        <div class="news">
          <img
            :src="base + 'i.png'"
            class="tip"
          >
          <img
            :src="base + 'new.png'"
            class="bg"
          >
        </div>
        <div
          id="anim1"
          class="anim"
        />
        <a
          class="open"
          @click="doOpen"
        />
      </div>
      <div class="foot">
        <div class="word">
          <div class="name">{{wxUser.nickname}}</div>
          <p class="text">哇哦,收到福礼了！赶紧打开吧~</p>
        </div>
        <div class="people">
          <img
            :src="base + 'c.png'"
            class="cup"
          >
          <img :src="people.own1">
        </div>
      </div>
    </div>
    <div
      v-show="divShow.scene2"
      :style="style.root"
      class="scene2"
    >
      <div class="top">
        <img :src="base + 'tittle.png'">
      </div>
      <div class="main">
        <div
          v-show="divShow.money"
          class="money"
        >
          {{money}}
        </div>
        <div
          id="anim2"
          class="anim"
        />
      </div>
      <div class="foot">
        <div class="boss">
          <div class="people">
            <img
              :style="'transform:scale(' + scale + ');'"
              :src="base + '6.png'"
              class="bg"
            >
            <img
              v-show="pimg"
              :src="people.boss"
              class="pimg"
            >
          </div>
          <div class="word">
            <p class="name">{{boss.name}}</p>
            <p class="text">{{boss.word}}</p>
          </div>
        </div>
        <div class="own">
          <div
            class="word"
            @click="openWrite"
          >
            <p class="name">{{wxUser.nickname}}</p>
            <p class="text">{{tips}}</p>
          </div>
          <div class="people">
            <img :src="people.own2">
          </div>
        </div>
      </div>
    </div>
    <!-- 弹幕弹窗 -->
    <div
      v-show="divShow.chuang"
      :style="style.root"
      class="chuang"
    >
      <div class="head">
        <a
          class="back"
          @click="goBack"
        >
          <img :src="base + 'back.png'">
        </a>
        发送弹幕
      </div>
      <div class="message">
        <textarea
          v-model="value"
          maxlength="40"
          class="write"
        ></textarea>
        <div class="num">{{count + '/40'}}</div>
      </div>
      <a
        class="toput"
        @click="toPut"
      >发送</a>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, getWxUserInfo } from 'services'
import { normalPages } from '@/mixins/normalPages'
import lottie from 'lottie-web'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/today_fuli/',
      divShow: {
        scene1: true,
        scene2: false,
        chuang: false,
        money: false,
      },
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      tips: '发弹幕,回复福礼红包',
      count: 0,
      scale: 0,
      pimg: false,
      people: {
        own1: CDN_URL + '/fe/image/today_fuli/hidol1.png',
        own2: CDN_URL + '/fe/image/today_fuli/hidol1.png',
        boss: CDN_URL + '/fe/image/today_fuli/hidol1.png'
      },
      money: '0.00',
      value: null,
      boss: {
        name: 'CEO.施雪',
        word: '星视度，让世界没有 烦人的广告。'
      },
      wxUser: {
        nickname: 'BD.Kylie',
        headimgurl: null,
        sex: 1,
      },
      //share
      wxShareInfoValue: {
        title: '今日福利',
        desc: '今日福利',
        imageUrl: CDN_URL + '/fe/image/today_fuli/icon.png'
      }

    }
  },
  watch: {
    value() {
      this.count = this.value.length
    }
  },
  mounted() {
    this.doAnim('anim1', this.base + '1/images/', this.base + '1/', true, true)
    // this.getWxUserInfo()
  },
  methods: {
    doAnim(id, imageUrl, jsonUrl, autoplay, loop) {
      let el = document.getElementById(id)
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: loop,
        autoplay: autoplay,
        assetsPath: imageUrl,
        path: jsonUrl
      })
      return anim
    },
    doOpen() {
      this.divShow.scene1 = false
      this.divShow.scene2 = true
      let that = this
      let anim = this.doAnim('anim2', this.base + '2/images/', this.base + '2/', true, false)
      anim.addEventListener('enterFrame', () => {
        // console.log(anim.currentFrame)
        if (anim.currentFrame >= 15) {
          that.divShow.money = true
        }
      });
      that.getBigger()
    },
    getBigger() {
      this.scale = 0
      this.pimg = false
      let big = 0
      let playBg = () => {
        if (big >= 1) {
          cancelAnimationFrame(timer)
          this.scale = 1
          this.pimg = true
        } else {
          big = big * 1 + 0.05
          this.scale = big
        }
        let timer = requestAnimationFrame(playBg)
      }
      playBg()
    },
    //获取微信数据
    getWxUserInfo() {
      getWxUserInfo().then(res => {
        this.wxUser = res.data
      }).catch(err => {
        let pageUrl = encodeURIComponent(window.location.href)
        let wx_auth_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          pageUrl +
          '&scope=snsapi_userinfo'
        window.location.href = wx_auth_url
        return
      })
    },
    openWrite() {
      this.divShow.scene2 = false
      this.divShow.chuang = true
    },
    goBack() {
      this.divShow.chuang = false
      this.divShow.scene2 = true
      this.getBigger()
    },
    toPut() {
      console.log('发送')
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/today_fuli/";
html,
body {
  width: 100%;
  overflow-x: hidden;
  height: 100%;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  position: relative;
  overflow: hidden;
  .bg {
    position: relative;
    z-index: 0;
  }
  .top {
    position: relative;
    z-index: 0;
  }
  .name {
    position: relative;
    text-align: left;
    height: 5vw;
    font-size: 3.5vw;
    font-family: "SimHei";
    font-weight: bold;
    color: rgba(143, 143, 143, 1);
    line-height: 5vw;
    margin-top: -2%;
    margin-bottom: 1%;
  }
  .text {
    position: relative;
    height: 4vw;
    font-size: 3vw;
    font-family: "SimHei";
    font-weight: bold;
    color: rgba(26, 26, 26, 1);
    line-height: 4vw;
    margin-bottom: 15%;
    text-align: left;
  }
  .scene1 {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 99;
    .main {
      width: 100%;
      position: relative;
      z-index: 0;
      height: 116vw;
      overflow: hidden;
      .news {
        width: 53%;
        position: absolute;
        top: 5%;
        right: 0%;
        z-index: 9;
        animation: toup 0.8s linear infinite alternate;
        .tip {
          width: 8.4vw;
          position: absolute;
          top: -2%;
          left: -8%;
          z-index: 99;
          animation: tobig 1s linear infinite alternate;
        }
      }
      .anim {
        position: absolute;
        width: 165%;
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
      .open {
        width: 23vw;
        height: 23vw;
        position: absolute;
        top: 40%;
        left: 52%;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
    .foot {
      position: relative;
      width: 100%;
      margin-top: 4%;
      .word {
        width: 66.5%;
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 99;
        transform: translateY(35%);
        background-image: url("@{img}wordbg1.png");
        background-position: center center;
        background-size: 100% auto;
        background-repeat: no-repeat;
        .name {
          margin-top: 8%;
          padding-left: 15%;
        }
        .text {
          padding-left: 15%;
          margin-bottom: 10%;
          margin-left: 0%;
        }
      }
      .people {
        width: 42.8%;
        position: absolute;
        top: 0%;
        right: 0%;
        z-index: 0;
        margin-bottom: 3%;
        .cup {
          width: 16.7vw;
          position: absolute;
          top: -18%;
          left: 20%;
          z-index: 99;
          animation: toup 0.6s linear infinite alternate;
        }
      }
    }
  }
  .scene2 {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 9;
    .main {
      width: 100%;
      position: relative;
      z-index: 0;
      height: 140vw;
      overflow: hidden;
      margin-top: -30%;
      .money {
        position: absolute;
        top: 35%;
        left: 51%;
        z-index: 999;
        font-size: 11vw;
        line-height: 17vw;
        color: #fff;
        letter-spacing: 2px;
      }
      .anim {
        position: absolute;
        width: 160%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
    .foot {
      width: 100%;
      position: relative;
      z-index: 0;
      .boss {
        width: 100%;
        padding: 0 5%;
        overflow: hidden;
        margin-top: -28%;
        .people {
          width: 35vw;
          position: relative;
          float: left;
          .pimg {
            width: 90%;
            position: absolute;
            top: 7%;
            left: 2%;
            z-index: 99;
          }
        }
        .word {
          width: 55vw;
          position: relative;
          float: right;
          padding: 5% 10%;
          margin-top: 12%;
          overflow: hidden;
          background-image: url("@{img}wordbg2.png");
          background-position: center center;
          background-size: 120% auto;
          background-repeat: no-repeat;
          p {
            text-align: left;
            padding-left: 5%;
          }
        }
      }
      .own {
        position: relative;
        width: 100%;
        margin-top: 2%;
        .word {
          width: 75.5%;
          position: absolute;
          top: 35%;
          left: -3%;
          z-index: 99;
          transform: translateY(35%);
          background-image: url("@{img}wordbg1.png");
          background-position: center center;
          background-size: 90% 80%;
          background-repeat: no-repeat;
          .name {
            padding-left: 18%;
            margin-top: 12%;
            font-size: 3vw;
            line-height: 3vw;
            height: 3vw;
          }
          .text {
            font-weight: 400;
            color: rgba(139, 139, 139, 1);
            text-align: left;
            font-size: 2.6vw;
            line-height: 3.5vw;
            height: 3.5vw;
            margin-bottom: 12%;
            padding-left: 18%;
            z-index: 0;
            &:before {
              content: "";
              position: absolute;
              top: 0%;
              left: 17%;
              width: 2px;
              height: 2.5vw;
              border-left: solid 2px #a40000;
              margin-top: 0.5%;
              z-index: 99;
              animation: shake 0.8s linear infinite alternate;
            }
          }
        }
        .people {
          width: 40%;
          position: absolute;
          top: 0%;
          right: 2%;
          z-index: 0;
          margin-bottom: 1%;
        }
      }
    }
  }
  .chuang {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    overflow: hidden;
    background-color: #fff;
    .head {
      position: relative;
      width: 100%;
      text-align: center;
      font-size: 4vw;
      font-family: "PingFang SC";
      font-weight: 500;
      line-height: 50px;
      height: 50px;
      color: rgba(0, 0, 0, 1);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.16);
      .back {
        width: 30px;
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translateY(-50%);
        z-index: 99;
      }
    }
    .message {
      width: 95%;
      margin: 0 auto;
      position: relative;
      margin-top: 10px;
      .write {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 5px;
        border: none;
        border-radius: 15px;
        background-color: #f5f5f5;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 20px;
        color: rgba(34, 34, 34, 1);
        z-index: 0;
        min-height: 26vw;
        text-align: left;
      }
      .num {
        position: absolute;
        bottom: 5px;
        right: 5px;
        z-index: 9;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 20px;
        color: rgba(174, 174, 174, 1);
      }
    }
    .toput {
      width: 95%;
      background: #6d1eff;
      font-size: 4vw;
      font-family: "PingFang SC";
      font-weight: 400;
      line-height: 5vw;
      color: rgba(255, 255, 255, 1);
      padding: 3%;
      text-align: center;
      border-radius: 15px;
      margin-top: 20px;
    }
  }
}
@keyframes torotate {
  0% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes toup {
  0% {
    transform: translateY(15px);
  }
  100% {
    transform: rotate(-5px);
  }
}
@keyframes tobig {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

@keyframes tobig2 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>


