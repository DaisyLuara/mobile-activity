<template>
  <div id="content">
    <div class="main">
      <img :src="imgServerUrl + '/pages/ynf/bg750.png'" class="bg"/>
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img class="photo"  :src="imgServerUrl + '/pages/ynf/3.png'" alt=""/> -->
      <img class="mouse1" @click="go()" :src="imgServerUrl + '/pages/ynf/mouse1.png'" alt=""/>
      <img class="mouse2" @click="go()" :src="imgServerUrl + '/pages/ynf/mouse2.png'" alt=""/>
      <div class="jiantou">
        <img  :src="imgServerUrl + '/pages/ynf/nav.png'" alt="">
      </div>
      <div class="text">
        <img  :src="imgServerUrl + '/pages/ynf/title.png'" alt="">
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
  components: {
    WxShare
  },
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '美爆头条',
        desc: '扫码领取',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/ynf_share_icon.png'
      }
    }
  },
  beforeCreate() {
    document.title = '美爆头条'
  },
  mounted() {
    $('#content').css('min-height', $(window).height())
  },
  created() {
    this.getImageById()
  },
  methods: {
    go() {
      window.location.href = 'https://sale.jd.com/act/XAhdysDo4P.html'
    },
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(result => {
          this.resultImgUrl = result.image
        })
        .catch(err => {
          console.log(err)
        })
    }
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
img {
  width: 100%;
}
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dh';
#content {
  width: 100%;
  height: 100%;
  text-align: center;
  animation: bgTab 10s infinite;
  .main {
    position: relative;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    .photo {
      width: 75%;
      height: 73.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55.5%);
    }
    .mouse1 {
      width: 21%;
      position: absolute;
      left: -1%;
      top: 25%;
      z-index: 5;
    }
    .mouse2 {
      width: 32%;
      position: absolute;
      right: -1%;
      top: 0;
      z-index: 5;
    }
    .jiantou {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 11%;
      img {
        width: 9%;
      }
      animation: arrows 0.8s ease-out infinite alternate;
    }
    .text {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 4%;
      img {
        width: 60%;
        height: 10%;
      }
    }
  }

  @keyframes arrows {
    0% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @keyframes bgTab {
    0% {
      background: #ff3434;
    }
    20% {
      background: #d850ff;
    }
    30% {
      background: #0084ff;
    }
    50% {
      background: #0cff12;
    }
    70% {
      background: #ffe00c;
    }
    90% {
      background: #ff7ec1;
    }
    100% {
      background: #ff3434;
    }
  }
}
</style>


