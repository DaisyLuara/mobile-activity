<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg"
    >
    <img
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame"
    >
    <img
      v-if="photo !== null"
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo"
    >
    <img
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save"
    >
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/pig_green/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "猪年来缤纷城福气满满！",
        desc: "点击领取福气美照 ",
        link: "http://papi.xingstation.com/api/s/Ogg" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/pig_green/icon.png",
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/pig_green/";
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
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  .topImg {
    width: 100%;
  }
  .frame {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-49%, -54%);
  }
  .x-frame {
    transform: translate(-49%, -63%);
  }
  .save {
    width: 50%;
    position: absolute;
    left: 26%;
    bottom: 0.5%;
    animation: arrow 0.5s linear infinite alternate;
  }
  .x-save {
    width: 55%;
    position: absolute;
    left: 23.5%;
    bottom: 14.5%;
    animation: arrow 0.5s linear infinite alternate;
  }
  .photo {
    width: 64.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-49%, -46.6%);
    pointer-events: auto;
    user-select: auto;
  }
  .x-photo {
    transform: translate(-49%, -57.6%);
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