<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
      class="bg"
    >
    <div
      :class="{'x-top':iphoneX,'top':!iphoneX}"
      class="top"
    >
      <img
        :src="baseUrl + 'kuang.png'+ this.$qiniuCompress()"
        class="kuang"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"
      >
    </div>
    <div class="bottom">
      <img
        :src="baseUrl + 'coupon_5.png'+ this.$qiniuCompress()"
        class="coupon"
      >
    </div>
  </div>
</template>
<script>
import { wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
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
      iphoneX: false,
      wxShareInfoValue: {
        title: "圣诞糖果屋",
        desc: "欢乐尽享甜蜜梦幻的圣诞狂欢!",
        link: "http://papi.xingstation.com/api/s/71A" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/christmas_candy/icon.png",
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
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/christmas_candy/";
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
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .top {
    width: 100%;
    height: 90%;
    position: relative;
    margin-top: 8%;
    pointer-events: none;
    user-select: none;
    .kuang {
      width: 75%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
    }
    .photo {
      width: 70.5%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, -0%);
      margin-top: 2.5%;
      user-select: auto;
      pointer-events: auto;
    }
    .save {
      width: 45%;
      position: absolute;
      left: 50%;
      bottom: -1.5%;
      transform: translate(-50%, -0%);
    }
  }
  .x-top {
    height: 75%;
  }
  .bottom {
    width: 100%;
    position: relative;
    margin-top: 24%;
    pointer-events: none;
    user-select: none;
    .coupon {
      width: 70%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      user-select: auto;
      pointer-events: auto;
    }
  }
}
</style>
