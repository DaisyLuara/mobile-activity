<template>
  <div
    :style="style.root"
    class="warp"
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
        :src="base + 'save.png'"
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
      base: CDN_URL + '/fe/image/pika/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: "皮卡丘",
        desc: "皮卡皮卡皮卡",
        link: 'http://papi.xingstation.com/api/s/G8Q' + window.location.search,
        imgUrl: CDN_URL + "/fe/image/pika/icon.png"
      }
    }
  },
}
</script>
<style lang="less" scoped>
@imgurl: "http://cdn.xingstation.cn/fe/image/pika/";
html,
body {
  width: 100%;
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
.warp {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@{imgurl}bg.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  .bg {
    position: relative;
    z-index: 0;
  }
  .main {
    width: 66.5%;
    position: relative;
    .picture {
      width: 100%;
      position: relative;
      z-index: 0;
      margin-top: 5%;
      .photo {
        width: 85%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
    }
    .save {
      margin-top: 6%;
      position: relative;
      z-index: 0;
      animation: arrow linear 0.8s infinite alternate;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-15px);
  }
}
</style>


