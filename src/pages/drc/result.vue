<template>
  <div class="concert-content">
    <div class="main">
      <img :src="imgServerUrl + '/pages/drc/bg.png'" class="bg"/>
      <!-- <img class="photo" :src="resultImgUrl" alt=""/> -->
      <img  class="photo" :src="imgServerUrl + '/pages/drc/photo.png'" alt=""/>
      <img :src="imgServerUrl + '/pages/drc/cloud1.png'" alt="" class="cloud1">
      <img :src="imgServerUrl + '/pages/drc/cloud1.png'" alt="" class="cloud2">
      <img :src="imgServerUrl + '/pages/drc/doll.png'" alt="" class="doll">
      <img :src="imgServerUrl + '/pages/drc/cloud1.png'" alt="" class="cloud3">
      <div class="jiantou">
        <img :src="imgServerUrl + '/pages/drc/arrow.png?v=1'" alt="" >
       </div>
       <div class="text">
        <img :src="imgServerUrl + '/pages/drc/share.png'" alt="" >
       </div>
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import { customTrack } from 'modules/customTrack';


const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';

export default {
  components: {
    WxShare,
  },
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '我要去看世界杯啦',
        desc: '大融城邀您一起观看精彩世界杯',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/drc-share-icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = "大融城";
  },
  mounted(){
    $('.concert-content').css('height', $(window).height());
    // $('.main').css('height', $(window).height());
  },
  created() {
    this.getImageById();
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService.getInfoById(this, id).then((result) => {
        this.resultImgUrl = result.image;
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: () => {
          customTrack.shareWeChat();
        },
      };
      return wxShareInfo;
    },
  },
};
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dh';
.concert-content{
      width:100%;
      height:100%;
      overflow-y: hidden;
      text-align:center;
      .main{
        position: relative;
        text-align: center;
        margin: 0 auto;
        display: inline-block;
        width: 100%;
        height:100%;
        .bg{
          width:100%;
          height:100%;
        }
        .photo{
          width: 73%;
          height: 49.5%;
          position: absolute;
          left: 50%;
          top: 36%;
          transform: translate(-50%,-56.5%)
        }
        .cloud1{
          width: 30%;
          position: absolute;
          top: 61.5%;
          left: 14%;
          z-index: 9999;
          animation: around 1.2s  linear infinite alternate;
        }
        .cloud2{
          width: 21%;
          position: absolute;
          top: 64%;
          right: 15%;
          z-index: 999;
        }
        .doll{
          width: 15%;
          position: absolute;
          top: 55%;
          right: 27%;
          // transform: rotate(-18deg);
          z-index: 2999;
          animation: bollRotate 1.5s linear infinite alternate;
        }
        .cloud3{
          width: 21%;
          position: absolute;
          top: 66%;
          right: 26%;
          z-index: 9999;
        }
        .jiantou{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 25%;
          img{
            width:6%;
          }
          animation: arrows 1s ease-out infinite alternate;
        }
        .text{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 20%;
          img{
            width:60%;
            height:10%;
          }
        }
      }
    
   @keyframes arrows {
    0% {transform: translateY(-3px);}
    100% {transform: translateY(0px);}
  }
  @keyframes around {
    0% {
      transform: translateX(-55px);
    }
    100% {
      transform: translateX(5px);
    }
  }
  @keyframes cloud2 {
    0% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(-5px);
    }
  }
  @keyframes bollRotate {
    0% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(20deg);
    }
  }
}

</style>


