<template>
  <!-- eslint-disable -->
  <!-- isAbandoned -->
  <div class="report-wrap">
    <div class="coupon-wrap">
      <img 
        alt="" 
        src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/report_bg_1.png" 
        class="report_bg_1">
      <img 
        alt="" 
        src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/arrow_icon.png" 
        class="arrow">
    </div>
    <div class="photo-wrap">
      <img 
        alt="" 
        src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/report_bg_2.png" 
        class="report_bg_2">
      <div class="photo-content">
        <img 
          :src="resultImgUrl" 
          alt="" 
          class="photo">
        <img 
          alt="" 
          src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/save.png" 
          class="save">
      </div>
    </div>
    <wx-share :wx-share-info="wxShareInfo"/>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      resultImgUrl: '',
      wxShareInfoValue: {
        title: '寻宝箱 开好礼',
        desc: '新年至 小星在各大商圈准备了海量神秘宝箱！找到小星 发现好礼！！',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/openBox_share_icon.png'
      }
    }
  },
  computed: {
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
  },
  beforeCreate() {
    document.title = '开箱子'
  },
  created() {
    this.getPeopleImage()
  },
  mounted() {
    $('.report-wrap').css('min-height', $(window).height())
  },
  methods: {
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId)
      this.$http
        .get(process.env.SAAS_API + '/open/play/playResults/' + recordId)
        .then(result => {
          let data = result.data.data
          console.log(data)
          this.resultImgUrl = data.result_img_url
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.report-wrap {
  position: relative;
  .coupon-wrap {
    .report_bg_1 {
      width: 100%;
    }
    position: relative;
    .arrow {
      position: absolute;
      bottom: 20%;
      width: 15%;
      left: 42.5%;
      animation: arrows 0.8s ease-out infinite alternate;
    }
  }
  .photo-wrap {
    .report_bg_2 {
      width: 100%;
    }
    position: relative;
    .photo-content {
      position: absolute;
      width: 48%;
      top: 28.11%;
      left: 26%;
      border: 4px solid #f9db96;
      border-radius: 26px;
      .photo {
        border-radius: 26px;
        width: 100%;
      }
    }
    .save {
      position: absolute;
      width: 60%;
      bottom: -17%;
      left: 20%;
    }
  }
  @keyframes arrows {
    0% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0px);
    }
  }
}
</style>


