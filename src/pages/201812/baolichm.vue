<template>
  <div class="content">
    <div class="one">
      <img :src="base + 'img1.png'">
    </div>
    <div class="two">
      <img :src="base + 'img2.png'" class="pbg">
      <img :src="photo" class="photo">
      <img :src="base + 'note.png'" class="note">
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "../../mixins/normalPages";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/baolichm/",
      photo: null,
      //微信分享
      wxShareInfoValue: {
        title: "宝贝，你的圣诞礼物",
        desc: "慈溪保利，圣诞有礼",
        link: "" + window.location.search,
        imgUrl: CDNURL + "/fe/image/baolichm/share.png",
        success: () => {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.exe666.com/fe/image/baolichm/";
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
  .one {
    width: 100%;
    position: relative;
  }
  .two {
    width: 100%;
    position: relative;
    .pbg {
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 69%;
      position: absolute;
      top: 6.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
    .note {
      width: 47%;
      position: absolute;
      top: 82%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
    }
  }
}
</style>


