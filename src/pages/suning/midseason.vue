<template>
  <div class="root">
    <!-- bg -->
    <img
      :src="serverUrl + 'ms-bg.png'" 
      class="bg"
    >
    <!-- button -->
    <img
      :src="serverUrl + 'btn.png?v=1'"  
      :style="style.button"
      class="button"
      @click="handleUrlJump"
    >
    <!-- photo -->
    <img
      :style="style.photo"
      :src="photoUrl" 
      class="photo"
    >
  </div>
</template>

<script>
import { $wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
const serverUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/suning/'
const wiw = window.innerWidth
export default {
  data() {
    return {
      serverUrl: serverUrl,
      photoUrl: null,
      wxShareInfo: {
        title: '颜值头条',
        desc: '',
        imgUrl: serverUrl + 'share.png',
        success: () => {
          wechatShareTrack()
        }
      },
      style: {
        button: {
          top: wiw * 230 / 375 + 'px'
        },
        photo: {
          top: wiw * 316 / 375 + 'px'
        }
      }
    }
  },
  mounted() {
    document.title = '颜值头条'
    this.handleWeChatShare()
    this.getPhoto()
  },
  methods: {
    handleUrlJump() {
      window.location.href = 'https://cuxiao.m.suning.com/qiangdianqi.html'
    },
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
    getPhoto() {
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
  z-index: 10;
  .bg {
    position: relative;
    width: 100%;
    z-index: 11;
  }
  .button {
    position: absolute;
    z-index: 12;
    width: 50%;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 0;
    animation: sf 1s infinite;
    -webkit-touch-callout: none;
    user-select: none;
  }
  .photo {
    position: absolute;
    z-index: 12;
    width: 75.1%;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
@keyframes sf {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
