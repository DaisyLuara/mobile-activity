<template>
  <div
    :style="style.root"
    class="content"
  >
    <div
      id="anim"
      class="anim"
      @click="toGetOpen"
    />
    <div
      v-if="scene=='flower'"
      :style="style.root"
      class="scene"
    >
      <img
        :src="base + '1tittle.png' + this.$qiniuCompress()"
        class="title"
      >
      <img
        :src="base + '1.png' + this.$qiniuCompress()"
        class="center"
      >
      <img
        :src="base + '1th.png' + this.$qiniuCompress()"
        class="type"
      >
      <div class="pig">
        <img
          src=""
          class="pig_img"
        >
      </div>
    </div>
    <div
      v-if="scene=='money'"
      :style="style.root"
      class="scene"
    >
      <img
        :src="base + '2tittle.png' + this.$qiniuCompress()"
        class="title"
      >
      <img
        :src="base + '2.png' + this.$qiniuCompress()"
        class="center"
      >
      <img
        :src="base + '2cy.png' + this.$qiniuCompress()"
        class="type"
      >
      <div class="pig">
        <img
          src=""
          class="pig_img"
        >
      </div>
    </div>
    <img
      v-show="hint"
      :src="base + 'hint.png'"
      class="hint"
    >
    <img
      v-for="item in 2"
      :key="item.id"
      :src="base + 'star1.png'"
      :class="'one' + item"
      class="star1"
    >
    <img
      v-for="item in 3"
      :key="item.id"
      :src="base + 'star2.png'"
      :class="'two' + item"
      class="star2 "
    >
    <div
      v-show="last_page"
      class="last"
    >
      <img
        v-if="scene=='flower'"
        v-show="save"
        :src="base + '1tittle.png' + this.$qiniuCompress()"
        class="title"
      >
      <img
        v-else
        :src="base + '2tittle.png' + this.$qiniuCompress()"
        class="title"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        :class="{photo:true,torun:torun}"
      >
      <img
        v-show="save"
        :src="base + 'save.png'"
        class="save"
      >
    </div>
  </div>
