<template>
  <div 
    id="wrap">
    <div 
      class="snRedPacket-wrap">
      <div 
        class="photo-wrap">
        <img  
          :src="resultImgUrl" 
          class="photo" 
          alt="">
        <!-- <img  class="photo" :src="imgServerUrl + '/pages/glassword/111.jpg'" alt=""/> -->
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'"
          class="circle_1" >
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'"
          class="circle_2" >
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'"
          class="circle_3" >
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'"
          class="circle_4" >
        <div  
          class="button" >
          <img 
            :src="imgServerUrl + '/pages/sn_redPacke/button.png'" 
            alt=""
            class="bt" 
            @click="go()">
        </div>
        <img  
          v-if="show" 
          :src="imgServerUrl + '/pages/sn_redPacke/jiantou.png'" 
          alt="" 
          class="jiantou">
      </div> 
    </div>
    <div 
      class="receiveAward-wrap">
      <div 
        class="content">
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/1.png'"
          class="picture-1">
      </div>
      <div 
        class="content">
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/2.png'"
          class="picture-2" >
      </div>
      <div 
        class="content">
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/3.png'"
          class="picture-3" >
      </div>
      <div 
        class="content">
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/4.png'"
          class="picture-4" >
      </div>
      <div 
        class="content">
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/5.png'"
          class="picture-5" >
      </div>
      <div 
        class="content">
        <img  
          :src="imgServerUrl + '/pages/sn_redPacke/6.png'"
          class="picture-6" >
      </div>  
    </div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import { $wechat, wechatShareTrack, getInfoById } from 'services'
import $ from 'jquery'

export default {
  data() {
    return {
      scroll: '',
      show: true,
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '提取照片 领取福利',
        desc: '608来苏宁 年中大促',
        success: () => {
          wechatShareTrack()
        },
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/redPacket_share_icon2.png'
      }
    }
  },
  beforeCreate() {
    document.title = '天降福利'
  },
  mounted() {
    $('.snRedPacket-wrap').css('min-height', $(window).height())
  },
  created() {
    this.getImageById()
    this.handleScroll()
    this.handleShare()
  },
  methods: {
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    //处理滚动条滚动
    handleScroll() {
      var oThef = this
      $(window).scroll(function() {
        var scrollTop = $(this).scrollTop()
        var scrollHeight = $(document).height()
        var windowHeight = $(this).height()
        if (scrollTop + windowHeight >= scrollHeight) {
          oThef.show = false
        } else {
          oThef.show = true
        }
      })
    },
    go() {
      window.location.href =
        'https://res.m.suning.com/project/zhaoji/activiteDetails_1.html?activityCode=8508921236&storeType=2&storeCode=10003701'
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/sn_redPacke';
#wrap {
  background: #feda40;
  overflow: hidden;
  .snRedPacket-wrap {
    width: 100%;
    height: 100%;
    background-image: url('@{imageHost}/bg_3.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .photo-wrap {
      .photo {
        width: 63.5%;
        height: 63.8%;
        position: absolute;
        left: 18%;
        top: 12.8%;
      }
      .button {
        text-align: center;
        position: fixed;
        left: 0;
        bottom: 8%;
        z-index: 10;
        .bt {
          width: 50%;
        }
      }
      .jiantou {
        position: fixed;
        left: 46%;
        bottom: 3%;
        width: 7%;
        z-index: 10;
        animation: arrows 0.6s ease-out infinite alternate;
      }
      .circle_1 {
        position: absolute;
        right: 11%;
        top: 7%;
        width: 15%;
      }
      .circle_2 {
        position: absolute;
        right: -8%;
        top: 31%;
        width: 23%;
      }
      .circle_3 {
        position: absolute;
        left: -5%;
        top: 39.5%;
        width: 18%;
      }
      .circle_4 {
        position: absolute;
        left: 12%;
        top: 24.5%;
        width: 11%;
      }
    }
  }
  .receiveAward-wrap {
    background-image: url('@{imageHost}/bg_2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .content {
      text-align: center;
      overflow: hidden;
    }
    .picture-6 {
      margin-bottom: 35%;
    }
    img {
      width: 80%;
      margin-top: 3%;
    }
  }
}
@keyframes arrows {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-3px);
  }
}
</style>


