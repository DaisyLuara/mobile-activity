<template>
  <div class="report-wrap">
    <div class="coupon-wrap">
      <img alt="" :src="baseUrl + 'photo.png'" class="photo"/>
      <img alt="" :src="baseUrl + 'photo.png'" class="photo1"/>
      <img alt="" :src="baseUrl + 'save.png'" class="save"/>
      <img alt="" :src="baseUrl + 'up.png'" class="arrow"/>
    </div>
    <div class="miizz-wrap">
      <img alt="" v-lazy="baseUrl + 'bg2.png'" class="report_bg_2"/>
        <img alt="" :src="jewelryTextOne" class="jewelry_text1"/>
        <img alt="" :src="jewelryImgOne" class="jewelry1"/>
        <img alt="" :src="jewelryTextTwo" class="jewelry_text2"/>
        <img alt="" :src="jewelryImgTwo" class="jewelry2"/> 
        <img alt="" v-lazy="baseUrl + 'qrcode.png'" class="qrcode"/> 
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/'

import { customTrack } from 'modules/customTrack';
import WxShare from 'modules/wxShare.vue';


export default {
  components: {
    WxShare,
  },
  data() {
    return {
      baseUrl: IMAGE_SERVER + 'pages/miizz/',
      jewelryTextOne: '',
      jewelryTextTwo: '',
      jewelryImgOne: '',
      jewelryImgTwo: '',
      ImgUrl: '',
      wxShareInfoValue: {
        title: '觅作',
        desc: '让你点亮世界的穿衣首饰搭配指南',
        imgUrl: IMAGE_SERVER + 'wx_share_icon/miizz_share_icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = '觅作';
  },
  created() {
    this.handleShowPage()
  },
  methods: {
    handleShowPage () {
      let type = this.$route.query.type
      switch(type) {
        case 'A': 
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_A1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_A2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_A1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_A2.png'
        break;
        case 'B': 
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_B1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_B2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_B1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_B2.png'
        break;
        case 'C':
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_C1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_C2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_C1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_C2.png'
        break;
        case 'D':
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_D1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_D2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_D1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_D2.png'
        break;
      }
    }
  },
  mounted() {
    document.getElementsByClassName('coupon-wrap')[0].style.height = window.innerHeight + 'px'
    document.getElementsByClassName('miizz-wrap')[0].style.minHeight = window.innerHeight + 'px'
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
    background-image: url('@{imageHost}/bg1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .photo{
      width: 80%;
      left: 10%;
      position: absolute;
      z-index: -10;
    }
    .photo1{
      opacity: 0;
    }
    .save{
      position: absolute;
      bottom: 15%;
      width: 30%;
      left: 35%;
      opacity: 1;
      z-index:2;
      animation: opacitySave .8s linear infinite alternate;
    }
    .arrow{
      position: absolute;
      bottom: 7%;
      width: 11%;
      left: 44.5%;
      animation: arrows .8s ease-out infinite alternate;

    }
  }
  .miizz-wrap{
    position: relative;
    .report_bg_2{
      width:100%;
    }
    .jewelry_text1{
      position: absolute;
      width: 30%;
      top: 7%;
      right: 6%;
    }
    .jewelry1{
      position: absolute;
      width: 40%;
      top: 2.5%;
      left: 13.3%;
    }
    .jewelry_text2{
      position: absolute;
      top: 46%;
      width: 30%;
      left: 6%;
    }
    .jewelry2{
      position: absolute;
      width: 40%;
      top: 40%;
      right: 11.5%;
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


