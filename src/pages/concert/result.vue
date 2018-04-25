<template>
  <div class="concert-content">
       <img  class="photo" :src="resultImgUrl" alt=""/>
       <!--<img  class="photo" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
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
      //微信分享信息
      wxShareInfoValue: {
        title: '为偶像打Call，2018黄子韬演唱会邀你一起燥！',
        desc: '4月30号 上海站 晚 7：30',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/concert_share_icon.jpg',
      },
    };
  },
  beforeCreate() {
    document.title = "芒果TV & 星视度荣誉出版 ";
  },
  mounted(){
    $('.concert-content').css('min-height', $(window).height());
  },
  created() {
    this.getWxUserInfo();
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
    //微信授权
   getWxUserInfo() {
      wxService.getWxUserInfo(this).then((result) => {
        console.dir('success: ' + result)
        let data = result.data;
      }).catch((err) => {
        console.dir('error:' + err)
        let pageUrl = encodeURIComponent(window.location.href);
        let wxAuthUrl = process.env.WX_API + '/wx/officialAccount/oauth?url=' + pageUrl + '&scope=snsapi_userinfo';
        window.location.href = wxAuthUrl;
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
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/concert';
.concert-content{
      width:100%;
      height:100%;
      background-repeat: no-repeat;
      background-image: url("@{imageHost}/bg_concert.jpg");
      background-size: 100% 100%;
      position: relative;
      overflow:hidden;
    .photo{
      width: 73.5%;
      height:73.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-56.5%)
    }
}

</style>


