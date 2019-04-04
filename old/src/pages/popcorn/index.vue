<template>
  <!-- eslint-diable -->
  <!-- isAbandoned -->
  <div 
    class="popcorn-content">
    <div 
      class="photo-content">
      <img  
        :src="imgServerUrl + '/pages/popcorn/screencut_area.png'" 
        alt=""
        class="photo-bg">
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
    </div>
    <div 
      class="save">
      <img 
        :src="imgServerUrl + '/pages/popcorn/save_buttom.png'"
        alt="">
    </div>
    <div 
      class="button" >
      <img 
        :src="imgServerUrl + '/pages/popcorn/coupon.png'" 
        alt="" 
        @click="goResult()">
    </div>        
  </div>
</template>
<script>
/* eslint-disable */
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      errorText: '',
      mobileNum: '',
      phoneError: false,
      //微信分享信息
      wxShareInfoValue: {
        title: '有颜有演技，免费爆米花送给你~',
        desc: '2018爆米花奥斯卡，等你来加戏。',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/popcorn_share_icon.jpg'
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
    document.title = '爆米花奥斯卡'
  },
  mounted() {
    $('.popcorn-content').css('min-height', $(window).height())
    this.handleShare()
  },
  created() {
    //拿取图片id
    this.getImageById()
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
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
    goResult() {
      this.$router.push({
        path: '/marketing/popcorn/result'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/popcorn';
.popcorn-content {
  text-align: center;
  background-image: url('@{imageHost}/background.png');
  background-size: auto;
  background-repeat: no-repeat;
  img {
    width: 100%;
  }
  .photo-content {
    width: 100%;
    height: 80%;
    position: relative;
    text-align: center;
    .photo-bg {
      width: 80%;
      margin-top: 5%;
    }
    .photo {
      width: 75%;
      position: absolute;
      left: 50%;
      top: 51.8%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
  .button {
    width: 100%;
    height: 15%;
    text-align: center;
    img {
      width: 70%;
      height: 100%;
      margin: 10% 0;
    }
  }
  .save {
    width: 100%;
    text-align: center;
    img {
      width: 80%;
      height: 100%;
      margin-top: 8%;
    }
  }
}
</style>


