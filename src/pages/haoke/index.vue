<template>
  <div
    :style="style.root"
    class="haoke-content"
  >
    <img
      :src="resultImgUrl"
      alt=""
      class="photo-id"
    >
    <!--
      <img  
        class="photo-id" 
        :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" 
        alt="">
    -->
    <div
      class="coupons"
      @click="goUrl()"
    >
      <img
        v-show="showCoupon.showFree"
        :src="imgServerUrl + '/pages/haoke/free.png'"
        alt=""
        class="free"
      >
      <img
        v-show="showCoupon.couponFive"
        :src="imgServerUrl + '/pages/haoke/5.png'"
        alt=""
        class="five"
      >
      <img
        v-show="showCoupon.couponEightyFive"
        :src="imgServerUrl + '/pages/haoke/85.png'"
        alt=""
        class="eighty-five"
      >
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { normalPages } from '@/mixins/normalPages'
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
} from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
const wih = window.innerHeight
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: wih + 'px'
        }
      },
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      couponType: null,
      showCoupon: {
        couponFive: false,
        couponEightyFive: false,
        showFree: false
      }
      // //微信分享信息
      // wxShareInfoValue: {
      //   title: '有颜有演技，免费爆米花送给你~',
      //   desc: '2018爆米花奥斯卡，等你来加戏。',
      //   imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/popcorn_share_icon.jpg',
      // },
    }
  },
  beforeCreate() {
    document.title = '豪客来'
  },
  watch: {
    parms() {
      this.couponType = this.parms.couponType
    }
  },
  mounted() {
    this.show()
    this.handleForbiddenShare()
  },
  methods: {
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    show() {
      if (this.couponType == 1) {
        this.showCoupon.showFree = true
      }
      if (this.couponType == 2) {
        this.showCoupon.couponFive = true
      }
      if (this.couponType == 3) {
        this.showCoupon.couponEightyFive = true
      }
    },
    //跳转操作
    goUrl() {
      var tk1 =
        'BF3ADDAB550DE2F25C5260CBBD034DF524F844F357A2F9A983C4825662982952AB819EE4A36C'
      if (this.couponType == 1) {
        window.location.href =
          'http://crm.houcaller.com/m/cpnapi/get/I4CD1QK8E5V82?tk=' + tk1
      }
      if (this.couponType == 2) {
        var tk2 =
          'BF3ADDAB550DE2F25C5360CBBD034DF524F844F357A2F9A983C4825662982952AB819EE4A36C'
        window.location.href =
          'http://crm.houcaller.com/m/cpnapi/get/I4CD1KD1J5V10?tk=' + tk2
      }
      if (this.couponType == 3) {
        var tk3 =
          'BF3ADDAB550DE2F25C5360CBBD034DF524F844F357A2F9A983C4825662982952AB819EE4A36C'
        window.location.href =
          'http://crm.houcaller.com/m/cpnapi/get/I4CD1LFE95V39?tk=' + tk3
      }
    }
  }
  // computed: {
  //   //微信分享
  //   wxShareInfo() {
  //     let wxShareInfo = {
  //       title: this.wxShareInfoValue.title,
  //       desc: this.wxShareInfoValue.desc,
  //       imgUrl: this.wxShareInfoValue.imgUrl,
  //       success: () => {
  //         customTrack.shareWeChat();
  //       },
  //     };
  //     return wxShareInfo;
  //   },
  // },
}
</script>
<style lang="less" scoped>
@imageHost: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/haoke";
.haoke-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg_2.jpg");
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  img {
    border: none;
  }
  .photo-id {
    position: absolute;
    left: 19.5%;
    top: 11.5%;
    width: 61%;
    height: 65%;
  }
  .coupons {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    .free {
      width: 60%;
      position: absolute;
      left: 19%;
      bottom: 0;
      text-align: center;
    }
    .five {
      width: 60%;
      position: absolute;
      left: 19%;
      bottom: 0;
      text-align: center;
    }
    .eighty-five {
      width: 60%;
      position: absolute;
      left: 19%;
      bottom: 0;
      text-align: center;
    }
  }
}
</style>