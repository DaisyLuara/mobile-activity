<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="contain">
      <img
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="topImg"
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
        imgUrl: cdnUrl + "/fe/marketing/img/pig_green/icon.png"
      }
    };
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
  .contain {
    position: relative;
    margin-top: 5%;
  }
}
</style>
