<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.jpg'+ this.$qiniuCompress()"
      class="bg"
    >
    <div class="top">
      <img
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="topImg"
      >
    </div>
    <div class="center">
      <img
        :src="baseUrl + 'btn22.png'+ this.$qiniuCompress()"
        class="button"
        @click="goPark()"
      >
      <img
        :src="baseUrl + 'banner33.png'+ this.$qiniuCompress()"
        class="banner"
        @click="go()"
      >
      <img
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="real-photo"
      >
    </div>
    <div class="bt">
      <img
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="btImg"
      >
      <img
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav"
      >
      <img
        :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
        class="prompt"
      >
    </div>
    <img
      :src="baseUrl + 'balloon_1.png'+ this.$qiniuCompress()"
      class="balloon1"
    >
    <img
      :src="baseUrl + 'balloon_2.png'+ this.$qiniuCompress()"
      class="balloon2"
    >
    <img
      :src="baseUrl + 'balloon_3.png'+ this.$qiniuCompress()"
      class="balloon3"
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
      baseUrl: cdnUrl + '/fe/marketing/img/hiplay_world_taicha/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '快快领取 泰茶兑换券',
        desc: 'High玩全世界，即刻出发',
        link: 'http://papi.xingstation.com/api/s/wmw' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/hiplay_world_taicha/icon.png',
        success: () => {
          wechatShareTrack()
        }
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
  methods: {
    go() {
      window.location.href = 'http://papi.xingstation.com/api/s/ojz' //旧链接：'http://papi.xingstation.com/api/s/E9k'
    },
    //停车券跳转
    goPark() {
      window.location.href = 'http://papi.xingstation.com/api/s/ng4'//旧连接：'http://papi.xingstation.com/api/s/D9n'
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/hiplay_world_taicha/";
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
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .top {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    .topImg {
      width: 100%;
    }
  }
  .center {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    .button {
      width: 90%;
      position: absolute;
      left: 5%;
      top: 0%;
      z-index: 9;
      margin-top: -17%;
      animation: scale 1.5s linear infinite alternate;
      user-select: auto;
      pointer-events: auto;
    }
    .banner {
      width: 67%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -4%);
      user-select: auto;
      pointer-events: auto;
    }
    .frame {
      width: 75%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 26%);
      z-index: 5;
    }
    .photo {
      width: 63%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 32%);
      user-select: auto;
      pointer-events: auto;
      z-index: 3;
    }
    .real-photo {
      width: 64%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 32%);
      z-index: 99;
      opacity: 0;
      user-select: auto;
      pointer-events: auto;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    margin-top: 138%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    .nav {
      width: 15%;
      display: block;
      position: absolute;
      left: 42%;
      bottom: 36%;
      z-index: 15;
      animation: arrow 0.5s linear infinite alternate;
    }
    .prompt {
      width: 54%;
      display: block;
      position: absolute;
      left: 23%;
      bottom: 20%;
      animation: arrow 0.5s linear infinite alternate;
    }
  }

  .balloon1 {
    width: 18%;
    position: absolute;
    right: 1%;
    top: 10%;
    animation: arrow2 2s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .balloon2 {
    width: 25%;
    position: absolute;
    left: -2%;
    top: 50%;
    z-index: 5;
    animation: arrow2 2s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .balloon3 {
    width: 16%;
    position: absolute;
    right: 6%;
    top: 85%;
    z-index: 5;
    animation: arrow2 2s linear infinite alternate;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
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
@keyframes arrow2 {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
@keyframes scale {
  from {
    transform: scale(0.8, 0.8);
  }
  50% {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.8, 0.8);
  }
}
</style>
