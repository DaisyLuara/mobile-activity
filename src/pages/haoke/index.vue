<template>
    <div class="haoke-content">
    <img  class="photo-id" :src="resultImgUrl" alt=""/>
    <!--<img  class="photo-id" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
    <div class="coupons">
        <img  v-show="showCoupon.showFree" class="free" :src="imgServerUrl + '/pages/haoke/free.png'" alt="" @click="goUrl()"/>
        <img  v-show="showCoupon.couponFive"  class="five" :src="imgServerUrl + '/pages/haoke/5.png'" alt="" @click="goUrl()"/>
        <img  v-show="showCoupon.couponEightyFive" class="eighty-five" :src="imgServerUrl + '/pages/haoke/85.png'" alt="" @click="goUrl()"/>
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
   </div>
</template>
<script>
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import wxService from 'services/wx';
import parseService from 'modules/parseServer';
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
      couponType:this.$route.query.couponType,
      showCoupon:{
          couponFive:true,
          couponEightyFive:true,
          showFree:true 
        },
      //微信分享信息
      wxShareInfoValue: {
        title: '有颜有演技，免费爆米花送给你~',
        desc: '2018爆米花奥斯卡，等你来加戏。',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/popcorn_share_icon.jpg',
      },
    };
  },
  beforeCreate() {
    document.title = '豪客来';
  },
  created() {
    //拿取图片id
    this.getImageById();
  },
  mounted(){
    $('.haoke-content').css('min-height', $(window).height());
    console.log(this.couponType);
    this.show();
  },
  methods: {
     //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService.getInfoById(this, id).then((result) => {
        // console.log(result);
        // console.log(this.resultImgUrl)
        this.resultImgUrl = result.image;
      }).catch((err) => {
        console.log(err);
      });
    },
    show(){
      if(this.couponType==1){
         this.showCoupon.couponEightyFive=false;
         this.showCoupon.couponFive=false
      }
      if(this.couponType==2){
        this.showCoupon.couponEightyFive=false;
        this.showCoupon.showFree=false
      }
      if(this.couponType==3){
        this.showCoupon.couponFive=false;
        this.showCoupon.showFree=false
      }
    },
    //跳转操作
     goUrl(){
      var tk1='BF3ADDAB550DE2F25C5260CBBD034DF524F844F357A2F9A983C4825662982952AB819EE4A36C';
      if(this.couponType==1){
         window.location.href='http://crm.houcaller.com/m/cpnapi/get/I4CD1QK8E5V82?tk='+tk1;
      }
      if(this.couponType==2){
      var tk2='BF3ADDAB550DE2F25C5360CBBD034DF524F844F357A2F9A983C4825662982952AB819EE4A36C';
         window.location.href='http://crm.houcaller.com/m/cpnapi/get/I4CD1KD1J5V10?tk='+tk2;
      }
      if(this.couponType==3){
      var tk3='BF3ADDAB550DE2F25C5360CBBD034DF524F844F357A2F9A983C4825662982952AB819EE4A36C';
         window.location.href='http://crm.houcaller.com/m/cpnapi/get/I4CD1LFE95V39?tk='+tk3;
      }
     
    }
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/haoke';
.haoke-content{
      width:100%;
      height:100%;
      background-repeat: no-repeat;
      background-image: url("@{imageHost}/bg.jpg");
      background-size: 100% 100%;
      position: relative;
      text-align: center;
      overflow:hidden;
    img{
        border:none;
      }
    .photo-id{
        position: absolute;
        left: 19.5%;
        top: 11.5%;
        width: 61%;
        height: 65%;
    }
  .coupons{
    .free{
        width: 60%;
        position: absolute;
        left: 19%;
        bottom: 0;
        text-align: center;
    }
    .five{
        width: 60%;
        position: absolute;
        left: 19%;
        bottom: 0;
        text-align: center;
    }
    .eighty-five{
        width: 60%;
        position: absolute;
        left: 19%;
        bottom: 0;
        text-align: center;
    }
  }
   
}
</style>