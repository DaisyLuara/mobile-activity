<template>
  <div class="oh-content" :style="style.root" >
    <div class="photo">
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img :src="imgServerUrl + '/pages/oh/1111.png'" alt=""/> -->
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
const wih = window.innerHeight
export default {
  components: {
    WxShare
  },
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      style: {
        root: {
          height: wih + 'px'
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
  beforeCreate() {
    document.title = ''
  },
  mounted() {},
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/oh';
.oh-content {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.png');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  // .kuang {
  //   width: 100%;
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
  // }
  .photo {
    width: 100%;
    height: 70%;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -53%);
    overflow: hidden;
    padding: 2%;
    img {
      width: 90%;
      height: 100%;
    }
  }
}
</style>


