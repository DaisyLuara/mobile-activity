<template>
  <div class="fourShoot-content">
    <img  class="photo" :src="resultImgUrl" alt=""/>
    <!-- <img  class="photo" :src="imgServerUrl + '/pages/fourShoot/1111.png'" alt=""/>-->
    <div class="button">
      <div> 
        <img  class="jiantou" :src="imgServerUrl + '/pages/fourShoot/nav.png'" alt=""/> 
      </div>
      <div> 
        <img class="title" :src="imgServerUrl + '/pages/fourShoot/title.png'" alt=""/> 
      </div>
    </div> 
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import wxService from 'services/wx'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'

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
        title: '我的夏日缤纷心情',
        desc: '灼灼烈日，心情不百变，还怎么过夏天！',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/fourShoot_share_icon.jpeg'
      }
    }
  },
  beforeCreate() {
    document.title = '星视度'
  },
  mounted() {
    $('.fourShoot-content').css('min-height', $(window).height())
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


