<template>
  <div class="concert-content">
    <img  class="photo" :src="resultImgUrl" alt=""/>
    <!--<img  class="photo" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" alt=""/>-->
    <div class="jiantou">
      <img :src="imgServerUrl + '/pages/concert/A.gif'" alt="" >
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'
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
        title: '为偶像打Call，2018黄子韬演唱会邀你一起燥！',
        desc: '4月30号 上海站 晚 7：30',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/concert_share_icon.jpg'
      }
    }
  },
  mounted() {
    $('.concert-content').css('min-height', $(window).height())
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/concert';
.concert-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg_concert.jpg');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  .photo {
    width: 73.5%;
    height: 73.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -56.5%);
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


