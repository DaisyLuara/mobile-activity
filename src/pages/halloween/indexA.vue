<template>
  <div 
    :style="style.root" 
    class="root">
    <div 
      class="group">
      <ul
        :class="{'x-list':iphoneX,'list':!iphoneX}" 
        class="list">
        <li  
          class="one" >
          <img 
            :src="baseUrl + 'card01.png'+ this.$qiniuCompress()"
            class="card01">
          <video  
            id="video"
            class="photo"
            webkit-playsinline="true" 
            playsinline="true" 
            x-webkit-airplay="true" 
            preload="auto"
            width="100%" 
            height="100%">
            <source 
              v-if="photo !== null" 
              :src="photo" 
              type="video/mp4">
            您的浏览器不支持video标签.
          </video>
          <img 
            v-show="buttonshow"
            src="https://cdn.exe666.com/fe/marketing/img/save_moonCake/play2.png"
            class="play"
            @click="playVideo()">
        </li>   
      </ul>
    </div> 
    <img 
      :src="baseUrl + 'tips02.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}" 
      class="save">
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  getInfoById
} from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/halloween/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      buttonshow: true,
      iphoneX: false,
      //分享
      wxShareInfoValue: {
        title: 'HALLOWEEN万圣节',
        desc: '快来陪我玩吧，嘿嘿嘿~',
        link: process.env.AD_API+'/api/s/1rj' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/halloween/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    //适配
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          console.log(res)
          this.photo = res.url
          console.log(this.photo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //播放视频
    playVideo() {
      let that = this
      this.playNow = document.getElementById('video')
      this.playNow.play()
      this.buttonshow = false
      this.playNow.onplay = function() {
        that.playNow.currentTime = 0
      }
      this.playNow.onended = function() {
        that.buttonshow = true
      }
      this.playNow.onpause = function() {
        that.buttonshow = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/halloween/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .group {
    width: 100%;
    position: relative;
    .list {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0);
      margin-top: 18%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
      li {
        img {
          width: 85%;
        }
        .photo {
          width: 81%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50.2%);
          user-select: auto;
          pointer-events: auto;
        }
        .play {
          width: 24%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          user-select: auto;
          pointer-events: auto;
          z-index: 10;
        }
      }
    }
    .x-list {
      width: 90%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0);
      margin-top: 25%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
  }
  .save {
    width: 64%;
    position: absolute;
    left: 18%;
    bottom: 1%;
  }
  .x-save {
    width: 70%;
    position: absolute;
    left: 15%;
    bottom: 4%;
  }
}
</style>