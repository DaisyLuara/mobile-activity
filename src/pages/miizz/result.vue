<template>
  <div 
    class="report-wrap"
  >
    <div 
      class="coupon-wrap"
    >
      <img 
        :src="ImgUrl"
        alt="" 
        class="photo"
      >
      <img  
        :src="ImgUrl" 
        alt=""
        class="photo1"
      >
      <img  
        :src="baseUrl + 'save.png'" 
        alt=""
        class="save"
      >
      <img  
        :src="baseUrl + 'up.png'"
        alt=""
        class="arrow"
      >
    </div>
    <div
      class="miizz-wrap"
    >
      <img 
        v-lazy="baseUrl + 'bg_2.png?v=1'" 
        alt="" 
        class="report_bg_2"
      >
      <img 
        :src="jewelrySingle" 
        alt="" 
        class="jewelry_single"
      >
      <img 
        :src="jewelryText" 
        alt="" 
        class="jewelry_text"
      >
      <img 
        :src="jewelryMulti" 
        alt="" 
        class="jewelry_multi"
      >
      <img 
        :src="jewelryTextOne" 
        alt="" 
        class="jewelry_text1"
      >
      <img 
        :src="jewelryImgOne" 
        alt="" 
        class="jewelry1"
      >
      <img 
        :src="jewelryTextTwo" 
        alt="" 
        class="jewelry_text2"
      >
      <img 
        :src="jewelryImgTwo" 
        alt="" 
        class="jewelry2"
      > 
      <img 
        :src="baseUrl + 'logo.png'" 
        alt="" 
        class="qrcode"
      > 
    </div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/'
import { $wechat, wechatShareTrack, getInfoById } from 'services'
import Vue from 'vue'
import { Lazyload } from 'mint-ui'
Vue.use(Lazyload)

export default {
  data() {
    return {
      baseUrl: IMAGE_SERVER + 'pages/miizz/',
      jewelryTextOne: '',
      jewelrySingle: '',
      jewelryMulti: '',
      jewelryText: '',
      jewelryTextTwo: '',
      jewelryImgOne: '',
      jewelryImgTwo: '',
      ImgUrl: '',
      wxShareInfoValue: {
        title: '觅作',
        desc: '让你点亮世界的穿衣首饰搭配指南',
        imgUrl: IMAGE_SERVER + 'wx_share_icon/mizz_share_icon.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    document.getElementsByClassName('coupon-wrap')[0].style.height =
      window.innerHeight + 'px'
    document.getElementsByClassName('miizz-wrap')[0].style.minHeight =
      window.innerHeight + 'px'
    if (window.innerHeight > 675) {
      document.getElementsByClassName('photo')[0].style.width = '88%'
      document.getElementsByClassName('photo')[0].style.left = '5%'
      document.getElementsByClassName('photo')[0].style.top = '0'
    } else {
      document.getElementsByClassName('photo')[0].style.width = '76%'
      document.getElementsByClassName('photo')[0].style.left = '12%'
      document.getElementsByClassName('photo')[0].style.top = '-2%'
    }
    $wechat()
      .then(res => {
        res.share(this.wxShareInfo)
      })
      .catch(_ => {
        console.warn(_.message)
      })
  },
  created() {
    this.getImageById()
  },
  methods: {
    getImageById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(result => {
          let type = result.url
          this.handleShowPage(type)
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleShowPage(type) {
      switch (type) {
        case 'A':
          this.ImgUrl = this.baseUrl + 'photo_A2.png'
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_A1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_A2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_A1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_A2.png'
          this.jewelrySingle = this.baseUrl + 'jewelry_single_A.png'
          this.jewelryMulti = this.baseUrl + 'jewelry_multi_A.png'
          this.jewelryText = this.baseUrl + 'jewelry_A.png'
          break
        case 'B':
          this.ImgUrl = this.baseUrl + 'photo_B2.png'
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_B1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_B2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_B1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_B2.png'
          this.jewelrySingle = this.baseUrl + 'jewelry_single_B.png'
          this.jewelryMulti = this.baseUrl + 'jewelry_multi_B.png'
          this.jewelryText = this.baseUrl + 'jewelry_B.png'

          break
        case 'C':
          this.ImgUrl = this.baseUrl + 'photo_C2.png'
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_C1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_C2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_C1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_C2.png'
          this.jewelrySingle = this.baseUrl + 'jewelry_single_C.png'
          this.jewelryMulti = this.baseUrl + 'jewelry_multi_C.png'
          this.jewelryText = this.baseUrl + 'jewelry_C.png'

          break
        case 'D':
          this.ImgUrl = this.baseUrl + 'photo_D2.png'
          this.jewelryTextOne = this.baseUrl + 'jewelry_text_D1.png'
          this.jewelryTextTwo = this.baseUrl + 'jewelry_text_D2.png'
          this.jewelryImgOne = this.baseUrl + 'jewelry_img_D1.png'
          this.jewelryImgTwo = this.baseUrl + 'jewelry_img_D2.png'
          this.jewelrySingle = this.baseUrl + 'jewelry_single_D.png'
          this.jewelryText = this.baseUrl + 'jewelry_D.png'
          this.jewelryMulti = this.baseUrl + 'jewelry_multi_D.png'
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/miizz';

.report-wrap {
  position: relative;
  overflow: hidden;
  .coupon-wrap {
    background-image: url('@{imageHost}/bg_1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    .photo {
      // width: 91%;
      // left: 5%;
      width: 76%;
      left: 12%;
      position: absolute;
      z-index: -10;
      top: -2%;
    }
    .photo1 {
      opacity: 0;
    }
    .save {
      position: absolute;
      bottom: 11%;
      width: 30%;
      left: 35%;
      opacity: 1;
      z-index: 2;
      animation: opacitySave 0.8s linear infinite alternate;
    }
    .arrow {
      position: absolute;
      bottom: 3%;
      width: 11%;
      left: 44.5%;
      animation: arrows 0.8s ease-out infinite alternate;
    }
  }
  .miizz-wrap {
    position: relative;
    .report_bg_2 {
      width: 100%;
    }
    .jewelry_single {
      position: absolute;
      width: 48%;
      top: -0.7%;
      right: 26.5%;
    }
    .jewelry_text {
      position: absolute;
      width: 35%;
      top: 14%;
      right: 33%;
    }
    .jewelry_multi {
      position: absolute;
      width: 80%;
      top: 25.3%;
      right: 10%;
    }
    .jewelry_text1 {
      position: absolute;
      width: 30%;
      top: 46%;
      right: 6%;
    }
    .jewelry1 {
      position: absolute;
      width: 40%;
      top: 43.5%;
      left: 13.3%;
    }
    .jewelry_text2 {
      position: absolute;
      top: 68%;
      width: 30%;
      left: 6%;
    }
    .jewelry2 {
      position: absolute;
      width: 40%;
      top: 64%;
      right: 11.5%;
    }
    .qrcode {
      position: absolute;
      width: 16%;
      bottom: 5.5%;
      left: 41%;
    }
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
  @keyframes opacitySave {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>


