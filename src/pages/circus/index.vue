<template>
    <div class="content" id="content">
        <div class="main"></div>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMG_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages'
export default {
  data() {
    return {
      IMG_URL: IMG_SERVER + '/circus',
      mImg: null,
      //微信分享
      wxShareInfo: {
        title: '马戏团',
        desc: '镜世界通用模板',
        imgUrl: IMG_SERVER + '/circus/share.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {},
  created() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.innerHeight = height + 'px'
  },
  mounted() {},
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.mImg = res.image
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/circus/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.content {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  text-align: center;
  margin: 0;
  padding: 0;
}

@keyframes sliderDown {
  0% {
    transform: translate3d(0, -116%, 0);
  }
  100% {
    transform: none;
  }
}
@keyframes updown {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}
@keyframes toShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
