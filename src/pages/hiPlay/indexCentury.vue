<template>
  <div
    :style="style.root"
    class="war-content">
    <img 
      :src="imgServerUrl + '/pages/hiplay/bg_century.jpg'"
      class="bg">
    <div class="center">
      <img 
        :src="imgServerUrl + '/pages/hiplay/frame.png'"
        class="kuang">
    </div>
    <img 
      v-if="photo !== null"  
      :src="photo + this.$qiniuCompress()" 
      class="photo"
      alt="">
    <div 
      :class="{'jiantou-x':iphoneX,'jiantou':!iphoneX}">
      <img 
        :src="imgServerUrl + '/pages/hiplay/arrow.gif'"
        alt="" >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, getInfoById } from 'services'
import { normalPages } from '@/mixins/normalPages'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  mixins: [normalPages],
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      photo: null,
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      //微信分享信息
      wxShareInfoValue: {
        title: '玩转世纪，世纪汇广场邀你嗨翻世纪。',
        desc: '可在屋顶花园免费领取棉花糖一个',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/hiplay-share-icon.jpg',
        link: process.env.AD_API+'/api/s/9rx' + window.location.search,
        success: function() {
          wechatShareTrack()
        }
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hiplay';
.war-content {
  height: 100%;
  position: relative;
  text-align: center;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    user-select: none;
    pointer-events: none;
  }
  .center {
    width: 100%;
    height: 100%;
    position: relative;
    left: 50%;
    top: 50%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    .kuang {
      width: 77%;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%, 0%);
    }
  }
  .photo {
    width: 69.5%;
    position: absolute;
    left: 15.3%;
    top: 21.2%;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -9%;
    img {
      width: 10%;
    }
  }
  .jiantou-x {
    width: 100%;
    position: absolute;
    left: 0;
    top: 88%;
    img {
      width: 10%;
    }
  }
}
</style>


