<template>
  <div
    :style="style.root" 
    class="root">
    <div  
      class="bg">
      <img 
        :src="baseUrl + 'bg.png?v=111'">
    </div>
    <div 
      class="photo">
      <img  
        v-if="photoUrl !== null" 
        :src="photoUrl+ this.$qiniuCompress()" 
        alt="">
    </div>  
    <div 
      class="real-photo">
      <img 
        v-if="photoUrl !== null" 
        :src="photoUrl+ this.$qiniuCompress()" 
        alt="">
    </div>  
    <img 
      :src="baseUrl + 'fu_17.png'+this.$qiniuCompress()"
      class="fu-17">
    <img 
      :src="baseUrl + 'fu_2.png'+this.$qiniuCompress()"
      class="fu-2">
    <img 
      :src="baseUrl + 'fu_3.png'+this.$qiniuCompress()"
      class="fu-3">
    <img 
      :src="baseUrl + 'fu_7.png'+this.$qiniuCompress()"
      class="fu-7">
    <img 
      :src="baseUrl + 'fu_16.png'+this.$qiniuCompress()"
      class="fu-16">
    <div 
      class="arrow">
      <img  
        :src="baseUrl + 'img_0.png'+this.$qiniuCompress()"> 
    </div>
    <div 
      class="bottom">
      <img 
        :src="baseUrl + 'img_1.png'+this.$qiniuCompress()"
        class="title" > 
    </div>
  </div>
</template>
<script>
const wih = window.innerWidth * 667 / 375
const wiw = window.innerWidth
import lottie from 'lottie-web'
import { $wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
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
        title: '七夕，我们谈个恋爱吧！',
        desc: '用一生说我爱你',
        link: 'http://papi.xingstation.com/api/s/v2m' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/tanabataFestival/share.png',
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
    this.handleWeChatShare()
  },

  methods: {
    //处理微信分享
    handleWeChatShare() {
      if (isInWechat() === true) {
        $wechat()
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
    position: absolute;
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
    }
  }
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
  .fu-17 {
    position: absolute;
    right: 0;
    top: 13%;
    z-index: 0;
    width: 35%;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;
  }
  .fu-2 {
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 0;
    width: 16%;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;
  }
  .fu-3 {
    position: absolute;
    left: 0;
    top: 13%;
    z-index: 0;
    width: 30%;
    z-index: 3;
    animation: loveScale 2s ease-out infinite forwards;
  }
  .fu-7 {
    position: absolute;
    left: -3%;
    bottom: 1%;
    z-index: 0;
    width: 37%;
    z-index: 3;
    animation: loveScale 2s ease-out infinite forwards;
  }
  .fu-16 {
    position: absolute;
    right: -3%;
    bottom: 1%;
    z-index: 0;
    width: 37%;
    z-index: 3;
    animation: loveScale 2s ease-out infinite forwards;
  }
  .arrow {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 13%;
    text-align: center;
    z-index: 3;
    animation: arrow 1.2s linear infinite alternate;
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
    animation: arrow 1.2s linear infinite alternate;

    .title {
      width: 77%;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
@keyframes loveScale {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  to {
    transform: scale(1.1, 1.1);
  }
}
</style>
