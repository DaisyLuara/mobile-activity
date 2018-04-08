<template>
  <div class="tea-main" id="tea">
    <div class="tea-content" >
        <img :src="imgPath + 'bg.png'" class="bg"/>
        <img :src="imgPath + 'cover.png'" class="cover">
        <img :src="imgPath + 'shadow.png'" class="shadow">
        <div class="picture">
            <img :src="photo" class="pImg"/>
            <img :src="imgPath + 'border.png'" class="border" v-show="border"/>
        </div>
        <img :src="imgPath + 'look.png'" class="look" v-show="border">
        <img :src="imgPath + 'note.png'" class="note" v-show="border">
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
export default {
  data() {
    return {
      imgPath: 'http://p22vy0aug.bkt.clouddn.com/image/heyjuice/',
      photo: null,
      border: false,
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
  beforeCreated() {
    document.title = '茶桔梗'
  },
  created() {},
  mounted() {
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var tea = document.getElementById('tea')
    tea.style.minHeight = h + 'px'
    console.log(h)
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      var that = this
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.photo = res.image
          console.log(res)
          var timer = setTimeout(function() {
            that.border = true
            clearTimeout(timer)
          }, 1800)
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
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/heyjuice/';
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
      animation: sliderDown 1.5s 0.6s ease-in-out forwards;
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