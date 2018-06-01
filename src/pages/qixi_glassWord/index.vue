<template>
  <div class="glass-wrap" >
      <div class="shade-wrap"  @click="getPhoto()" >
       <img class="heart" v-if="showShade"  :src="imgServerUrl + '/pages/glassword/heart.png'" alt="" >
      </div>
     <div class="get-photo" v-if="showImg" >
         <div class="photo" >
          <img  class="photo-2" :src="resultImgUrl" alt=""/> 
          <!-- <img  class="photo-2" :src="imgServerUrl + '/pages/glassword/111.jpg'" alt=""/> -->
        </div>
       <img class="save"  :src="imgServerUrl + '/pages/glassword/button.png'" alt="" > 
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
      showShade:true,
      showImg:false,
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '我又来撒狗粮啦',
        desc: '秀恩爱请认准星视度 ',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/qixi_share_icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = "星视度";
  },
  mounted(){
    $('.glass-wrap').css('height', $(window).height());
    var h=$('.glass-wrap').height();
    console.log(h)
    if (h==812) {
       $('.heart').css('width','70%');
      $('.heart').css('left','12%');
      $('.heart').css('top','32%');
     
      
    }
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
    getPhoto(){
      this.showShade=false;
      $('.glass-wrap').css('background-image', 'url(http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/glassword/bg.jpg)');
      this.showImg=true;
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/glassword';
.glass-wrap{
      position: relative;
      text-align: center;
      overflow:hidden;
      background-image: url('@{imageHost}/shade_bg.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    .shade-wrap{
     width:100%;
     height:100%;
    .shade{
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      }
    .heart{  
      width:60%;
      position: absolute;
      left: 18%;
      top: 32%;
      z-index: 2;
      animation: heart 2.6s linear  infinite;
      transform: scale(1)
    }
  }
      .get-photo{
          width: 70%;
          height: 85%;
          position: absolute;
          left: 50%;
          top: 47.5%;
          transform: translate(-50%, -43%);
          border:none;
        .photo{
            height:87%;
            background: #fff;
            padding: 3px;
            border:none;
            overflow: hidden;
          .photo-2{
            width:100%;
            height:100%;
            border:none;
          }
        }
        .save{
          width: 73%;
          margin-top: 2%;
        }
      }
}
 @keyframes heart {
        0%{transform: scale(1)}
        10%{transform: scale(0.8)}
        15%{transform: scale(1)}
        20%{transform: scale(0.7)}
        30%{transform: scale(1)}
    }


</style>


