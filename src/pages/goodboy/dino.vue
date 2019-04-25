<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base + 'frame.png'"
        class="frame"
      >
      <div class="picture">
        <img
          :src="photo + this.$qiniuCompress()"
          class="photo"
        >
      </div>
      <span class="score">{{ score }}</span>
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat
} from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMAGE_SERVER = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMAGE_SERVER + '/fe/image/dino/',
      photo: null,
      score: this.$route.query.score,
      parms: null,
      id: this.$route.query.id,
      belong: null,
      userId: null,
      //微信分享
      wxShareInfoValue: {
        title: '限时活动丨PK游戏之王赢大奖',
        desc: '点击领取你的游戏结果',
        link: process.env.AD_API+'/api/s/0Rv' + window.location.search,
        imgUrl: IMAGE_SERVER + 'share.png',
        success: () => {
          wechatShareTrack();
        }
      }
    }
  },
  mounted() {
    this.getPhoto()
  },
  methods: {
    getPhoto() {
      let timer = requestAnimationFrame(this.getPhoto)
      if (this.photo) {
        cancelAnimationFrame(timer)
        this.score = this.parms.score
      }
    }
  }
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: "mianhuatang";
  src: url("https://cdn.xingstation.cn/fe/font/mianhuatang.ttf");
}
@base: "https://cdn.xingstation.cn/fe/image/dino/";
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
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #ee9616;
  background-image: url("@{base}bg.png");
  background-position: center bottom;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .main {
    width: 100%;
    position: relative;
    z-index: 9;
    margin-top: 2%;
    margin-bottom: 64%;
    .frame {
      position: relative;
      z-index: 0;
      width: 94%;
    }
    .picture {
      width: 34vw;
      height: 34vw;
      position: absolute;
      top: 11.5%;
      left: 50%;
      transform: translateX(-50%);
      border: solid 10px #fff;
      border-radius: 50%;
      overflow: hidden;
      z-index: 99;
      .photo {
        vertical-align: middle;
        object-fit: contain;
        object-position: center;
        margin: 0 auto;
      }
    }
    .score {
      position: absolute;
      top: 58%;
      left: 51%;
      color: #fff;
      font-size: 15vw;
      font-family: "mianhuatang";
      z-index: 99;
    }
  }
}
</style>


