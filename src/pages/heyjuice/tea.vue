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
          :src="imgPath + 'border.png'" 
          :class="{border:true,afterShow:isShow}">
      </div>
      <img 
        :src="imgPath + 'press.png'" 
        :class="{note:true,afterShow:isShow}">
      <a 
        :href="menu" 
        class="abtn"/>
    </div>
  </div>
</template>
<script>
const IMG_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages'
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      imgPath: IMG_SERVER + '/heyjiuce/tea/',
      photo: null,
      border: false,
      isShow: false,
      menuUrl: process.env.AD_API+'/api/point_configs/',
      menu: null,
      slider: false,
      source: this.$route.query.utm_source,
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
  created() {},
  mounted() {
    this.handleWechatShare()
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let tea = document.getElementById('tea')
    tea.style.minHeight = h + 'px'
    this.getInfoById()
    this.toMenu(this.source)
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      let that = this
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.isShow = true
          this.slider = true
        })
        .catch(err => {
          console.log(err)
          return
        })
    },
    toMenu(source) {
      this.$http
        .get(this.menuUrl + source)
        .then(res => {
          this.menu = res.data.url
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/heyjiuce/tea/';
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
    top: 14%;
    margin: 0;
    padding: 0;
    z-index: 99;
    .pImg {
      position: absolute;
      width: 86.3%;
      left: 6.85%;
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
      opacity: 0;
    }
  }
  .note {
    position: absolute;
    width: 29%;
    left: 35.5%;
    top: 81%;
    // animation: updown 0.8s linear infinite alternate;
    opacity: 0;
  }
  .abtn {
    display: block;
    width: 100%;
    height: 9.5%;
    position: absolute;
    top: 88.8%;
    background: url('@{imgUrl}btn1.png') center center/auto 90% no-repeat;
    &:hover {
      background: url('@{imgUrl}btn2.png') center center/auto 90% no-repeat;
    }
    &:link {
      background: url('@{imgUrl}btn2.png') center center/auto 90% no-repeat;
    }
  }
  .afterShow {
    animation: toShow 0.1s 2.55s linear forwards;
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
@keyframes toShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>