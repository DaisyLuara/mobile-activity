<template>
  <div class="tmall-content" :style="style.root">
      <img  class="bg" :src="imgServerUrl + '/pages/drc_ty/bg.png'" alt=""/>
      <img  class="photo" :src="resultImgUrl + this.qiniuCompress()" alt=""/>
      <!-- <img  class="photo" src="http://image.exe666.com/1007/image/GuideJDBigCityGift_519_432_1492928440995.jpg" alt=""/> -->
      <img  class="blue" :src="imgServerUrl + '/pages/drc_ty/blue.png'" alt=""/>
      <img  class="pick-small" :src="imgServerUrl + '/pages/drc_ty/pick_small.png'" alt=""/>
      <img  class="pick-big" :src="imgServerUrl + '/pages/drc_ty/pick_big.png'" alt=""/>
      <div class="jiantou">
        <img :src="imgServerUrl + '/pages/drc_ty/save.png'" alt="" >
      </div>
  </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      style: {
        root: {
          width: '100%',
          'min-height': window.innerHeight + 'px'
        }
      },
      //微信分享信息
      wxShareInfo: {
        title: '让夏天，更清凉',
        desc: 'gift for you 点击领取',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/drc_ty_share_icon.png'
      }
    }
  },
  mounted() {
    this.wechatShare()
    this.getInfoById()
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function() {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = res.image
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.tmall-content {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  user-select: none;
  // overflow-y: scroll;
  z-index: 10;
  .bg {
    width: 100%;
    z-index: -10;
    user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .blue {
    user-select: none;
    pointer-events: none;
    position: absolute;
    width: 42%;
    left: -13%;
    top: -8%;
    animation: blueScale 2s ease-out infinite forwards;
  }
  .pick-small {
    user-select: none;
    pointer-events: none;
    position: absolute;
    width: 19%;
    right: 2%;
    top: 13%;
    animation: blueScale 2s ease-out infinite forwards;
  }
  .pick-big {
    user-select: none;
    pointer-events: none;
    position: absolute;
    width: 30%;
    left: -7%;
    top: 42%;
    animation: blueScale 2s ease-out infinite forwards;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 10%;
    top: 80%;
    img {
      width: 80%;
      user-select: none;
      pointer-events: none;
    }
    animation: arrow 1.2s linear infinite alternate;
  }
}
@keyframes blueScale {
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
</style>


