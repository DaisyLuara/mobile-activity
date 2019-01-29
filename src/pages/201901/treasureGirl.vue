<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="content">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      class="save"
    >
    <img
      :src="baseUrl + 'logo.png'+ this.$qiniuCompress()"
      class="logo"
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
      baseUrl: cdnUrl + "/fe/marketing/img/treasure_girl/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      wxShareInfoValue: {
        title: "遇见最可爱的你",
        desc: "与众不同 点击领取",
        link: "http://papi.xingstation.com/api/s/k2x" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/treasure_girl/icon.png"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/treasure_girl/";
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
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  .content {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 90%;
    }
    .photo {
      width: 73%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49%, -36%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 75%;
    position: relative;
    margin-top: -10%;
    animation: arrow 0.5s linear infinite alternate;
  }
  .logo {
    width: 45%;
    position: relative;
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
