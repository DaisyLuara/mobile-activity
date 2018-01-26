<template>
  <div class="phone-content">
    <img src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/title.png" alt="" class="title"/>
    <img src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/phone_hint.png" alt="" class="phone-hint"/>
    <input type="text" class="mobile" maxlength="11" placeholder="请输入你的手机号" v-model="mobileNum" @click="phoneError = false"/>
    <div class="boots-wrap">
    <div class="error" v-show="phoneError">{{errorText}}</div>
      <img class="phone_btn_1" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/phone_btn_1.png">
      <img class="phone_btn_2" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/phone_btn_2.png">
      <div class="boot-img"></div>
    </div>
    <!-- <wx-share :WxShareInfo="wxShareInfo"></wx-share> -->
  </div>
</template>
<script>
import { setParameter } from 'modules/util'
import { customTrack } from 'modules/customTrack'
import WxShare from 'modules/wxShare.vue'
export default {
  components: {
      WxShare
    },
   data() {
      return {
        mobileNum: '',
        phoneError: true,
        errorText: ''
      }
    },
    beforeCreate(){
      document.title = '开箱子'
    },
    mounted(){
      $(".phone-content").css('height', $(window).height());
      $('.boot-img').off('touchstart', this.slideEnter)
      $('.boot-img').on('touchstart', this.slideEnter)
    },
    created(){
    },
    methods:{
      slideEnter(e){
        e.preventDefault();
        $('.boot-img').on('touchmove', this.slideMove);
        $('.boot-img').on('touchend', this.slideEnd);
      },
      slideMove(e){
        if(!(/^1[34578]\d{9}$/.test(this.mobileNum))){
          this.phoneError = true;
          this.errorText = '手机号码格式不正确';
            $('.boot-img').off('touchstart', this.slideEnter);
            $('.boot-img').on('touchstart', this.slideEnter)
          return;
        }else{
          let slide_wid = $('.boots-wrap').width()*0.9,
          start_pos = $('.boots-wrap').offset().left,
          end_pos = start_pos + slide_wid - $('.boot-img').width();
          let moveX = e.originalEvent.touches[0].clientX,
            diff = moveX - start_pos,
            curr_pos = 0,
            percent = 0;
          if (diff <= 0 || $('.boot-img').offset().left < start_pos) {
            curr_pos = 0;
          } else {
            curr_pos = diff - $('.boot-img').width() / 2;
          }
          if (diff > end_pos) {
            curr_pos = end_pos - start_pos;
            $('.boot-img').off('touchstart', this.slideEnter);
            $('.boot-img').off('touchmove', this.slideMove);
            $('.boot-img').off('touchend', this.slideMove);
          }
          percent = curr_pos / (end_pos - start_pos) * 100;
          if(percent == 100){
            //提交手机号统计
             customTrack.sendMobile(this.mobileNum);
            this.linkToPhoto()
          }
          $('.boot-img').css('left', curr_pos);
        }
         
      },
      slideEnd(){
        $('.boot-img').off('touchmove', this.slideMove);
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
    // wxShareInfo() {
    //   let wxShareInfo = {
    //     title: this.marketingOptions.wxShareInfo.title,
    //     desc: this.marketingOptions.wxShareInfo.desc,
    //     imgUrl: this.marketingOptions.wxShareInfo.imgUrl,
    //     success: () => {
    //       customTrack.shareWeChat()
    //     }
    //   }
    //   return wxShareInfo;
    //  }
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
      left: 29%;
      color: red;
      font-size: 14px;
    }
    .phone_btn_1{
      width: 80%;
      top: 25%;
      left: 10%;
      position: absolute;
    }
    .phone_btn_2{
      width: 80%;
      top: 25%;
      left: 10%;
      position: absolute;
      animation: arrowsBg 1.5s ease-out infinite alternate;
    }
    .boot-img{
      position: absolute;
      top: 24%;
      bottom: 0;
      left: 6%;
      width: 20%;
      z-index: 5;
      background-repeat: no-repeat;
      background-size: 100%;
      background-image: url("@{imageHost}/phone_btn.png");
      transition: background .5s;
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


