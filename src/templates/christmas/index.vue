<template>
  <div class="phone-wrap" v-bind:style="marketingOptions.bg">
    <img class="top-logo" v-if="marketingOptions.topLogo" :src="marketingOptions.topLogo.imgUrl" :style="marketingOptions.topLogo.style">
    <div class="mobile-wrap" v-bind:style="marketingOptions.mobile ? marketingOptions.mobile.style : ''">
      <div class="error-tips" v-show="phoneError" :style="marketingOptions.mobile.errorTips?marketingOptions.mobile.errorTips.style:''">
        {{errorText}}
      </div>
      <input class="mobile-input" placeholder="请输入手机号提取照片" type="tel" maxlength="11" v-model="mobileNum" @click="phoneError = false">
      <div class="btn-input"  @click="redirectToPhoto">提取照片</div>
    </div>
    <img class="bottom-logo" v-if="marketingOptions.bottomLogo" :src="marketingOptions.bottomLogo.imgUrl" :style="marketingOptions.bottomLogo.style" alt="">
  </div>
</template>
<script>
  import { getParamsMap, getParameter, setParameter } from 'modules/util'
  export default {
    props: ['marketingOptions'],
    computed: {
      wxShareInfo() {
        let wxShareInfo = {
          title: this.marketingOptions.wxShareInfo.title,
          desc: this.marketingOptions.wxShareInfo.desc,
          imgUrl: this.marketingOptions.wxShareInfo.imgUrl,
          success: () => {
            if(_hmt){
              _hmt.push(['_trackEvent', '分享' + this.marketingOptions.name + '提取页', 'share', '分享', '']);
            }
          }
        }
        return wxShareInfo;
      }
    },
    data() {
      return {
        errorText: '',
        mobileNum: '',
        phoneError: false
      }
    },
    mounted(){
      $(".phone-wrap").css('min-height', $(window).height());

      document.body.addEventListener("touchstart",function(){});

      if(window.localStorage){
        if(window.localStorage.getItem(this.marketingOptions.name + '_mobile')){
          this.phoneError = true;
          this.errorText = '正在跳转至照片页面....'
          this.linkToPhoto();
        }
      }
    },
    created(){
    },
    methods: {
      redirectToPhoto(){
        if(!this.$route.query.id){
          this.phoneError = true;
          this.errorText = '没有照片信息，请重新扫描二维码!';
          return;
        }

        if(!(/^1[34578]\d{9}$/.test(this.mobileNum))){
          this.phoneError = true;
          this.errorText = '手机号码输入不正确，请重新输入';
          return;
        }


        // 跳转
        if(window.localStorage){
          window.localStorage.setItem(this.marketingOptions.name + '_mobile', this.mobileNum);
        }

        this.linkToPhoto();

      },
      linkToPhoto(){
        // 要把第一个页面的所有参数都带到photo页,因为photo页也需要链接上的参数
        let redirect_url = window.location.origin + window.location.pathname + '/result/';
        for(let param in this.$route.query){
          redirect_url = setParameter(param, this.$route.query[param], redirect_url)
        }
        window.location.href = redirect_url;
      }
    }
  }
</script>
<style lang="less" scoped>
  .phone-wrap{
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    .top-logo{
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .bottom-logo{
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .mobile-wrap{
      position: absolute;
      top: 36%;
      left: 0;
      right: 0;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      .error-tips{
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        width: 100%;
        color: red;
        margin: 0 auto;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
      .mobile-input{
        width: 60%;
        height: 38px;
        font-size: 16px;
        color: #fff;
        margin: 10px auto 0;
        padding-left: 35px;
        text-align: left;
        border-radius: 28px;
        background-size: 17px 21px;
        background-repeat: no-repeat;
        background-position: 10px center;
        background-color: rgba(0,0,0,.4);
        border: 1px solid rgba(255,255,255, .3);
        background-image: url('~assets/images/christmas/icon_phone.png');
        &::-webkit-input-placeholder{
          line-height: 23px;
          font-size: 14px;
          color: rgba(255,255,255, .8);
          font-weight: 100;
        }
      }
      .btn-input{
        width: 60%;
        height: 38px;
        color: #fff;
        font-size: 16px;
        margin: 10px auto 0;
        font-weight: 200;
        line-height: 38px;
        border-radius: 28px;
        letter-spacing: 2px;
        background-color: #e68c02;
        box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.4);
        &:active{
          height: 40px;
          // background-image: url('~assets/images/christmas/btn2.png');
        }
      }
    }
  }
</style>

