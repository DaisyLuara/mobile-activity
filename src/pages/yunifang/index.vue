<template>
  <div id="content">
    <img  class="photo" :src="resultImgUrl" alt=""/>
     <!-- <img  class="photo" :src="imgServerUrl + '/pages/ynf/3.png'" alt=""/> -->
    <div class="wrap">
      <img class="jiantou" :src="imgServerUrl + '/pages/ynf/nav.png'" alt="">
      <img class="title" :src="imgServerUrl + '/pages/ynf/title.png'" alt="">
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
      //微信分享信息
      wxShareInfoValue: {
        title: '美爆头条',
        desc: '扫码领取',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/ynf_share_icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = "美爆头条";
  },
  mounted(){
     var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var mPage = document.getElementById('content')
    mPage.style.minHeight = height + 'px'
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/ynf';
#content{
    width:100%;
    height:100%;
    position: relative;
    text-align: center;
    overflow:hidden;
    animation: bgTab 10s infinite;
    .photo{
      width: 67%;
      height: 74%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-48%, -55.8%);
      z-index: 1;
    }
    .wrap{      
      width: 119%;
      height: 100%;
      background-repeat: no-repeat;
      background-image: url("@{imageHost}/bg.png");
      background-size: 100% 100%;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 2;
    .jiantou{
      position: absolute;
      left: 44%;
      bottom:9%;
      width: 12%;
      animation: arrows .6s ease-out infinite alternate;
    }
    .title{
      width:60%;
      position: absolute;
      left:21%;
      bottom:2%;
    }
  }  
}
@keyframes arrows {
    0% {transform: translateY(-3px);}
    100% {transform: translateY(0px);}
  }
  @keyframes bgTab {
    0% {background: #ff3434}
    20%{background: #d850ff}
    30%{background: #0084ff}
    50%{background: #0cff12}
    70%{background: #ffe00c}
    90%{background: #ff7ec1}
    100%{background: #ff3434}
  }

</style>


