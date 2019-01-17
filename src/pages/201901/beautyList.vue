<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'p2/text.png'"
      class="title"
    >
    <img
      :src="base + 'p2/arrow.png'"
      class="arrow"
    >
    <div class="main">
      <!-- <ul class="ul-list">
        <li
          v-for="(item ,index) in [photo,photo,photo,photo,photo]"
          :key="index"
          class="list-li"
        >
          <img
            :src="base + 'p2/photo.png'"
            class="bg"
          >
          <img
            :src="item"
            class="photo"
          >
        </li>
      </ul> -->
      <div
        v-for="(item ,index) in [photo,photo,photo,photo,photo]"
        :key="index"
        class="list-item"
      >
        <img
          :src="base + 'p2/photo.png'"
          class="bg"
        >
        <img
          :src="item"
          class="photo"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, newGameList, gameListNeedCheck } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/beauty/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      // list: [this.photo, this.photo, this.photo, this.photo, this.photo, this.photo],
      //微信分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        imgUrl: CDN_URL + '/fe/image/beauty/icon.png'
      }
    }
  },
  mounted() {
  },
  watch: {
    userinfo() {

    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.exe666.com/fe/image/beauty/";
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
  background-image: url("@{url}p2/back2.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  .title {
    width: 35%;
    position: relative;
    z-index: 0;
    margin-top: 5%;
  }
  .arrow {
    width: 7.5%;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
  .main {
    position: relative;
    width: 85%;
    z-index: 0;
    display: flex;
    margin-top: 3%;
    margin-bottom: 5%;
    // flex-direction: row;
    // justify-content: space-brtween;
    flex-flow: row wrap;
    text-align: left;
    .list-item {
      position: relative;
      margin: 0;
      width: 40vw;
      // flex-grow: 1;
      margin-top: 5%;
      .bg {
        position: relative;
        z-index: 0;
      }
      .photo {
        width: 38vw;
        position: absolute;
        top: -0.5%;
        left: 4%;
        z-index: 99;
      }
    }
  }
}
</style>

