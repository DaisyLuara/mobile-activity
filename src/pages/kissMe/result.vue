<template>
  <div 
    :style="style.root"
    class="kissme-content"
  >
    <img   
      :src="resultImgUrl" 
      alt=""
      class="photo"
    >
    <!--<img  class="photo" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
    <img  
      :src="imgServerUrl + '/pages/popcorn/Kissme/1.png'" 
      alt=""
      class="kissme-one"
    >
    <img  
      :src="imgServerUrl + '/pages/popcorn/Kissme/2.png'" 
      alt=""
      class="kissme-two"
    >
    <img  
      :src="imgServerUrl + '/pages/popcorn/Kissme/3.png'" 
      alt=""
      class="kissme-three"
    >
    <div 
      class="jiantou"
    >
      <img 
        :src="imgServerUrl + '/pages/popcorn/Kissme/A.gif'" 
        alt=""
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
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
        title: '爱意满满！点击领取你的高颜值“KISS”靓照！',
        desc: '只要爱对了人，每天都是520情人节 ',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/kissme_share_icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
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


