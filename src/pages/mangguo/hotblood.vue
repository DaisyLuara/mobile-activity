<template>
  <div class="root">
    <img
      :src="IMAGE_URL + 'qiu.png'" 
      class="header"
    >
    <img  
      :src="photo"
      class="real-photo"
    >
    <img
      :src="photo" 
      class="photo"
    >
    <img  
      :src="IMAGE_URL + 'nav.png'" 
      class="nav"
    >
    <img
      :src="IMAGE_URL + 'bg-new.png'" 
      class="bg"
    >

    <img
      :src="IMAGE_URL + 'qr-aiqiyi.png'"
      class="qr-code"
    >
  </div>
</template>

<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'

const IMAGE_SERVER =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/mangguo/basketball/'
export default {
  data() {
    return {
      IMAGE_URL:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/mangguo/basketball/',
      photo: null,
      //微信分享信息
      wxShareInfoValue: {
        title: '梦想必燃，热血开战！《热血狂篮》圆你灌篮高手梦。',
        desc: '2018最燃青春剧《热血狂篮》5月16日爱奇艺首播。',
        imgUrl: IMAGE_SERVER + 'share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '芒果娱乐青春出品'
  },
  mounted() {
    this.getInfoById()
    this.handleShare()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          console.log(res)
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

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  .bg {
    width: 100%;
    position: relative;
  }
  .nav {
    position: absolute;
    top: 68%;
    left: 40%;
    width: 20%;
    z-index: 10;
  }
  .header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .real-photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    z-index: 11;
  }
  .photo {
    position: absolute;
    top: 7.5%;
    width: 74%;
    left: 13%;
    z-index: 9;
  }
  .qr-code {
    z-index: 20;
    position: absolute;
    top: 82.5%;
    width: 27%;
    left: 13%;
  }
}
</style>

