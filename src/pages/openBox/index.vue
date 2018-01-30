<template>
  <div class="phone-content">
    <img src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/title.png" alt="" class="title"/>
    <img src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/phone_hint.png" alt="" class="phone-hint"/>
    <input type="text" class="mobile" maxlength="11" placeholder="请输入你的手机号" v-model="mobileNum" @click="phoneError = false"/>
    <div class="boots-wrap">
    <div class="error" v-show="phoneError">{{errorText}}</div>
      <img class="confrim_btn" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/confirm_btn.png" @click="redirectToPhoto">
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import { setParameter, Cookies } from 'modules/util'
import { customTrack } from 'modules/customTrack'
import WxShare from 'modules/wxShare.vue'
import wxService from 'services/wx'
import parseService from 'modules/parseServer'
import CouponService from 'services/freecartCoupon'

export default {
  components: {
    WxShare
  },
  data() {
    return {
      mobileNum: '',
      phoneError: true,
      errorText: '',
      reqUrl: 'http://120.27.144.62:1337/parse/classes/',
      wxShareInfoValue:{
        title: '寻宝箱 开好礼',
        desc: '新年至 小星在各大商圈准备了海量神秘宝箱！找到小星 发现好礼！！',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/openBox_share_icon.png'
      },
      userInfo: {}
    }
  },
  beforeCreate(){
    document.title = '开箱子'
  },
  mounted(){
    $(".phone-content").css('height', $(window).height());
      
  },
  created(){
    this.getWxUserInfo()
  },
  methods:{
    saveWxInfo(){
      this.userInfo.gifType = this.$route.query.type
      parseService.post(this, this.reqUrl + 'open_the_box', this.userInfo).then(res => {
        console.log('保存成功')
      }).catch(err => {
        console.log(err)
      });
    },
    redirectToPhoto(){
        if(!(/^1[34578]\d{9}$/.test(this.mobileNum))){
        this.phoneError = true;
        this.errorText = '手机号码格式不正确';
        return;
      }else{
        this.getCoupon()
      }
    },
    getCoupon(){
      let params = {
        "mobile": this.mobileNum,
        "sms_template": 'SEND_MARKETING_COUPONS'
      }
      CouponService.createCoupon(this, params).then(data => {
        console.log(data)
        this.saveWxInfo()
        customTrack.sendMobile(this.mobileNum);
        this.linkToPhoto()
      }).catch(err => {
        console.log(err)
      })
    },
    getWxUserInfo(){
      wxService.getWxUserInfo(this).then(result => {
        console.log(result.data)
        alert(result)
        let data = result.data
        this.userInfo.name = data.nickname
        this.userInfo.headImgUrl = data.headimgurl
        alert(data.headimgurl)
        alert(data.nickname)
      }).catch(err => {
        console.log(err)
        alert(err)
        let pageUrl = encodeURIComponent(window.location.href)
        let wx_auth_url = process.env.WX_API + '/wx/officialAccount/oauth?url=' + pageUrl + '&scope=snsapi_userinfo';
        console.log(wx_auth_url)
        window.location.href = wx_auth_url;
        return;
      })
    },
    linkToPhoto(){
      let redirect_url = window.location.origin +'/#'+ this.$route.path + '/result';
      for(let param in this.$route.query){
        redirect_url = setParameter(param, this.$route.query[param], redirect_url)
      }
      window.location.href = redirect_url;
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
      return wxShareInfo;
    }
  }
}
</script>
<style lang="less" scoped>
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box';
.phone-content{
  height: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg.png");
  background-size: cover;
  position: relative;
  .title{
    width: 65%;
    position: absolute;
    top: 10%;
    left: 17.5%;
  }
  .phone-hint{
    width: 40%;
    position: absolute;
    top: 35%;
    left: 30%;
  }
  .mobile{
    border: none;
    outline: none;
    border: 4px solid #f9d689;
    border-radius: 20px;
    height: 70px;
    padding: 10px;
    width: 80%;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 10%;
    color: #f9d689;
    background-color: #14123e; 
    text-align: center;
  }
  .boots-wrap{
    position: absolute;
    top: 60%;
    height: 200px;
    width: 100%;
    .error{
      position: absolute;
      top: 15%;
      // left: 35%;
      color: red;
      font-size: 14px;
      width: 100%;
      text-align: center;
    }
    .confrim_btn{
      width: 30%;
      top: 25%;
      left: 35%;
      position: absolute;
    }
  }
  .mobile::-webkit-input-placeholder {
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0% 50%;
    background-size: cover;
    background-repeat: no-repeat; 
  }
  .mobile::-moz-placeholder {
    /* Firefox 19+ */
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat; 
  }
  .mobile:-moz-placeholder {
    /* Firefox 18- */
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat; 
  }
  .mobile:-ms-input-placeholder {
    /* IE 10- */
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat; 
  }
  @keyframes arrowsBg {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
}

</style>


