<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'dec_1.png'"
      class="cover"
    >
    <img
      :src="base + 'dec_2.png'"
      class="cover2"
    >
    <div class="form">
      <div class="star-name">
        <img
          :src="base + 'name.png'"
          class="bg"
        >
        <span>{{ star }}</span>
      </div>
      <div class="input">
        <img
          :src="base + 'input.png'"
          class="bg"
        >
        <input
          v-model="name"
          class="name"
          maxlength="5"
          placeholder="输入你的名字"
        >
        <a
          v-show="Boolean(photobg)"
          class="abtn"
          @click="toGetImage"
        >
          <img :src="base + 'button.png'">
        </a>
      </div>
    </div>
    <div class="picture">
      <img
        :src="base + 'frame.png'"
        class="bg"
      >
      <img
        :src="photobg"
        class="photo"
      >
    </div>
    <img
      v-if="oid==728||oid==729"
      :src="base +'728.png'"
      class="oid"
    >
    <img
      :src="base + 'rights.png'"
      class="tip"
    >
    <canvas id="canvas"/>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/aiqiyi/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      photobg: null,
      num: null,//'张三'
      name: null,//'张三'
      star: null,//'sunny'
      wxShareInfoValue: {
        title: '青春合照馆',
        desc: '点击领取与训练生的青春留念',
        link: 'http://papi.xingstation.com/api/s/8Ml' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/aiqiyi/icon.png'
      }
    }
  },
  watch: {
    photo() {
      this.photobg = this.photo
    },
    parms() {
      this.star = this.parms.name
    }
  },
  mounted() {
    if (localStorage.getItem(this.id)) {
      this.num = localStorage.getItem(this.id)
    } else {
      this.num = parseInt(Math.random() * 5)
      localStorage.setItem(this.id, this.num)
    }
  },
  methods: {
    toGetImage() {
      let [bg, text, word] = [new Image(), new Image(), null]
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      bg.setAttribute('crossOrigin', 'Anonymous')
      text.setAttribute('crossOrigin', 'Anonymous')
      canvas.width = canvas.width
      canvas.height = canvas.height
      bg.src = this.photo
      bg.onload = function () {
        canvas.width = bg.width
        canvas.height = bg.height
        text.onload = function () {
          ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
          ctx.drawImage(text, 0, 0, text.width, text.height, 0, canvas.height * 0.68, canvas.width, canvas.width / 1080 * 367)
          word = that.name + ' & ' + that.star
          ctx.fillStyle = "#fff"
          // ctx.textAlign = "center"
          ctx.font = "bold 100px 微软雅黑"
          ctx.fillText(word, 10, canvas.height * 0.72)
          that.photobg = canvas.toDataURL('image/png')
        }
        text.src = that.base + 'a' + that.num + '.png'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/aiqiyi/";
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
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  font-family: "微软雅黑";
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.bg {
  position: relative;
  z-index: 0;
}
.warp {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{img}dec_3.png"), url("@{img}bg.png");
  background-position: left 95%, center top;
  background-size: 37.5% auto, 100% auto;
  background-repeat: no-repeat, no-repeat;
  padding-top: 45%;
  animation: bgweiyi 0.9s linear infinite alternate-reverse;
  background-color: #031746;
  .cover {
    width: 24%;
    position: absolute;
    top: 40%;
    right: 0%;
    z-index: 999;
    animation: weiyi 0.5s linear infinite alternate;
  }
  .cover2 {
    width: 7%;
    position: absolute;
    top: 80%;
    left: 0%;
    z-index: 999;
    // animation: weiyi 0.5s linear infinite alternate-reverse;
  }
  .form {
    width: 100%;
    position: relative;
    z-index: 0;
    .star-name {
      width: 83%;
      position: relative;
      span {
        overflow: hidden;
        position: absolute;
        left: 52%;
        width: 20%;
        height: 8vw;
        line-height: 8vw;
        z-index: 99;
        color: #040f25;
        font-size: 4.4vw;
        font-weight: 900;
        z-index: 99;
      }
    }
    .input {
      position: relative;
      width: 63%;
      margin-top: 3%;
      .name {
        width: 85%;
        position: absolute;
        top: 0%;
        left: 10%;
        background: transparent;
        height: 100%;
        z-index: 99;
        color: #fff;
        font-size: 4vw;
        font-weight: 600;
        text-align: left;
        pointer-events: auto;
        user-select: auto;
        &::placeholder {
          color: #67686e;
        }
      }
      .abtn {
        width: 19vw;
        position: absolute;
        top: 0%;
        right: 0%;
        transform: translate(50%, -13%);
        z-index: 999;
      }
    }
  }
  .picture {
    width: 63%;
    position: relative;
    z-index: 0;
    margin-top: 3.5%;
    margin-bottom: 10%;
    .bg {
      z-index: 99;
    }
    .photo {
      // width: 61.5vw;
      width: 90%;
      position: absolute;
      top: 2.5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .oid {
    position: relative;
    width: 50%;
    display: block;
    margin-top: -5%;
    margin-bottom: 5%;
  }
  .tip {
    width: 56%;
    position: relative;

    margin-bottom: 3%;
  }

  #canvas {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 0;
  }
}
@keyframes weiyi {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(40%);
  }
}
@keyframes bgweiyi {
  0% {
    background-position: left 85%, center top;
  }
  100% {
    background-position: -50% 95%, center top;
  }
}
</style>


