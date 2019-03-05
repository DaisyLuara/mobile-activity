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
      :src="base + '2.png'"
      class="save"
    >
    <a
      href="http://papi.xingstation.com/api/s/l2l"
      class="alink"
    >
      <img :src="base + '33.png'">
    </a>
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
        title: "今天，就是恒隆【全场最靓】的崽！",
        desc: "恒隆潮流实验室，等你来搞事儿！",
        link: 'http://papi.xingstation.com/api/s/9DP' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/henglong/icon.jpg"
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/henglong/";
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
    position: relative;
    width: 27%;
    display: block;
    margin-top: 3%;
    margin-bottom: 4%;
  }
  .alink {
    width: 52.5%;
    position: relative;
    display: block;
    margin-bottom: 10%;
  }
}
</style>


