<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="top">
      <img
        :src="baseUrl + 'tip.png'+ this.$qiniuCompress()"
        class="tip"
      >
    </div>
    <div class="center">
      <img
        :src="baseUrl + 'kuang.png'+ this.$qiniuCompress()"
        class="kuang"
      >
      <img
        :src="baseUrl + 'left.png'+ this.$qiniuCompress()"
        class="left"
      >
      <img
        :src="baseUrl + 'right.png'+ this.$qiniuCompress()"
        class="right"
      >
      <img
        :src="baseUrl + 'paopao2.png'+ this.$qiniuCompress()"
        class="paopao1"
      >
      <img
        :src="baseUrl + 'paopao1.png'+ this.$qiniuCompress()"
        class="paopao2"
      >
      <img
        :src="baseUrl + '1111.png'+ this.$qiniuCompress()"
        class="hua"
      >
      <div class="photo">
        <!--  :src="baseUrl + '222.png'+ this.$qiniuCompress()" -->
        <img
          v-if="photo !== null"
          :src="photo + this.$qiniuCompress()"
          class="photo-base"
        >
        <img
          v-if="photo !== null"
          :src="photo + this.$qiniuCompress()"
          class="photo-real"
        >
      </div>
    </div>
    <div class="bottom">
      <img
        :src="baseUrl + 'text.png'+ this.$qiniuCompress()"
        :class="{'x-text':iphoneX,'text':!iphoneX}"
        class="text"
      >
    </div>

  </div>
</template>

<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/dryLazy/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: '旱獭直播间',
        desc: '主播已上线，合影马上生成',
        link: 'http://papi.xingstation.com/api/s/g5Y' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/dryLazy/icon.png'
      }
    }
  },
  created() { },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/dryLazy/";
img {
  max-width: 100%;
}
.root {
  width: 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .top {
    width: 100%;
    height: 15%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .tip {
      width: 62%;
      position: absolute;
      left: 50%;
      top: 0.5%;
      transform: translate(-55%, 0);
      z-index: 3;
    }
  }
  .center {
    width: 100%;
    height: 75%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .kuang {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0%);
      margin-top: -32%;
      z-index: 2;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .hua {
      width: 18%;
      position: absolute;
      right: -1%;
      top: 0%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .left {
      width: 36%;
      position: absolute;
      right: -12%;
      top: 60%;
      z-index: 2;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .right {
      width: 36%;
      position: absolute;
      left: -12%;
      top: 25%;
      z-index: 2;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .paopao1 {
      width: 17%;
      position: absolute;
      left: 0%;
      top: 5%;
      z-index: 2;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .paopao2 {
      width: 17%;
      position: absolute;
      right: 0%;
      top: 40%;
      z-index: 2;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .photo {
      width: 100%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
      .photo-base {
        width: 65.1%;
        margin-top: -1%;
        user-select: auto;
        pointer-events: auto;
      }
      .photo-real {
        width: 65%;
        position: absolute;
        left: 18%;
        top: -1%;
        z-index: 999;
        opacity: 0;
        user-select: auto;
        pointer-events: auto;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 10%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .text {
      width: 55%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, 0);
    }
    .x-text {
      width: 60%;
      position: absolute;
      left: 50%;
      bottom: 83%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
