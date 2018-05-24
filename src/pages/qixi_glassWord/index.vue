<template>
  <div class="glass-wrap" >
      <div class="shade-wrap"  @click="getPhoto()" >
       <img class="heart" v-if="showShade"  :src="imgServerUrl + '/pages/glassword/heart.png'" alt="" >
      </div>
     <div class="get-photo" v-if="showImg" >
        
         <div class="photo" >
        <img   :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>
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
    $('.glass-wrap').css('min-height', $(window).height());
    
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
      width:58%;
      position: absolute;
      left: 19%;
      top: 35%;
      z-index: 2;
      animation: shake 2s ;
    }
  }
      .get-photo{
          width: 70%;
          height: 80%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -43%);
        .photo{
             height:87%;
             border: 3px solid #fff;
          img{
            height:100%;
          }
        }
        .save{
          width: 73%;
          margin-top: 5%;
        }
      }
}
@keyframes shake {
		0%{
       transform: scale(1, 1);
    }
    30%{
      transform: scale(1.1, 1.1);
    }
     30%{
      transform: scale(1.2, 1.2);
    }
     60%{
      transform: scale(1.3, 1.3);
    }
     70%{
      transform: scale(1, 1);
    }
}


</style>


