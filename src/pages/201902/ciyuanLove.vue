<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'top.png'"
        class="top"
      >
      <div class="border">
        <img
          :src="photo"
          class="photo"
        >
      </div>
      <img
        :src="base + 'save.png'"
        class="save"
      >
    </div>
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
      base: CDNURL + '/fe/image/ciyuanLove/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      wxShareInfoValue: {
        title: '恭喜你，喜提“二次元”小情人一枚！',
        desc: '从今以后，再也不用吃狗粮了~',
        link: 'http://papi.xingstation.com/api/s/4z2' + window.location.search,
        imgUrl: CDNURL + '/fe/image/ciyuanLove/icon.jpg'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/ciyuanLove/";
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
.warp {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #000;
  background-image: url("@{img}mid.png"), url("@{img}bg.png");
  background-position: center 100%, center top;
  background-size: 100% auto, 100% auto;
  background-repeat: no-repeat, repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin-top: 3%;
    margin-bottom: 2%;
    .top {
      position: relative;
      z-index: 99;
      margin-bottom: -20%;
    }
    .border {
      width: 59%;
      position: relative;
      border: solid 4px #fff;
      border-radius: 5px;
      z-index: 0;
      text-align: center;
      padding-top: 2%;
      padding-bottom: 3%;
      .photo {
        width: 90%;
        pointer-events: auto;
        user-select: auto;
      }
    }
    .save {
      width: 39%;
      position: relative;
      z-index: 0;
      margin-top: 1%;
    }
  }
}
</style>


