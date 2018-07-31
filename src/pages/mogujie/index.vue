<template>
  <div 
    :style="style.root"
    class="mogu-coupon-wrap"
  >
    <img 
      :src="imgServerUrl + '/pages/mogujie/title.png'" 
      alt=""
      class="title">
    <div 
      class="img-wrap">
      <img 
        :src="resultImgUrl" 
        alt=""
        class="img-photo">
      <img 
        :src="imgServerUrl + '/pages/mogujie/frame2.png'" 
        alt=""
        class="frame2">
      <img 
        :src="imgServerUrl + '/pages/mogujie/frame.png'" 
        alt=""
        class="frame">
    </div>
    <img 
      :src="imgServerUrl + '/pages/mogujie/save_tip.png'" 
      alt=""
      class="save-tip">
    <img 
      :src="imgServerUrl + '/pages/mogujie/logo.png'"
      alt=""
      class="logo">
  </div>
</template>
<script>
import marketService from 'services/marketing'
import { customTrack } from 'modules/customTrack'
import { $_wechat, wechatShareTrack } from 'services'
import $ from 'jquery'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
const wih = window.innerHeight
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
        title: '发现时尚 就在蘑菇街',
        desc: '蘑菇街扮靓你的美 高分颜值晒出你自信',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/mogujie_share_icon.png'
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
    document.title = '蘑菇街女装'
  },
  mounted() {
    this.handleShare()
  },
  created() {
    //拿取图片id
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
<style scoped lang="less">
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/mogujie';
.mogu-coupon-wrap {
  width: 100%;
  text-align: center;
  background-image: url('@{imageHost}/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  img {
    width: 100%;
  }
  .title {
    width: 97%;
    margin-top: 2%;
    overflow: hidden;
  }
  .img-wrap {
    position: relative;
    width: 100%;
    margin-top: 5%;
    .img-photo {
      position: absolute;
      top: 21%;
      left: 0;
      right: 0;
      z-index: 3;
      width: 91%;
      margin: 0 auto;
    }
    .frame {
      z-index: 1;
    }
    .frame2 {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      z-index: 2;
    }
  }
  .save-tip {
    width: 80%;
    margin: 2% 9% 0 9%;
    display: block;
  }
  .logo {
    width: 16%;
    margin-top: 5%;
  }
}
</style>
