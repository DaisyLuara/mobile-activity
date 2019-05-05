<template>
  <div class="warp">
    <img
      :src="base + 'bg.png'"
      class="bg"
    >
    <img
      :src="base + 'bg1.png'"
      class="cover1"
    >
    <img
      :src="base + 'bg2.png'"
      class="cover2"
    >
    <img
      :src="base + 'bg3.png'"
      class="cover3"
    >
    <img
      :src="base + 'logo.png'"
      class="logo"
    >
    <div class="main">
      <div class="picture">
        <img
          :src="base + 'frame.png'"
          class="bg"
        >
        <img
          :src="photo"
          class="photo"
        >
      </div>
      <img
        :src="base + 'button.png'"
        class="save"
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
      base: CDN_URL + '/fe/image/changzhou/',
      //share
      wxShareInfoValue: {
        title: '您的吃货海报已生成！',
        desc: '点击领取专属照~',
        link: 'http://papi.xingstation.com/api/s/ExK' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/changzhou/icon.png'
      }
    }
  },
  mounted() { }
}
</script>
<style lang="less" scoped>
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
  .cover1 {
    width: 25%;
    position: absolute;
    top: 58%;
    left: -4%;
    z-index: 999;
  }
  .cover2 {
    width: 21%;
    position: absolute;
    top: 75%;
    right: -4%;
    z-index: 999;
  }
  .cover3 {
    width: 32%;
    position: absolute;
    top: 2%;
    right: -14%;
    z-index: 999;
  }
  .logo {
    width: 45%;
    position: absolute;
    top: 10%;
    left: 7%;
    z-index: 0;
    display: block;
  }
  .main {
    width: 100%;
    position: absolute;
    z-index: 9;
    top: 14.5%;
    left: 0%;
    .picture {
      width: 100%;
      position: relative;
      .bg {
        width: 74%;
      }
      .photo {
        width: 64.5%;
        position: absolute;
        top: 49%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
    }
    .save {
      width: 55.5%;
      position: relative;
      animation: arrow 0.6s linear infinite alternate;
    }
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


