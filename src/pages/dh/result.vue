<template>
  <div class="concert-content">
      <!-- <img  class="photo" :src="resultImgUrl" alt=""/> -->
      <img  class="photo" src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg" alt=""/>
      <img :src="imgServerUrl + '/pages/dh/cloud1.png'" alt="" class="cloud1">
      <img :src="imgServerUrl + '/pages/dh/cloud2.png'" alt="" class="cloud2">
      <img :src="imgServerUrl + '/pages/dh/cloud3.png'" alt="" class="cloud3">
      <div class="jiantou">
        <img :src="imgServerUrl + '/pages/dh/arrow.png'" alt="" >
       </div>
       <div class="text">
        <img :src="imgServerUrl + '/pages/dh/text.png'" alt="" >
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
        title: '光启城',
        desc: '快来光启城一起参加世界杯吧',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dh_share_icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = "大华集团";
  },
  mounted(){
    $('.concert-content').css('min-height', $(window).height());
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
      background-repeat: no-repeat;
      background-image: url("@{imageHost}/bg.png");
      background-size: 100% 100%;
      position: relative;
      overflow:hidden;
      text-align:center;
    .photo{
      // width: 73.5%;
      // height:73.5%;
      // position: absolute;
      // left: 50%;
      // top: 50%;
        width: 62.5%;
        height: 54.7%;
        position: absolute;
        left: 50%;
        top: 49.8%;
      transform: translate(-50%,-56.5%)
    }
    .cloud1{
      width: 25%;
      position: absolute;
      top: 14%;
      right: 5%;
      z-index: 9999;
      animation: around 1s linear infinite alternate;
    }
    .cloud2{
      width: 20%;
      position: absolute;
      top: 31%;
      left: 5%;
      z-index: 9999;
      animation: around 1s linear infinite alternate;
    }
    .cloud3{
      width: 36%;
      position: absolute;
      bottom: 22%;
      right: 5%;
      z-index: 9999;
      animation: around 1s linear infinite alternate;
    }
    .jiantou{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 21%;
      img{
        width:6%;
        // height:10%;
      }
      animation: arrows .8s ease-out infinite alternate;
    }
    .text{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 18%;
      img{
        width:60%;
        height:10%;
      }
    }
   @keyframes arrows {
    0% {transform: translateY(-3px);}
    100% {transform: translateY(0px);}
  }
  @keyframes around {
  0% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}
}

</style>


