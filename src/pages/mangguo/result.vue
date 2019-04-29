<template>
  <div 
    id="mgPage" 
    class="mgPage"
  >
    <div class="main">
      <img 
        :src="IMAGE_URL + 'bg2.jpg'" 
        class="bg"
      >
      <img 
        :src="photo + this.$qiniuCompress()" 
        class="photo"
      >
      <img 
        :src="IMAGE_URL + 'point.gif'" 
        class="point"
      >
      <a :href="alink"><img :src="IMAGE_URL + 'alink.png'"></a>
    </div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      IMAGE_URL: IMAGE_SERVER + '/pages/mangguo/',
      photo: null,
      alink:
        'https://club.mgtv.com/mcards/index.html?source=mgcard_98&_mat_from=mgcard_98&d=1525419125870&from=singlemessage&isappinstalled=0',
      //微信分享信息
      wxShareInfoValue: {
        title: '重温青葱岁月！《出走人生电台》圆你电台主播梦',
        desc: '芒果娱乐全新青春网剧，给你不一样的90后情怀',
        imgUrl: IMAGE_SERVER + '/pages/mangguo/share.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    let mgPage = document.getElementById('mgPage')
    mgPage.style.minHeight = height + 'px'
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/mangguo/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.mgPage {
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  background-image: url('@{imgUrl}bgY.jpg');
  background-position: center center;
  background-size: auto auto;
  background-repeat: repeat;
  .main {
    position: relative;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    .bg {
      width: 100%;
      height: auto;
      margin: 0 auto;
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 73.5%;
      height: 54.6%;
      position: absolute;
      top: 6.5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }
    .point {
      margin: 0 auto;
      margin-top: 5%;
      width: 10%;
      display: block;
      position: absolute;
      z-index: 999;
      left: 50%;
      transform: translateX(-50%);
      top: 61%;
    }

    a {
      display: inline-block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 75%;
      width: 73.5%;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>


