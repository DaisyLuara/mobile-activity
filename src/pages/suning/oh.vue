<template>
  <!-- isAbandoned -->
  <div 
    :style="style.root"
    class="oh-content">
    <img 
      :src="imgServerUrl + '/pages/oh/title.png'" 
      alt=""
      class="title">
    <img  
      :src="resultImgUrl" 
      :style="style.photoHei"
      alt="" 
      class="photo">
    <!-- 
      <img 
        :src="imgServerUrl + '/pages/oh/1111.jpg'" 
        alt=""
        :style="style.photoHei"
        class="photo"> 
    -->
    <img 
      :src="imgServerUrl + '/pages/oh/save.png'" 
      alt="" 
      class="save" > 
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, getInfoById } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
const wih = window.innerHeight
export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      style: {
        root: {
          height: wih + 'px'
        },
        photoHei: {
          height: Window.innerwidth * 0.78 * 1920 / 1080 + 'px'
        }
      },
      //微信分享信息
      wxShareInfoValue: {
        title: '这一刻的美颜',
        desc: '感受这一夏的飓风',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/oh_share_icon.png'
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
  beforeCreate() {
    document.title = ''
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/oh/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.oh-content {
  width: 100%;
  overflow-x: hidden;
  text-align: center;
  position: relative;
  background: url('@{imageHost}bg.png') center top / 100% auto no-repeat;
  .title {
    width: 100%;
    position: absolute;
    left: 0;
    top: 2%;
  }
  .photo {
    width: 72%;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49%);
    overflow: hidden;
    padding: 2%;
  }
  .save {
    width: 70%;
    height: 12%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%);
  }
}
</style>


