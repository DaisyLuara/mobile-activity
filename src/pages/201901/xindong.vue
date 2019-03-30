<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'flotage1.png'"
      class="top"
    >
    <div class="main">
      <img
        :src="base + 'frame.png'"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="base + 'button.png'"
      class="save"
    >
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMG_SERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMG_SERVER + '/fe/image/xindong/',
      //分享
      wxShareInfoValue: {
        title: '心动时刻，遇见爱情',
        desc: '亲，你有一条亲密简讯',
        link: 'http://papi.xingstation.com/api/s/RPL' + window.location.search,
        imgUrl: 'http://cdn.xingstation.com/fe/image/xindong/icon.png'
      }
    }
  },
  mounted() { },
  methods: {}
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.com/fe/image/xindong/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-image: url("@{imgUrl}flotage2.png"), url("@{imgUrl}bg.png");
  background-position: center top, center center;
  background-size: 100% auto, 100% auto;
  background-repeat: no-repeat, repeat;
  padding-top: 15%;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
  .main {
    width: 100%;
    position: relative;
    background-image: url("@{imgUrl}flotage3.png");
    background-position: center 92%;
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: 0;
    .frame {
      width: 81%;
      position: relative;
      z-index: 999;
    }
    .photo {
      width: 56%;
      position: absolute;
      top: 3%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 60%;
    position: relative;
    z-index: 0;
    margin-bottom: 8%;
  }
}
</style>


