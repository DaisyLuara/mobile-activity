<template>
  <div class="risk-content" id="risk">
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img  class="photo" src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg" alt=""/> -->
      <img  class="paw" :src="imgServerUrl + '/pages/risk/paw.png'" alt=""/>
      <div class="jiantou">
          <img :src="imgServerUrl + '/pages/risk/arrow.gif'" alt="" >
      </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
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
        title: '刷脸穿越侏罗纪，开启惊险刺激的丛林大冒险。',
        desc: '变身大冒险家，你也可以！',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/risk-share-icon.jpg'
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


