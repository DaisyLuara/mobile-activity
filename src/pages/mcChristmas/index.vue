<template>
  <div
    v-show="show" 
    :style="style.root" 
    class="root">
    <!-- 遮罩 -->
    <div 
      v-show="loading" 
      class="loading">
      <img 
        :src="baseUrl + 'xueren.png'+ this.$qiniuCompress()"
        class="xueren">
      <img 
        :src="baseUrl + 'z.png'+ this.$qiniuCompress()"
        class="z">
    </div>
    <div 
      v-show="!loading" 
      class="content">
      <div 
        class="top"/>
      <div 
        class="center">
        <img 
          v-if="photoUrl !== null" 
          :src="photoUrl+ this.$qiniuCompress()" 
          alt=""
          class="photo">
      <!-- 
      <img  
        :src="baseUrl + '111.png'"
        class="photo"> 
      -->
      </div>
      <img 
        :src="baseUrl + 'save2.png'+ this.$qiniuCompress()"
        class="save">
      <img 
        :src="baseUrl + 'btn.png?v=112'+ this.$qiniuCompress()" 
        :class="{'button': !btnAndior, 'andior-btn': btnAndior,'iphoneX-btn':iphoneX}"
        @click="goH5">
      <img 
        :src="baseUrl + 'logo.png'+ this.$qiniuCompress()"
        class="logo" >
      <div 
        class="bottom">
        <img  
          :src="baseUrl + 'xuehua2.png?v=111'+ this.$qiniuCompress()"
          class="xuehua-bg">
        <!-- 雪花动画部分 -->
        <div
          id="animation"
          class="animation"
        />
      </div>
    </div>
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
import lottie from 'lottie-web'
import { $wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  data() {
    return {
      count: 0,
      show: false,
      baseUrl: cdnUrl + '/fe/marketing/img/mc_Christmas/',
      style: {
        root: {
          height: wih + 'px'
        }
      },
      iphoneX: false,
      btnAndior: false,
      loading: true,
      photoUrl: '',
      wxShareInfo: {
        title: '点我，开启无限乐趣',
        desc: '唤醒雪人，开始圣诞之旅',
        imgUrl: cdnUrl + '/fe/marketing/img/mc_Christmas/share.png',
        success: () => {
          wechatShareTrack()
        }
      },
      imgArr: [
        'H6_00000.png?v=222',
        'H6_00001.png?v=222',
        'H6_00002.png?v=222',
        'H6_00003.png?v=222',
        'H6_00004.png?v=222',
        'H6_00005.png?v=222',
        'H6_00006.png?v=222',
        'H6_00007.png?v=222',
        'H6_00008.png?v=222',
        'H6_00009.png?v=222',
        'H6_00010.png?v=222',
        'H6_00011.png?v=222',
        'H6_00012.png?v=222',
        'bg.png',
        'btn.png?v=112',
        'save2.png',
        'xueren.png',
        'z.png',
        'logo.png',
        'xuehua2.png?v=111'
      ]
    }
  },
  watch: {
    count(val, oldval) {
      if (val == 5) {
        this.show = true
        var _this = this
        setTimeout(() => {
          _this.loading = false
        }, 3000)
        //然后可以对后台发送一些ajax操作
      }
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {
    let height = wih
    if (height <= 570) {
      this.btnAndior = true
    } else {
      this.btnAndior = false
    }
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.loadImage()
    this.initAnimation()
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
    },
    //跳转
    goH5() {
      window.location.href = process.env.AD_API+'/api/s/gJY'
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
    },
    //图片预加载处理
    loadImage() {
      var _this = this
      Array.from(_this.imgArr).forEach(item => {
        let img = new Image()
        img.onload = () => {
          this.count++
        }
        img.src = _this.baseUrl + item
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
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    opacity: 1;
    z-index: 5;
    .xueren {
      width: 30%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 6;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .z {
      width: 16%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(115%, -150%);
      z-index: 6;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      animation: opacitySave 0.8s linear infinite alternate;
    }
  }
  .content {
    .top {
      width: 100%;
      height: 34%;
      position: absolute;
      left: 0;
      top: 0;
      background-repeat: no-repeat;
      background-image: url('@{imageHost}/H6_00000.png');
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
      transform: translate(-50%, 198%);
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
    .button {
      width: 56%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, -78%);
      z-index: 2;
    }
    .andior-btn {
      width: 43%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, -98%);
      z-index: 2;
    }
    .iphoneX-btn {
      width: 60%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, -106%);
      z-index: 2;
    }
    .logo {
      width: 28%;
      position: absolute;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, -48%);
    }
    .bottom {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      .animation {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .xuehua-bg {
        width: 100%;
        -webkit-touch-callout: none;
        user-select: none;
        pointer-events: none;
      }
    }
  }
}
@keyframes run {
  0%,
  7% {
    background-image: url('@{imageHost}/H6_00000.png?v=222');
  }
  7%,
  14% {
    background-image: url('@{imageHost}/H6_00001.png?v=222');
  }
  14%,
  21% {
    background-image: url('@{imageHost}/H6_00002.png?v=222');
  }
  21%,
  28% {
    background-image: url('@{imageHost}/H6_00003.png?v=222');
  }
  28%,
  35% {
    background-image: url('@{imageHost}/H6_00004.png?v=222');
  }
  35%,
  42% {
    background-image: url('@{imageHost}/H6_00005.png?v=222');
  }
  42%,
  49% {
    background-image: url('@{imageHost}/H6_00006.png?v=222');
  }
  49%,
  56% {
    background-image: url('@{imageHost}/H6_00007.png?v=222');
  }
  56%,
  63% {
    background-image: url('@{imageHost}/H6_00008.png?v=222');
  }
  63%,
  70% {
    background-image: url('@{imageHost}/H6_00009.png?v=222');
  }
  70%,
  77% {
    background-image: url('@{imageHost}/H6_00010.png?v=222');
  }
  77%,
  84% {
    background-image: url('@{imageHost}/H6_00011.png?v=222');
  }
  84%,
  91% {
    background-image: url('@{imageHost}/H6_00012.png?v=222');
  }
  91%,
  100% {
    background-image: url('@{imageHost}/H6_00000.png?v=222');
  }
}
@keyframes opacitySave {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
