<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- 遮罩 -->
    <div
      v-show="shade"
      class="shade"
    >
      <div class="back" />
      <img
        :src="baseUrl + 'loading1.png'+ this.$qiniuCompress()"
        class="loading1"
      >
      <img
        :src="baseUrl + 'loading2.png'+ this.$qiniuCompress()"
        class="loading2"
      >
    </div>
    <img
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      class="frame"
    >
    <!-- :src="baseUrl + '666.png'+ this.$qiniuCompress()" -->
    <img
      v-if="photo !== null"
      :src="photo + this.$qiniuCompress()"
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
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/videoGame/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      shade: true,
      iphoneX: false,
      wxShareInfoValue: {
        title: '电玩！来福士！',
        desc: '嗨玩就现在，come on',
        link: process.env.AD_API+'/api/s/k55' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/videoGame/icon.jpg',
      }
    }
  },
  created() { },
  mounted() {
    let height = this.$innerHeight()
    let that = this
    if (height > 672) {
      that.iphoneX = true
    } else {
      that.iphoneX = false
    }
    setTimeout(function () {
      that.shade = false
    }, 2000)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/videoGame/";
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
  .shade {
    width: 100%;
    height: 100%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .back {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.8;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
    }
    .loading1 {
      width: 15%;
      position: absolute;
      left: 42%;
      top: 43%;
      z-index: 100;
      animation: jump 1.2s infinite linear;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .loading2 {
      width: 25%;
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, 0%);
      z-index: 100;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
  }
  .frame {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 4%;
    transform: translate(-50%, 0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
    user-select: auto;
    pointer-events: auto;
  }
  .save {
    width: 38%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-save {
    width: 46%;
    position: absolute;
    left: 50%;
    bottom: 14%;
    transform: translate(-50%, 0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
}
@keyframes jump {
  from,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>
