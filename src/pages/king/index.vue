<template>
  <div
    :style="style.root" 
    class="root">
    <img  class="bg" :style="style.root"  :src="baseUrl + 'bg.png'" />
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
import { $_wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  data() {
    return {
      baseUrl: cdnUrl + '/image/king/',
      style: {
        root: {
          height: wih + 'px'
        }
      },
      photoUrl: '',
      wxShareInfo: {
        title: '动物去哪了',
        desc: '让我们去动物园吧',
        imgUrl: cdnUrl + '/image/king/share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {},
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
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  .bg {
    width: 100%;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
