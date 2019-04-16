<template>
  <div
    id="warp"
    :style="style.root"
    class="yanzhi-result"
  >
    <img
      :src="imgUrl+'title.png'"
      class="title"
      data-v-content
    >
    <div class="content">
      <div class="circles">
        <img
          :src="imgUrl+'gear1.png'"
          class="gear1"
        >
        <img
          :src="imgUrl+'gear2.png'"
          class="gear2"
        >
        <img
          :src="imgUrl+'gear3.png'"
          class="gear3"
        >
        <img
          :src="imgUrl+'gear4.png'"
          class="gear4"
        >
        <img
          :src="imgUrl+'gear5.png'"
          class="gear5"
        >
        <img
          :src="imgUrl+'gear6.png'"
          class="gear6"
        >
        <img
          :src="imgUrl+'gear7.png'"
          class="gear7"
        >
        <img
          :src="imgUrl+'gear8.png'"
          class="gear8"
        >
        <img
          :src="imgUrl+'gear9.png'"
          class="gear9"
        >
      </div>
      <img
        id="mImg"
        :src="photo"
        class="money"
      >
      <img
        :src="imgUrl+'frame.png'"
        class="imgframe"
      >
    </div>
    <img
      v-show="Boolean(photo)"
      :src="base+'baoli/save.png'"
      class="press"
    >
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        },
        show: false
      },
      base: IMAGE_SERVER + '/pages/yanzhi/',
      imgUrl: IMAGE_SERVER + '/pages/yanzhi/hilton/',
      //微信分享
      wxShareInfoValue: {
        title: '快来看看我的颜“值”多少吧',
        desc: '快来看看我的颜“值”多少吧',
        link: process.env.AD_API+'/api/s/BBX' + window.location.search,
        imgUrl: IMAGE_SERVER + '/pages/yanzhi/baoli/share.png',
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/yanzhi/hilton/";
html,
body {
  padding: 0;
  margin: 0;
  text-align: center;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
img {
  pointer-events: none;
  user-select: none;
}
.yanzhi-result {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-size: 0;
  position: relative;
  background: url("@{imgUrl}bg.jpg") center top/100% 100% no-repeat;

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
    z-index: 400;
    width: 89%;
    margin: auto;
    position: absolute;
    left: -1%;
    right: 0;
    top: 26.5%;
    font-size: 20px;
    pointer-events: auto;
    user-select: auto;
  }
  .imgframe {
    margin: 20% auto;
    width: 98%;
    position: relative;
    z-index: 300;
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


