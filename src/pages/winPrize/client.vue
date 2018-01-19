<template>
  <div class="client-wrap" v-if="showPage">
    <img class="abs slogan" :src="imgServerUrl + '/pages/win_prize/client_slogan.png'" alt="">
    <div class="abs info">
      <div class="people-info">
        已有<span class="num"> 8,089,101 </span>人闯关成功
      </div>
      <div class="user-swiper-wrap clearfix">
        <div class="user-content first clearfix">
          <div v-for="(head, index) in 20" v-bind:class="index > headImgAnimate.hideIndex1 ? 'hide' : ''" v-bind:key="head" style="background: #ffe221;" class="user">
            {{index}}
          </div>
        </div>
        <div class="user-content second clearfix">
          <div v-for="(head, index) in 20" v-bind:class="index > headImgAnimate.hideIndex2 ? 'hide' : ''" v-bind:key="head" style="background: #ffe221;" class="user">
            {{index}}
          </div>
        </div>
      </div>
    </div>
    <div class="abs question">
      <div class="abs clock">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle id="progress1" r="40%" cy="50%" cx="50%" stroke-width="15" stroke="#ffd941" fill="none"/>
          <circle id="progress2" r="40%" cy="50%" cx="50%" stroke-width="15" stroke="#d2d2d2" fill="none"/>
        </svg>
        <div class="clock-text">{{clockOpts.text}}</div>
      </div>
    </div>
    <div v-for="i in 9" v-bind:key="i" v-bind:class="'coin-'+i" class="coin"></div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
