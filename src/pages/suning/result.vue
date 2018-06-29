<template>
  <div class="suning-content">
    <img  class="photo" :src="resultImgUrl" alt=""/> 
    <!--<img  class="photo" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
    <div class="jiantou">
      <img :src="imgServerUrl + '/pages/concert/A.gif'" alt="" >
    </div>
    <img  class="save" :src="imgServerUrl + '/pages/suning/Push.png'" alt=""/>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import wxService from 'services/wx'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  components: {
    WxShare
  },
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '和“杨洋”一起嗨购苏宁',
        desc: '赶快来加入',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/suning_share_icon.jpg'
      }
    }
  },
  mounted() {
    $('.suning-content').css('min-height', $(window).height())
  },
  created() {
    this.getImageById()
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
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
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/suning';
.suning-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.jpg');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .photo {
    width: 76%;
    height: 76%;
    position: absolute;
    left: 11.8%;
    top: 7.2%;
  }
  .save {
    width: 40%;
    position: absolute;
    left: 50%;
    bottom: 3%;
    transform: translate(-50%, -50%);
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10%;
    img {
      width: 10%;
      height: 10%;
    }
  }
}
</style>


