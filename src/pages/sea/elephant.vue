<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="picture">
      <img
        :src="base+'frame.png'"
        class="frame">
      <img
        :src="photo+ this.$qiniuCompress()"
        class="photo">
      <img
        v-show="Boolean(photo)"
        :src="base+'save.png'"
        class="save">
    </div>
    <div 
      :class="{els:true,animate:animated}">
      <img
        :src="base+'cove.png'"
        class="left">
      <img
        :src="base+'cove.png'"
        class="right">
      <img
        :src="base+'el1.png'"
        class="el1 ">
      <img
        :src="base+'el2.png'"
        class="el2">
      <img
        :src="base+'el3.png'"
        class="el3">
    </div>
    <img
      :src="photo+ this.$qiniuCompress()"
      class="top">
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
const IMG_SERVER = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      base: IMG_SERVER + "/image/elephant/",
      photo: null,
      animated: false,
      //微信分享
      wxShareInfoValue: {
        title: "微笑雨花",
        desc: "Smile 一周年 ",
        link: process.env.AD_API + "/api/s/QWl" + window.location.search,
        imgUrl: "http://cdn.exe666.com/image/elephant/icon.png",
        success: () => {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    this.animateStart();
  },
  methods: {
    animateStart() {
      let that = this;
      let img_list = [
        that.base + "bg.png",
        that.base + "cove.png",
        that.base + "el1.png",
        that.base + "el2.png",
        that.base + "el3.png"
      ];
      let count = 0;
      img_list.forEach(ele => {
        let img = new Image();
        img.src = ele;
        img.onload = function() {
          count++;
          count == img_list.length ? (that.animated = true) : null;
        };
      });
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.xingstation.cn/image/elephant/";
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
  text-align: center;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #1e0a6a;
  background-image: url("@{imgUrl}bg.png");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .els {
    width: 100%;
    height: 110%;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 999;
    overflow: hidden;
    .left,
    .right {
      width: 83%;
      position: absolute;
      top: 1.5%;
      z-index: 0;
    }
    .left {
      left: -32%;
    }
    .right {
      right: -32%;
    }
    .el1 {
      position: absolute;
      width: 21%;
      top: 20.5%;
      left: -1%;
      z-index: 99;
    }
    .el2 {
      position: absolute;
      width: 18%;
      top: 3%;
      left: 66.7%;
      z-index: 99;
    }
    .el3 {
      position: absolute;
      width: 18%;
      top: 50%;
      left: 84.7%;
      z-index: 99;
    }
  }
  .animate {
    .left {
      animation: toleft 0.8s linear forwards;
    }
    .right {
      animation: toright 0.8s linear forwards;
    }
    .el1 {
      animation: breath 1s linear infinite alternate;
    }
    .el2 {
      animation: breath 1.2s 0.1s ease infinite alternate;
    }
    .el3 {
      animation: breath 0.8s 0.2s ease-in-out infinite alternate;
    }
  }
  .picture {
    width: 100%;
    position: relative;
    z-index: 0;
    text-align: center;
    .frame {
      width: 100%;
      position: relative;
      z-index: 99;
      margin: 0 auto;
    }
    .photo {
      width: 70%;
      position: absolute;
      top: 9%;
      left: 50%;
      transform: translateX(-50%);
    }
    .save {
      width: 74%;
      margin: 0 auto;
      margin-top: -45%;
      animation: updown 0.8s linear infinite alternate;
    }
  }
  .top {
    width: 70%;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    pointer-events: auto;
    user-select: auto;
    opacity: 0;
  }
}
@keyframes toleft {
  0% {
    left: -32%;
  }
  100% {
    left: -77%;
  }
}
@keyframes toright {
  0% {
    right: -32%;
  }
  100% {
    right: -77%;
  }
}
@keyframes updown {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
}
@keyframes breath {
  0% {
    transform: scale(0.8) rotate(5deg);
  }
  100% {
    transform: scale(1.2) rotate(-5deg);
  }
}
</style>


