<template>
  <div class="root">
    <!-- 遮罩 -->
    <div
      v-show="showImg"
      :style="style.root"
      class="shade"
      @click="go"
    >
      <img
        :src="baseUrl + 'hua.png'+ this.$qiniuCompress()"
        class="hua"
      >
      <img
        :src="baseUrl + 'tip.png'+ this.$qiniuCompress()"
        class="tip"
      >
    </div>
    <!-- 内容 -->
    <div
      v-show="contentShow"
      class="content"
    >
      <img
        :src="baseUrl + 'luwan/bg.png' + this.$qiniuCompress()"
        class="cbg"
      >
      <div class="main">
        <a
          href="http://papi.xingstation.com/api/s/ql3"
          class="tolink"
        >
          <div class="toplink">
            <img
              :src="baseUrl + 'luwan/link.png'"
              class="bg"
            >
            <div
              id="anim"
              class="anim"
            />
          </div>
        </a>
        <DreamCanvas />
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies } from 'services'
import lottie from "lottie-web";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
import DreamCanvas from '@/modules/dreamCanvas'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    DreamCanvas
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/dreamland/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      showImg: true,
      contentShow: false,
      wxShareInfoValue: {
        title: '幻境奇缘',
        desc: '揭开你的身世之谜！',
        link: 'http://papi.xingstation.com/api/s/gnl' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/dreamland/icon.png'
      }
    }
  },
  mounted() {
    this.doAnim()
  },
  methods: {
    go() {
      this.showImg = false
      this.contentShow = true
    },
    doAnim() {
      let el = document.getElementById('anim')
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath: that.baseUrl + 'luwan/images/',
        path: that.baseUrl + 'luwan/data.json'
      })
    },
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/dreamland/";
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
  .shade {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-image: url("@{imageHost}bg2.png");
    background-size: 100% auto;
    background-position: center top;
    background-repeat: no-repeat;
    .hua {
      width: 100%;
      animation: scale 1.5s linear infinite alternate;
    }
    .tip {
      width: 50%;
      position: absolute;
      left: 20%;
      top: 0%;
      animation: scale 1.5s linear infinite alternate;
    }
  }
  .content {
    width: 100%;
    position: relative;
    overflow: hidden;
    .cbg {
      position: relative;
    }
    .main {
      width: 100%;
      overflow-x: hidden;
      position: absolute;
      top: 0%;
      left: 0;
      z-index: 99;
      .tolink {
        display: inline-block;
        margin-top: 15.3%;
        position: relative;
        .toplink {
          width: 90%;
          position: relative;
          z-index: 0;
          .bg {
            position: relative;
            z-index: 0;
          }
          .anim {
            position: absolute;
            width: 76%;
            z-index: 99;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
@keyframes scale {
  from {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  to {
    transform: scale(1, 1);
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
</style>
