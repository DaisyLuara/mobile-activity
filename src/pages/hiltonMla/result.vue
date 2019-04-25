<template>
  <div 
    class="hilton-content">
    <img 
      :src="imgServerUrl + '/pages/hiltonMla/bg.jpg'"
      alt="" 
      class="bg">
    <img 
      :src="imgServerUrl + '/pages/hiltonMla/pingzi.png'" 
      alt="" 
      class="pingzi">
    <img 
      :src="imgServerUrl + '/pages/hiltonMla/light.png'" 
      alt=""
      class="light">
    <div 
      class="coupon">
      <img 
        :src="imgServerUrl + '/pages/hiltonMla/' + oid + '_' + type + '.png'"
        class="cp-1">
    </div>
    <div 
      class="save">
      <img 
        :src="imgServerUrl + '/pages/hiltonMla/jiantou.png'" 
        alt=""
        class="jiantou" >
      <img 
        :src="imgServerUrl + '/pages/hiltonMla/title.png'" 
        alt=""
        class="title" >
    </div>
    <div 
      class="bg2">
      <img 
        :src="imgServerUrl + '/pages/hiltonMla/bg2.png'" 
        alt="">
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, getInfoById } from 'services'
import $ from 'jquery'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      oid: this.$route.query.oid || '0',
      type: this.$route.query.type,
      //微信分享信息
      wxShareInfoValue: {
        title: '玩儿游戏居然能中大奖？',
        desc: '快来围观头号玩家吧',
        link: process.env.AD_API+'/api/s/Wng' + window.location.search,
        success: () => {
          wechatShareTrack()
        },
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/hiltonMla_share_icon.jpeg'
      }
    }
  },
  mounted() {
    $('.hilton-content').css('min-height', $(window).height())
    this.handleShare()
  },
  created() {
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
    }
  }
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hiltonMla';
.hilton-content {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .pingzi {
    position: absolute;
    left: 0;
    top: 0;
  }
  .light {
    position: absolute;
    left: 0;
    top: 8%;
  }
  .coupon {
    width: 85%;
    img {
      position: absolute;
      left: 50%;
      top: 48%;
      transform: translate(-50%, -50%);
    }
  }
  .save {
    width: 100%;
    position: absolute;
    left: 0%;
    bottom: 7%;
    text-align: center;
    animation: arrows 0.4s ease-out infinite alternate;
    .jiantou {
      width: 5.5%;
    }
    .title {
      width: 52%;
      display: block;
      margin: 2% 0 0 25%;
    }
  }
  .bg2 {
    width: 100%;
    position: absolute;
    left: 0%;
    bottom: 0%;
  }
}
@keyframes arrows {
  0% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>


