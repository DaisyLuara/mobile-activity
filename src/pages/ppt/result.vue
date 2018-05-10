<template>
<div class="content" id="content">
    <div class="main" v-show="menuShow">
        <img :src="IMGURL + 'bg1.jpg'" class="bg"/>
        <ul class="btn-group">
            <li v-for = "item in 4" :key="item.id" @click="playVideo(item)"><img :src="IMGURL + item + '.png'"/></li>
        </ul>
        <img class="text" :src="IMGURL + 'click.png'"/>
    </div>
    <div class="video-group">
      <video  v-for="item in 4" :key="item.id" :src="IMGURL + 'video/' + item +'.mp4'" :id="video[item]"></video>
    </div>
    <wx-share :WxShareInfo = 'wxShareInfo'></wx-share>
</div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      video: ['', 'video1', 'video2', 'video3', 'video4'],
      menuShow: true,
      //微信分享信息
      wxShareInfoValue: {
        title: '星视度',
        desc: '星视度',
        imgUrl: IMAGE_SERVER + '/pages/promotion/icon.jpg'
      }
    }
  },
  beforeCreate() {
    document.title = '星视度宣传'
  },
  created() {},
  mounted() {
    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var content = document.getElementById('content')
    content.style.minHeight = height + 'px'
  },
  methods: {
    playVideo(item) {
      let target = event.target
      let videoId = document.getElementById('video' + item)
      videoId.style.display = 'block'
      videoId.play()
      videoId.onplay = function() {
        this.menuShow = false
      }

      videoId.onended = function() {
        videoId.style.display = 'none'
        this.menuShow = true
        console.log('aaaa')
      }
    },
    videoStart(videoId) {}
  },
  components: {
    WxShare
  },
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: () => {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  }
}
</script>
<style lang="less" scoped>
@imgURL: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/promotion/';
html,
body {
  overflow-x: hidden;
  text-align: center;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.content {
  width: 100%;
  overflow-x: hidden;
  text-align: center;
  background: url('@{imgURL}bg2.jpg') center bottom/100% auto repeat-y;
  position: relative;
  .main {
    position: relative;
    width: 100%;
    .bg {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .btn-group {
      position: absolute;
      top: 15%;
      right: 0;
      width: 50%;
      display: inline-block;
      z-index: 999;
      li {
        display: inline-block;
        width: 100%;
        margin: 5% 0 16% 0;
        img {
          width: 100%;
        }
        &:nth-child(1) {
          transform: translate(-27%, 14%);
        }
        &:nth-child(2) {
          transform: translate(-7%, 12%);
        }
        &:nth-child(3) {
          transform: translate(-7%, 12%);
        }
        &:nth-child(4) {
          transform: translate(-28%, 6%);
        }
      }
    }
    .text {
      width: 29%;
      display: block;
      position: absolute;
      bottom: 5%;
      left: 35.5%;
      z-index: 99;
    }
  }
  .video-group {
    width: 100%;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 99999;
    top: 0;
    video {
      width: 100%;
      display: none;
    }
  }
}
</style>

