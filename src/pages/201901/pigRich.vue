<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="content">
      <img
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class="topImg"
      >
      <img
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>

    <img
      :src="baseUrl + '3.png'+ this.$qiniuCompress()"
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
      baseUrl: cdnUrl + "/fe/marketing/img/pig_rich/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "新年发发发，好运带回家！",
        desc: "星视度祝您新年快乐！",
        link: "http://papi.xingstation.com/api/s/x6J" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/pig_rich/icon.jpg"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/pig_rich/";
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
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  .content {
    position: relative;
    pointer-events: none;
    user-select: none;
    .topImg {
      width: 90%;
      margin-top: 2%;
    }
    .frame {
      width: 56%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .photo {
      width: 54%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 60%;
    position: relative;
    margin-top: -7%;
  }
}
</style>
