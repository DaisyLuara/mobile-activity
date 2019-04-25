<template>
  <div
    :style="style.root"
    class="phone"
  >
    <!-- <img
      :src="base + 'back.jpg'"
      class="back"
    > -->
    <img
      :src="base + 'snow1.png'"
      class="snow1"
    >
    <img
      :src="base + 'snow2.png'"
      class="snow2"
    >
    <img
      :src="base + '1.png'"
      class="bottom"
    >
    <div class="main">
      <img
        :src="base + 'frame.png'"
        class="frame"
      >
      <a
        v-show="bgshow"
        class="play"
        @click="playVideo"
      >
        <img :src="base + 'play.png'">
      </a>

    </div>
    <video
      v-show="!bgshow"
      id="video"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      qb-video-float-mode="true"
      preload="auto"
    >
      <!--  style="width: 100%; height:100%; position: absolute; left: 0px; top: 0px;" -->
      <source
        :src="video"
        type="video/mp4"
      >
      您的浏览器不支持video标签.
    </video>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, getInfoById } from "services";
import { onlyWechatShare } from "../../mixins/onlyWechatShare";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      base: CDNURL + "/fe/image/snowman/",
      video: null,//http://cdn.xingstation.cn/1007/video/WhoTakeMoonCake_235_96_1492926959345.mp4
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      userId: null,
      bgshow: true,
      //微信分享
      wxShareInfoValue: {
        title: "冬季精灵已经出现",
        desc: "雪人换装秀已经开始，快来和我合影",
        link: "http://papi.xingstation.com/api/s/6X9" + window.location.search,
        imgUrl: CDNURL + "/fe/image/snowman/icon.png",
        success: () => {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.video = res.url
          console.log(res)
          let video = document.getElementById('video')
          video.load()
        })
        .catch(err => {
          console.log(err)
        })
    },
    playVideo() {
      let video = document.getElementById('video')
      let that = this

      video.load()
      video.play()

      video.onplay = function () {
        video.currentTime = 0
        that.bgshow = false

      }
      video.onpause = function () {
        that.bgshow = true
      }
      video.onended = function () {
        that.bgshow = true
      }
      // if (that.v_status == 'pause') {
      //   video.pause()
      //   return
      // }
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.xingstation.cn/fe/image/snowman/";
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
.phone {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: url("@{imgUrl}back.jpg") center center/100% 100% no-repeat;
  .back {
    position: relative;
    z-index: 0;
  }
  .snow1 {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 999;
  }
  .snow2 {
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 999;
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 9999;
  }
  .main {
    position: relative;
    width: 84.5%;
    margin-top: 5%;
    z-index: 9;
    .frame {
      position: relative;
      z-index: 0;
    }
    .play {
      display: block;
      width: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
      z-index: 99;
    }
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    // object-fit: contain;
    object-fit: fill;
    // object-position: 77% auto;
    object-position: 100% auto;
    z-index: 99;
  }
}
</style>

