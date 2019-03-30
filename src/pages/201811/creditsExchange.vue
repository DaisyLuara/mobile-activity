<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="cot">
      <img
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"
      >
      <img
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="center-t"
      >
      <img
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
        class="center-b"
      >
    </div>
    <img
      :src="baseUrl + 'bg_01.png'+ this.$qiniuCompress()"
      class="bg1"
    >
    <img
      :src="baseUrl + 'bg_02.png'+ this.$qiniuCompress()"
      class="bg2"
    >
  </div>
</template>
<script>
import { wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/credits_exchange/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "【积分换礼】VIP专属福利",
        desc: "好礼不断，立即点击兑换",
        link: "http://papi.xingstation.com/api/s/Xom" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/credits_exchange/icon.png"
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
  },
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/credits_exchange/";
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
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .cot {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0%);
    z-index: 99;
    margin-top: 10%;
    pointer-events: none;
    user-select: none;
    .photo {
      width: 70%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 1.8%);
      z-index: 100;
      user-select: auto;
      pointer-events: auto;
    }
    .frame {
      width: 74%;
      position: relative;
    }
    .save {
      width: 50%;
      position: relative;
      margin-top: 5%;
    }
    .center-t {
      width: 85%;
      position: relative;
      margin-top: 6%;
    }
    .center-b {
      width: 85%;
      position: relative;
      user-select: auto;
      pointer-events: auto;
    }
  }
  .bg1 {
    width: 100%;
    position: relative;
  }
  .bg2 {
    width: 100%;
    position: relative;
    margin-top: -1%;
  }
}
</style>
