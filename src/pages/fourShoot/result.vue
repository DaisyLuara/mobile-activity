<template>
  <div 
    :style="style.root"
    class="fourShoot-content"
  >
    <img  
      :src="resultImgUrl" 
      alt=""
      class="photo"
    >
    <!-- 
      <img  
        :src="imgServerUrl + '/pages/fourShoot/1111.png'" 
        alt=""
        class="photo">
    -->
    <div 
      class="button"
    >
      <div> 
        <img  
          :src="imgServerUrl + '/pages/fourShoot/nav.png'"
          alt=""
          class="jiantou"
        > 
      </div>
      <div> 
        <img 
          :src="imgServerUrl + '/pages/fourShoot/title.png'" 
          alt=""
          class="title"
        > 
      </div>
    </div> 
    <!-- <wx-share :WxShareInfo="wxShareInfo"></wx-share> -->
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
import $ from 'jquery'
const wih = window.innerHeight
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
        title: '我的夏日缤纷心情',
        desc: '灼灼烈日，心情不百变，还怎么过夏天！',
        success: () => {
          wechatShareTrack()
        },
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/fourShoot_share_icon.jpeg'
      }
    }
  },
  beforeCreate() {
    document.title = '星视度'
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/fourShoot';
.fourShoot-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.png');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .photo {
    width: 87%;
    height: 59.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -54%);
  }
  .button {
    position: absolute;
    left: 0;
    bottom: 3%;
    padding: 8%;
    .jiantou {
      width: 18%;
      animation: arrows 0.5s ease-out infinite alternate;
    }
    .title {
      width: 80%;
      animation: arrows 0.5s ease-out infinite alternate;
    }
  }
}
@keyframes arrows {
  0% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>


