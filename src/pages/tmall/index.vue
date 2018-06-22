<template>
  <div class="tmall-content" id="tmall">
      <img  class="bg" :src="imgServerUrl + '/pages/tmall/bg.jpg'" alt=""/>
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img  class="photo" src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg" alt=""/> -->
      <img  class="paw" :src="imgServerUrl + '/pages/tmall/cat.png'" alt=""/>
      <div class="jiantou">
        <img :src="imgServerUrl + '/pages/tmall/arrow.gif'" alt="" >
      </div>
      <div class="win-wrap" v-show="!shareFlag">
        <img :src="imgServerUrl + '/pages/tmall/ticket.png'" alt="" class="ticket">
        <img :src="imgUrl" alt="" class="win" v-show="winFlag">
        <img :src="imgUrl" alt="" class="no-win" v-show="!winFlag">
        <canvas id="canvasDoodle" class="canvas-ele" width="200" height="90" v-show="award"></canvas>
      </div>
    <!-- <wx-share :WxShareInfo="wxShareInfo"></wx-share> -->
  </div>
</template>
<script>
import marketService from 'services/marketing'
// import WxShare from 'modules/wxShare'
import { $_wechat, getInfoById, wechatShareTrack } from 'services'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  // components: {
  //   WxShare
  // },
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
      //微信分享信息
      wxShareInfo: {
        title: '刷脸开启时尚运动派对，赢【天猫】限量超酷礼包！',
        desc: '天猫国际丨秒物开仓日',
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
    this.handleStorage()
    // this.initCanvas()
  },
  created() {
    this.getInfoById()
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            // link: window.location.href,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function() {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          // console.warn(_.message)
        })
    },
    handleStorage() {
      let isShare = this.$route.query.utm_term
      this.shareFlag = isShare === 'wechat_share' ? true : false
      let data = localStorage.getItem('tmall')
      if (data) {
        this.award = false
        if (data === '恭喜中奖') {
          this.winFlag = true
          this.imgUrl = '/static/tmall/win.png'
        } else {
          this.winFlag = false
          this.imgUrl = '/static/tmall/no_win.png'
        }
      } else {
        this.initCanvas()
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

      let device = /android|iphone|ipad|ipod|webos|iemobile|opear mini|linux/i.test(
        navigator.userAgent.toLowerCase()
      )
      let startEvtName = device ? 'touchstart' : 'mousedown'
      let moveEvtName = device ? 'touchmove' : 'mousemove'
      let endEvtName = device ? 'touchend' : 'mouseup'
      var c = null
      img.onload = function() {
        ctx.beginPath()
        ctx.drawImage(img, 0, 0, width, height)
        ctx.closePath()
        c = document.querySelector('.canvas-ele').getBoundingClientRect()
      }
      img.src = '/static/tmall/award.png'
      /* 增加触摸监听*/
      //true  捕获 false  冒泡
      canvas.addEventListener(
        startEvtName,
        function() {
          canvas.addEventListener(
            moveEvtName,
            function(event) {
              event.preventDefault()
              /* 根据手指移动画线，使之变透明*/
              if (c.top > window.innerHeight) {
                let x = device ? event.touches[0].pageX - c.left : event.clientX
                let y = device ? event.touches[0].pageY - c.top : event.clientY
                ctx.beginPath()
                ctx.globalCompositeOperation = 'destination-out'
                ctx.arc(x, y, 20, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
              } else {
                let x = device
                  ? event.touches[0].clientX - c.left
                  : event.clientX
                let y = device
                  ? event.touches[0].clientY - c.top
                  : event.clientY
                ctx.beginPath()
                ctx.globalCompositeOperation = 'destination-out'
                ctx.arc(x, y, 20, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
              }
            },
            false
          )
        },
        false
      )

      canvas.addEventListener(
        endEvtName,
        function() {
          canvas.removeEventListener(
            moveEvtName,
            function(event) {
              event.preventDefault()
              /* 根据手指移动画线，使之变透明*/
              let x = device ? event.touches[0].clientX - c.left : event.clientX
              let y = device ? event.touches[0].clientY - c.top : event.clientY
              ctx.beginPath()
              ctx.globalCompositeOperation = 'destination-out'
              ctx.arc(x, y, 20, 0, Math.PI * 2)
              ctx.fill()
              ctx.closePath()
            },
            false
          )
        },
        false
      )
      canvas.addEventListener(
        endEvtName,
        function() {
          /* 获取imageData对象*/
          var imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height)
          /* */
          var allPX = imageDate.width * imageDate.height

          var iNum = 0 //记录刮开的像素点个数

          for (var i = 0; i < allPX; i++) {
            if (imageDate.data[i * 4 + 3] == 0) {
              iNum++
            }
          }
          if (iNum >= allPX * 1 / 4) {
            that.award = false
          }
        },
        false
      )
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = result.image
        })
        .catch(e => {
          console.log(e)
        })
    },
    //拿取图片id
    // getImageById() {
    //   let id = this.$route.query.id
    //   marketService
    //     .getInfoById(this, id)
    //     .then(result => {
    //       this.resultImgUrl = result.image
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
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
  },
  computed: {
    //微信分享
    // wxShareInfo() {
    //   let wxShareInfo = {
    //     title: this.wxShareInfoValue.title,
    //     desc: this.wxShareInfoValue.desc,
    //     imgUrl: this.wxShareInfoValue.imgUrl,
    //     success: () => {
    //       customTrack.shareWeChat()
    //     }
    //   }
    //   return wxShareInfo
    // }
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
  overflow-y: scroll;
  .bg {
    width: 100%;
    pointer-events: none;
    user-select: none;
  }
  .photo {
    width: 73.6%;
    position: absolute;
    left: 13%;
    top: 8.4%;
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
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    .win {
      position: absolute;
      bottom: 17%;
      width: 50%;
      left: 25%;
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
    }
    .ticket {
      pointer-events: none;
      user-select: none;
      width: 80%;
      margin: 0 10%;
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


