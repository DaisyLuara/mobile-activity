<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'd.png'"
      class="top1"
    >
    <div class="main">
      <img
        :src="base + 'y.png'"
        class="top2"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        :src="base + 'b.png'"
        class="save"
      >
    </div>

  </div>
</template>
<script>
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/fafafa/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: '猪福2019，携手发发发',
        desc: '点击一起发',
        link: process.env.AD_API+'/api/s/EqN' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/fafafa/share.jpg'
      }
    }
  },
  mounted() {
    // if (process.env.NODE_ENV === 'testing') {
    //   this.wxShareInfoValue.link = '' + window.location.search
    // }
  }
}
</script>
<style lang="less" scoped>
@url: "http://cdn.exe666.com/fe/image/fafafa/";
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
  background-image: url("@{url}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .top1 {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .main {
    width: 100%;
    position: relative;
    z-index: 0;
    .top2 {
      width: 72%;
      position: relative;
      z-index: 9;
      margin-top: -1%;
      margin-bottom: -1%;
    }
    .photo {
      width: 75%;
      position: relative;
      border: solid 7px #fff;
      border-radius: 5px;
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
    .save {
      width: 76%;
      position: relative;
      margin-top: 1%;
      z-index: 0;
      margin-bottom: 3%;
    }
  }
}
</style>


