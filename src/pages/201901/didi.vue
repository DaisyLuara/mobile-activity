<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'frame.png' + this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="photo"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const CDN_URL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + "/fe/image/didi/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "滴滴司机，不平凡，更温暖",
        desc: "早办证早稳定早赚钱~",
        link: process.env.AD_API + "/api/s/WPW" + window.location.search,
        imgUrl: CDN_URL + "/fe/image/didi/share.png"
      }
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "testing") {
      this.wxShareInfoValue.link =
        process.env.AD_API + "/api/s/7LA" + window.location.search;
    }
  }
};
</script>
<style lang="less" scoped>
@url: "http://cdn.xingstation.cn/fe/image/didi/";
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
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  background-color: #ffa92e;
  background-image: url("@{url}top.png"), url("@{url}back.jpg");
  background-position: center top, center bottom;
  background-size: 53% auto, 100% auto;
  background-repeat: no-repeat, no-repeat;
  .main {
    width: 87%;
    position: relative;
    .frame {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 85.5%;
      position: absolute;
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>


