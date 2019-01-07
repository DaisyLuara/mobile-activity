<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top2.png'+ this.$qiniuCompress()"
      class="topImg"
    >
    <img
      :src="baseUrl + 'lion.png'+ this.$qiniuCompress()"
      class="lion"
    >
    <div class="contain">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
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
      baseUrl: cdnUrl + "/fe/marketing/img/happy_newYear/",
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
        imgUrl: cdnUrl + "/fe/marketing/img/happy_newYear/icon.png"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/happy_newYear/";
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
  }
  .contain {
    position: relative;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 92%;
    }
    .save {
      width: 50%;
      margin-top: -25%;
      animation: arrow 0.5s linear infinite alternate;
    }
    .photo {
      width: 67.55%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55.8%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .lion {
    width: 32%;
    position: absolute;
    left: 0;
    bottom: 0;
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
