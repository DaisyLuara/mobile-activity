<template>
  <div
    :style="style.root"
    class="root"
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
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save"
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
      baseUrl: cdnUrl + "/fe/marketing/img/synthetic/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: "HELLO CITY",
        desc: "创享 生活 新趣",
        link: "http://papi.xingstation.com/api/s/k8X" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/synthetic/icon.png",
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
@imageHost: "http://cdn.exe666.com/fe/marketing/img/synthetic/";
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
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
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
    transform: translate(-50%, -50%);
  }
  .photo {
    width: 70.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-51%, -59.2%);
    pointer-events: auto;
    user-select: auto;
  }
  .x-photo {
    width: 74.8%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-51%, -59.4%);
    pointer-events: auto;
    user-select: auto;
  }
  .save {
    width: 70%;
    position: absolute;
    left: 15%;
    bottom: 2%;
    z-index: 9;
    animation: arrow 0.8s linear infinite alternate;
  }
  .x-save {
    width: 70%;
    position: absolute;
    left: 15%;
    bottom: 6%;
    z-index: 9;
    animation: arrow 0.8s linear infinite alternate;
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
