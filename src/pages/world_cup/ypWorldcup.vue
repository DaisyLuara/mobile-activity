<template>
    <div 
      class="content" 
      id="content"
      :style="style.root">
      <div class="main">
         <div class="shade" v-if="shade" @click="shadeDisappear()"> 
          <img class="hand-title" :src="imgServerUrl + '/pages/yp/share_hand.png'">
          <img class="hand" :src="imgServerUrl + '/pages/yp/hand.png'">
         </div>
        <img class="bg" :src="imgServerUrl + '/pages/yp/bg.png'">
        <div class="title">
          <img  :src="imgServerUrl + '/pages/yp/title.png'">
        </div>
        <img class="ball1" :src="imgServerUrl + '/pages/yp/ball.png'">
        <img class="ball2" :src="imgServerUrl + '/pages/yp/ball.png'">
        <div class="photo-area">
          <img  class="photo" :src="resultImgUrl" alt=""/>
          <!-- <img class="photo" :src="imgServerUrl + '/pages/yp/111.png'"> -->
          <img  :src="imgServerUrl + '/pages/yp/kuang.png'">
        </div>
          <img class="get" :src="imgServerUrl + '/pages/yp/get_game.png'">
          <img class="share" :src="imgServerUrl + '/pages/yp/share.png'" @click="share()">
        <div class="ad">
          <img :src="imgServerUrl + '/pages/yp/ad.png'">
        </div>
      </div>
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
      resultImgUrl: '',
      shade: false,
      style: {
        root: {
          height: wih + 'px'
        }
      },
      //微信分享
      wxShareInfo: {
        title: '冠军我来猜',
        desc: '恭喜您！获得游戏一次',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/yp_share_icon.png',
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
    this.getImageById()
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    },
    share() {
      this.shade = true
    },
    shadeDisappear() {
      this.shade = false
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
  .main {
    position: relative;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .shade {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.8;
      position: absolute;
      z-index: 8;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .hand-title {
        width: 80%;
        position: absolute;
        left: 50%;
        top: 10%;
        z-index: 99;
        transform: translate(-50%);
      }
      .hand {
        width: 21%;
        position: absolute;
        right: 8%;
        top: 4%;
        z-index: 100;
        animation: point 0.8s linear infinite alternate;
      }
    }
    .title {
      width: 100%;
      position: absolute;
      left: 0;
      top: 1%;
      z-index: 4;
      text-align: center;
      padding: 1%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      img {
        width: 92%;
      }
    }
    .ball1 {
      position: absolute;
      left: -6%;
      top: 52%;
      z-index: 4;
      width: 15%;
    }
    .ball2 {
      position: absolute;
      right: -7%;
      top: 28%;
      z-index: 4;
      width: 22%;
    }
    .photo-area {
      position: absolute;
      left: 0;
      top: 13.3%;
      width: 100%;
      text-align: center;
      z-index: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .photo {
        position: absolute;
        left: 28%;
        top: 2%;
        width: 57%;
      }
      img {
        width: 78%;
      }
    }
    .get {
      width: 78%;
      display: inline-block;
      position: absolute;
      top: 63%;
      left: 14%;
      z-index: 4;
    }
    .share {
      width: 19.1%;
      position: absolute;
      display: inline-block;
      top: 63%;
      right: 8.5%;
      z-index: 5;
    }
    .ad {
      position: absolute;
      left: 0;
      bottom: 3%;
      z-index: 4;
      text-align: center;
      img {
        width: 100%;
        margin-left: 2.5%;
      }
    }
  }
}
//动画
@keyframes point {
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>
