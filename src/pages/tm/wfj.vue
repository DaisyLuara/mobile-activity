<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        :src="base + 'Frame.png' + this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="base + 'g.gif'"
      class="up"
    >
    <img
      :src="base + 'Front.png' + this.$qiniuCompress()"
      class="front"
    >
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
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
      base: IMG_SERVER + '/fe/image/tm/wfj/',
      //分享
      wxShareInfoValue: {
        title: 'Fun肆玩尽情GO',
        desc: '王福井ONE岁生日快乐！',
        link: 'http://papi.xingstation.com/api/s/wjR' + window.location.search,
        imgUrl: IMG_SERVER + '/fe/image/tm/wfj/icon.jpg',
      }
    }
  },
  mounted() { },
  methods: {}
}
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.xingstation.com/fe/image/tm/wfj/";
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
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{imgUrl}bg.jpg");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main {
    position: relative;
    margin-top: 34%;
    width: 100%;
    overflow: hidden;
    z-index: 9;
    .frame {
      position: relative;
      width: 82.2%;
      z-index: 0;
    }
    .photo {
      width: 74%;
      position: absolute;
      top: 1.6%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .up {
    width: 5%;
    display: block;
    position: relative;
    z-index: 9;
    margin-top: -2%;
  }
  .front {
    position: relative;
    z-index: 99;
    margin-top: -25%;
  }
}
</style>


