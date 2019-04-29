<template>
  <div 
    id="tmall"
    class="tmall-content"
  >
    <img 
      :src="imgServerUrl + '/pages/tmall/bg.jpg'" 
      alt="" 
      class="bg"
    >
    <img  
      :src="resultImgUrl" 
      alt="" 
      class="photo"
    >
    <img  
      :src="imgServerUrl + '/pages/tmall/cat.png'"
      alt=""
      class="paw"
    >
    <div 
      class="jiantou"
    >
      <img 
        :src="imgServerUrl + '/pages/tmall/arrow.gif'"
        alt=""
      >
    </div>
    <div 
      v-show="!shareFlag"
      class="win-wrap"
    >
      <img 
        :src="imgServerUrl + '/pages/tmall/ticket.png'"
        alt=""
        class="ticket"
      >
      <img 
        v-if="winFlag"
        :src="imgUrl"
        alt=""
        class="win" 
      >
      <img 
        v-if="!winFlag"
        :src="imgUrl"
        alt=""
        class="no-win"
      >
      <canvas 
        v-if="award"
        id="canvasDoodle" 
        class="canvas-ele"
        width="200" 
        height="90" 
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      />
    </div>
    <div 
      v-if="shareFlag"
      class="share-wrap"
    >
      <img 
        :src="imgServerUrl + '/pages/tmall/advert.png'"
        alt=""
        class="share"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      winFlag: false,
      desc: '',
      needDraw: false,
      shareFlag: false,
      showCover: true,
      showSaveTips: false,
      award: true,
      imgUrl: '',
      winUrl: '',
      c: null,
      //微信分享信息
      wxShareInfo: {
        title: '刷脸开启时尚运动派对，赢【天猫】限量超酷礼包！',
        desc: '天猫国际丨妙物开仓日',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/tmall_share_icon.jpg'
      }
    }
  },
  beforeCreate() {
    document.title = '天猫color run'
  },
  mounted() {
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('tmall')
    content.style.minHeight = height + 'px'
    this.initCanvas()
    this.handleStorage()
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function() {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    handleStorage() {
      if (this.$route.query.hasOwnProperty('share_at')) {
        this.shareFlag = true
      }
      if (localStorage.getItem('tmall') !== null) {
        let data = localStorage.getItem('tmall')
        this.award = false
        if (data === '恭喜中奖') {
          this.winFlag = true
          this.imgUrl = '/static/tmall/win.png'
        } else {
          this.winFlag = false
          this.imgUrl = '/static/tmall/no_win.png'
        }
      } else {
        this.getCoupon()
      }
    },
    initCanvas() {
      let that = this
      let img = new Image()
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      img.setAttribute('crossOrigin', 'Anonymous')
      canvas.height = 90
      canvas.width = 200
      //获取当前画布的宽高
      let width = canvas.width
      let height = canvas.height
      img.src = '/static/tmall/award.png'
      img.onload = () => {
        ctx.beginPath()
        ctx.drawImage(img, 0, 0, width, height)
        ctx.closePath()
        if (document.querySelector('.canvas-ele') !== null) {
          this.c = document.querySelector('.canvas-ele').getBoundingClientRect()
        }
        this.getInfoById()
      }
    },
    handleTouchMove(event) {
      // console.dir(event)
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      /* 根据手指移动画线，使之变透明*/
      if (this.c.top > window.innerHeight) {
        let x = event.touches[0].pageX - this.c.left
        let y = event.touches[0].pageY - this.c.top
        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      } else {
        let x = event.touches[0].clientX - this.c.left
        let y = event.touches[0].clientY - this.c.top
        ctx.beginPath()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    },
    handleTouchStart(event) {
      // console.dir(event)
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      let x = event.touches[0].clientX - this.c.left
      let y = event.touches[0].clientY - this.c.top
      ctx.beginPath()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    },
    handleTouchEnd(event) {
      let canvas = document.getElementById('canvasDoodle')
      let ctx = canvas.getContext('2d')
      /* 获取imageData对象*/
      let imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height)
      /* */
      let allPX = imageDate.width * imageDate.height
      let iNum = 0 //记录刮开的像素点个数
      for (let i = 0; i < allPX; i++) {
        if (imageDate.data[i * 4 + 3] == 0) {
          iNum++
        }
      }
      if (iNum >= allPX * 1 / 4) {
        this.award = false
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = res.image
        })
        .catch(e => {
          console.log(e)
        })
    },
    saveStorage() {
      let saveData = this.desc
      localStorage.setItem('tmall', saveData)
    },
    getCoupon() {
      let rq = process.env.WX_API + '/v6/common/coupon'
      let rd = {
        tenant_id: process.env.NODE_ENV === 'production' ? '19' : '22'
      }
      this.$http.post(rq, rd).then(r => {
        this.desc = r.data.data.coupon_batch.name
        if (this.desc === '恭喜中奖') {
          this.winFlag = true
          this.imgUrl = '/static/tmall/win.png'
        } else {
          this.winFlag = false
          this.imgUrl = '/static/tmall/no_win.png'
        }
        this.saveStorage()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmall';
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.tmall-content {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  user-select: none;
  // overflow-y: scroll;
  z-index: 10;
  .bg {
    width: 100%;
    z-index: -10;
  }
  .photo {
    width: 73.6%;
    position: absolute;
    left: 13%;
    top: 8.4%;
    z-index: 20;
  }
  .paw {
    position: absolute;
    width: 37%;
    right: -2%;
    top: 46%;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 43%;
    top: 54%;
    img {
      width: 10%;
      height: 10%;
    }
  }
  .win-wrap {
    position: absolute;
    bottom: 2%;
    z-index: 300;
    .win {
      position: absolute;
      bottom: 17%;
      width: 50%;
      left: 25%;
      z-index: 501;
    }
    .canvas-ele {
      position: absolute;
      bottom: 16%;
      width: 52%;
      left: 24%;
      z-index: 1000;
    }
    .award {
      position: absolute;
      bottom: 16%;
      width: 52%;
      left: 24%;
      z-index: 3;
      &.hide {
        animation: disa 1s 1;
        animation-fill-mode: forwards;
      }
      &.real-hide {
        display: none;
      }
    }
    .no-win {
      position: absolute;
      bottom: 17%;
      width: 50%;
      left: 25%;
      z-index: 501;
    }
    .ticket {
      width: 80%;
      margin: 0 10%;
      position: relative;
      z-index: 500;
    }
  }
  .share-wrap {
    position: absolute;
    bottom: 0;
    z-index: 300;
    .share {
      width: 100%;
    }
  }
}
@keyframes disa {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>


