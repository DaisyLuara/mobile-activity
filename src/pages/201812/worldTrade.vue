<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="topImg"
    >
    <img
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="btImg"
    >
    <img
      :src="baseUrl + 'snow.png'+ this.$qiniuCompress()"
      :class="{'x-xuehua':iphoneX,'xuehua-1':!iphoneX}"
      class="xuehua-1"
    >
    <img
      :src="baseUrl + 'snow.png'+ this.$qiniuCompress()"
      class="xuehua-2"
    >
    <img
      :src="baseUrl + 'snow.png'+ this.$qiniuCompress()"
      class="xuehua-3"
    >
    <div
      :class="{'x-center':iphoneX,'center':!iphoneX}"
      class="center animated  linear   slideInDown"
    >
      <img
        :src="baseUrl + 'ka.png'+ this.$qiniuCompress()"
        :class="{'x-frame':iphoneX,'frame':!iphoneX}"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        :class="{'x-photo':iphoneX,'photo':!iphoneX}"
        class="photo"
      >
    </div>
    <img
      v-show="saveShow"
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save"
    >
  </div>
</template>
<script>
import { normalPages } from "../../mixins/normalPages";
import 'animate.css'
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/world_trade/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      saveShow: false,
      wxShareInfoValue: {
        title: "美照与美茂更配哦",
        desc: "昆山世茂广场冰雪梦幻季",
        link: "http://papi.xingstation.com/api/s/r86" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/world_trade/icon.png",
      }
    };
  },
  mounted() {
    let that = this
    // alert(this.$innerHeight())
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
    let timer = setTimeout(function () {
      that.saveShow = true
      clearTimeout(timer)
    }, 1000)
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/world_trade/";
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
  // width: 100%;
  // text-align: center;
  // position: relative;
  // overflow: hidden;
  // background-image: url("@{imageHost}bg.png");
  // background-size: 100% 100%;
  // background-position: center bottom;
  // background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .topImg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .btImg {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .xuehua-1 {
    width: 10%;
    position: absolute;
    left: 7%;
    top: 35%;
    z-index: 100;
    animation: mycircle 2s infinite linear;
  }
  .x-xuehua {
    left: 3%;
  }
  .xuehua-2 {
    width: 25%;
    position: absolute;
    left: -9%;
    top: 55%;
    z-index: 100;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-3 {
    width: 30%;
    position: absolute;
    right: -9%;
    top: 45%;
    z-index: 100;
    animation: mycircle 2s infinite linear;
  }
  .center {
    width: 100%;
    position: relative;
    left: 0%;
    top: -15%;
    z-index: 99;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 90%;
      margin-left: 5%;
    }
    .photo {
      width: 46%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49.5%, -18%);
      pointer-events: auto;
      user-select: auto;
    }
    .x-photo {
      width: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49%, -18.3%);
      pointer-events: auto;
      user-select: auto;
    }
    .x-frame {
      width: 98%;
      margin-left: 4%;
    }
  }
  .x-center {
    top: -7%;
  }
  .save {
    width: 50%;
    position: relative;
    margin-top: -25%;
    animation: arrow 0.8s linear infinite alternate;
    z-index: 100;
  }
  .x-save {
    margin-top: -12%;
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
@keyframes wrapper {
  0% {
    transform: translateY(-160%);
  }
  30% {
    transform: translateY(-135%);
  }
  50% {
    transform: translateY(-110%);
  }
  80% {
    transform: translateY(-95%);
  }
  100% {
    transform: translateY(-72%);
  }
}
@keyframes mycircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
