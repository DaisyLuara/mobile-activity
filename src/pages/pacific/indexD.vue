<template>
  <div
    :style="style.root"
    class="root">
    <img 
      :style="style.bg"
      :src="imgUrl + 'bg.png' + this.$qiniuCompress()"
      class="root-bg">
    <div
      id="animation"
      :style="style.bg"
      class="animation"/>
    <img 
      :src="photo + this.$qiniuCompress()"
      class="photo">
    <img 
      :src="photo + this.$qiniuCompress()"
      class="opacity-photo">
    <img 
      :src="imgUrl + 'logo.png' + this.$qiniuCompress()"
      class="logo">
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { $wechat, getInfoById, wechatShareTrack } from 'services'
const imgUrl = process.env.CDN_URL
export default {
  data() {
    return {
      imgUrl: imgUrl + '/fe/marketing/img/pacific/',
      style: {
        root: {
          minHeight: this.$innerHeight() + 'px'
        },
        photo: ''
      },
      wxShareInfo: {
        title: '生日快乐',
        desc: '总有惊喜在发生',
        link: 'http://papi.xingstation.com/api/s/jRR' + window.location.search,
        imgUrl: imgUrl + '/fe/marketing/img/pacific/pacific_icon.png',
        success: function() {
          wechatShareTrack()
        }
      },
      photo: null
    }
  },
  mounted() {
    this.initAnimation()
    this.getInfoById()
    $wechat()
      .then(res => {
        res.share(this.wxShareInfo)
      })
      .catch(_ => {
        console.warn(_.message)
      })
  },
  methods: {
    initAnimation() {
      const el = document.getElementById('animation')
      lottie.loadAnimation({
        container: el, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath: 'http://cdn.xingstation.cn/fe/marketing/pacific/img/',
        path: 'http://cdn.xingstation.cn/fe/marketing/pacific/json/pacific.json' // the path to the animation json
      })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  -webkit-touch-callout: none;
  user-select: none;
  .root-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    pointer-events: none;
  }
  .animation {
    width: 100%;
    position: relative;
    z-index: 15;
  }
  .photo {
    z-index: 10;
    position: absolute;
    pointer-events: auto;
    top: 17%;
    z-index: 8;
    width: 60%;
    left: 20%;
  }
  .opacity-photo{
    z-index: 100;
    opacity: 0;
    position: absolute;
    pointer-events: auto;
    top: 17%;
    width: 60%;
    left: 20%;
  }
  .logo{
    width: 12%;
    z-index: 10;
    position: absolute;
    left: 44%;
    bottom: 0.9375%;
    pointer-events: none;
  }
}
</style>




