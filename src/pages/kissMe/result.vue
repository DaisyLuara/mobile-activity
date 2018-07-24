<template>
  <div class="kissme-content">
    <img  class="photo" :src="resultImgUrl" alt=""/>
    <!--<img  class="photo" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
    <img  class="kissme-one" :src="imgServerUrl + '/pages/popcorn/Kissme/1.png'" alt=""/>
    <img  class="kissme-two" :src="imgServerUrl + '/pages/popcorn/Kissme/2.png'" alt=""/>
    <img  class="kissme-three" :src="imgServerUrl + '/pages/popcorn/Kissme/3.png'" alt=""/>
    <div class="jiantou">
      <img :src="imgServerUrl + '/pages/popcorn/Kissme/A.gif'" alt="" >
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import $ from 'jquery'

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
        title: '爱意满满！点击领取你的高颜值“KISS”靓照！',
        desc: '只要爱对了人，每天都是520情人节 ',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/kissme_share_icon.jpg'
      }
    }
  },
  mounted() {
    $('.kissme-content').css('min-height', $(window).height())
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/popcorn/Kissme';
.kissme-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/Kissme_bg.jpg');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .photo {
    width: 73.5%;
    height: 73.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55.5%);
  }
  .kissme-one {
    width: 20%;
    position: absolute;
    right: 1%;
    top: 0.8%;
  }
  .kissme-two {
    width: 23%;
    position: absolute;
    right: -6%;
    bottom: 3%;
  }
  .kissme-three {
    width: 24%;
    position: absolute;
    left: -2%;
    bottom: 10.5%;
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


