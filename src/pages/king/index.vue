<template>
  <div
    :style="style.root" 
    class="root">
    <div class="bg"></div>
    <div class="photo" :style="style.photeHei">
      <img v-if="photoUrl !== null" :src="photoUrl  + this.qiniuCompress()" alt=""/>
    </div>
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
import { $_wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
// const cdnUrl = process.env.CDN_URL
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      baseUrl: IMAGE_SERVER + '/pages/king/',
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
        imgUrl: IMAGE_SERVER + '/pages/king/share.jpg',
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
// @imageHost: 'http://cdn.exe666.com/image/king';
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/king';
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('@{imageHost}/bg1.jpg');
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: bgMove 0.8s linear infinite alternate;
  }
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
