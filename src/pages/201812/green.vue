<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="cot">
      <img
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        :class="{'x-save':iphoneX,'save':!iphoneX}"
        class="save"
      >
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
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
        :src="baseUrl + 'bt.png'+ this.$qiniuCompress()"
        class="btImg"
      >
      <img
        :src="baseUrl + 'logo.png'+ this.$qiniuCompress()"
        class="logo"
      >
    </div>
    <div class="bt">
      <img
        :src="baseUrl + 'content.png'+ this.$qiniuCompress()"
        class="content"
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
      baseUrl: cdnUrl + "/fe/marketing/img/green_space/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "绿地狂欢 圣诞派送",
        desc: "更多活动 等你来参加",
        link: "http://papi.xingstation.com/api/s/mOp" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/green_space/icon.png",
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
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/green_space/";
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
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .cot {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-image: url("@{imageHost}bg.png");
    background-size: 100% auto;
    background-position: center bottom;
    background-repeat: no-repeat;
    pointer-events: none;
    user-select: none;
    .save {
      width: 65%;
      margin-top: 4%;
    }
    .x-save {
      width: 75%;
      margin-top: 15%;
    }
    .frame {
      width: 94%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .x-frame {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -47%);
    }
    .photo {
      width: 67%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -47.5%);
      pointer-events: auto;
      user-select: auto;
    }
    .x-photo {
      width: 71%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -43.5%);
      pointer-events: auto;
      user-select: auto;
    }
    .btImg {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .logo {
      width: 50%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-53%, 0);
      z-index: 9;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .content {
      width: 100%;
    }
  }
}
</style>
