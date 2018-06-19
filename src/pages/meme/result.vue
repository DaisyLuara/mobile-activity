<template>
    <div class="content" id="content">
        <div class="main">
            <div class="ceng1" >
                <img class="printer" :src="imgUrl + 'printer.png'"/>
                <img class="lines" :src="imgUrl + 'lines.png'"/>
                <img class="explain" :src="imgUrl + explain + '.png'"/>
            </div>
            <div class="ceng2">
                <img class="logo" :src="imgUrl + 'logo.png'"/>
                <img class="arrow" :src="imgUrl + 'arrow.png'"/>
                <img class="title" :src="imgUrl + 'title.png'"/>
                <img class="lightL" :src="imgUrl + 'lightL.png'"/>
                <img class="lightR" :src="imgUrl + 'lightR.png'"/>
                <div class="picture">
                    <img class="support" :src="imgUrl + 'support.png'"/>
                    <img class="frame" :src="imgUrl + 'frame.png'"/>
                    <img :class="{border:true,slider1:slider1}" :src="imgUrl + 'photo.png'"/>
                    <img :class="{mImg:true,slider2:slider2}" :src="mImg"/>
                </div>
            </div>
        </div>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
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
      imgUrl: IMAGE_SERVER + '/pages/meme/',
      mImg: null,
      explain: 'explain01',
      slider1: false,
      slider2: false,
      //微信分享
      wxShareInfo: {
        title: '',
        desc: '',
        imgUrl: '',
        success: () => {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '表情包制造机'
  },
  created() {},
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = height + 'px'
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          console.log(res)
          console.log(1)
          this.mImg = res.image
          this.slider1 = true
          this.slider2 = true
        })
        .catch(err => {})
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/meme/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
img {
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #0d4882;
  background-image: url('@{imgUrl}back.jpg');
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
  .main {
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .ceng1 {
      width: 100%;
      position: relative;
      z-index: 0;
      margin: 0 auto;
      text-align: center;
      img {
        max-width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }
      .printer {
        width: 97%;
        margin-top: 33.3%;
      }
      .lines {
        width: 72%;
      }
      .explain {
        width: 80.8%;
        margin-top: -2.5%;
      }
    }
    .ceng2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0 auto;
      z-index: 99;
      img {
        position: absolute;
      }
      .logo {
        width: 30%;
        top: 23%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 149;
      }
      .arrow {
        width: 5%;
        top: 34%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 149;
        animation: shake 0.8s linear infinite alternate;
      }
      .title {
        width: 84.5%;
        z-index: 139;
        top: 3.2%;
        left: 50%;
        transform: translate(-50%, 0);
      }

      .lightL {
        width: 2.6%;
        top: 27.9%;
        right: 19.7%;
        z-index: 149;
        animation: shake 0.8s linear infinite alternate;
      }
      .lightR {
        width: 2.6%;
        top: 27.9%;
        right: 17.4%;
        z-index: 149;
      }

      .picture {
        position: absolute;
        width: 100%;
        height: 58%;
        overflow: hidden;
        top: 21%;
        left: 50%;
        transform: translate(-50%, 0);
        text-align: center;
        .support {
          width: 95%;
          //   top: 38%;
          //   left: 50%;
          top: 29%;
          transform: translate(-50%, 0);
          z-index: 109;
        }
        .frame {
          width: 96.8%;
          transform: translate(-50%, 0);
          margin: 0 auto;
          z-index: 129;
        }
        .slider1 {
          animation: slider 1.2s linear 1 forwards;
        }
        .border {
          width: 78%;
          z-index: 99;
        }
        .mImg {
          width: 52%;
          user-select: auto;
          z-index: 159;
        }
        .slider2 {
          animation: slider 1.2s linear 1 forwards, shake 0.6s linear 1 forwards;
        }
      }
    }
  }
}
@keyframes shake {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slider {
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, 39%);
  }
}
</style>

