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
        <img
          id="test"
          :src="base64Data"
          alt=""
          class="photoImg"
        >
        <canvas
          id="canvas"
          class="photoImg"
          style="display: none"
        />
        <img
          :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
          class="save"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies } from 'services'
import lottie from "lottie-web";
import { normalPages } from "@/mixins/normalPages";
const cdnUrl = process.env.CDN_URL
import MC from 'mcanvas'
export default {
  mixins: [normalPages],
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
      peopleID: null,
      iphoneX: false,
      base64Data: null,
      paths: [
        {
          scope: 6,
          paths: ['w_1.png', 'w_2.png', 'w_3.png', 'w_4.png', 'w_5.png']
        },
        {
          scope: 12,
          paths: ['m_1.png', 'm_2.png', 'm_3.png', 'm_4.png', 'm_5.png']
        }
      ],
      wxShareInfoValue: {
        title: '幻境奇缘',
        desc: '揭开你的身世之谜！',
        link: 'http://papi.xingstation.com/api/s/gnl' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/dreamland/icon.png'
      }
    }
  },
  watch: {
    parms() {
      this.peopleID = this.parms.peopleID
      this.drawing()
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
    //获取随机数图片
    randomImg(peopleID) {
      let that = this
      let path = ''
      for (let i = 0; i < that.paths.length; i++) {
        if (peopleID <= that.paths[i].scope) {
          path =
            that.paths[i].paths[
            Math.floor(Math.random() * that.paths[i].paths.length)
            ]
          break
        }
      }
      return path
    },
    //合成图片
    drawing() {
      let width = this.$innerWidth()
      let height = (this.$innerWidth() / 1080) * 1800
      let that = this
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      let url = that.photo + that.$qiniuCompress()
      let imgUrl = null
      imgUrl = that.baseUrl + that.randomImg(that.peopleID)
      console.log(imgUrl)
      mc.background(that.baseUrl + 'bg4.png', {
        left: 0,
        top: 0,
        type: 'origin',
        width: that.$innerWidth() * 0.9,
        pos: {
          x: '0%',
          y: '10%'
        }
      })
        .add(url, {
          width: '78%',
          pos: {
            x: '15%',
            y: '15%'
          }
        })
        .add(imgUrl, {
          width: '100%',
          color: '#000000',
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'png',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          quality: 1,
          // 成功回调；
          success(b64) {
            that.base64Data = b64
            let url = canvas.toDataURL('image/png')
            let img = document.getElementById('test')
            img.src = url
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/dreamland/";
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
    // background-image: url("@{imageHost}luwan/bg.png");
    // background-size: 100% auto;
    // background-position: center top;
    // background-repeat: no-repeat;
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
      .photoImg {
        width: 100%;
        position: relative;
        user-select: auto;
        pointer-events: auto;
      }
    }
    .save {
      width: 40%;
      position: absolute;
      left: 30%;
      bottom: 5%;
      animation: arrow 0.8s linear infinite alternate;
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
