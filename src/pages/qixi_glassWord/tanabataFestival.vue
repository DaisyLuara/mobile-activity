<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 动画部分 -->
    <div id="animation"
      class="animation"
    />
    <div class="photo">
      <img  :src="baseUrl + '666.jpeg'"/> 
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
    // this.initAnimation()
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
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath: 'http://cdn.exe666.com/fe/marketing/tanabataFestival/img/',
        path:
          'http://cdn.exe666.com/fe/marketing/tanabataFestival/json/h5xuehua.json' // the path to the animation json
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
  text-align: center;
  .animation {
    width: 100%;
  }
  .photo {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
