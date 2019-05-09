<template>
  <!-- isAbandoned -->
  <div 
    id="content"
    class="content"
  >
    <canvas 
      id="canvas"
    />
    <div
      :class="{ photo:true, toslider: toslider}"
    >
      <img
        id="mImg"
        src="" 
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
const IMG_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing/pages'
export default {
  data() {
    return {
      IMG_URL: IMG_SERVER + '/world_bei',
      width: null,
      height: null,
      toslider: false,
      //微信分享
      wxShareInfo: {
        title: '你不是一个在战斗',
        desc: '2018世界杯等你 GOOOOOAL!!!!',
        imgUrl: IMG_SERVER + '/world_bei/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.handleShare()
    this.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    this.height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('content')
    content.style.minHeight = this.height + 'px'
    this.getInfoById()
    this.playAnim()
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.drawCanvas(res.image)
          // this.toslider = true
        })
        .catch(err => {})
    },
    playAnim() {
      import('pixi.js').then(PIXI => {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
        let that = this
        let app = new PIXI.Application(this.width, this.height * 1.1, {
          transparent: true
        })
        app.renderer.view.style.position = 'absolute'
        app.renderer.view.style.top = 0
        app.renderer.view.style.left = 0
        app.renderer.view.style.zIndex = 0
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerHeight * 1.1)
        document.getElementById('content').appendChild(app.view)

        //背景
        let bg = new PIXI.Sprite.fromImage('/static/world_cup/bg.png')
        bg.width = app.screen.width
        bg.height = app.screen.height
        bg.alpha = 0
        app.stage.addChild(bg)
        //球
        let ball = new PIXI.Sprite.fromImage('/static/world_cup/ball.png')
        ball.x = this.width * 0.32
        ball.y = this.height * 0.3
        ball.scale.set(0.11)
        // ball.width = 88
        // ball.height = 88
        ball.anchor.set(0.5)
        app.stage.addChild(ball)
        //泡泡
        let pao = new PIXI.Sprite.fromImage('/static/world_cup/pao.png')
        pao.scale.set(0.4)
        pao.x = this.width * 0.32
        pao.y = this.height * 0.32
        pao.visible = false
        app.stage.addChild(pao)
        //gogo文本
        let gogo = new PIXI.Sprite.fromImage('/static/world_cup/gogo.png')
        gogo.scale.set(0.5)
        gogo.x = this.width * 0.07
        gogo.y = this.width * 0.3
        gogo.visible = false
        app.stage.addChild(gogo)
        let ball_scale = 0.115
        let counter = 0
        let bigger = true
        ball.vx = 0
        ball.vy = 0
        app.ticker.add(function() {
          counter++
          ball.rotation += 0.1
          bg.alpha = bg.alpha > 1 ? 1 : bg.alpha + 0.015
          if (counter < 5) {
            return
          }
          if (counter <= 25) {
            ball_scale += 0.015 + Math.random() / 100
            ball.vx = 2.5 + Math.sin(Math.random()) * 2
            ball.vy = 4 + Math.cos(Math.random())
            pao.visible = counter > 20 ? true : false
            gogo.visible = false
          } else if (counter < 120) {
            pao.visible = counter < 34 ? true : false
            gogo.visible = counter > 35 ? true : false
            if (counter < 90 && counter > 30) {
              ball_scale -= 0.004 + Math.random() / 70
              ball.vx = Math.sin(Math.random())
              ball.vy = 7.5 + Math.cos(Math.random())
            }
          } else {
            return
          }
          ball.x += ball.vx
          ball.y += ball.vy
          ball.scale.set(ball_scale)
        })
        this.toslider = true
      })
    },
    drawCanvas(image) {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let border = new Image()
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')
      border.src = '/static/world_cup/border.png'
      border.onload = function() {
        canvas.width = border.width
        canvas.height = border.height
        mImg.onload = function() {
          ctx.drawImage(border, 0, 0)
          ctx.drawImage(
            mImg,
            0,
            0,
            mImg.width,
            mImg.height,
            34,
            36,
            border.width - 68,
            border.height - 72
          )
          let url = canvas.toDataURL('image/png')
          let img = document.querySelector('#mImg')
          img.src = url
        }
        mImg.src = image
        //mImg.src =
        //'http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_bei/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
}

.content {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0;
  position: relative;

  #canvas {
    width: 100%;
    height: 100%;
    display: none;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .photo {
    width: 95%;
    position: relative;
    opacity: 0;
    margin: 0 auto;
    transform: translateY(103%);
    text-align: center;
    z-index: 9999;
    background-color: #033bb2;
    background-image: url('@{imgUrl}bgborder.png');
    background-position: center 15%;
    background-size: 100% auto;
    background-repeat: no-repeat;

    #mImg {
      width: 93.5%;
      margin: 0 auto;
      margin-top: 3.5%;
      margin-bottom: 15%;
    }
  }
  .toslider {
    animation: slider 0.8s 1s forwards;
  }
}

@keyframes step1 {
  0% {
    width: 11.5%;
    top: 35%;
    left: 32%;
    transform: rotate(0deg);
  }
  20% {
    width: 22%;
    top: 37.5%;
    left: 39%;
    transform: rotate(45deg);
  }
  40% {
    width: 29.5%;
    top: 42%;
    left: 48.5%;
    transform: rotate(90deg);
  }
  60% {
    width: 41%;
    top: 46%;
    left: 37%;
    transform: rotate(135deg);
  }
  80% {
    width: 29%;
    top: 64.5%;
    left: 58%;
    transform: rotate(90deg);
  }
  100% {
    width: 18%;
    top: 85%;
    left: 65%;
    transform: rotate(45deg);
  }
}

@keyframes toShow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  30% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slider {
  0% {
    opacity: 0;
    transform: translateY(103%);
  }
  5% {
    opacity: 1;
    transform: translateY(93%);
  }
  95% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(3%);
  }
}
</style>
