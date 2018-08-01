<template>
  <div class="report-wrap">
    <div class="photo-wrap">
      <img 
        :src="resultImgUrl" 
        alt="">
    </div>
    <div class="save">长按保存照片到手机相册</div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import $ from 'jquery'
import {
  $wechat,
  getPlayResultById,
  wechatShareTrack,
  isInWechat
} from 'services'
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
        desc: '宏伊国际广场借旺狗报新春 送祝福 合家欢 情侣睦 诞生的汪早脱单',
        success: () => {
          wechatShareTrack()
        },
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dog_share_icon.png'
      }
    }
  },
  beforeCreate() {
    document.title = '狗年旺情缘'
  },
  mounted() {
    $('.report-wrap').css('height', $(window).height())
    this.handleWechatShare()
  },
  created() {
    this.getPeopleImage()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId)
      getPlayResultById(recordId)
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
</style>


