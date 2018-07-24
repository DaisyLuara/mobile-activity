<template>
  <div class="war-content">
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img  class="photo" src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg" alt=""/> -->
      <div class="jiantou">
          <img :src="imgServerUrl + '/pages/hiplay/arrow.gif'" alt="" >
      </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import $ from 'jquery'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  components: {
    WxShare
  },
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '心里有舞台，哪里都能嗨！点击领取你的“DJ”靓照',
        desc: '2018下一位嗨玩百大DJ就是你！',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/hiplay-share-icon.jpg'
      }
    }
  },
  beforeCreate() {
    document.title = '嗨玩'
  },
  mounted() {
    $('.war-content').css('height', $(window).height())
  },
  created() {
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
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hiplay';
.war-content {
  width: 100%;
  height: 100%;
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
    left: 50%;
    top: 53%;
    transform: translate(-50%, -55.5%);
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 7%;
    img {
      width: 10%;
      height: 10%;
    }
  }
}
</style>


