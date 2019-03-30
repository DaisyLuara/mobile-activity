<template>
  <div class="warp">
    <img
      :src="base + 'm.png'"
      class="monkey"
    >
    <a
      href="http://papi.xingstation.com/api/s/ojN"
      class="link"
    >
      <img :src="base + 'listen.png'">
    </a>
    <a
      href="http://papi.xingstation.com/api/s/r9k"
      class="egg"
    >
      <img :src="base + 'egg.png'">
    </a>
    <div class="picture">
      <img
        :src="base + 'kuang.png'"
        class="bg"
      >
      <img
        :src="photo"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/artspire/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: "artspire 童绘 免费试听课",
        desc: "让儿童在耳濡目染中体验艺术",
        link: 'http://papi.xingstation.com/api/s/pkr' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/artspire/icon.png"
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/artspire/";
html,
body {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
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
.warp {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{img}bg1.png");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .monkey {
    width: 23%;
    position: absolute;
    top: 0%;
    right: 0%;
    z-index: 99;
  }
  .link {
    position: relative;
    display: block;
    width: 81%;
    z-index: 0;
    margin-top: 22%;
  }
  .egg {
    position: relative;
    display: block;
    width: 81%;
    z-index: 0;
    margin-top: 8%;
  }
  .picture {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    margin-top: 10%;
    margin-bottom: 20%;
    z-index: 0;
    .bg {
      position: relative;
      z-index: 99;
      width: 73%;
    }
    .photo {
      width: 67.4%;
      position: absolute;
      top: 2%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>


