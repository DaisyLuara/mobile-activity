<template>
  <div 
    id="content" 
    class="content"
  >
    <div class="main">
      <img 
        :src="IMGURL + 'bg1.jpg'" 
        class="bg"
      >
      <ul class="btn-group">
        <a 
          v-for="(item,index) in 4" 
          :key="item.id" 
          :vtype="vType[index]" 
          @click="linkPage(item,vType[index])"
        ><li /></a>
      </ul>
      <img 
        :src="IMGURL + 'click.png'" 
        class="text"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/promotion/',
      video: ['', 'video1', 'video2', 'video3', 'video4'],
      vType: ['guide', 'theme', 'game', 'coupon'],
      menuShow: true,
      ahref: null,
      playNow: null,
      vclose: false,
      //微信分享信息
      wxShareInfoValue: {
        title: '星视度',
        desc: '星视度 创想新视界',
        imgUrl: IMAGE_SERVER + '/pages/promotion/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getInfoById()
  },
  mounted() {
    this.handleWechatShare()
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
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
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    linkPage(item, type) {
      let that = this
      this.$router.push({
        path: 'ppt_videos?utm_source=2' + item + '&vtype=' + type
      })
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
img {
  pointer-events: none;
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
    overflow: hidden;
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
      height: 100%;
      display: inline-block;
      z-index: 999;

      a {
        display: inline-block;
        width: 100%;
        height: 9.4%;
        li {
          display: inline-block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin: 5% 0 16% 0;
        }
        &:nth-child(1) > li {
          transform: translate(-27%, 14%);
          background: url('@{imgURL}1.png') center center/100% 100% no-repeat;
        }
        &:nth-child(2) > li {
          transform: translate(-7%, 12%);
          background: url('@{imgURL}2.png') center center/100% 100% no-repeat;
        }
        &:nth-child(3) > li {
          transform: translate(-7%, 12%);
          background: url('@{imgURL}3.png') center center/100% 100% no-repeat;
        }
        &:nth-child(4) > li {
          transform: translate(-28%, 6%);
          background: url('@{imgURL}4.png') center center/100% 100% no-repeat;
        }
      }
    }
    .text {
      width: 29%;
      display: block;
      position: absolute;
      top: 81%;
      // bottom: 5%;
      left: 35.5%;
      z-index: 99;
    }
  }
  .video-group {
    width: 100%;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 999;
    top: 0%;
    video {
      width: 100%;
      height: 100%;
      display: none;
    }
    .closeDiv {
      position: fixed;
      z-index: 9999;
      top: 0%;
      width: 100%;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      .close {
        width: 10%;
        margin: 10px auto;
        pointer-events: auto;
      }
    }
  }
}
</style>

