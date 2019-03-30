<template>
  <div 
    id="tea" 
    class="tea-main">
    <div class="tea-content" >
      <img 
        :src="imgPath + 'bg.png'" 
        class="bg">
      <img 
        :src="imgPath + 'cover.png'" 
        class="cover">
      <img 
        :src="imgPath + 'shadow.png'" 
        class="shadow">
      <div class="picture">
        <img 
          :src="photo" 
          :class="{pImg:true,slider:slider}">
        <img 
          v-show="border" 
          :src="imgPath + 'border.png'" 
          class="border">
      </div>
      <img 
        v-show="border" 
        :src="imgPath + 'look.png'" 
        class="look">
      <img 
        v-show="border" 
        :src="imgPath + 'note.png'" 
        class="note">
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      imgPath: cdnUrl + '/image/heyjuice/',
      photo: null,
      border: false,
      slider: false,
      //微信分享
      wxShareInfoValue: {
        title: 'HEYJUICE等待着与你相遇',
        desc: '健康时尚  美味畅享，好在天然，妙在鲜榨',
        imgUrl: 'https://cdn.xingstation.cn/image/heyjuice/icon.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '茶桔便'
  },
  mounted() {
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let tea = document.getElementById('tea')
    tea.style.minHeight = h + 'px'
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      var that = this
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.slider = true
          console.log(res)
          var timer = setTimeout(function() {
            that.border = true
            clearTimeout(timer)
          }, 2550)
        })
        .catch(err => {
          console.log(err)
          return
        })
    }
  }
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
@imgUrl: 'http://cdn.xingstation.cn/image/heyjuice/';
.tea-main {
  width: 100%;
  min-height: 100%;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
  background: url('@{imgUrl}bgcover.png') center bottom/100% auto repeat-y;
}
.tea-content {
  width: 100%;
  position: relative;
  .bg {
    text-align: center;
    margin: 0 auto;
    min-width: 100%;
    min-height: 100%;
    z-index: 0;
  }
  .cover {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .shadow {
    z-index: 999999;
    position: absolute;
    top: 8.5%;
    left: 0;
    width: 100%;
  }
  .picture {
    position: absolute;
    width: 100%;
    height: 40%;
    top: 16%;
    margin: 0;
    padding: 0;
    z-index: 99;
    .pImg {
      position: absolute;
      width: 89%;
      left: 5.5%;
      z-index: 999;
      margin-top: 5.2%;
      transform: translate3d(0, -116%, 0);
    }
    .slider {
      animation: sliderDown 2s 0.6s ease-in-out forwards;
    }
    .border {
      width: 94%;
      position: absolute;
      left: 3%;
      z-index: 9;
      margin-top: 2.5%;
    }
  }
  .look {
    position: absolute;
    width: 4.8%;
    left: 47.6%;
    animation: updown 0.8s linear infinite alternate;
    bottom: 8.5%;
  }
  .note {
    position: absolute;
    width: 52%;
    left: 24%;
    bottom: 3%;
  }
}

@keyframes sliderDown {
  0% {
    transform: translate3d(0, -116%, 0);
  }
  100% {
    transform: none;
  }
}
@keyframes updown {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>