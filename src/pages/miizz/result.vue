<template>
  <div class="report-wrap">
    <div class="coupon-wrap">
      <img alt="" :src="IMAGE_SERVER + 'bg1.png'" class="report_bg_1"/>
      <img alt="" :src="IMAGE_SERVER + 'save.png'" class="save"/>
      <img alt="" :src="IMAGE_SERVER + 'up.png'" class="arrow"/>
    </div>
    <div class="miizz-wrap">
      <img alt="" :src="IMAGE_SERVER + 'bg2.png'" class="report_bg_2"/>
        <img alt="" :src="jewelryTextOne" class="jewelry_text1"/>
        <img alt="" :src="jewelryOne" class="jewelry1"/>
        <img alt="" :src="jewelryTextTwo" class="jewelry_text2"/>
        <img alt="" :src="jewelryTwo" class="jewelry2"/> 
        <img alt="" :src="IMAGE_SERVER + 'qrcode.png'" class="qrcode"/> 
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages/miizz/'

import { customTrack } from 'modules/customTrack';
import WxShare from 'modules/wxShare.vue';


export default {
  components: {
    WxShare,
  },
  data() {
    return {
      IMAGE_SERVER: IMAGE_SERVER,
      jewelryTextOne: IMAGE_SERVER + 'jewelry_text1.png',
      jewelryTextTwo: IMAGE_SERVER + 'jewelry_text2.png',
      jewelryOne: IMAGE_SERVER + 'jewelry1.png',
      jewelryTwo: IMAGE_SERVER + 'jewelry2.png',
      ImgUrl: '',
      wxShareInfoValue: {
        title: '觅作',
        desc: '觅作',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/openBox_share_icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = '觅作';
  },
  created() {
    // this.getInfoById();
  },
  methods: {
   getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.ImgUrl = res.image
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    document.getElementsByClassName('coupon-wrap')[0].style.height = window.innerHeight + 'px'
    // document.getElementsByClassName('miizz-wrap')[0].style.minHeight = window.innerHeight + 'px'
  },
  computed: {
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
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz';

.report-wrap{
  position: relative;
  .coupon-wrap{
    .report_bg_1{
      width:100%;
    }
    position: relative;
    .save{
      position: absolute;
      bottom: 12%;
      width: 30%;
      left: 35%;
      animation: opacitySave .8s linear infinite alternate;
    }
    .arrow{
      position: absolute;
      bottom: 2%;
      width: 15%;
      left: 42.5%;
      animation: arrows .8s ease-out infinite alternate;

    }
  }
  .miizz-wrap{
    // height: auto;
    // background-repeat: no-repeat;
    // background-image: url("@{imageHost}/bg2.png");
    // background-size: 100%;
    position: relative;
    .report_bg_2{
      width:100%;
    }
    .jewelry_text1{
      position: absolute;
      width: 30%;
      top: 15%;
      right: 6%;
    }
    .jewelry1{
      position: absolute;
      width: 40%;
      top: 11%;
      left: 13%;
    }
    .jewelry_text2{
      position: absolute;
      top: 50%;
      width: 30%;
      left: 6%;
    }
    .jewelry2{
      position: absolute;
      width: 40%;
      top: 44%;
      right: 12%;
    }
    .qrcode{
      position: absolute;
      width: 20%;
      bottom: 9%;
      left: 39%;
    }
    .photo-content{
      position: absolute;
      width: 48%;
      top: 28.11%;
      left: 26%;
      border: 4px solid #f9db96;
      border-radius: 26px;
      .photo{
        border-radius: 26px;
        width: 100%;
      }
    }
    .save{
      position: absolute;
      width: 60%;
      bottom: -17%;
      left: 20%;;
    }
  }
  @keyframes arrows {
    0% {transform: translateY(-3px);}
    100% {transform: translateY(0px);}
  }
  @keyframes opacitySave {
    0% {opacity: 0.3}
    100% {opacity: 1}
  }
}
</style>


