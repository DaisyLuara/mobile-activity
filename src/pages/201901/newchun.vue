<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div
      :style="style.root"
      class="group1"
    >
      <img
        :src="base + 'frame.png' + this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        v-for="item in 3"
        :key="item.id"
        :src="base + 'sakura01.png'"
        :class="'flower' + item"
        class="flower"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'text.png' + this.$qiniuCompress()"
        class="save"
      >
    </div>
    <div
      v-show="mask"
      :style="style.root"
      class="group2"
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
      base: IMG_SERVER + '/fe/image/newchun/',
      animation: null,
      mask: true,
      //分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/newchun/icon.png'
      }
    }
  },
  mounted() {
    // document.oncontextmenu = function (e) {
    //   e.preventDefault()
    // }
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
        anim.stop()
      })
    },
    playLottie() {
      let that = this
      this.hint = false
      this.animation.setSpeed(1.5)
      this.animation.play()
      this.animation.loop = false
      this.animation.addEventListener('complete', function () {
        // that.lastAnim()
      })
    },
    doPixi() { }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.exe666.com/fe/image/newchun/";
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
.warp {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("@{imgUrl}back.jpg");
  background-position: center center;
  background-size: 100% auto;
  background-repeat: repeat;
  .group1 {
    position: relative;
    z-index: 0;
    width: 100%;
    padding-top: 6%;
    .frame {
      position: relative;
      width: 79.4%;
      z-index: 0;
    }
    .photo {
      width: 65.5%;
      position: absolute;
      top: 7.4%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
    }
    .flower {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .flower1 {
      width: 23%;
      top: 1%;
      left: -8%;
    }
    .flower2 {
      width: 17%;
      top: 71%;
      left: 1%;
    }
    .flower3 {
      width: 40%;
      top: 70%;
      left: 79%;
    }
    .save {
      position: relative;
      width: 62%;
      margin-top: 4%;
    }
  }
  .group2 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>

