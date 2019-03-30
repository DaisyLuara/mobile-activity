<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base + 'logo.png'"
      class="logo"
    >
    <div
      v-show="toImg"
      class="upload"
    >
      <input
        type="file"
        accept="image/*"
        class="camera"
        @change="toUpLoad"
      >
      <img :src="base + icon +'.png'">
    </div>
    <img
      v-show="word"
      :src="base + 'font.png'"
      class="font"
    >
    <img
      :src="base + 'pointer.png'"
      class="pointer"
    >
    <swiper
      ref="Swiper"
      :options="sOption"
      class="swiper"
    >
      <swiper-slide>
        <div
          id="anim"
          class="page anim"
        />
      </swiper-slide>
      <swiper-slide
        v-for="item in pages"
        :key="item.id"
        class="pslider"
      >
        <img
          :src="base + item"
          class="page"
        >
      </swiper-slide>
    </swiper>
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
      pages: [
        'page2.png',
        'page3.png',
        'page4.png',
        'page5.png',
        'page6.png',
        'page7.png'
      ],
      userId: null,
      toImg: false,
      word: true,
      sOption: {
        effect: 'fade',
        on: {
          init: () => { },
          slideChange: () => {
            let index = this.$refs.Swiper.swiper.realIndex
            if (index === 0) {
              this.toImg = false
              this.word = true
            } else if (index === 6) {
              this.toImg = true
              this.word = false
            } else {
              this.toImg = true
              this.word = true
            }
          }
        }
      },
      icon: 'icon1',
      //分享
      wxShareInfoValue: {
        title: '贵客齐聚，共赴好宴│11.23厦门万象城正式揭幕',
        desc: '敬致：永新豪觅。用心好物',
        link: 'http://papi.xingstation.com/api/s/qYr' + window.location.search,
        imgUrl: 'https://cdn.xingstation.cn/fe/image/wxc_letter/icon.png',
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
    doAnim() {
      const el = document.getElementById('anim')
      let that = this
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: false,
        assetsPath: that.base + '/images/',
        path: that.base + 'data.json'
      })
      this.animation = anim
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
      let path = file.path
      let formData = new FormData()
      formData.append('image', path)
      formData.append('type', 'avatar')
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
@imgUrl: "https://cdn.xingstation.cn/fe/image/wxc_letter/";
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
    margin-top: -20%;
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
    right: 5%;
    z-index: 999;
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
  .font {
    width: 32%;
    position: absolute;
    // top: 80%;
    bottom: 5%;
    right: 5%;
    z-index: 99;
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
</style>


