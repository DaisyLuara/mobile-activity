<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'ktv_bg.jpg?v=111'"
      class="bg" >
    <div 
      class="top">
      <img  
        :src="baseUrl + 'top.png'"
        class="light" >
    </div>
    <div 
      :style="style.photeHei"
      class="photo">
      <img 
        v-if="photoUrl !== null" 
        :src="photoUrl + this.$qiniuCompress()" 
        alt="">
        <!-- 
        <img 
          :src="baseUrl + 'gif.png'" > 
      -->
    </div>
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
import { $wechat, wechatShareTrack, getInfoById, isInWechat } from 'services'
const cdnUrl = process.env.CDN_URL
export default {
  data() {
    return {
      baseUrl: cdnUrl + '/image/king/',
      style: {
        root: {
          height: wih + 'px'
        },
        photeHei: {
          top: wiw * 0.43 + 'px'
        }
      },
      photoUrl: '',
      wxShareInfo: {
        title: '全天欢唱 买一送二',
        desc: '购买一小时赠送2小时',
        imgUrl: cdnUrl + '/image/king/share.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {
    this.handleWeChatShare()
  },
  methods: {
    //处理微信分享
    handleWeChatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfo)
          })
          .catch(_ => {
            console.warn(_.message)
          })
      }
    },
    getInfo() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photoUrl = res.image
        })
        .catch(_ => {
          console.warn(_.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.xingstation.cn/image/king';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
  }
  .top {
    width: 100%;
    .light {
      margin-top: 5%;
      width: 100%;
      position: absolute;
      left: 0%;
      top: 0%;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
    }
  }

  .photo {
    width: 73.2%;
    position: absolute;
    left: 13.48%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
