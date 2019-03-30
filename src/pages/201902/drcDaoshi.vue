<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'bird.png'"
      class="cover1"
    >
    <img
      :src="base + 'leafright.png'"
      class="cover2"
    >

    <div class="main">
      <img
        :src="base + 'frame.png'"
        class="frame"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'button.png'"
        class="save"
      >
    </div>
    <img
      :src="base + 'leafleft.png'"
      class="cover3"
    >
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from "@/mixins/normalPages";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + '/fe/image/drcDaoshi/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      wxShareInfoValue: {
        title: '金猪送福 春暖花开',
        desc: '点击领取 新年照片',
        link: 'http://papi.xingstation.com/api/s/27J' + window.location.search,
        imgUrl: CDNURL + '/fe/image/drcDaoshi/icon.png'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/drcDaoshi/";
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
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{img}bg1.png"), url("@{img}bg.png");
  background-position: center top, center top;
  background-size: 100% 100%, 100% auto;
  background-repeat: no-repeat, repeat;
  .cover1 {
    width: 22%;
    position: absolute;
    top: 3.5%;
    left: 2%;
    z-index: 999;
  }
  .cover2 {
    width: 28%;
    position: absolute;
    top: 0%;
    right: 0%;
    z-index: 999;
  }
  .main {
    position: relative;
    width: 100%;
    z-index: 0;
    margin-top: 9%;
    .frame {
      position: relative;
      width: 96%;
      z-index: 99;
    }
    .photo {
      width: 62.5%;
      position: absolute;
      top: 4%;
      left: 47.6%;
      transform: translateX(-50%);
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
    .save {
      position: relative;
      z-index: 99;
      width: 62.5%;
      margin-top: -3%;
      margin-bottom: 10%;
    }
  }
  .cover3 {
    width: 20%;
    position: fixed;
    bottom: 0%;
    left: 0%;
    z-index: 999;
  }
}
</style>