</template>
<script>
import lottie from 'lottie-web'
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMG_SERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'height': this.$innerHeight() + 'px'
        }
      },
      base: IMG_SERVER + '/fe/image/happyyear/',
      hint: false,
      torun: false,
      scene: null,//'money'
      money_pig: 'money_pig_00000',
      heart_pig: 'heart_pig_00000',
      imgList: [],
      last_page: false,
      save: false,
      animation: null,
      //分享
      wxShareInfoValue: {
        title: '你是我的掌声名猪',
        desc: '像你这样的人，除了宠着，还是宠着',
        link: 'http://papi.xingstation.com/api/s/GRy' + window.location.search,
        imgUrl: 'http://cdn.xingstation.cn/fe/image/happyyear/icon.png'
      }
    }
  },
  watch: {
    parms() {
      this.scene = this.parms.scene
      this.doAnim()
      this.loadPigImage(this.scene, 12)
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'testing') {
      this.wxShareInfoValue.link = 'http://papi.newgls.cn/api/s/oQK' + window.location.search
    }
    // this.doAnim()
    // this.loadPigImage(this.scene, 12)
  },
  methods: {
    doAnim() {
      const el = document.getElementById('anim')
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        assetsPath: this.base + 'animate/',
        path: this.base + 'data.json'
      })
      this.animation = anim
      anim.addEventListener('DOMLoaded', function () {
        that.hint = true
        anim.stop()
      })
    },
    loadPigImage(scene, length) {
      let name = scene == 'flower' ? 'heart_pig' : 'money_pig'
      let count = 0
      let that = this
      for (let i = 0; i < length; i++) {
        i = i < 10 ? '0' + i : i
        let texture = this.base + name + '/' + name + '_000' + i + '.png'
        this.imgList.push(texture)
        let img = new Image()
        img.src = texture
        img.onload = function () {
          count++
          if (count == 12) {
            that.playPigAnim()
          }
        }
      }
    },
    playPigAnim() {
      let that = this
      let num = 0;
      let count = 0
      let pig = document.querySelector('.pig_img')
      let startPigAnim = () => {
        let timer = window.requestAnimationFrame(startPigAnim)
        if (count % 5 == 0) {
          pig.src = this.imgList[num]
          num = num < 11 ? num + 1 : 0
        }
        count++
        if (count > 6000) {
          count = 0
        }
      }
      startPigAnim()
    },
    toGetOpen() {
      let that = this
      this.hint = false
      this.animation.setSpeed(1.5)
      this.animation.play()
      this.animation.loop = false
      this.animation.addEventListener('complete', function () {
        that.lastAnim()
      })
    },
    lastAnim() {
      let last = document.querySelector('.last')
      let photo = document.querySelector('.photo')
      let save = document.querySelector('.save')
      let that = this
      this.last_page = true
      let raf = null
      let top = 105,
        w = 10
      let slider = function () {
        top = top <= 17 ? 17 : top - 2
        w = w >= 63 ? 63 : w + 1.5
        if (top <= 17) {
          window.cancelAnimationFrame(raf)
          save.style.top = photo.offsetTop + photo.clientHeight + 30 + 'px'
          that.save = true
          last.style.backgroundColor = 'rgba(0,0,0,0.5)'
          document.querySelectorAll('.star1').style.zIndex = '9999'
          document.querySelectorAll('.star2').style.zIndex = '9999'
          return
        }
        photo.style.top = top + '%'
        photo.style.width = w + '%'
        raf = window.requestAnimationFrame(slider)
      }
      slider()
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.cn/fe/image/happyyear/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #2c0400;
  background-image: url("@{imgUrl}bg.png");
  background-position: center center;
  background-size: 100% auto;
  background-repeat: repeat;
  .scene {
    width: 100%;
    position: relative;
    z-index: 0;
    .title {
      width: 84%;
      position: relative;
      z-index: 0;
      margin-top: 2%;
    }
    .center {
      position: absolute;
      top: 25%;
      left: 3%;
      z-index: 0;
      width: 97%;
    }
    .type {
      position: absolute;
      width: 36%;
      bottom: 7%;
      left: 0%;
    }
    .pig {
      width: 60%;
      position: absolute;
      z-index: 999;
      bottom: 0;
      right: 0;
      img {
        position: relative;
      }
    }
  }
  .anim {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0%;
    left: 0;
    z-index: 99;
    transform: scale(1.1);
    margin-bottom: -10%;
  }
  .hint {
    display: block;
    width: 20%;
    position: absolute;
    top: 37%;
    left: 40%;
    z-index: 999;
    animation: mybig 0.5s linear infinite alternate;
  }
  .star1 {
    width: 9%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    animation: myrotate 1s linear infinite;
  }
  .star2 {
    width: 6%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    animation: myrotate 1.2s linear infinite;
  }
  .one1 {
    top: 25%;
    left: 63%;
  }
  .one2 {
    top: 52%;
    left: 27%;
  }
  .two1 {
    top: 35%;
    left: 24%;
  }
  .two2 {
    top: 59%;
    left: 64%;
  }
  .two3 {
    top: 35%;
    left: 56%;
  }
  .last {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0%;
    right: 0;
    z-index: 999;
    text-align: center;
    .title {
      width: 86%;
      position: relative;
      margin-top: 1.5%;
    }
    .photo {
      width: 63%;
      border: solid 7px #ffdc4e;
      border-radius: 5px;
      margin: 0 auto;
      position: absolute;
      top: -105%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
    .save {
      width: 61%;
      position: absolute;
      top: 91%;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
@keyframes myrotate {
  0% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(-360deg);
  }
}
@keyframes mybig {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>