import { Cookies } from 'modules/util'
import wxService from 'services/wx'
export default {
  data(){
    return {
      showPage: false,
      userInfo: {
        'wx_openid': '',
        'head_image': ''
      },
      headImgArray:[0, 1, 2, 3, 4, 5],
      imgServerUrl: IMAGE_SERVER,
      headImgAnimate: {
        hideIndex1: 9,
        hideIndex2: -1
      },
      clockOpts: {
        text: "05:00",
        sumSecs: 300,
        n: -360 / 300  //每秒转的圆心角度
      }
    }
  },
  beforeCreate(){
    document.title = "勇闯三关"
  },
  created(){
    // check wechat login status
    // if (!Cookies.get('wx_openid')) {
    //   //unauthed
    //   let fullUrl = window.location.href;
    //   let wx_auth_url = process.ENV.WX_API + '/account/wechat/oauth?redirect_url=' + encodeURIComponent(fullUrl);
    //   window.location.href = wx_auth_url;
    //   return;
    // }
    // this.showPage = true;
    // this.getWxUserInfo();

    // test
    this.userInfo.wx_openid = 'zjj19920707';
    this.userInfo.head_image = '';
    this.showPage = true;
  },
  mounted(){
    document.querySelector('.client-wrap').style.height = window.innerHeight + 'px';
    this.loopHeader(1, 'first');
    this.initClock();
  },
  methods: {
    getWxUserInfo(){
      wxService.getWxUserInfo(this).then(wdata => {
        this.userInfo.wx_openid = wdata.openid;
        this.userInfo.head_image = wdata.headimgurl;
      }).catch(err => {
        console.log('err')
      })
    },
    initClock(){
      // 设置半径
      let c = $("svg").width() * 0.4 * Math.PI *2;
      $("#progress1").css('stroke-dasharray',c);
      $("#progress2").css('stroke-dasharray',c);
      this.clock(1);
    },
    clock(sec){
      let that = this;
      let c = $("svg").width() * 0.4 * Math.PI *2;
      if(sec > this.sumSecs){
        return ;
      }

      // 设置时间
      let nowTime = 300 -sec;
      let nowTimeMin = Math.floor(nowTime / 60);
      let nowSec = nowTime % 60;
      if(nowSec < 10){
        nowSec = "0" + nowSec;
      }
      this.clockOpts.text = "0" + nowTimeMin + ":" + nowSec;

      // 设置时间进度条
      this.clockOpts.n = this.clockOpts.n - 1.2;
      let offset = (this.clockOpts.n * Math.PI * $("svg").width() * 0.4) / 180
      $("#progress2").css('stroke-dashoffset', offset);

      sec++;
      setTimeout(function(){
        that.clock(sec);
      }, 1000)
    },
    loopHeader(loop, type){
      let that = this;
      if(type == 'first'){
        if(loop > 20){
          that.headImgAnimate.hideIndex1 = -1;
          $(".user-content.first").css("left", "625px");
          return;
        }

        if(loop == 12){
          that.loopHeader2(1, 'second');
        }
      }else{
        if(loop == 21){
          that.loopHeader2(1, 'second')
        }

        if(loop > 29){
          that.headImgAnimate.hideIndex1 = -1;
          $(".user-content.first").css("left", "625px");
          return;
        }
      }

      $(".user-content.first").animate({'left': '-=57.5px'}, 0, 'linear')

      if(type == 'first'){
        $(".user-content.first .user").eq(loop + 8).removeClass('hide');
        $(".user-content.first .user").eq(loop -1).addClass('hide');
      }

      if(type == 'second' && loop > 9){
        $(".user-content.first .user").eq(loop - 10).addClass('hide');
        $(".user-content.first .user").eq(loop -1).removeClass('hide');
      }

      if(type == 'second' && loop <= 10){
        $(".user-content.first .user").eq(loop-1).removeClass('hide');
      }

      loop++;
      setTimeout(function(){
        that.loopHeader(loop,type)
      }, 1000)
    },
    loopHeader2(loop, type){
      let that = this;
      if(type == 'second'){
        if(loop == 21){
          that.loopHeader(1, 'second')
        }

        if(loop > 29){
          that.headImgAnimate.hideIndex2 = -1;

          $(".user-content.second").css("left", "625px");
          return;
        }
      }

      $(".user-content.second").animate({'left': '-=57.5px'}, 0, 'linear')

      if(type == 'first'){
        $(".user-content.second .user").eq(loop + 8).removeClass('hide');
        $(".user-content.second .user").eq(loop -1).addClass('hide');
      }

      if(type == 'second' && loop > 9){
        $(".user-content.second .user").eq(loop - 10).addClass('hide');
        $(".user-content.second .user").eq(loop -1).removeClass('hide');
      }

      if(type == 'second' && loop <= 10){
        $(".user-content.second .user").eq(loop-1).removeClass('hide');
      }

      loop++;
      setTimeout(function(){
        that.loopHeader2(loop,type)
      }, 1000)
    }
  },
}
</script>
<style lang="less" scoped>
@IMAGE_SERVER: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing';
  .client-wrap{
    background-image: url("@{IMAGE_SERVER}/pages/win_prize/client_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    .abs{
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .slogan{
      top: 14%;
      width: 84%;
    }
    .info{
      top: 25%;
      .people-info{
        color: #fff;
        font-size: 42px;
        letter-spacing: 1px;
        .num{
          color: #ffe221
        }
      }
      .user-swiper-wrap{
        position: relative;
        // width: 280px;
        // height: 30px;
        width: 700px;
        height: 75px;
        margin: 0 auto;
        margin-top: 10px;
        overflow: hidden;
        .user-content{
          position: absolute;
          // width: 530px;
          width: 1330px;
          transition: left 1s;
          &.first{
            // left: 25px;
            left: 100px;
          }
          &.second{
            // left: 250px;
            left: 615px;
          }
          .user{
            // width: 30px;
            // height: 30px;
            width: 70px;
            height: 70px;
            float: left;
            opacity: 1;
            transform: scale(1);
            border-radius: 50%;
            // margin-left: -5px
            margin-left: -12.5px;
            transition: all .3s .1s;
           background-color: red;
            &.hide{
              opacity: 0;
              transform: scale(0);
            }
          }
        }
      }
    }
    .question{
      top: 36%;
      width: 84%;
      z-index: 2;
      background: #fff;
      border-radius: 5%;
      padding-bottom: 88%;
      .clock{
        top: -5%;
        width: 24%;
        z-index: 2;
        padding-bottom: 24%;
        border-radius: 50%;
        background-color: #fff;
        svg{
          position: absolute;
          margin: 0 auto;
          left: 0;
          right: 0;
          z-index: 1;
        }
        .clock-text{
          position: absolute;
          height: 57px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 50px;
          z-index: 2;
        }
        #progress2 {
          transform: rotate(-90deg);
          transform-origin: center;
        }
      }
    }
    .coin{
      position: fixed;
      z-index: 3;
      transition: all 2s;
      animation-fill-mode: forwards;
      background-image: url("@{IMAGE_SERVER}/pages/win_prize/coin.png");
      &.coin-1{
        top: 10%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 74.7px;
        height: 67.2px;
        background-size: 373.5px 67.2px;
        animation: playgif .5s infinite steps(4), down 5s infinite linear;
        transform: rotate3d(1, 1, 0, 40deg)
      }
      &.coin-2{
        top: 10%;
        right: 30%;
        width: 88.75px;
        height: 80px;
        opacity: 0;
        background-size: 443.75px 80px;
        animation: playgif .5s infinite steps(4), down 3s 3s infinite linear;
        transform: rotateX(-50deg) rotateY(50deg)
      }
      &.coin-3{
        top: 10%;
        left: 30%;
        opacity: 0;
        width: 124.25px;
        height: 112px;
        background-size: 621.25px 112px;
        animation: playgif .5s infinite steps(4), down 4s 2s infinite linear;
        transform: rotateX(-10deg) rotateY(10deg)
      }
      &.coin-4{
        top: 10%;
        left: 10%;
        opacity: 0;
        width: 113.6px;
        height: 102.4px;
        background-size: 568px 102.4px;
        animation: playgif .5s infinite steps(4), down 3s 4s infinite linear;
        transform: rotateX(-20deg) rotateY(20deg)
      }
      &.coin-5{
        top: 10%;
        left: 20%;
        opacity: 0;
        width: 124.25px;
        height: 112px;
        background-size: 621.25px 112px;
        animation: playgif .5s infinite steps(4), down 3.5s 1.5s infinite linear;
        transform: rotateX(-10deg) rotateY(50deg)
      }
      &.coin-6{
        top: 10%;
        right: 5%;
        opacity: 0;
        width: 74.7px;
        height: 67.2px;
        background-size: 373.5px 67.2px;
        animation: playgif .5s infinite steps(4), down 5s .5s infinite linear;
        transform: rotateX(0deg) rotateY(50deg)
      }
      &.coin-7{
        position: fixed;
        top: 0%;
        right: -2%;
      }
      &.coin-8{
        position: fixed;
        top: 0%;
        right: -2%;
      }
      &.coin-9{
        position: fixed;
        top: 0%;
        right: -2%;
      }
      &.coin-10{
        position: fixed;
        top: 0%;
        right: -2%;
      }
    }
  }
  @keyframes playgif {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 0px;
    }
  }
  @keyframes down {
    0%{
      opacity: 0;
    }
    10%{
      opacity: 1;
    }
    100%{
      top: 100%;
      opacity: 1;
    }
  }
  @keyframes move {
    from{
      // opacity: 1;
      // transform: translateX(0)
    }
    to{
      // opacity: 0;
      transform: translateX(-25px)
    }
  }
</style>
