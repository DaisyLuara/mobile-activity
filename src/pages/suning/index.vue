<template>
<div id="wrap">
  <div class="snRedPacket-wrap">
    <div class="photo-wrap">
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img  class="photo" :src="imgServerUrl + '/pages/glassword/111.jpg'" alt=""/> -->
      <img  class="circle_1" :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'">
      <img  class="circle_2" :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'">
      <img  class="circle_3" :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'">
      <img  class="circle_4" :src="imgServerUrl + '/pages/sn_redPacke/cicle.png'">
      <div  class="button" >
         <img class="bt" @click="go()" :src="imgServerUrl + '/pages/sn_redPacke/button.png'" alt=""/>
      </div>
       <img  class="jiantou" v-if="show" :src="imgServerUrl + '/pages/sn_redPacke/jiantou.png'" alt=""/>
    </div> 
  </div>
  <div class="receiveAward-wrap">
    <div class="content">
        <img  class="picture-1" :src="imgServerUrl + '/pages/sn_redPacke/1.png'">
    </div>
    <div class="content">
        <img  class="picture-2" :src="imgServerUrl + '/pages/sn_redPacke/2.png'">
    </div>
    <div class="content">
        <img  class="picture-3" :src="imgServerUrl + '/pages/sn_redPacke/3.png'">
    </div>
    <div class="content">
        <img  class="picture-4" :src="imgServerUrl + '/pages/sn_redPacke/4.png'">
    </div>
    <div class="content">
        <img  class="picture-5" :src="imgServerUrl + '/pages/sn_redPacke/5.png'">
    </div>
    <div class="content">
        <img  class="picture-6" :src="imgServerUrl + '/pages/sn_redPacke/6.png'">
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
import $ from 'jquery'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  components: {
    WxShare
  },
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


