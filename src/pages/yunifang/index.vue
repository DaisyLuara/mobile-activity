<template>
  <div 
    id="content" 
    :style="style.root">
    <div 
      class="main">
      <img 
        class="bg" 
        :src="imgServerUrl + '/pages/ynf/bg2.png'"
        />
    </div>
    <div 
      class="photo-area">
      <img   
        class="photo" 
        :src="resultImgUrl" 
        alt=""
        />
    <!-- <img class="photo"  :src="imgServerUrl + '/pages/ynf/3.png'" alt=""/> -->
    </div>
    <img 
      class="mouse1" 
      :src="imgServerUrl + '/pages/ynf/mouse1.png'" 
      alt=""
      />
    <img 
      class="mouse2" 
      :src="imgServerUrl + '/pages/ynf/mouse2.png'" 
      alt=""
      />
    <div 
      class="jiantou">
      <img  
        :src="imgServerUrl + '/pages/ynf/nav.png'" 
        alt=""
        />
    </div>
    <div 
      class="text">
      <img  
        :src="imgServerUrl + '/pages/ynf/title.png'" 
        alt=""
        />
    </div> 
    <!-- <wx-share :WxShareInfo="wxShareInfo"></wx-share> -->
  </div>

</template>
<script>
const wih = window.innerHeight
// import marketService from 'services/marketing'
// import WxShare from 'modules/wxShare'
import Vue from 'vue'
import { getInfoById, $_wechat } from 'services'
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
      style: {
        root: {
          height: wih + 'px'
        }
      },
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
  mounted() {},
  created() {
    this.getInfo()
    this.handleShare()
  },
  methods: {
    //拿取图片id
    getInfo() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = res.image
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    handleShare() {
      $_wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
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
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/ynf';
#content {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  animation: bgTab 10s infinite;
  .main {
    position: relative;
    overflow: hidden;
    .bg {
      position: relative;
      z-index: 3;
    }
  }
  .photo-area {
    width: 78%;
    height: 74%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 4;
    background: #000;
    transform: translate(-51%, -56%);
    padding: 2%;
  }
  .photo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 93%;
    height: 96%;
    z-index: 5;
    transform: translate(-50%, -50%);
  }
  .mouse1 {
    width: 21%;
    position: absolute;
    left: -1%;
    top: 25%;
    z-index: 6;
  }
  .mouse2 {
    width: 32%;
    position: absolute;
    right: 0%;
    top: 0;
    z-index: 6;
  }
  .jiantou {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 9%;
    animation: arrows 0.8s ease-out infinite alternate;
    img {
      width: 9%;
    }
  }
  .text {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 2%;
    z-index: 4;
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
</style>


