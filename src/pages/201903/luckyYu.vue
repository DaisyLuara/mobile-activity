<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'l.png'"
      class="cover left"
    >
    <img
      :src="base + 'r.png'"
      class="cover right"
    >
    <img
      :src="base + 'lutos2.png'"
      class="cover lutos"
    >
    <div
      :style="style.root"
      class="main"
    >
      <div class="picture">
        <img
          :src="photo"
          class="photo"
        >
        <img
          :src="base + 'save.png'"
          class="save"
        >
        <img
          :src="base + 'hana.png'"
          class="cover hana"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/luckyyu/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: "幸运锦鲤",
        desc: "幸运锦鲤",
        link: 'http://papi.xingstation.com/api/s/j0z' + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/luckyyu/icon.png"
      }
    }
  },
  mounted() { },
  methods: {}
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/luckyyu/";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
.warp {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-color: #011e26;
  background-image: url("@{img}bg.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% auto;
  .cover {
    position: absolute;
    z-index: 99;
  }
  .left {
    height: 104%;
    bottom: 0%;
    left: 0%;
  }
  .right {
    height: 100%;
    bottom: 0%;
    right: 0%;
  }

  .lutos {
    width: 21.5%;
    top: 67%;
    right: 3%;
  }
  .main {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .picture {
      width: 67.5%;
      position: relative;
      z-index: 0;
      margin-top: -11%;
      .photo {
        position: relative;
        display: block;
        pointer-events: auto;
        user-select: auto;
        border: solid 8px #5fc579;
        border-radius: 10px;
      }
      .save {
        width: 95%;
        margin-top: 2%;
        position: relative;
        display: block;
      }
      .hana {
        width: 20.5%;
        bottom: -9.4%;
        left: 28%;
      }
    }
  }
}
</style>


