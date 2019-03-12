<template>
  <div class="warp">
    <div class="top">
      <img
        src=""
        class="yu"
      >
    </div>
    <div class="picture">
      <img
        :src="base + 'photo.png'"
        class="cover"
      >
      <img
        :src="photo"
        class="photo"
      >
    </div>
    <img
      :src="base + 'bottom.png'"
      class="bottom"
    >
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
import lottie from "lottie-web";
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/jinli/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      loading: true,
      //微信分享
      wxShareInfoValue: {
        title: "寻找锦鲤，集万千宠爱于你",
        desc: "转运红鲤 发财金鲤 王者黑鲤",
        link: 'http://papi.xingstation.com/api/s/v8V' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/jinli/icon.jpg"
      }
    }
  },
  watch: {
    score() {
      this.getScore(this.score)
    }
  },
  mounted() {
  },
  methods: {
    getScore(score) {
      //60-80 红，，80-90 黄  90-100 黑
      if (score < 80) {
        this.getLoadAnim(this.base + 'red/red_000', 0, 9, '.png', '.yu', 100)
      } else if (score < 90) {
        this.getLoadAnim(this.base + 'yellow/yellow_000', 0, 8, '.png', '.yu', 100)
      } else {
        this.getLoadAnim(this.base + 'black/black_000', 0, 9, '.png', '.yu', 100)
      }
    },
    getLoadAnim(prename, start, length, type, name, speed) {
      let count = 0
      let arr = []
      for (let i = start; i < start + length; i++) {
        let img = new Image()
        i = i < 10 ? '0' + i : i
        arr.push(prename + i + type)
        img.src = prename + i + type
        img.onload = () => {
          count++
          if (count >= length) {
            this.playAnimate(arr, name, speed)
          }
        }
      }
    },
    playAnimate(arr, name, speed) {
      let count = 0
      let el = document.querySelector(name)
      setInterval(() => {
        if (count >= arr.length) {
          count = 0
        }
        el.src = arr[count]
        count++
      }, speed)
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/jinli/";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  width: 100%;
  overflow: hidden;
  position: relative;
  background-image: url("@{img}bg.jpg");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .top {
    width: 52%;
    margin-top: 9%;
    position: relative;
  }
  .picture {
    width: 100%;
    position: relative;
    margin-top: 34%;
    margin-bottom: 12%;
    .cover {
      width: 81%;
      margin-left: -4%;
      position: relative;
      z-index: 99;
    }
    .photo {
      width: 50%;
      position: absolute;
      top: 14%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0%;
    left: 0%;
    z-index: 999;
  }
}
</style>

