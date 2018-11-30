<template>
  <div :style="style.root" class="root">
    <img :src="baseUrl + 'bg.png'+ this.$qiniuCompress()" class="bg">
  </div>
</template>
<script>
import { wechatShareTrack } from "services";
import { normalPages } from "../../mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/christmas_candy/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: "惊喜~看看和我合照的是谁？",
        desc: "快来商场和神秘人物合拍圣诞照片~",
        link: "http://papi.xingstation.com/api/s/N9z" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/christmas_candy/icon.png",
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
@imageHost: "http://cdn.exe666.com/fe/marketing/img/christmas_candy/";
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
}
</style>
