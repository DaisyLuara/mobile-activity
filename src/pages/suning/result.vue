<template>
  <!-- isAbandoned -->
  <div 
    :style="style.root"
    class="suning-content">
    <img    
      :src="resultImgUrl" 
      alt=""
      class="photo"> 
    <!--
    <img  
      :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" 
      alt=""
      class="photo" >
    -->
    <div 
      class="jiantou">
      <img 
        :src="imgServerUrl + '/pages/concert/A.gif'" 
        alt="">
    </div>
    <img  
      :src="imgServerUrl + '/pages/suning/Push.png'" 
      alt=""
      class="save">
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { parseService } from 'services'
const wih = window.innerHeight
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import $ from 'jquery'

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
        title: '和“杨洋”一起嗨购苏宁',
        desc: '赶快来加入',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/suning_share_icon.jpg'
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
      getInfoById(id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleShare() {
      $wechat()
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


