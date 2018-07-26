<template>
  <div
    :style="style.root" 
    class="root">
    <div class="bg"></div>
    <!-- 动画部分 -->
    <!-- <div id="animation"
      class="animation"
    /> -->
     <div class="photo">
      <img  :src="baseUrl + '666.jpeg'"/> 
    </div>  
    <div class="real-photo">
      <img  :src="baseUrl + '666.jpeg'"/> 
    </div>  
    <div class="arrow">
      <img  :src="baseUrl + 'img_0.png'"/> 
    </div>
    <div class="bottom">
       <img class="title" :src="baseUrl + 'img_1.png'"/> 
    </div>
  </div>
</template>

<script>
const wih = window.innerWidth * 667 / 375
const wiw = window.innerWidth
import lottie from 'lottie-web'
import { $_wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/tanabataFestival/',
      style: {
        root: {
          height: wih + 'px'
        }
      },
      photoUrl: '',
      wxShareInfo: {
        title: '点我，开启无限乐趣',
        desc: '唤醒雪人，开始圣诞之旅',
        imgUrl: cdnUrl + '/fe/marketing/img/tanabataFestival/share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    // this.getInfo()
  },
  mounted() {
    //this.initAnimation()
    // this.handleWeChatShare()
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
    initAnimation() {
      const el = document.getElementById('animation')
      lottie.loadAnimation({
        container: el, // the dom element that will contain the animation
        renderer: 'html',
        loop: true,
        autoplay: true,
        assetsPath: 'http://cdn.exe666.com/fe/marketing/qixi/img/',
        path: 'http://cdn.exe666.com/fe/marketing/qixi/json/data.json' // the path to the animation json
      })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/tanabataFestival';
.root {
  width: 100%;
  background: #ec7ca9;
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('@{imageHost}/H5_00000.png');
    background-size: 100% 100%;
    animation: run 3s steps(1, start) infinite;
    position: absolute;
    z-index: 2;
  }
  // .animation {
  //   width: 100%;
  //   height: 100%;
  //   display: block;
  //   overflow: hidden;
  //   transform: translate3d(0, 0, 0);
  //   opacity: 1;
  //   position: absolute;
  //   // z-index: 2;
  // }
  .photo {
    width: 70.5%;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .real-photo {
    width: 70.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    z-index: 999;
    opacity: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .arrow {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 13%;
    text-align: center;
    z-index: 3;
    animation: arrows 0.8s ease-out infinite alternate;
    img {
      width: 24%;
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 8.5%;
    text-align: center;
    z-index: 3;
    animation: arrows 0.8s ease-out infinite alternate;

    .title {
      width: 77%;
    }
  }
}
@keyframes run {
  // 0%,
  // 14% {
  //   background-image: url('@{imageHost}/H5_00000.png?v=222');
  // }
  // 14%,
  // 28% {
  //   background-image: url('@{imageHost}/H5_00001.png?v=222');
  // }
  // 28%,
  // 42% {
  //   background-image: url('@{imageHost}/H5_00002.png?v=222');
  // }
  // 42%,
  // 56% {
  //   background-image: url('@{imageHost}/H5_00003.png?v=222');
  // }
  // 56%,
  // 70% {
  //   background-image: url('@{imageHost}/H5_00004.png?v=222');
  // }
  // 70%,
  // 84% {
  //   background-image: url('@{imageHost}/H5_00005.png?v=222');
  // }
  // 84%,
  // 100% {
  //   background-image: url('@{imageHost}/H5_00006.png?v=222');
  // }
}
@keyframes arrows {
  0% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
