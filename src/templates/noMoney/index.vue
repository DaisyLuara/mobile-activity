<template>
<div class="phone-content" v-bind:style="marketingOptions.bg">
  <img class="logo-img" v-if="marketingOptions.topLogo" :src="marketingOptions.topLogo.imgUrl">
  <div class="phone-wrap">
    <div class="photo-wrap">
      <img class="img" :src="userIcon" alt="">
      {{userIcon}}
    </div>
    <div class="phone-num" id="phone">
      <div class="error" v-show="phoneError"> {{errorText}}</div>
      <img class="phone-icon" :src="marketingOptions.phoneIcon.imgUrl" v-if="marketingOptions.phoneIcon">
      <input class="num" placeholder="请输入手机号码" id="mobile" maxlength="11" v-model="mobileNum" @click="phoneError = false">
    </div>
    <div class="report-wrap" @click="redirectToPhoto">
      <img class="outer-img" :src="outerImg">
      <a class="go-report">获取报告</a>
    </div>
  </div>
</div>
</template>
<script>
  const marketing_image_server = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';
  import { getParamsMap, getParameter, setParameter } from 'modules/util'
  import { customTrack } from 'services/customTrack'
  export default {
    props: ['marketingOptions'],
    computed: {
    },
    data() {
      return {
        errorText: '',
        mobileNum: '',
        phoneError: false,
        userIcon: null,
        outerImg: marketing_image_server + '/templates/noMoney/outer1-img.png'
      }
    },
    mounted(){
      $(".phone-content").css('height', $(window).height());
      document.body.addEventListener("touchstart",function(){});
      let wid = $(window).width() > 640 ? 640 : $(window).width();
      let photo_hei = $('.photo-wrap').width();
      $('.photo-wrap').height(photo_hei);
      let num_hei = wid * 40 / 375;
      $('.num').height(num_hei);
      var bool = false;
      setTimeout(function() {
        bool = true;
      }, 1000);

      window.addEventListener("popstate", function(e) {
        if (bool) {
          //做你想要做的操作
          this.forbidWXShare();
        }
      }, false);
    },
    created(){
      this.forbidWXShare();
      this.pushHistory();
      this.getPeopleImage();
    },
    methods: {
      forbidWXShare() {
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        } else {
          this.onBridgeReady();
        }
      },
      onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
      },
      pushHistory() {
        let page_url = window.location.href
        let state = {
          title: "title",
          url: page_url
        };
        window.history.pushState(state, "title", page_url);
      },
      getPeopleImage() {
        let recordId = decodeURI(this.$route.query.recordId);
        this.$http.get(process.env.SAAS_API + "/open/play/playResults/" + recordId).then(result => {
          let data = result.data.data;
          let imageUrl = data.result_img_url;
          let headImgUrl = data.head_img_url;
          this.userIcon = headImgUrl;
          this.$route.query.imageUrl = imageUrl;
        }).catch(err => {
        console.log(err)
        })
      },
      redirectToPhoto(){
        if(!(/^1[34578]\d{9}$/.test(this.mobileNum))){
          this.phoneError = true;
          this.errorText = '手机号码格式不正确';
          return;
        }
        customTrack.sendMobile(this.mobileNum);
        this.linkToPhoto();
      },
      linkToPhoto(){
        // 要把第一个页面的所有参数都带到photo页,因为photo页也需要链接上的参数
        let redirect_url = window.location.origin +'/#'+ this.$route.path + '/result/';
        for(let param in this.$route.query){
          redirect_url = setParameter(param, this.$route.query[param], redirect_url)
        }
        window.location.href = redirect_url;
      }
    }
  }
</script>
<style lang="less" scoped>
 .phone-content {
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  position: relative;

  .logo-img {
    width: 60%;
    margin-top: 7%;
  }

  .phone-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 38%;
    margin: 0 auto;
    width: 89%;
    background-color: rgba(0, 0, 0, .61);
    border-radius: 12px;
    padding: 6% 0;
    .photo-wrap {
      width: 37%;
      border-radius: 50%;
      background-color: #fff;
      margin: 0 auto;
      overflow: hidden;
      .img {
        width: 100%;
      }
    }
    
    .phone-num {
      width: 85%;
      position: relative;
      margin: 6% auto 5%;
      .phone-icon {
        width: 9%;
        position: absolute;
        left: 15px;
        top: 22%;
        z-index: 2;
      }
      .num {
        background-color: #fff;
        border: 1px solid #707487;
        border-radius: 6px;
        width: 100%;
        font-size: 16px;
        color: #707487;
        padding-left: 28%;
        min-height: 20px;
      }
      .error {
        position: absolute;
        top: -36%;
        color: red;
        display: block;
        font-size: 14px;
        text-align: center;
        width: 100%;
      }
    }
    .report-wrap {
      width: 85%;
      position: relative;
      margin: 0 auto;
      .outer-img {
        width: 100%;
      }
      .go-report {
        font-size: 17px;
        font-weight: bold;
        letter-spacing: 2px;
        color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 3;
        height: 23px;
      }
    }
  }
}
</style>

