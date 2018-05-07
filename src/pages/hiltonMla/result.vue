<template>
  <div class="hilton-content">
      <div class="coupon">
         <img   v-show="showCoupon.cp228" class="cp-228" :src="imgServerUrl + '/pages/hiltonMla/228.png'" alt="" />
         <img   v-show="showCoupon.cp268" class="cp-268" :src="imgServerUrl + '/pages/hiltonMla/268.png'" alt="" />
         <img   v-show="showCoupon.cp298" class="cp-298" :src="imgServerUrl + '/pages/hiltonMla/298.png'" alt="" />
      </div>
      <div class="save">
          <img class="jiantou" :src="imgServerUrl + '/pages/hiltonMla/jiantou.png'" alt="" >
           <img class="title" :src="imgServerUrl + '/pages/hiltonMla/title.png'" alt="" >
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
      type:this.$route.query.type,
      showCoupon:{
          cp228:false,
          cp268:false,
          cp298:false 
        },
      //微信分享信息
      wxShareInfoValue: {
        title: '我在希尔顿领到了好多福利',
        desc: '快来看看我都得到了什么吧~',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/hiltonMla_share_icon.jpeg',
      },
    };
  },
  beforeCreate() {
    document.title = "武汉光谷希尔顿酒店";
  },
  mounted(){
    $('.hilton-content').css('min-height', $(window).height());
  },
  created() {
    this.show();
  },
  methods: {
     show(){
      if(this.type==1){
        this.showCoupon.cp228=true;
      }
      if(this.type==2){
        this.showCoupon.cp268=true;
      }
      if(this.type==3){
        this.showCoupon.cp298=true;
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hiltonMla';
.hilton-content{
      width:100%;
      height:100%;
      background-image: url("@{imageHost}/bg.jpeg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      text-align: center;
      overflow:hidden;
    .coupon{
      width: 85%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%)
    }
    .save{
      width:100%;
        position: absolute;
        left: 0%;
        bottom: 7%;
        text-align:center;
        animation: arrows .4s ease-out infinite alternate;
      .jiantou{
         width: 5%;
      }
      .title{
        width:45%;
        display:block;
        margin:1% 0 0 28%;
      }
    }
}
@keyframes arrows {
    0% {transform: translateY(-3px);}
    100% {transform: translateY(0px);}
  }

</style>


