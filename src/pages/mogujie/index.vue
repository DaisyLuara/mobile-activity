<template>
  <div class="mogu-coupon-wrap">
    <img class="title" :src="imgServerUrl + '/pages/mogujie/title.png'" alt=""/>
    <div class="img-wrap">
      <img class="img-photo" :src="resultImgUrl" alt="" />
      <img class="frame2" :src="imgServerUrl + '/pages/mogujie/frame2.png'" alt=""/>
      <img class="frame" :src="imgServerUrl + '/pages/mogujie/frame.png'" alt=""/>
    </div>
    <img class="save-tip" :src="imgServerUrl + '/pages/mogujie/save_tip.png'" alt=""/>
    <img class="logo"  :src="imgServerUrl + '/pages/mogujie/logo.png'" alt=""/>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
  import marketService from 'services/marketing';
  import WxShare from 'modules/wxShare';
  import wxService from 'services/wx';
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
          title: '发现时尚 就在蘑菇街',
          desc: '蘑菇街扮靓你的美 高分颜值晒出你自信',
          imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/mogujie_share_icon.png',
        },
      };
    },
    beforeCreate() {
      document.title = '蘑菇街女装';
    },
    mounted(){
      $('.mogu-coupon-wrap').css('height', $(window).height());
    },
    created() {
      //拿取图片id
      this.getImageById();
    },
    methods: {
      //拿取图片id
      getImageById() {
        let id = this.$route.query.id
        marketService.getImageById(this, id).then((result) => {
          this.resultImgUrl = result;
        }).catch((err) => {
          console.log(err);
        });
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
<style scoped lang="less">
 @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/mogujie';
  .mogu-coupon-wrap{
    width:100%;
    text-align: center;
    background-image:url("@{imageHost}/bg.jpg");
    background-size:cover;
    background-repeat: no-repeat;
    img{
      width: 100%;
    }
    .title{
      width: 97%;
      margin-top:2%;
      overflow:hidden;
    }
    .img-wrap{
      position: relative;
      width: 100%;
      margin-top: 5%;
      .img-photo{
        position: absolute;
        top: 21%;
        left: 0;
        right: 0;
        z-index: 3;
        width: 91%;
        margin: 0 auto;
      }
      .frame{
        z-index: 1;
      }
      .frame2{
        position: absolute;
        top: 0;
        left:0;
        bottom: 0;
        margin: auto;
        z-index: 2;
      }
    }
    .save-tip{
      width: 80%;
      margin: 2% 9% 0 9%;
      display: block;
    }
    .logo{
      width: 16%;
      margin-top:8%;
    }
   }
</style>
