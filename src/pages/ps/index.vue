<template>
  <div class="report-content">
    <img 
      :src="imgServerUrl + '/pages/ps/ad_1.png'" 
      class="ad"
      alt="" 
    >
    <div class="report-wrap">
      <div class="photo-wrap">
        <img 
          :src="resultImgUrl" 
          alt="">
      </div>
      <div class="save">
        长按保存照片到手机相册
      </div>
    </div>
    <img 
      :src="imgServerUrl + '/pages/ps/ad_2.png'" 
      class="ad"
      alt="" 
    >
  </div>
</template>

<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import $ from 'jquery'
export default {
  data() {
    return {
      resultImgUrl: '',
      imgServerUrl: IMAGE_SERVER,
      phoneError: false,
      errorText: '手机号码格式不正确',
      mobileNum: '',
      wxShareInfoValue: {
        title: '旺狗开春 情缘满分',
        desc: '浦商百货借旺狗报新春 送祝福 合家欢 情侣睦 诞生的汪早脱单',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dog_share_icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '狗年旺情缘'
  },
  mounted() {
    $('.report-wrap').css('height', $(window).height())
  },
  created() {
    this.getPeopleImage()
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId)
      getInfoById(recordId)
        .then(result => {
          this.resultImgUrl = result.result_img_url
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dog';
.report-content {
  .ad {
    width: 100%;
  }
  .report-wrap {
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('@{imageHost}/bg.png');
    background-size: 100% 100%;
    position: relative;
    .photo-wrap {
      position: absolute;
      top: 18%;
      width: 60%;
      left: 20%;
      img {
        width: 100%;
      }
    }
    .save {
      color: #fff;
      font-size: 14px;
      text-align: center;
      position: absolute;
      bottom: 2.5%;
      width: 100%;
    }
  }
}
</style>


