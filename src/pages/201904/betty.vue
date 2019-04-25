<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div
      :style="style.root"
      class="content"
    >
      <div
        v-show="cover"
        class="boots-wrap"
      >
        <img
          v-show="bootText"
          :src="imgServerUrl+'text.png'"
          class="boot-text"
        >
        <div class="slide-wrap">
          <img
            v-show="bootText"
            :src="imgServerUrl + 'gesture.png'"
            class="gesture-img"
          >
          <div
            class="boot-img"
            @touchstart="start"
            @touchmove="move"
            @touchend="end"
          >
            <img :src="imgServerUrl + 'gesture.png'">
          </div>
        </div>
      </div>
      <div class="photo-wrap">
        <img
          :src="imgServerUrl+'cover.png'"
          class="envelope-bg"
        >
        <img
          :src="photo"
          class="photo-img"
        >
        <img
          :src="imgServerUrl+'save.png'"
          class="hint"
        >
      </div>
      <div
        v-show="cover"
        class="photo-cover"
      >
        <img
          :src="imgServerUrl+'frame.png'"
          class="cover-img"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      imgServerUrl: CDN_URL + '/fe/image/betty/',
      photo: null,
      cover: true,
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      bootText: true,
      wxShareInfoValue: {
        title: '贝蒂的精灵密语',
        desc: '与贝蒂一起化身精灵，尽享此刻快乐好心情！',
        link: 'http://papi.xingstation.com/api/s/D8Y' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/betty/icon.png',
      }
    }
  },
  mounted() {
  },
  methods: {
    start(e) {
      this.bootText = false
    },
    move(e) {
      let root = this.$innerWidth()
      let x = e.targetTouches[0].pageX || e.touches[0].pageX
      let cover = document.querySelector('.photo-cover')
      let slide = document.querySelector('.slide-wrap')
      let slide_w = root * 0.84  //slide 最初宽度
      let gesture = document.querySelector('.boot-img')
      let startpos = (root - slide_w) / 2 + slide_w
      let endpos = root * 0.84 - gesture.clientWidth / 2
      let current = root - x - gesture.clientWidth / 2
      let pecent = (startpos - x) / root * 100 / 0.84
      if (current < 0) {
        return
      }
      if (current >= endpos) {
        this.cover = false
        return
      }
      if (current < endpos) {
        gesture.style.right = current + 'px'
        slide.style.width = x - (root - slide_w) / 2 + gesture.clientWidth / 2
        cover.style.left = -pecent + '%'
        return
      }
    },
    end(e) {
      let root = this.$innerWidth()
      let x = e.changedTouches[0].pageX || e.touches[0].pageX
      if (x < root * 0.2) {
        this.cover = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.cn/fe/image/betty/";
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
.warp {
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("@{imgUrl}bg.jpg");
  background-position: center top;
  text-align: center;
  .content {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    .photo-cover {
      position: absolute;
      left: 0%;
      top: 0%;
      width: 100%;
      height: 100%;
      z-index: 5;
      overflow: hidden;
      .cover-img {
        height: 100%;
        width: auto;
        max-width: none;
      }
    }
    .photo-wrap {
      margin: 0 auto;
      margin-top: 3%;
      width: 83%;
      text-align: center;
      position: relative;
      .envelope-bg {
        width: 100%;
        position: relative;
        z-index: 0;
        margin-left: 2px;
      }
      .photo-img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0.5%;
        right: 0;
        z-index: 4;
        margin: 0 auto;
        padding: 2px;
        z-index: 2;
        margin-top: -2px;
        margin-left: -1px;
      }
      .hint {
        width: 43vw;
        position: relative;
        z-index: 0;
        margin-top: 3%;
      }
    }
    .boots-wrap {
      margin-top: -5%;
      opacity: 1;
      transition: opacity 0.5s;
      position: absolute;
      top: 25%;
      width: 100%;
      height: 55vh;
      left: 0px;
      right: 0px;
      margin: 0px auto;
      z-index: 99;
      &.hide {
        opacity: 0;
        z-index: 0;
      }
      .horizon-img {
        width: 86%;
        z-index: 1;
        bottom: 0;
      }
      .boot-text {
        width: 51%;
        z-index: 4;
        margin: 0 auto;
        margin-bottom: 15%;
      }
      .slide-wrap {
        width: 84%;
        height: 10vh;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        background-repeat: no-repeat;
        background-size: 90% auto;
        background-image: url("@{imgUrl}line.png");
        background-position: 5px 4vh;
        .gesture-img {
          width: 11.78%;
          bottom: 5%;
          right: 7%;
          margin: 0;
          z-index: 10;
          position: absolute;
          animation: gestureMotion 5s infinite;
          &.disappear {
            display: none;
          }
        }
        .boot-img {
          position: absolute;
          bottom: -16%;
          right: 0;
          width: 25%;
          z-index: 5;
          img {
            max-width: 100%;
          }
        }
        &.slide {
          .gesture-img,
          .boot-line,
          .boot-text {
            display: none;
          }
        }
      }
    }
    .photo-cover {
      z-index: 6;
    }
  }
}
@keyframes gestureMotion {
  0% {
    right: 7%;
  }
  100% {
    right: 85%;
  }
}
</style>