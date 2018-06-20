<template>
  <div class="tmall-content" id="tmall">
      <img  class="bg" :src="imgServerUrl + '/pages/tmall/bg.jpg'" alt=""/>
      <img  class="photo" :src="resultImgUrl" alt=""/>
      <!-- <img  class="photo" src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg" alt=""/> -->
      <img  class="paw" :src="imgServerUrl + '/pages/tmall/cat.png'" alt=""/>
      <div class="jiantou">
        <img :src="imgServerUrl + '/pages/tmall/arrow.gif'" alt="" >
      </div>
      <div class="win-wrap" >
        <img :src="imgServerUrl + '/pages/tmall/ticket.png'" alt="" class="ticket">
        <!-- <img :src="imgServerUrl + '/pages/tmall/award.png'" alt="" class="award" v-show="award" ref="canvasWrap"> -->
        <img :src="imgUrl" alt="" class="win" v-show="winFlag">
        <img :src="imgUrl" alt="" class="no-win" v-show="!winFlag">
        <canvas id="canvasDoodle" class="canvas-ele" width="300" height="400" v-show="award" ></canvas>
      </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import wxService from 'services/wx'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  components: {
    WxShare
  },
  data() {
    return {
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      winFlag: false,
      desc: '',
      needDraw: false,
      showCover: true,
      showSaveTips: false,
      award: true,
      imgUrl: '',
      winUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '刷脸开启时尚运动派对，赢【天猫】限量超酷礼包！',
        desc: '点击抽取您的幸运好礼！',
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
  },
  created() {
    this.getImageById()
  },
  methods: {
    handleStorage() {
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
      img.crossOrigin = 'Anonymous'
      //获取当前画布的宽高
      let width = canvas.width
      let height = canvas.height

      let device = /android|iphone|ipad|ipod|webos|iemobile|opear mini|linux/i.test(
        navigator.userAgent.toLowerCase()
      )
      let startEvtName = device ? 'touchstart' : 'mousedown'
      let moveEvtName = device ? 'touchmove' : 'mousemove'
      let endEvtName = device ? 'touchend' : 'mouseup'
      // img.src = '/static/tmall/award.png'
      img.onload = function() {
        ctx.beginPath()
        ctx.drawImage(img, 0, 250, width, height * 0.4)
        ctx.closePath();
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
                let x = device ? event.touches[0].clientX : event.clientX
                let y = device ? event.touches[0].clientY : event.clientY
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
            canvas.removeEventListener(
              moveEvtName,
              function(event) {
                event.preventDefault()
                /* 根据手指移动画线，使之变透明*/
                let x = device ? event.touches[0].clientX : event.clientX
                let y = device ? event.touches[0].clientY : event.clientY
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
            if (iNum >= allPX * 1 / 3) {
              that.award = false
            }
          },
          false
        )
      }
      img.src = '/static/tmall/award.png'
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

    .win {
      position: absolute;
      bottom: 17%;
      width: 50%;
      left: 25%;
    }
    .canvas-ele {
      position: absolute;
      bottom: 16%;
      width: 47%;
      left: 27%;
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


