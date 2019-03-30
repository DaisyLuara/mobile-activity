<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg"
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
    </div>
    <img
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
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
      baseUrl: cdnUrl + "/fe/marketing/img/flavor/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "风味上海",
        desc: "最美凯德 醉美上海",
        link: "http://papi.xingstation.com/api/s/ywV" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/flavor/icon.png"
      }
    };
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/flavor/";
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
  background: #080b3f;
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
      width: 100%;
      margin-top: 18%;
    }
    .photo {
      width: 58%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -41%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 45%;
    position: relative;
    margin-top: 8%;
  }
}
</style>
