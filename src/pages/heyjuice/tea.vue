<template>
  <div class="tea-main" id="tea">
    <div class="tea-content" >
        <img :src="imgPath + 'bg.png'" class="bg"/>
        <img :src="imgPath + 'cover.png'" class="cover">
        <img :src="imgPath + 'shadow.png'" class="shadow">
        <div class="picture">
            <img :src="photo" class="pImg"/>
            <img :src="imgPath + 'border.png'" :class="{border:true,afterShow:isShow}"/>
        </div>
        <img :src="imgPath + 'press.png'" :class="{note:true,afterShow:isShow}"/>
       <a :href="null" class="abtn"></a>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMG_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages'
export default {
  data() {
    return {
      imgPath: IMG_SERVER + '/heyjiuce/tea/',
      photo: null,
      border: false,
      isShow: false,
      //微信分享
      wxShareInfo: {
        title: 'HEYJUICE等待着与你相遇',
        desc: '健康时尚  美味畅享，好在天然，妙在鲜榨',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/heyjuice/icon.png',
        success: function() {
          customTrack.shareWeChat()
        }
      }
    }
  },
  beforeCreate() {
    document.title = '茶桔梗'
  },
  created() {},
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
      let that = this
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.photo = res.image
          console.log(res)
          this.isShow = true
        })
        .catch(err => {
          console.log(err)
          return
        })
    }
  },
  components: {
    WxShare
  }
}
</script>
<style lang="less" scoped>
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
      animation: sliderDown 2s 0.6s ease-in-out forwards;
    }
    .border {
      width: 94%;
      position: absolute;
      left: 3%;
      z-index: 9;
      margin-top: 2.5%;
      opacity:0;
    }
  }
  .note {
    position: absolute;
    width: 29%;
    left: 35.5%;
    top: 81%;
    // animation: updown 0.8s linear infinite alternate;
    opacity:0;
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
    animation: toShow 0.1s 2.25s linear forwards;
    
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