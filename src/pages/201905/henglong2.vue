<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + '1.png'"
        class="cover"
      >
      <img
        :src="photo"
        class="photo"
      >
    </div>
    <img
      :src="base + 'arrow.gif'"
      class="arrow"
    >
    <img
      :src="base + 'save3.png'"
      class="save"
    >
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
      base: CDN_URL + '/fe/image/henglong/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: "潮流向上，吸睛由我！",
        desc: "点击查看好友的潮流靓照",
        link: 'http://papi.xingstation.com/api/s/14o' + window.location.search,
        imgUrl: CDN_URL + "/fe/image/henglong/icon2.jpg"
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/henglong/";
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
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  position: relative;
  overflow-x: hidden;
  background-image: url("@{img}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: repeat;
  padding-top: 8%;
  .main {
    width: 86%;
    position: relative;
    overflow-x: hidden;
    margin-left: 10%;
    .photo {
      width: 74.4vw;
      position: absolute;
      top: 0.65%;
      left: 1.1%;
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
    .cover {
      width: 86vw;
      position: relative;
      z-index: 99;
    }
  }
  .arrow {
    width: 4.5%;
    display: block;
    position: relative;
    margin-top: 2%;
  }
  .save {
    width: 52.5%;
    position: relative;
    display: block;
    margin-bottom: 10%;
    margin-top: 3%;
  }
}
</style>


