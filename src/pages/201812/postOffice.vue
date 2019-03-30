<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'f1.png'+ this.$qiniuCompress()"
      class="front-1"
    >
    <img
      :src="baseUrl + 'f2.png'+ this.$qiniuCompress()"
      class="front-2"
    >
    <img
      :src="baseUrl + 'post.png'+ this.$qiniuCompress()"
      :class="{'x-post':iphoneX,'post':!iphoneX}"
      class="post"
    >
    <img
      v-if="photo !== null"
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo"
    >
    <img
      :src="baseUrl + 'G.gif'+ this.$qiniuCompress()"
      class="jiantou"
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
      baseUrl: cdnUrl + "/fe/marketing/img/post_office/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "刷脸制作圣诞贺卡，送给你爱的TA",
        desc: "这个圣诞节，玩点不一样~",
        link: "http://papi.xingstation.com/api/s/0YX" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/post_office/icon.jpg",
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
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/post_office/";
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
  background-image: url("@{imageHost}background.png");
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  .front-1 {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
  }
  .front-2 {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
  }
  .post {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -53%);
  }
  .x-post {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49%);
  }
  .photo {
    width: 70.2%;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -53%);
    transform: translate(-50.65%, -53%);
    z-index: 99;
    pointer-events: auto;
    user-select: auto;
  }
  .x-photo {
    width: 78.2%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50.65%, -43%);
    z-index: 99;
    pointer-events: auto;
    user-select: auto;
  }
  .jiantou {
    width: 7%;
    position: absolute;
    left: 50%;
    top: 74%;
    transform: translate(-50%, 0%);
  }
}
</style>
