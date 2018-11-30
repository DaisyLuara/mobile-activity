<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top2.png'+ this.$qiniuCompress()"
      class="top"
    >
    <div
      class="bt"
      :class="{'x-bt':iphoneX,'bt':!iphoneX}"
    >
      <img
        :src="baseUrl + 'mid.png'+ this.$qiniuCompress()"
        class="mid"
      >
      <img
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="bottom"
      >
    </div>

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
      baseUrl: cdnUrl + "/fe/marketing/img/christmas_throw/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: "Merry Christmas",
        desc: "我的圣诞礼物卡",
        link: "http://papi.xingstation.com/api/s/W7g" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/christmas_throw/icon.jpg",
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
  },
  methods: {
    go() {
      console.log("111111");
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/christmas_throw/";
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
  .top {
    width: 100%;
    position: relative;
  }
  .bt {
    width: 100%;
    position: absolute;
    left: 0;
    top: 30%;
    .mid {
      width: 100%;
    }
    .bottom {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 9;
    }
  }
  .x-bt {
    width: 100%;
    position: absolute;
    left: 0;
    top: 34%;
  }
  // .mid {
  //   width: 100%;
  //   position: relative;
  // }
  // .bottom {
  //   width: 100%;
  //   position: relative;
  // }
}
</style>
