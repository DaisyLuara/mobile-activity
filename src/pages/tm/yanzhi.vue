<template>
  <div 
    id="warp" 
    class="yanzhi-result">
    <img 
      :src="imgUrl+'title.png'" 
      class="title" 
      data-v-content>
    <div class="content">
      <div class="circles"> 
        <img 
          :src="imgUrl+'gear1.png'" 
          class="gear1">
        <img 
          :src="imgUrl+'gear2.png'" 
          class="gear2">
        <img 
          :src="imgUrl+'gear3.png'" 
          class="gear3">
        <img 
          :src="imgUrl+'gear4.png'" 
          class="gear4">
        <img 
          :src="imgUrl+'gear5.png'" 
          class="gear5">
        <img 
          :src="imgUrl+'gear6.png'" 
          class="gear6">
        <img 
          :src="imgUrl+'gear7.png'" 
          class="gear7">
        <img 
          :src="imgUrl+'gear8.png'" 
          class="gear8">
        <img 
          :src="imgUrl+'gear9.png'" 
          class="gear9">
      </div>
      <img 
        id="mImg" 
        :src="mImg" 
        class="money">
      <img 
        :src="imgUrl+'frame.png'" 
        class="imgframe">
    </div>
    <img 
      v-show="press" 
      :src="imgUrl+'changan.png'" 
      class="press">
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const BASE_URL = 'http://cdn.exe666.com/'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'fe/image/tmall/yanzhi/',
      mImg: null,
      press: false,
      //微信分享
      wxShareInfo: {
        title: '我的颜值太高了！居然被印上了钞票！',
        desc: '你也来和我PK颜值吧~',
        imgUrl: BASE_URL + 'image/yanzhi/index/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.handleWechatShare()
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let warp = document.getElementById('warp')
    warp.style.minHeight = height + 'px'
    this.getInfoById()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          this.press = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://cdn.exe666.com/fe/image/tmall/yanzhi/';
.yanzhi-result {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
  position: relative;
  background: url('@{imgUrl}back.png') center top/100% 100% repeat-y;

  .title[data-v-content] {
    width: 97%;
    margin-top: 15px;
  }
  .content {
    position: relative;
    width: 100%;
    margin-top: -10px;
  }
  .circles {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
  }
  .circles > img {
    position: absolute;
  }
  .gear1 {
    width: 35.6%;
    left: -13px;
    margin-top: 23px;
    z-index: 0;
    animation: mycircle 12s infinite linear;
  }
  .gear2 {
    width: 22%;
    left: 16%;
    margin-top: 10.5%;
    z-index: 9;
    animation: myback 10s infinite linear;
  }
  .gear3 {
    width: 22%;
    margin-top: 55.6%;
    left: 47%;
    z-index: 0;
    animation: mycircle 8s infinite linear;
  }
  .gear4 {
    width: 32.9%;
    left: 61%;
    margin-top: 51%;
    animation: myback 10s infinite linear;
  }
  .gear5 {
    width: 17%;
    left: -2.3%;
    margin-top: 46.2%;
    animation: mycircle 5s infinite linear;
  }
  .gear6 {
    width: 11.2%;
    left: 87%;
    margin-top: 15%;
    z-index: 0;
    animation: myback 10s infinite linear alternate;
  }
  .gear7 {
    width: 17%;
    left: 80%;
    margin-top: 55.4%;
    animation: mycircle 6s infinite linear;
  }
  .gear8 {
    width: 10.9%;
    left: 36%;
    margin-top: 10.8%;
    z-index: 999;
    animation: mycircle 6s infinite linear;
  }
  .gear9 {
    width: 16%;
    left: 78%;
    margin-top: 12.4%;
    z-index: 0;
    animation: mycircle 10s infinite linear alternate;
  }
  .money {
    z-index: 99999;
    width: 91%;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 25.6%;
    font-size: 20px;
  }
  .imgframe {
    margin: 20% auto;
    width: 98%;
    position: relative;
    z-index: 9999;
  }
  .press {
    width: 80%;
    margin: -12% auto 0;
    animation: updown 0.6s infinite linear alternate;
  }
}
@keyframes mycircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes myback {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes updown {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
}
</style>


