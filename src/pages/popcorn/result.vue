<template>
  <!-- eslint-disable -->
  <div class="popcorn-content">
    <img  class="title" :src="imgServerUrl + '/pages/popcorn/top_title.png'" alt=""/>
    <img  class="coupon" :src="imgServerUrl + '/pages/popcorn/coupon.png'" alt=""/>
    <!--手机号-->
    <img  class="cell-icon" :src="imgServerUrl + '/pages/popcorn/cell_icon.png'" alt=""/>
    <input class="num" type="text" placeholder="请输入你的手机号" maxlength="11"   v-model="mobileNum" @click="phoneError = false" >
    <!--错误信息 autocomplete="off"-->
    <div class="error" v-show="phoneError">{{errorText}}</div>
    <img class="phone-button" :src="imgServerUrl + '/pages/popcorn/buttom.png'" alt="" @click="redirectToPhoto()"/>
    <div class="success">
      <img :src="imgServerUrl + '/pages/popcorn/hint.png'" alt=""/>
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
      errorText: '',
      mobileNum: '',
      phoneError: false,
      //微信分享信息
      wxShareInfoValue: {
        title: '有颜有演技，免费爆米花送给你~',
        desc: '2018爆米花奥斯卡，等你来加戏。',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/popcorn_share_icon.jpg'
      }
    }
  },
  beforeCreate() {
    document.title = '爆米花奥斯卡'
  },
  mounted() {
    $('.popcorn-content').css('min-height', $(window).height())
  },
  methods: {
    //输入手机号跳转 确认跳转
    redirectToPhoto() {
      if (!/^1[34578]\d{9}$/.test(this.mobileNum)) {
        this.phoneError = true
        this.errorText = '手机号码格式不正确'
        return
      }
      //提交手机号统计
      customTrack.sendMobile(this.mobileNum)
      this.linkToPhoto()
    },
    //跳转的操作
    linkToPhoto() {
      console.log('111111')
      $('.success').css('display', 'block')
      setTimeout(() => {
        $('.success').css('display', 'none')
        this.mobileNum = ''
      }, 3000)
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/popcorn';
.popcorn-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/background.png');
  background-size: cover;
  position: relative;
  text-align: center;
  overflow: hidden;

  img {
    border: none;
  }

  .title {
    width: 95%;
    position: absolute;
    left: 50%;
    top: 57%;
    transform: translate(-50%, -50%);
  }
  .coupon {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 47%;
    transform: translate(-50%, -50%);
  }
  .error {
    display: block;
    position: absolute;
    left: 31%;
    top: 60%;
    color: #fff;
    font-size: 15px;
  }
  .cell-icon {
    width: 6%;
    position: absolute;
    left: 22%;
    top: 67%;
    z-index: 1;
  }
  .num {
    width: 70%;
    height: 7.5%;
    position: absolute;
    left: 50%;
    top: 69%;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    padding: 0 2%;
    outline: none;
    padding: 10px;
    font-size: 16px;
    text-align: center;
  }
  .phone-button {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 81%;
    transform: translate(-50%, -50%);
    border: none;
  }
  .success {
    width: 71%;
    height: 23%;
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translate(-50%, -50%);
    display: none;
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>


