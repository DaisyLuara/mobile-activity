<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="top">
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        :class="{'x-frame':iphoneX,'frame':!iphoneX}"
        class="frame"
      >
      <img
        :src="baseUrl + 'up.png'+ this.$qiniuCompress()"
        class="upImg"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo real-photo"
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
      baseUrl: cdnUrl + "/fe/marketing/img/expressions_imitate/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "表情模仿 火热进行中",
        desc: "参与互动 保存最美瞬间",
        link: "http://papi.xingstation.com/api/s/nx4" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/expressions_imitate/icon.png",
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
  },
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/expressions_imitate/";
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
  align-items: center;
  position: relative;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .top {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 85%;
      margin-top: 8%;
    }
    .x-frame {
      width: 93%;
    }
    .upImg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
    }
    .photo {
      width: 58%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49%, -41.5%);
      z-index: 8;
      pointer-events: auto;
      user-select: auto;
    }
    .x-photo {
      width: 63.8%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49.5%, -41.6%);
      z-index: 8;
      pointer-events: auto;
      user-select: auto;
    }
    .real-photo {
      opacity: 0;
      z-index: 999;
    }
  }
  .save {
    width: 68%;
    position: relative;
  }
}
</style>
