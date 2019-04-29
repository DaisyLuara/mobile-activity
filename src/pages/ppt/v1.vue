<template>
  <div 
    id="content" 
    class="video-content"
  >
    <div 
      class="navDiv" 
      @click="returnMenu"
    />
    <div class="vDiv">
      <video 
        id="video" 
        webkit-playsinline="true" 
        playsinline="true" 
        x-webkit-airplay="true" 
        controls 
        width="100%" 
        height="100%"
      >
        <source 
          :src="IMGURL + 'video/' + vNum +'.mp4'" 
          type="video/mp4"
        >
        您的浏览器不支持video标签.
      </video>
    </div>
    <img 
      v-show="bgshow" 
      :src="IMGURL + 'video/bg' + vNum +'.jpg'" 
      class="vbg"
    >
    <a 
      v-show="bgshow" 
      class="vplay" 
      @click="vPlay"
    ><img :src="IMGURL + 'video/play'+vNum+'.png'"></a>
  </div>
</template>

<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      vNum: this.$route.query.utm_source,
      playNow: null,
      playerType: 'h5',
      bgshow: true,
      title: ['', '互动导视', '活动发布', '会员运营', '商场运营'],
      //微信分享
      wxShareInfo: {
        title: '星视度',
        desc: '星视度 创想新视界',
        imgUrl: IMAGE_SERVER + '/pages/promotion/icon.jpg',
        success: function() {
          handleWechatShare()
        }
      }
    }
  },
  created() {
    let num = this.vNum
    document.title = this.title[num]
  },
  mounted() {
    this.handleWechatShare()
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    this.playNow = document.getElementById('video')
    this.playNow.load()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    returnMenu() {
      window.location.href =
        window.location.origin + '/marketing/ppt?utm_source=0'
    },
    vPlay() {
      this.playNow.currentTime = 0
      this.playNow.play()
      this.bgshow = false
      this.playNow.onended = function() {
        this.bgshow = true
      }
    }
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
    position: relative;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 0;
    }
  }
  .vbg {
    position: absolute;
    top: 49px;
    left: 0;
    width: 100%;
    z-index: 99;
  }
  .vplay {
    width: 25%;
    display: block;
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 49px;
    z-index: 999;
    img {
      width: 100%;
    }
  }
}
</style>
