<template>
    <div 
      class="content" 
      id="content"
      :style="style.root">
        <img class="bg" :src="imgServerUrl + '/pages/yp/bg.png'">
        <div class="title">
          <img  :src="imgServerUrl + '/pages/yp/title.png'">
        </div>
        <img class="ball1" :src="imgServerUrl + '/pages/yp/ball.png'">
        <img class="ball2" :src="imgServerUrl + '/pages/yp/ball.png'">
        <div class="photo-area">
          <img  :src="imgServerUrl + '/pages/yp/kuang.png'">
        </div>
        <div class="getAwards">
          <img class="get" :src="imgServerUrl + '/pages/yp/get_game.png'">
          <img class="share" :src="imgServerUrl + '/pages/yp/share.png'">
        </div>
        <!-- <div class="ad">
          <img :src="imgServerUrl + '/pages/yp/ad.png'">
        </div> -->
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
</template>
<script>
const wih = window.innerHeight
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      style: {
        root: {
          height: wih + 'px'
        }
      },
      //微信分享
      wxShareInfo: {
        title: '',
        desc: '',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/war_share_icon.jpg',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = ''
  },
  created() {},
  mounted() {
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.drawCanvas(res.image)
          this.press = true
        })
        .catch(err => {})
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/yp/';
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow-x: hidden;
  .bg {
    position: relative;
    z-index: 3;
  }
  .title {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    text-align: center;
    img {
      width: 90%;
    }
  }
  .ball1 {
    position: absolute;
    left: -6%;
    top: 62%;
    z-index: 4;
    width: 15%;
  }
  .ball2 {
    position: absolute;
    right: -7%;
    top: 28%;
    z-index: 4;
    width: 20%;
  }
  .photo-area {
    position: absolute;
    left: 0;
    top: 11%;
    width: 100%;
    text-align: center;
    z-index: 4;
    img {
      width: 82%;
    }
  }
  .getAwards {
    width: 100%;
    position: absolute;
    left: 0%;
    top: 78%;
    z-index: 4;
    text-align: center;
    .get {
      width: 85%;
    }
    .share {
      width: 20.8%;
      position: absolute;
      right: 8%;
      top: 0;
    }
  }
  .ad {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 4;
    text-align: center;
    img {
      width: 100%;
      margin-left: 2.5%;
    }
  }
}
</style>
