<template>
<div class="video-content" id="content" >
    <div class="navDiv" @click="returnMenu"></div>
    <div class="vDiv" >
      <!-- x5-video-player-type="h5"  -->
        <video  id="video"  autoplay  webkit-playsinline="true" playsinline="true" x-webkit-airplay="true"  controls loop
         :style="style">
        <source :src="IMGURL + 'video/' + vNum +'.mp4'" type="video/mp4">
            您的浏览器不支持video标签.
        </video>
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
</div>
</template>

<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      vNum: this.$route.query.utm_source,
      playNow: null,
      playerType: 'h5',
      style:
        'background-image:url(' +
        IMAGE_SERVER +
        '/pages/promotion/video/' +
        this.$route.query.utm_source +
        '.jpg)',
      title: ['', '互动导视', '活动发布', '会员运营', '商场运营'],
      //微信分享
      wxShareInfo: {
        title: '星视度',
        desc: '',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/heyjuice/icon.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {},
  created() {
    let num = this.vNum
    document.title = this.title[num]
  },
  mounted() {
    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    this.playNow = document.getElementById('video')
    this.playNow.play()
  },
  methods: {
    returnMenu() {
      window.location.href =
        window.location.origin + '/marketing/ppt?utm_source=0'
    }
  },
  components: {
    WxShare
  }
}
</script>

<style lang="less" scoped>
@imgURL: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/promotion/';
html,
body {
  overflow-x: hidden;
  text-align: center;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.video-content {
  width: 100%;
  text-align: center;
  overflow-x: hidden;
  position: relative;

  .navDiv {
    width: 100%;
    height: 49px;
    background-image: url('@{imgURL}return.png');
    background-position: center center;
    background-size: 50% auto;
    background-repeat: no-repeat;
    background-color: #000;
  }
  .vDiv {
    width: 100%;
    height: 90%;
    video {
      width: 100%;
      height: 100%;
      background-position: center 49px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
