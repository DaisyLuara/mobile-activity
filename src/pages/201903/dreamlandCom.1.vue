<template>
  <div class="root">
    <!-- 遮罩 -->
    <div
      v-show="showImg"
      :style="style.root"
      class="shade"
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
      <!-- <img
        :src="baseUrl + 'bg.png' + this.$qiniuCompress()"
        class="cbg"
      > -->
      <div class="main">
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
      base64Data: null,
      paths: [
        {
          scope: 6,
          paths: ['wc_1.png', 'wc_2.png', 'wc_3.png', 'wc_4.png', 'wc_5.png']
        },
        {
          scope: 12,
          paths: ['mc_1.png', 'mc_2.png', 'mc_3.png', 'mc_4.png', 'mc_5.png']
        }
      ],
      wxShareInfoValue: {
        title: '幻境奇缘',
        desc: '揭开你的身世之谜！',
        link: 'http://papi.xingstation.com/api/s/A11' + window.location.search,
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
    this.go()
  },
  methods: {
    go() {
      let timer = setTimeout(() => {
        this.showImg = false
        this.contentShow = true
        clearTimeout(timer)
      }, 3000)
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
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/dreamland/";
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
    background-image: url("@{imageHost}bg.png");
    background-size: 100% auto;
    background-position: center top;
    background-repeat: no-repeat;
    .main {
      width: 100%;
      overflow-x: hidden;
      position: relative;
      z-index: 0;
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
