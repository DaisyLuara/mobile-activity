<template>
<div class="mgPpage" id="mgPage">
    <div></div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
</div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  date() {
    return {
      IMAGE_URL: IMAGE_SERVER + '/pages/mangguo/',
      photo: null,
      //微信分享
      wxShareInfo: {
        title: '重温青葱岁月！《出走人生电台》圆你电台主播梦',
        desc: '芒果娱乐全新青春网剧，给你不一样的90后情怀',
        imgUrl: IMAGE_SERVER + '/pages/mangguo/share.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '芒果娱乐荣誉出品'
  },
  created() {
    //   this.getInfoById();
  },
  mounted() {
    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var mgPage = document.getElementById('mgPage')
    mgPage.style.minHeight = height + 'px'
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      var that = this
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.photo = res.image
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          return
        })
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/mangguo/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}
.mgPage {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  position: relative;
  overflow-x: hidden;
  img {
    width: 100%;
  }
}
</style>


