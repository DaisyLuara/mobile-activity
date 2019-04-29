<template>
  <div
    class="ad-wrap"
  >
    <img
      v-lazy="imgServerUrl + '/xing1.png'"
      class="img"
      alt=""
    >
    <div
      class="ad_02"
    >
      <img
        v-lazy="imgServerUrl + '/xing2.png'"
        alt=""
        class="ad_02_img"
      >
      <img 
        v-lazy="imgServerUrl + '/num1.png'"
        alt=""
        class="num1"
      >
      <img 
        v-lazy="imgServerUrl + '/one.gif'"
        alt=""
        class="gif_1"
      >
      <img 
        v-lazy="imgServerUrl + '/num2.png'"
        alt=""
        class="num2"
      >
      <img 
        v-lazy="imgServerUrl + '/two.gif'"
        alt=""
        class="gif_2"
      >
      <img 
        v-lazy="imgServerUrl + '/num3.png'"
        alt=""
        class="num3"
      >
      <img 
        v-lazy="imgServerUrl + '/three.gif'"
        alt=""
        class="gif_3"
      >
    </div>
    <img
      v-lazy="imgServerUrl + '/xing3.png'"
      alt=""
      class="img"
    >
    <div
      class="ad_04"
    >
      <img
        v-lazy="imgServerUrl + '/xing4.png'"
        alt=""
        class="img"
      >
      <video
        v-show="!bgshow"
        id="vedio"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="true" 
        controls
        width="100%"
        class="vedio"
      >
        <source
          :src="imgServerUrl+'/vedio.mp4'" 
          type="video/mp4"
        >
        您的浏览器不支持video标签.
      </video>
      <img  
        v-show="bgshow"
        v-lazy="imgServerUrl+'/vedio_bg.png'"
        class="bg"
      >
      <a
        v-show="bgshow"
        class="vplay"
        @click="vPlay"
      >
        <img :src="imgServerUrl + '/btn.png'">
      </a>
    </div>
    <div class="ad_05">
      <img 
        v-lazy="imgServerUrl + '/xing5.png'" 
        alt="" 
        class="img"
      >
      <img 
        v-lazy="imgServerUrl + '/four.gif'" 
        alt="" 
        class="gif_4"
      >
    </div>
    <img
      v-lazy="imgServerUrl + '/xing6.png'"
      alt=""
      class="img"
    >
    <img
      v-lazy="imgServerUrl + '/xing7.png'"
      alt=""
      class="img"
    >
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import { $wechat, wechatShareTrack } from 'services'
import { Lazyload } from 'mint-ui'
import Vue from 'vue'

Vue.use(Lazyload)
export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER + '/pages/ad',
      bgshow: true,
      wxShareInfo: {
        title: '星视度智能召唤屏',
        desc: '场景化解决方案',
        imgUrl: IMAGE_SERVER + '/wx_share_icon/ad_share_icon.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '星视度'
  },
  mounted() {
    $wechat()
      .then(res => {
        res.share(this.wxShareInfo)
      })
      .catch(_ => {
        console.warn(_.message)
      })
  },
  methods: {
    vPlay() {
      let that = this
      this.playNow = document.getElementById('vedio')
      this.playNow.play()
      this.bgshow = false
      this.playNow.onended = function() {
        that.bgshow = true
      }
      this.playNow.onpause = function() {
        that.bgshow = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ad-wrap {
  .img {
    width: 100%;
  }
  .ad_02 {
    position: relative;
    .ad_02_img {
      width: 100%;
    }
    .gif_1 {
      position: absolute;
      top: 16%;
      width: 88%;
      left: 6%;
    }
    .num1 {
      position: absolute;
      top: 12%;
      width: 12%;
      z-index: 2;
      left: 44%;
    }
    .num2 {
      position: absolute;
      top: 40.8%;
      width: 12%;
      z-index: 2;
      left: 44%;
    }
    .num3 {
      position: absolute;
      bottom: 23.8%;
      width: 12%;
      z-index: 2;
      left: 44%;
    }
    .gif_2 {
      position: absolute;
      top: 44.8%;
      width: 88%;
      left: 6%;
    }
    .gif_3 {
      position: absolute;
      bottom: 2.5%;
      width: 88%;
      left: 6%;
    }
  }
  .ad_05 {
    position: relative;
    .gif_4 {
      position: absolute;
      bottom: 13.5%;
      width: 54%;
      left: 40%;
    }
  }
  .ad_04 {
    position: relative;
    .vedio {
      position: absolute;
      bottom: 1%;
      width: 90%;
      left: 5%;
    }
    .bg {
      position: absolute;
      bottom: 1%;
      width: 90%;
      left: 5%;
    }
    .vplay {
      position: absolute;
      bottom: 5%;
      left: 40%;
      img {
        width: 80%;
      }
    }
  }
}
</style>
