<template>
<div class="report-content">
  <div class="report-wrap">
    <div class="photo-wrap">
      <!-- <img :src="resultImgUrl" alt=""/> -->
      <img src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/knifeDog_108_377_1492925365544.jpg" alt=""/>
    </div>
    <div class="save">
      <img :src="imgServerUrl + '/pages/hq/save.png'" alt=""/>
    </div>
    <div class="logo">
      <img :src="imgServerUrl + '/pages/hq/logo.png'" alt=""/>
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
      wxShareInfoValue: {
        title: '旺狗开春 情缘满分',
        desc: '浦商百货借旺狗报新春 送祝福 合家欢 情侣睦 诞生的汪早脱单',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/hq_share_icon.jpg',
      },
    };
  },
  beforeCreate() {
    document.title = '虹桥天地';
  },
  mounted() {
    $('.report-wrap').css('height', $(window).height());
  },
  created() {
    this.getImageById();
  },
  methods: {
    getImageById() {
      marketService.getImageById(this, '1281272').then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    // getPeopleImage() {
    //   let recordId = decodeURI(this.$route.query.recordId);
    //   marketService.getPlayResultById(this, recordId).then((result) => {
    //     this.resultImgUrl = result.result_img_url;
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // },
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
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hq';
  .report-content{
    .report-wrap{
      height: 100%;
      background-repeat: no-repeat;
      background-image: url("@{imageHost}/bg.png");
      background-size: 100% 100%;
      position: relative;
      overflow:hidden;
      .photo-wrap{
        background-image: url("@{imageHost}/photo_bg.png");
        background-size: 100% 100%;
        position: absolute;
        top: 8%;
        width: 66%;
        left: 17%;
        img{
          width: 100%;
          padding: 10px;
        }
      }
      .save{
        position: absolute;
        // bottom: 10%;
        top: 83%;
        width: 68%;
        left: 16%;
        img{
          width: 100%;
        }
      }
      .logo{
        position: absolute;
        bottom: -2%;
        width: 100%;
        left: 31%;
        img{
          width: 38%;
        }
      }
    }
  }
</style>


