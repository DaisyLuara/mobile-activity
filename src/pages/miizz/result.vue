<template>
  <div class="report-wrap">
    <div class="coupon-wrap">
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/bg1.png" class="report_bg_1"/>
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/save.png" class="save"/>
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/up.png" class="arrow"/>
    </div>
    <div class="miizz-wrap">
      <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/bg2.png" class="report_bg_2"/>
        <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/jewelry_text1.png" class="jewelry_text1"/>
        <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/jewelry1.png" class="jewelry1"/>
        <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/jewelry_text2.png" class="jewelry_text2"/>
        <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/jewelry2.png" class="jewelry2"/> 
        <img alt="" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz/qrcode.png" class="qrcode"/> 

    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import { customTrack } from 'modules/customTrack';
import WxShare from 'modules/wxShare.vue';

export default {
  components: {
    WxShare,
  },
  data() {
    return {
      resultImgUrl: '',
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
    // this.getPeopleImage();
  },
  methods: {
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId);
      this.$http.get(process.env.SAAS_API + '/open/play/playResults/' + recordId).then((result) => {
        let data = result.data.data;
        console.log(data);
        this.resultImgUrl = data.result_img_url;
      }).catch((err) => {
        console.log(err);
      });
    },
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
    .report_bg_1{
      width:100%;
    }
    position: relative;
    .save{
      position: absolute;
      bottom: 12%;
      width: 30%;
      left: 35%;
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
    // 0% {transform: translateY(-3px);}
    // 100% {transform: translateY(0px);}
  }
}
</style>


