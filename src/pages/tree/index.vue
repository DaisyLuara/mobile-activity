<template>
    <div class="greenlife-content">
        <!--手机号-->
        <input class="num" type="text" placeholder="请输入你的手机号" maxlength="11"   v-model="mobileNum" @click="phoneError = false" >
        <!--错误信息 autocomplete="off"-->
        <div class="error" v-show="phoneError">{{errorText}}</div>
        <img class="phone-button" :src="imgServerUrl + '/button.png'" alt="" @click="redirectToPhoto()"/>
        <div class="success">
          <img :src="imgServerUrl + '/button2.png'" alt=""/>
        </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
   </div>
</template>
<script>
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import wxService from 'services/wx';
import parseService from 'modules/parseServer';
import { customTrack } from 'modules/customTrack';

export default {
  components: {
    WxShare,
  },
  data() {
    return {
      imgServerUrl: 'http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife',
      errorText: '',
      mobileNum: '',
      phoneError: false,
      //微信分享信息
      wxShareInfoValue: {
        title: '凯德绿享新生活',
        desc: '凯德绿享新生活',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/icon.jpg',
      },
    };
  },
  beforeCreate() {
    document.title = '凯德绿享新生活';
  },
  mounted(){
    $('.greenlife-content').css('min-height', $(window).height());
  },
  methods: {
    //输入手机号跳转 确认跳转
      redirectToPhoto(){
        if (!(/^1[34578]\d{9}$/.test(this.mobileNum))){
          this.phoneError = true;
          this.errorText = '手机号码格式不正确';
          return;
        }
        //提交手机号统计
        customTrack.sendMobile(this.mobileNum);
        this.linkToPhoto();
      },
    //跳转的操作
      linkToPhoto(){
       console.log("111111");
        $(".success").css('display','block');
        this.$router.push({
          path: '/marketing/tree/result'
        });
         setTimeout(()=>{
           $(".success").css('display','none');
           this.mobileNum='';
        },1000)  
      },  
  },
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: () => {
          customTrack.shareWeChat();
        },
      };
      return wxShareInfo;
    },
  },
};
</script>
<style lang="less" scoped>
@imageHost: 'http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife';
.clearfix:after {  
  content: ".";  
  display: block;  
  height: 0;  
  visibility: hidden;  
  clear: both;  
}  
.clearfix {  
  *zoom: 1;  
}
.translate2d(@x,@y){
  transform:translate(@x,@y);
  -webkit-transform:translate(@x,@y);
  -moz-transform:translate(@x,@y);
  -ms-transform:translate(@x,@y);
  -o-transform:translate(@x,@y);
}
.rotate2d(@x,@y){
  transform:rotate(@x,@y);
  -webkit-transform:rotate(@x,@y);
  -moz-transform:rotate(@x,@y);
  -ms-transform:rotate(@x,@y);
  -o-transform:rotate(@x,@y);
}
.translate3d(@x,@y,@z){
  transform:translate(@x,@y,@z);
  -webkit-transform:translate(@x,@y,@z);
  -moz-transform:translate(@x,@y,@z);
  -ms-transform:translate(@x,@y,@z);
  -o-transform:translate(@x,@y,@z);
}
.rotate3d(@x,@y,@z){
  transform:rotateX(@x);
  -webkit-transform:rotateX(@x);
  -moz-transform:rotateX(@x);
  -ms-transform:rotateX(@x);
  -o-transform:rotateX(@x);
  transform:rotateY(@y);
  -webkit-transform:rotateY(@y);
  -moz-transform:rotateY(@y);
  -ms-transform:rotateY(@y);
  -o-transform:rotateY(@y);
  transform:rotateZ(@z);
  -webkit-transform:rotateZ(@z);
  -moz-transform:rotateZ(@z);
  -ms-transform:rotateZ(@z);
  -o-transform:rotateZ(@z);
}
.border(@radius:50%){
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  -ms-border-radius: @radius;
  -o-border-radius: @radius;
}
.greenlife-content{
      width:100%;
      height:100%;
      background-image: url("@{imageHost}/word.png"),url("@{imageHost}/title.png"),url("@{imageHost}/leaf1.png"),url("@{imageHost}/logo.png"),url("@{imageHost}/leaf2.png"),url("@{imageHost}/grass.png");
      background-size: 37% auto,85% auto,100% auto,22% auto,100% auto,100% auto;
      background-repeat: no-repeat,no-repeat,no-repeat,no-repeat,no-repeat,no-repeat;
      background-position: center 95.2%,center 17%,center top,18.5% 98%,center bottom,center bottom;
      position: relative;
      text-align: center;
      overflow:hidden;
      background-color:#030d01;
    img{
        border:none;
      }
    .error{
      display: block;
      position: absolute;
      left: 28%;
      top: 35%;
      color: #fff;
    }
    .num{
      width: 70%;
      height: 7.5%;
      position: absolute;
      left: 50%;
      top: 44%;
      transform: translate(-50%, -50%);
      padding:0 2%;
      outline: none;
      padding: 10px;
      font-size: 16px;
      text-align: center;
      background: url("@{imageHost}/phone.png") center center/100% 100% no-repeat;

    }
    .phone-button{
      width: 70%;
      position: absolute;
      left: 50%;
      top: 56%;
      transform: translate(-50%,-50%);
      border:none;
      background: url("@{imageHost}/button.png") center center/100% 100% no-repeat;

    }
    .phone-button:hover{
      background: url("@{imageHost}/button2.png") center center/98% 100% no-repeat;
    }
    .phone-button:click{
      background: url("@{imageHost}/button2.png") center center/98% 100% no-repeat;
    }
    .success{
      width: 71%;
      height:23%;
      position: absolute;
      left: 50%;
      top: 65%;
      transform: translate(-50%,-50%);
      display:none;
      img{
        width:100%;
        height:100%;
        border:none;
      }
    }
}
</style>


