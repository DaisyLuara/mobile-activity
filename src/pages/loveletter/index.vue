<template>
  <div 
    :style="style.root"
    class="content"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd">
    <div 
      id="anim"
      class="anim"
    />
    <div 
      v-show="tip"
      class="tips"
    />
    <div 
      v-show="last_page"
      class="last">
      <img
        :src="photo"
        :class="{photo:true,torun:torun}">
      <img
        v-show="save"
        :src="base + 'save.png'"
        class="save">
    </div>
  </div>
</template>
<script>
import lottie from "lottie-web";
import { $wechat, getInfoById, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
const IMG_SERVER = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      base: IMG_SERVER + "/image/loveletter/",
      photo: null,
      torun: false,
      last_page: false,
      save: false,
      animation: null,
      tip: true,
      pointer: {
        start: null,
        move: null,
        end: null
      },
      //分享
      wxShareInfoValue: {
        title: "一纸情书",
        desc: "只愿君心似我心 定当不负相思意",
        link: process.env.AD_API + "/api/s/zpY" + window.location.search,
        imgUrl: "http://cdn.exe666.com/image/loveletter/icon.jpg",
        success: function() {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      document.querySelector(".anim").style.marginTop = "15%";
      document.querySelector(".tips").style.backgroundPosition =
        "32% 78%, 45% 72%";
      document.querySelector(".save").style.top = "78%";
    }

    this.doAnim();
  },
  methods: {
    doAnim() {
      const el = document.getElementById("anim");
      let anim = lottie.loadAnimation({
        name: "anim",
        container: el,
        renderer: "svg",
        // loop: true,
        assetsPath: this.base + "json/images/",
        path: this.base + "json/qixi.json"
      });
      this.animation = anim;
      anim.addEventListener("DOMLoaded", function() {
        anim.loop = true;
        anim.playSegments([0, 75], true);
      });
    },
    openLetter() {
      let that = this;
      this.animation.setSpeed(1.5);
      this.animation.playSegments([76, 130], false);
      this.animation.loop = false;
      this.animation.addEventListener("complete", function() {
        that.lastAnim();
      });
    },
    handleTouchStart(event) {
      let y = event.touches[0].pageY;
      this.pointer.start = y;
    },
    handleTouchMove(event) {
      let tip = document.querySelector(".tips");
      this.tip = false;
      this.pointer.move = event.touches[0].pageY;
    },
    handleTouchEnd(event) {
      if (this.pointer.move > this.pointer.start) {
        this.tip = true;
        return;
      }
      if (!this.end) {
        this.end = true;
        this.openLetter();
        return;
      }
    },
    lastAnim() {
      let last = document.querySelector(".last");
      let photo = document.querySelector(".photo");
      let save = document.querySelector(".save");
      let that = this;
      this.last_page = true;
      let raf = null;
      let top = 105,
        w = 10;
      let slider = function() {
        top = top <= 7 ? 7 : top - 1.5;
        w = w >= 73 ? 73 : w + 1;
        if (top <= 7) {
          window.cancelAnimationFrame(raf);
          save.style.top = photo.offsetTop + photo.clientHeight + 10 + "px";
          console.log(save.style.top);
          that.save = true;

          last.style.backgroundColor = "rgba(0,0,0,0.5)";

          return;
        }
        photo.style.top = top + "%";
        photo.style.width = w + "%";
        raf = window.requestAnimationFrame(slider);
      };
      slider();
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.cn/image/loveletter/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
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
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #a90d0e;
  background-image: url("@{imgUrl}tou.png"), url("@{imgUrl}zs.png"),
    url("@{imgUrl}di.png");
  background-position: center top, center 60%, center bottom;
  background-size: 100% auto, 88% auto, 100% auto;
  background-repeat: no-repeat, no-repeat, no-repeat;
  // overflow: hidden;
  .anim {
    width: 100%;
    margin-top: -15%;
  }
  .tips {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("@{imgUrl}hand.png"), url("@{imgUrl}tips.png");
    background-position: 32% 88%, 45% 82%;
    background-size: 15% auto, 36% auto;
    background-repeat: no-repeat, no-repeat;
    animation: slider 1.6s linear infinite forwards;
  }
  .last {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0%;
    right: 0;
    z-index: 9999;
    text-align: center;
    .photo {
      width: 10%;
      margin: 0 auto;
      position: absolute;
      top: -105%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
    .save {
      width: 42%;
      position: absolute;
      top: 91%;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
@keyframes slider {
  0% {
    background-position: 32% 88%, 45% 82%;
  }
  100% {
    background-position: 32% 60%, 45% 82%;
  }
}
</style>


