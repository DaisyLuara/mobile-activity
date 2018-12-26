<template>
  <div class="content">
    <div class="one">
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
import "animate.css";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/couponrain/",
      //微信分享
      wxShareInfoValue: {
        title: "",
        desc: "",
        link: "" + window.location.search,
        imgUrl: CDNURL + "/fe/image/couponrain/share.png",
      }
    };
  },
  methods: {
    doAnimate() {
      import('pixi.js').then(PIXI => { })
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.exe666.com/fe/image/couponrain/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
}
</style>


