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
      <ul class="ul-list">
        <li
          v-for="item in list"
          :key="item.id"
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
      </ul>
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
      arr: [],
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
  .main {
    position: relative;
    width: 100%;
    margin-top: 6%;
    .frame {
      width: 84.5%;
      position: relative;
      z-index: 0;
      margin-left: 4%;
    }
    .photo {
      position: absolute;
      top: 3%;
      left: 13.5%;
      width: 66.5%;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .tolink {
    position: relative;
    width: 43%;
    margin-top: 5.5%;
  }
}
</style>

