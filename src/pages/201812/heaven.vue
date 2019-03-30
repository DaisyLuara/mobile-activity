<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'zs4.png'+ this.$qiniuCompress()"
      class="zs3-left"
    >
    <img
      :src="baseUrl + 'zs2.png'+ this.$qiniuCompress()"
      class="zs2-left"
    >
    <img
      :src="baseUrl + 'zs4.png'+ this.$qiniuCompress()"
      class="zs3-right"
    >
    <img
      :src="baseUrl + 'zs2.png'+ this.$qiniuCompress()"
      class="zs2-right"
    >
    <img
      :src="baseUrl + 'score.png'+ this.$qiniuCompress()"
      class="sw"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-1"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-2"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-3"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-4"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-5"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-6"
    >
    <img
      :src="baseUrl + 'sw.png'+ this.$qiniuCompress()"
      class="xuehua-7"
    >
    <div
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame"
    >
      <img
        :src="baseUrl + 'photo.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="baseUrl + 'button.png'+ this.$qiniuCompress()"
      :class="{'x-zs1':iphoneX,'zs1':!iphoneX}"
      class="zs1"
      @click="goTicket()"
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
      baseUrl: cdnUrl + "/fe/marketing/img/heaven/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      iphoneX: false,
      type: null,
      wxShareInfoValue: {
        title: "DFC影城祝你圣诞快乐",
        desc: "点我领取您的圣诞优惠",
        link: "http://papi.xingstation.com/api/s/jZ5" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/heaven/icon_dfc.png",
      }
    };
  },
  watch: {
    parms() {
      this.type = this.parms.type
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
  },
  methods: {
    goTicket() {
      if (parseInt(this.type) === 1) {
        //金山店
        window.location.href = "http://papi.xingstation.com/api/s/mO0"
      }
      else if (parseInt(this.type) === 2) {
        //长清店
        window.location.href = "http://papi.xingstation.com/api/s/nxl"
      }
      else {
        //龙阳店
        window.location.href = "http://papi.xingstation.com/api/s/oVK"
      }
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/heaven/";
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
  background: #2c0206;
  .zs3-left {
    width: 20%;
    position: absolute;
    left: -11%;
    top: -5%;
    z-index: 3;
  }
  .zs2-left {
    width: 14%;
    position: absolute;
    left: -5%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 3;
  }
  .zs3-right {
    width: 20%;
    position: absolute;
    right: -11%;
    top: -5%;
    transform: rotate(180deg);
    z-index: 3;
  }
  .zs2-right {
    width: 14%;
    position: absolute;
    right: -1%;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 3;
  }
  .sw {
    position: relative;
    width: 70%;
  }
  .xuehua-1 {
    width: 20%;
    position: absolute;
    left: 1%;
    top: 5%;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-2 {
    width: 10%;
    position: absolute;
    right: 9%;
    top: 3%;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-3 {
    width: 20%;
    position: absolute;
    right: 1%;
    top: 22%;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-4 {
    width: 13%;
    position: absolute;
    right: 11%;
    top: 45%;
    z-index: 9;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-5 {
    width: 10%;
    position: absolute;
    right: 12%;
    top: 54%;
    z-index: 9;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-6 {
    width: 10%;
    position: absolute;
    left: 8%;
    top: 34%;
    animation: mycircle 2s infinite linear;
  }
  .xuehua-7 {
    width: 13%;
    position: absolute;
    left: 9%;
    top: 64%;
    z-index: 9;
    animation: mycircle 1s infinite linear;
  }
  .frame {
    width: 80%;
    position: relative;
    left: 5%;
    margin-top: -2%;
    pointer-events: none;
    user-select: none;
    .photo {
      width: 73%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-43.5%, -55%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .x-frame {
    width: 85%;
    position: relative;
    left: 3.5%;
    margin-top: -1%;
    .photo {
      width: 73%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-43.3%, -55%);
    }
  }
  .zs1 {
    position: relative;
    width: 52%;
    margin-top: 2.5%;
    pointer-events: auto;
    user-select: auto;
  }
  .x-zs1 {
    position: relative;
    width: 60%;
    margin-top: 5%;
    pointer-events: auto;
    user-select: auto;
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
