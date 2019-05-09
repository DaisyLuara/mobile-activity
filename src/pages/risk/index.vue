<template>
  <div 
    id="risk" 
    class="risk-content"
  >
    <img 
      :src="resultImgUrl"
      alt=""
      class="photo"
    >
    <img 
      :src="imgServerUrl + '/pages/risk/paw.png'" 
      alt=""
      class="paw"
    >
    <div 
      class="jiantou"
    >
      <img 
        :src="imgServerUrl + '/pages/risk/arrow.gif'" 
        alt=""
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, getInfoById } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '刷脸穿越侏罗纪，开启惊险刺激的丛林大冒险。',
        desc: '变身大冒险家，你也可以！',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/risk-share-icon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '丛林大冒险'
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('risk')
    content.style.minHeight = height + 'px'
    $wechat()
      .then(res => {
        res.share(this.wxShareInfoValue)
      })
      .catch(_ => {
        console.warn(_.message)
      })
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
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/risk';
.risk-content {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.jpg');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .photo {
    width: 73.5%;
    height: 73.5%;
    position: absolute;
    left: 13%;
    top: 9%;
  }
  .paw {
    position: absolute;
    width: 37%;
    right: -13%;
    top: -2%;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 9%;
    img {
      width: 10%;
      height: 10%;
    }
  }
}
</style>


