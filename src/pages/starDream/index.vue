<template>
  <div 
    id="starDream"
    class="star-dream-content"
  >
    <img 
      :src="resultImgUrl"
      alt=""
      class="photo"
    >
    <img 
      :src="imgServerUrl + '/pages/starDream/light_1_bright.png'"
      :class="{'one-bright': shortFlag, 'lang-one-bright': !shortFlag}"
      alt=""
    >
    <img 
      :src="imgServerUrl + '/pages/starDream/light_2_bright.png'" 
      :class="{'two-bright': shortFlag, 'lang-two-bright': !shortFlag}"
      alt="" 
    >
    <img 
      :src="imgServerUrl + '/pages/starDream/light_3_bright.png'"
      :class="{'three-bright': shortFlag, 'lang-three-bright': !shortFlag}"
      alt="" 
    >
    <img 
      :src="imgServerUrl + '/pages/starDream/light_4_bright.png'" 
      :class="{'four-bright': shortFlag, 'lang-four-bright': !shortFlag}"
      alt="" 
    >
    <img 
      :src="imgServerUrl + '/pages/starDream/light_5_bright.png'"
      :class="{'five-bright': shortFlag, 'lang-five-bright': !shortFlag}"
      alt="" 
    >
    <div 
      class="jiantou"
    >
      <img
        :src="imgServerUrl + '/pages/starDream/arrow.png'"
        alt=""
      >
    </div>
    <div 
      class="text"
    >
      <img 
        :src="imgServerUrl + '/pages/starDream/prompt.png'" 
        alt=""
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      shortFlag: true,
      //微信分享信息
      wxShareInfo: {
        title: '刷脸拼颜艺，我就是实力抢镜王！',
        desc: '星视度·星梦试镜间等你来挑战。',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/star_dream_share_icon.jpeg'
      }
    }
  },
  beforeCreate() {
    document.title = '星梦试镜间'
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('starDream')
    content.style.height = height + 'px'
    this.shortFlag = height > 672 ? false : true
  },
  created() {
    this.getInfoById()
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function() {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = res.image
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/starDream';
.star-dream-content {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg_2.png');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .one-bright {
    position: absolute;
    left: 0.5%;
    width: 11%;
    top: 4.2%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .lang-one-bright {
    position: absolute;
    left: 0.5%;
    width: 11%;
    top: 5%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .two-bright {
    position: absolute;
    right: -4.3%;
    width: 16%;
    top: 2.2%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .lang-two-bright {
    position: absolute;
    right: -4.3%;
    width: 16.2%;
    top: 3.1%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .three-bright {
    position: absolute;
    right: 0.2%;
    width: 14%;
    top: 29.6%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .lang-three-bright {
    position: absolute;
    right: -0.3%;
    width: 15%;
    top: 30.2%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .four-bright {
    position: absolute;
    left: 0.3%;
    width: 9%;
    bottom: 31.2%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .lang-four-bright {
    position: absolute;
    left: 0.3%;
    width: 9%;
    bottom: 32.1%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .five-bright {
    position: absolute;
    right: 1.7%;
    width: 12.9%;
    bottom: 16.9%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .lang-five-bright {
    position: absolute;
    right: 1.7%;
    width: 12.9%;
    bottom: 17.7%;
    animation: twinkle 0.3s linear infinite alternate;
  }
  .photo {
    width: 76.9%;
    height: 76.9%;
    position: absolute;
    left: 11.5%;
    top: 6.3%;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 8.5%;
    img {
      width: 15%;
    }
    animation: arrows 0.8s ease-out infinite alternate;
  }
  .text {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 4%;
    img {
      width: 77%;
    }
    animation: arrows 0.8s ease-out infinite alternate;
  }
  @keyframes twinkle {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
  @keyframes arrows {
    0% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(3px);
    }
  }
}
</style>


