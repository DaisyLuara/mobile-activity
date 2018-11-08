<template>
  <div 
    :style="style.root"
    class="content">
    <!-- 上传头像  
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"-->
    <div 
      v-show="Boolean(arrIndex)"
      class="upload">
      <input 
        type="file" 
        accept="image/*"
        class="camera"
        @change="toUpLoad">
      <img
        :src="base + icon +'.png'">
    </div>
    <div 
      v-show="Boolean(arrIndex)"
      class="gonglue"
      @click="go()">
      <img
        :src="base +'nav2.png'">
    </div>
    <!-- 箭头图片 -->
    <div 
      class="tab"
      @click="tab()"/>
    <img
      v-show="jiantou"
      :src="base + 'pointer.png'"
      class="pointer">
    <!-- 底部文字 -->
    <img
      v-show="word"
      :src="base + 'font.png'"
      class="font">
    <!-- 动画 -->
    <div 
      id="anim"
      class="page anim"
    />
  </div>
</template>
<script>
import lottie from 'lottie-web'
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  getImage
} from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/wxc_letter/',
      userId: null,
      icon: 'icon1',
      pointer: {
        start: null,
        move: null,
        end: null
      },
      jiantou: true,
      word: true,
      arrIndex: 0,
      framesArr: [
        [0, 100],
        [101, 200],
        [201, 300],
        [301, 400],
        [401, 500],
        [501, 600],
        [601, 700]
      ],
      //分享
      wxShareInfoValue: {
        title: '贵客齐聚，共赴好宴│11.23厦门万象城正式揭幕',
        desc: '敬致：永新豪觅。用心好物',
        link: 'http://papi.xingstation.com/api/s/qYr' + window.location.search,
        imgUrl: 'https://cdn.exe666.com/fe/image/wxc_letter/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      document.querySelector('.anim').style.marginTop = '0%'
    }
    this.doAnim()
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    go() {
      window.location.href = 'http://papi.xingstation.com/api/s/xvr'
    },
    doAnim() {
      const el = document.getElementById('anim')
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: false,
        assetsPath: that.base + 'data2/images/',
        path: that.base + 'data2/data.json'
      })
      this.animation = anim
      anim.addEventListener('DOMLoaded', function() {
        // 播放0-100帧动画,第一屏动画
        anim.playSegments([0, 100], true)
      })
    },
    // openLetter() {
    //   let that = this
    //   this.animation.setSpeed(1.5) //设置播放速度
    //   this.animation.playSegments([76, 130], true) // 播放76-130帧动画
    //   this.animation.loop = false
    //   this.animation.addEventListener('complete', function() {
    //     // 动画播放完成后
    //     // that.lastAnim()
    //   })
    // },
    // handleTouchStart(event) {
    //   let x = event.touches[0].pageX
    //   this.pointer.start = x
    // },
    // handleTouchMove(event) {
    //   this.pointer.move = event.touches[0].pageX
    // },
    // handleTouchEnd(event) {
    //   if (this.pointer.move - this.pointer.start < -30) {
    //     this.toLeft()
    //   }
    //   if (this.pointer.move - this.pointer.start > 30) {
    //     this.toRight()
    //   }
    // },
    // toLeft() {
    //   // 向左滑
    //   if (this.arrIndex <= 0) {
    //     return
    //   } else {
    //     this.animation.playSegments(this.framesArr[this.arrIndex - 1], true)
    //     this.arrIndex--
    //   }
    // },
    tab() {
      this.toRight()
    },
    toRight() {
      // 向右滑
      if (this.arrIndex >= this.framesArr.length - 1) {
        this.jiantou = false
        return
      } else {
        this.animation.playSegments(this.framesArr[this.arrIndex + 1], true)
        this.arrIndex++
      }
    },
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
      }
    },
    toUpLoad(event) {
      let file = event.target.files[0]
      console.log(file)
      let path = file.name
      // alert(path)
      let formData = new FormData()
      formData.append('image', path)
      formData.append('type', 'avatar')
      // let formData = {
      //   image: path,
      //   type: 'avatar'
      // }
      getImage(formData)
        .then(res => {
          console.log(res)
          this.icon = 'icon2'
        })
        .catch(err => {
          alert('图像上传错误！请重新上传，只支持jpg,png格式')
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://cdn.exe666.com/fe/image/wxc_letter/';
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
.content {
  width: 100%;
  max-width: 750px;
  overflow: hidden;
  position: relative;
  .anim {
    width: 100%;
  }
  .swiper {
    position: relative;
  }
  .page {
    position: relative;
    z-index: 0;
  }
  .logo {
    position: absolute;
    top: 6%;
    left: 5%;
    width: 33.5%;
    z-index: 99;
  }
  .upload {
    display: inline-block;
    width: 10%;
    position: absolute;
    top: 4%;
    right: 8%;
    z-index: 999;
    animation: scale 2s linear infinite alternate;
    img {
      position: relative;
      z-index: 0;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      opacity: 0;
    }
  }
  .gonglue {
    display: inline-block;
    width: 10%;
    position: absolute;
    top: 4%;
    right: 25%;
    z-index: 999;
    animation: scale 2s linear infinite alternate;
    img {
      position: relative;
      z-index: 0;
    }
  }
  .font {
    width: 32%;
    position: absolute;
    // top: 80%;
    bottom: 5%;
    right: 5%;
    z-index: 99;
  }
  .tab {
    width: 30%;
    height: 30%;
    position: absolute;
    top: 35%;
    right: 0%;
    z-index: 1000;
  }
  .pointer {
    width: 8%;
    position: absolute;
    top: 50%;
    right: 5%;
    // transform: translateY(-50%);
    animation: pointer 0.8s linear infinite alternate;
    z-index: 999;
  }
}
@keyframes pointer {
  0% {
    transform: translate(10px, -50%);
  }
  100% {
    transform: translate(-10px, -50%);
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


