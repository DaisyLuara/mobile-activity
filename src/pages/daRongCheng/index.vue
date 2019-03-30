<template>
  <div
    :style="style.root"
    class="tmall-content"
  >
    <img
      :src="imgServerUrl + '/pages/drc_ty/bg.png'"
      :style="style.bg"
      class="bg"
      alt=""
    >
    <img
      :src="photo + this.$qiniuCompress()"
      :class="{'photo': !iphoneX, 'x-photo': iphoneX}"
      alt=""
    >
    <!-- <img  src="http://image.xingstation.cn/1007/image/GuideJDBigCityGift_519_432_1492928440995.jpg" alt="" :class="{'photo': !iphoneX, 'x-photo': iphoneX}" /> -->
    <img
      :src="imgServerUrl + '/pages/drc_ty/blue.png'"
      class="blue"
      alt=""
    >
    <img
      :src="imgServerUrl + '/pages/drc_ty/pick_small.png'"
      class="pick-small"
      alt=""
    >
    <img
      :src="imgServerUrl + '/pages/drc_ty/pick_big.png'"
      :class="{'pick-big': !iphoneX, 'x-pick-big': iphoneX}"
      alt=""
    >
    <div class="jiantou">
      <img
        :src="imgServerUrl + '/pages/drc_ty/save.png'"
        alt=""
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  mixins: [normalPages],
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      style: {
        root: {
          width: '100%',
          'min-height': this.$innerHeight() + 'px'
        },
        bg: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      //微信分享信息
      wxShareInfoValue: {
        title: '让夏天，更清凉',
        desc: 'gift for you 点击领取',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/drc_ty_share_icon.png'
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
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
  .x-photo {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 75%;
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
  .x-pick-big {
    user-select: none;
    pointer-events: none;
    position: absolute;
    width: 30%;
    left: -7%;
    top: 39%;
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


