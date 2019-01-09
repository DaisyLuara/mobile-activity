<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg"
    >
    <div class="center">
      <!-- <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      > -->
    </div>
    <div class="bt">
      <img
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="btImg"
      >
      <img
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav"
      >
      <img
        :src="baseUrl + 'hammer_left.png'+ this.$qiniuCompress()"
        class="left"
      >
      <img
        :src="baseUrl + 'hammer_right.png'+ this.$qiniuCompress()"
        class="right"
      >
    </div>

  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/new_luck/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "亲爱的，新年快乐!",
        desc: "猪年大吉，猪事顺利",
        link: "http://papi.xingstation.com/api/s/RlL" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/new_luck/icon.png"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/new_luck/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  font-size: 10px;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  .topImg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
  }
  // .center {
  //   width: 78%;
  //   height: 85%;
  //   background: #f9f1dc;
  //   position: relative;

  //   .photo {
  //     width: 85%;
  //     position: absolute;
  //     left: 50%;
  //     top: 50%;
  //     transform: translate(-50%, -50%);
  //   }
  // }
  .bt {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
    .btImg {
      width: 100%;
    }
    .nav {
      width: 22%;
      position: absolute;
      left: 50%;
      top: -6%;
      transform: translate(-50%, 0);
    }
    .left {
      width: 27%;
      position: absolute;
      left: 15%;
      top: 9%;
    }
    .right {
      width: 27%;
      position: absolute;
      right: 15%;
      top: 5%;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
