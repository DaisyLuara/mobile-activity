<template>
  <div
    :style="style.root"
    class="root"
  >

  </div>
</template>
<script>
import { normalPages } from "../../mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/simle_atm/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: "穿越仙境 爱意暖冬",
        desc: "点击领取专属照片",
        link: "http://papi.xingstation.com/api/s/3QQ" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/simle_atm/icon.png",
        success: () => {
          wechatShareTrack();
        }
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
@imageHost: "http://cdn.exe666.com/fe/marketing/img/simle_atm/";
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
  background: #ee658c;
}
</style>
