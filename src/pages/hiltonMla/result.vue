<template>
  <div class="hilton-content">
      <img class="bg" :src="imgServerUrl + '/pages/hiltonMla/bg.jpg'" alt="" >
      <img class="pingzi" :src="imgServerUrl + '/pages/hiltonMla/pingzi.png'" alt="" >
      <img class="light" :src="imgServerUrl + '/pages/hiltonMla/light.png'" alt="">
     <div class="coupon">
         <img  v-show="showCoupon.cp268" class="cp-268" :src="imgServerUrl + '/pages/hiltonMla/268.png'" alt="" />
         <img  v-show="showCoupon.cp428" class="cp-428" :src="imgServerUrl + '/pages/hiltonMla/428.png'" alt="" />
         <img  v-show="showCoupon.cp777" class="cp-777" :src="imgServerUrl + '/pages/hiltonMla/777.png'" alt="" />
      </div>
      <div class="save">
          <img class="jiantou" :src="imgServerUrl + '/pages/hiltonMla/jiantou.png'" alt="" >
          <img class="title" :src="imgServerUrl + '/pages/hiltonMla/title.png'" alt="" >
      </div>
      <div class="bg2">
         <img :src="imgServerUrl + '/pages/hiltonMla/bg2.png'" alt="" >
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
      resultImgUrl:'',
      type:this.$route.query.type,
      showCoupon:{
          cp268:false,
          cp428:false,
          cp777:false 
        },
      //微信分享信息
      wxShareInfoValue: {
        title: '玩儿游戏居然能中大奖？',
        desc: '快来围观头号玩家吧',
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
    this.getImageById();
    this.show();

  },
  methods: {
    show(){
      if(this.type==1){
        this.showCoupon.cp268=true;
      }
      if(this.type==2){
        this.showCoupon.cp428=true;
      }
      if(this.type==3){
        this.showCoupon.cp777=true;
      }
     },
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hiltonMla';
.hilton-content{
      width:100%;
      height:100%;
      position: relative;
      text-align: center;
      overflow:hidden;
   .pingzi{
        position: absolute;
        left: 0;
        top: 0;
      }
    .light{
        position: absolute;
        left: 0;
        top: 8%;
      }
    .coupon{
      width: 85%;
      img{
       position: absolute;
        left: 50%;
        top: 48%;
        transform: translate(-50%,-50%)
      }
     
    }
    .save{
      width:100%;
        position: absolute;
        left: 0%;
        bottom: 7%;
        text-align:center;
        animation: arrows .4s ease-out infinite alternate;
      .jiantou{
         width: 5.5%;
      }
      .title{
        width: 52%;
        display: block;
        margin: 2% 0 0 25%
      }
    }
    .bg2{
        width:100%;
        position: absolute;
        left: 0%;
        bottom: 0%;
    }
}
@keyframes arrows {
    0% {transform: translateY(-3px);}
    100% {transform: translateY(0px);}
  }

</style>


