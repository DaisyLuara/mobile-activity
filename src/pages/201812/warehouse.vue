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
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
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
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="btImg"
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
      baseUrl: cdnUrl + "/fe/marketing/img/dry_warehouse/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "你已签到成功",
        desc: "感谢你的参与",
        link: "http://papi.xingstation.com/api/s/MZQ" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/dry_warehouse/icon.png",
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
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/dry_warehouse/";
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
  .topImg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .btImg {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .frame {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  }
  .photo {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    z-index: 99;
    pointer-events: auto;
    user-select: auto;
  }
  .x-frame {
    width: 88%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    z-index: 9;
  }
  .x-photo {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    z-index: 99;
    pointer-events: auto;
    user-select: auto;
  }
}
</style>
