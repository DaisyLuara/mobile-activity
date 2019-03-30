<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'photobasic.png'+ this.$qiniuCompress()"
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
      :src="baseUrl + 'plane.png'+ this.$qiniuCompress()"
      class="plane"
    >
    <img
      :src="baseUrl + 'hint.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
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
      baseUrl: cdnUrl + "/fe/marketing/img/christmas_gift/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "狂欢过圣诞，解锁送礼新姿势",
        desc: "这个圣诞，玩点不一样。",
        link: "http://papi.xingstation.com/api/s/lx6" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/christmas_gift/icon.png",
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
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/christmas_gift/";
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
  background-image: url("@{imageHost}bg2.png");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .frame {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .x-frame {
    width: 72%;
  }
  .photo {
    width: 56%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    user-select: auto;
  }
  .x-photo {
    width: 68%;
  }
  .plane {
    width: 35%;
    position: absolute;
    right: 2%;
    top: 5%;
  }
  .save {
    width: 65%;
    position: absolute;
    left: 50%;
    bottom: 3%;
    transform: translate(-50%, 0%);
  }
  .x-save {
    width: 65%;
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0%);
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
