<template>
  <div
    :style="marketingOptions.bg"
    class="photo-wrap" >
    <img
      v-if="marketingOptions.topDecorate"
      :src="marketingOptions.topDecorate.imgUrl"
      :style="marketingOptions.topDecorate.style"
      class="top-decorate" > 
    <img 
      v-if="marketingOptions.title"
      :src="marketingOptions.title.imgUrl" 
      :style="marketingOptions.title.style" 
      class="img-title">
    <div
      v-if="marketingOptions.photo"
      :style="marketingOptions.photo.wrapStyle"
      class="photo-content">
      <img
        v-if="marketingOptions.photo.frameImgUrl"
        :src="marketingOptions.photo.frameImgUrl" 
        class="frame" >
      <img 
        v-if="marketingOptions.photo.frameImgUrl" 
        :src="marketingOptions.photo.frameImgUrl" 
        class="frame placeholder" >
      <img
        v-if="imgUrl"
        :src="imgUrl"
        :style="marketingOptions.photo.style"
        class="photo" >
    </div>
    <img 
      v-if="marketingOptions.saveTip" 
      :src="marketingOptions.saveTip.imgUrl" 
      :style="marketingOptions.saveTip.style" 
      class="save-tip" >
    <img 
      v-if="marketingOptions.qrCode" 
      :src="marketingOptions.qrCode.imgUrl" 
      :style="marketingOptions.qrCode.style" 
      class="qr-code" >
    <img 
      v-if="marketingOptions.bottomDecorate" 
      :src="marketingOptions.bottomDecorate.imgUrl" 
      :style="marketingOptions.bottomDecorate.style" 
      class="bottom-decorate" >
    <img
      v-if="marketingOptions.ad"
      :src="marketingOptions.ad.imgUrl"
      :style="marketingOptions.ad.style" 
      class="image-ad">
  </div>
</template>
<script>
import {
  getParamsMap,
  getParameter,
  setParameter,
  getPlayResultById
} from 'services'
import $ from 'jquery'
export default {
  props: {
    marketingOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgUrl: ''
    }
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.marketingOptions.wxShareInfo.title,
        desc: this.marketingOptions.wxShareInfo.desc,
        imgUrl: this.marketingOptions.wxShareInfo.imgUrl,
        success: () => {
          if (_hmt) {
            _hmt.push([
              '_trackEvent',
              '分享' + this.marketingOptions.name + '提取页',
              'share',
              '分享',
              ''
            ])
          }
        }
      }
      return wxShareInfo
    }
  },
  created() {
    getPlayResultById(this.$route.query.play_result_id)
      .then(data => {
        this.imgUrl = data.result_img_url
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted() {
    $('.photo-wrap').css('min-height', $(window).height())
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.photo-wrap {
  text-align: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  img {
    width: 100%;
  }
  .top-decorate {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
  .bottom-decorate {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
  .img-title {
    margin-top: 10%;
  }
  .photo-content {
    position: relative;
    .frame {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 100%;
      margin: 0 auto;
      &.placeholder {
        position: relative;
      }
    }
    .photo {
      position: absolute;
      top: 0%;
      left: 0;
      right: 0;
      width: 80%;
      margin: 0 auto;
    }
    .qr-code {
    }
    .image-ad {
    }
  }
}
</style>
