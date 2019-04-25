<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'slogan.png'"
        class="slogan"
      >
      <div class="picture">

        <img
          :src="base + 'frame.png'"
          class="cover"
        >
        <img
          :src="photo"
          class="photo"
        >
      </div>
      <img
        :src="base + 'save.png'"
        class="save"
      >
    </div>

    <img
      :src="base + 'p1.png'"
      class="p1"
    >
    <img
      :src="base + 'p2.png'"
      class="p2"
    >
  </div>
</template>
<script>
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/butterfly/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: '蝶嬉春光',
        desc: '蝶嬉春光',
        link: 'http://papi.xingstation.com/api/s/B6n' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/butterfly/icon.png'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.xingstation.cn/fe/image/butterfly/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
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
  width: 100%;
  position: relative;
  background-color: #ffc2d2;
  background-image: url("@{url}bg2.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .main {
    position: relative;
    width: 100%;
    margin-bottom: 15%;
    z-index: 99;
    .slogan {
      width: 50%;
      position: relative;
      margin-top: 6%;
      margin-bottom: 5%;
    }
    .picture {
      width: 100%;
      position: relative;
      .photo {
        width: 61%;
        position: absolute;
        top: 2.8%;
        left: 19%;
        z-index: 0;
        pointer-events: auto;
        user-select: auto;
      }
      .cover {
        position: relative;
        width: 80%;
        z-index: 99;
      }
    }
    .save {
      width: 67%;
      position: relative;
      animation: arrow 0.6s linear infinite alternate;
      z-index: 9;
      margin-top: 2%;
    }
  }
  .p1 {
    position: absolute;
    width: 56%;
    z-index: 0;
    bottom: -5%;
    right: -22%;
  }
  .p2 {
    position: absolute;
    width: 56%;
    z-index: 0;
    bottom: -10%;
    left: -20%;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
</style>


