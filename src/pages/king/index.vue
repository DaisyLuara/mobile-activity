<template>
  <div
    :style="style.root" 
    class="root">
    <div class="photo" :style="style.photeHei">
      <img v-if="photoUrl !== null" :src="photoUrl  + this.qiniuCompress()" alt=""/>
      <!-- <img :src="baseUrl + 'gif.png'" /> -->
    </div>
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
        },
        photeHei: {
          height: wiw * 0.67 * wih / wiw + 'px'
          //Window.innerwidth * 0.78 * 1920 / 1080 + 'px'
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
    this.handleWeChatShare()
  },
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
@imageHost: 'http://cdn.exe666.com/image/king';
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg1.jpg');
  background-size: 100% 100%;
  position: relative;
  animation: bgMove 1s ease-out infinite alternate;
  .photo {
    width: 73.2%;
    position: absolute;
    left: 13.3%;
    top: 18%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
@keyframes bgMove {
  0% {
    background-image: url('@{imageHost}/bg1.jpg');
  }
  100% {
    background-image: url('@{imageHost}/bg2.jpg');
  }
}
</style>
