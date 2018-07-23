<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top"></div>
    <div class="center">
      <!-- <img class="photo"  v-if="photoUrl !== null" :src="photoUrl  + this.qiniuCompress()" alt=""/> -->
      <img  class="photo" :src="baseUrl + '111.png'"/>
    </div>
    <img class="save" :src="baseUrl + 'save.png'+ this.qiniuCompress()">
    <img class="button"  @click="goH5" :src="baseUrl + 'btn.png'+ this.qiniuCompress()">
    <div class="bottom">
      <img :src="baseUrl + 'xuehua2.png?v=111'+ this.qiniuCompress()" />
      <!-- 雪花动画部分 -->
       <div
      id="animation"
      class="animation"
      />
    </div>
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
import lottie from 'lottie-web'
import { $_wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/mc_Christmas/',
      style: {
        root: {
          height: wih + 'px'
        }
      },
      photoUrl: '',
      wxShareInfo: {
        title: '全天欢唱 买一送二',
        desc: '购买一小时赠送2小时',
        imgUrl: cdnUrl + '/image/king/share.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {
    this.initAnimation()
    this.handleWeChatShare()
  },
  methods: {
    //处理微信分享
    handleWeChatShare() {
      if (isInWechat() === true) {
        $_wechat()
          .then(res => {
            res.share(this.wxShareInfo)
          })
          .catch(_ => {
            console.warn(_.message)
          })
      }
    },
    getInfo() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photoUrl = res.image
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    //跳转
    goH5() {
      window.location.href = 'http://h5.xingstation.com/marketing/meichenzhan'
    },
    initAnimation() {
      const el = document.getElementById('animation')
      lottie.loadAnimation({
        container: el, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath: 'http://cdn.exe666.com/fe/marketing/christmas/img/',
        path: 'http://cdn.exe666.com/fe/marketing/christmas/json/h5xuehua.json' // the path to the animation json
      })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/mc_Christmas';
.root {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.png');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  .top {
    width: 100%;
    height: 34%;
    position: absolute;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-image: url('@{imageHost}/H5_00000.png');
    background-size: 100% 100%;
    animation: run 2s steps(1, start) infinite;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .center {
    width: 96%;
    background: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -44%);
    padding: 2%;
    .photo {
      width: 100%;
    }
  }
  .save {
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 170%);
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .button {
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, -55%);
    z-index: 2;
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    .animation {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    img {
      width: 100%;
    }
  }
}
@keyframes run {
  0%,
  4% {
    background-image: url('@{imageHost}/H5_00000.png');
  }
  4%,
  8% {
    background-image: url('@{imageHost}/H5_00001.png');
  }
  8%,
  12% {
    background-image: url('@{imageHost}/H5_00002.png');
  }
  12%,
  16% {
    background-image: url('@{imageHost}/H5_00003.png');
  }
  16%,
  20% {
    background-image: url('@{imageHost}/H5_00004.png');
  }
  20%,
  24% {
    background-image: url('@{imageHost}/H5_00005.png');
  }
  24%,
  28% {
    background-image: url('@{imageHost}/H5_00006.png');
  }
  28%,
  32% {
    background-image: url('@{imageHost}/H5_00007.png');
  }
  32%,
  36% {
    background-image: url('@{imageHost}/H5_00008.png');
  }
  36%,
  40% {
    background-image: url('@{imageHost}/H5_00009.png');
  }
  40%,
  44% {
    background-image: url('@{imageHost}/H5_00010.png');
  }
  44%,
  48% {
    background-image: url('@{imageHost}/H5_00011.png');
  }
  48%,
  52% {
    background-image: url('@{imageHost}/H5_00012.png');
  }
  52%,
  56% {
    background-image: url('@{imageHost}/H5_00013.png');
  }
  56%,
  60% {
    background-image: url('@{imageHost}/H5_00014.png');
  }
  60%,
  64% {
    background-image: url('@{imageHost}/H5_00015.png');
  }
  64%,
  68% {
    background-image: url('@{imageHost}/H5_00016.png');
  }
  68%,
  72% {
    background-image: url('@{imageHost}/H5_00017.png');
  }
  72%,
  76% {
    background-image: url('@{imageHost}/H5_00018.png');
  }
  76%,
  80% {
    background-image: url('@{imageHost}/H5_00019.png');
  }
  80%,
  84% {
    background-image: url('@{imageHost}/H5_00020.png');
  }
  84%,
  88% {
    background-image: url('@{imageHost}/H5_00021.png');
  }
  88%,
  92% {
    background-image: url('@{imageHost}/H5_00022.png');
  }
  92%,
  96% {
    background-image: url('@{imageHost}/H5_00023.png');
  }
  96%,
  100% {
    background-image: url('@{imageHost}/H5_00000.png');
  }
}
</style>
