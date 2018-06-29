<template>
  <div class="war-content">
    <img  class="photo" :src="resultImgUrl" alt=""/>
    <!--<img  class="photo" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
    <img class="bot" :src="imgServerUrl + '/pages/war/Bot.png'" alt="" >
    <div class="jiantou">
        <img :src="imgServerUrl + '/pages/war/A.gif'" alt="" >
    </div>
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
        title: '脑洞大开！芒果TV《三宝大战诸葛亮》欢乐上线',
        desc: '每周日中午12点来@芒果TV  #三宝大战诸葛亮# ',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/war_share_icon.jpg'
      }
    }
  },
  mounted() {
    $('.war-content').css('min-height', $(window).height())
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/war';
.war-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg_war.jpg');
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
  .bot {
    width: 19%;
    height: 12%;
    position: absolute;
    right: 2%;
    bottom: 12%;
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


