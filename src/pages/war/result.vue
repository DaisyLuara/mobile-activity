<template>
  <div 
    :style="style.root"
    class="war-content">
    <img  
      :src="resultImgUrl" 
      class="photo" 
      alt="">
    <!--
      <img  
        :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" 
        class="photo" 
        alt="">
    -->
    <img 
      :src="imgServerUrl + '/pages/war/Bot.png'" 
      class="bot" 
      alt="" >
    <div 
      class="jiantou">
      <img 
        :src="imgServerUrl + '/pages/war/A.gif'" 
        alt="" >
    </div>
  </div>
</template>
<script>
const wih = window.innerHeight
import marketService from 'services/marketing'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'
import { $_wechat, wechatShareTrack } from 'services'
import $ from 'jquery'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      style: {
        root: {
          height: wih + 'px'
        }
      },
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
  },
  mounted() {
    this.handleShare()
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
    },
    handleShare() {
      $_wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
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


