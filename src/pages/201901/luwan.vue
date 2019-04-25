<template>
  <div 
    :style="style.root" 
    class="warp">
    <img 
      :src="base + 'bg.png?v=1' + this.$qiniuCompress()" 
      class="bg">
    <a 
      href="http://papi.xingstation.com/api/s/Y70" 
      class="tolink"/>
    <div class="main">
      <img 
        :src="base + 'tu.png' + this.$qiniuCompress()" 
        class="frame">
      <img 
        :src="photo" 
        class="photo">
    </div>
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
const CDN_URL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + "/fe/image/luwan/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "快快领取 新年红包",
        desc: "金猪送福 新年大吉",
        link: "http://papi.xingstation.com/api/s/Z8v" + window.location.search,
        imgUrl: CDN_URL + "/fe/image/luwan/share.png"
      }
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "testing") {
      this.wxShareInfoValue.link = "" + window.location.search;
    }
  }
};
</script>
<style lang="less" scoped>
@url: "http://cdn.xingstation.cn/fe/image/luwan/";
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
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  background-color: #ffe133;
  .bg {
    position: relative;
    z-index: 0;
    width: 100%;
  }
  .tolink {
    display: inline-block;
    position: absolute;
    top: 31.5%;
    left: 22%;
    border-radius: 5px;
    width: 55%;
    height: 5.6%;
    z-index: 999;
  }
  .main {
    width: 71.5%;
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    .frame {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 97%;
      position: absolute;
      top: 1%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>


