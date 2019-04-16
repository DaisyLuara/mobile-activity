<template>
  <div 
    id="content" 
    class="content">
    <div 
      v-show="loadingPage" 
      id="loading" 
      class="loading"/>
    <canvas id="canvas"/>
    <img 
      id="border" 
      src="/static/pandp/border.png">
    <img 
      id="mImg" 
      src="">
    <img 
      v-show ="note" 
      :src="IMG_URL + 'note.png'" 
      class="note">
  </div>
</template>
<script>
import { isInWechat, $wechat, getInfoById, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      IMG_URL: IMAGE_SERVER + '/pages/pandp/',
      content: null,
      width: null,
      height: null,
      note: false,
      loadingPage: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: '天哪！我穿越了！',
        desc: '快来看看我穿越成了谁？',
        link: process.env.AD_API+'/api/s/qx2' + window.location.search,
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pandp/share.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.width = this.$innerWidth()
    this.height = this.$innerHeight()
    this.content = document.getElementById('content')
    this.content.style.minHeight = this.height + 'px'
    this.loadingCanvas()
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      getInfoById(this.id)
        .then(res => {
          this.drawCanvas(res.code)
        })
        .catch(err => {})
    },
    loadingCanvas() {
      import(/* webpackChunkName: "Pixi" */ 'pixi.js').then(PIXI => {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
        let app = new PIXI.Application(window.innerWidth, innerHeight, {
          antialias: true,
          transparent: true
        })
        let loading = document.getElementById('loading')
        loading.appendChild(app.view)
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerHeight)
        let width = app.screen.width
        let height = app.screen.height
        PIXI.loader
          .add('he', '/static/meme/he.png')
          .add('bo', '/static/meme/circle.png')
          .add('text', '/static/meme/text.png')
          .add('yu', '/static/meme/yuyu.png')
          .load(function(loader, resources) {
            //水波1
            let bo1 = new PIXI.Sprite(resources['bo'].texture)
            bo1.anchor.set(0.5, 0.5)
            bo1.position.set(width * 0.33, height * 0.34)
            bo1.scale.set(0.2)
            app.stage.addChild(bo1)
            //水波2
            let bo2 = new PIXI.Sprite(resources['bo'].texture)
            bo2.anchor.set(0.5, 0.5)
            bo2.position.set(width * 0.51, height * 0.73)
            bo2.scale.set(0.2)
            app.stage.addChild(bo2)
            //荷花背景精灵
            let he = new PIXI.Sprite(resources['he'].texture)
            he.anchor.set(0.5, 0.5)
            he.position.set(width / 2, height / 2)
            he.width = width
            he.height = 713 * width / 489
            he.scale.set(0.5)
            app.stage.addChild(he)
            //文本
            let text = new PIXI.Sprite(resources['text'].texture)
            text.anchor.set(0.5, 0.5)
            text.position.set(width / 2, height * 0.55)
            text.scale.set(0.5)
            app.stage.addChild(text)
            //鱼
            let yu = new PIXI.Sprite(resources['yu'].texture)
            yu.scale.set(0.4)
            yu.anchor.set(0.5)
            yu.position.set(width / 2, height * 0.55)
            app.stage.addChild(yu)
            let scale1 = 0.2,
              scale2 = 0.2,
              angle = 0,
              r = 70,
              yuRotate = 0
            app.ticker.add(function() {
              scale1 = scale1 > 1.1 ? 0.2 : scale1 + 0.006
              scale2 = scale2 > 1.6 ? 0.2 : scale2 + 0.01
              bo1.alpha = scale1 > 0.9 ? bo1.alpha - 0.1 : 1
              bo2.alpha = scale2 > 1 ? bo2.alpha - 0.005 : 1
              angle += Math.PI * 0.005
              bo1.scale.set(scale1)
              bo2.scale.set(scale2)
              yu.rotation += 0.015
            })
          })
      })
    },
    drawCanvas(image) {
      let type = this.type
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let b_url = '/static/pandp/'
      let bg = new Image() //背景图
      let img = new Image() //传过来的图片
      let cover = new Image() //遮罩边框
      let word = new Image() //人物文字图片
      let text = new Image() //项目名称文字
      img.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = function() {
        canvas.width = bg.width
        canvas.height = bg.height
        img.onload = function() {
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height * 0.8,
            bg.width * 0.1,
            bg.height * 0.24,
            bg.width * 0.8,
            bg.width * 0.8 / img.width * (img.height * 0.8)
          )

          ctx.drawImage(bg, 0, 0)
          cover.onload = function() {
            ctx.drawImage(
              cover,
              0,
              0,
              cover.width,
              cover.height,
              0,
              0,
              bg.width,
              bg.height * 0.95
            )
            word.onload = function() {
              ctx.drawImage(
                word,
                0,
                0,
                word.width,
                word.height,
                (bg.width - word.width) / 2,
                bg.height * 0.053,
                word.width,
                word.height
              )

              text.onload = function() {
                ctx.drawImage(
                  text,
                  0,
                  0,
                  text.width,
                  text.height,
                  bg.width * 0.32,
                  bg.height * 0.07,
                  bg.width * 0.36,
                  bg.height * 0.167
                )
                that.drawPloygen(canvas, 5, bg.width * 0.1, bg.height * 0.102)
              }
              text.src = b_url + './text.png'
            }
            word.src = b_url + 'a' + type + '.png?v=122'
          }
          cover.src = b_url + 'cover.png'
        }
        img.src = image
      }
      bg.src = b_url + 'bg.png'
    },
    drawPloygen(canvas, num, radius, top) {
      let angle = Math.PI * 2 / num
      let side = radius * 2 * Math.sin(angle / 2)
      let border = document.getElementById('border')
      let ctx = canvas.getContext('2d')
      let lineR = radius + 15
      let score = []
      let localName = 'ppscore' + this.$route.query.type
      if (window.localStorage.getItem(localName)) {
        score = window.localStorage.getItem(localName).split(',')
      } else {
        score = []
      }

      ctx.translate(canvas.width / 2, radius + top)
      ctx.rotate(Math.PI)
      ctx.save()
      ctx.beginPath()
      //内部顶点连接线条
      ctx.lineWidth = 3
      ctx.lineJoin = 'round'
      //'#baa7a3'
      ctx.strokeStyle = 'rgba(186,167,163,0.4)'
      for (let i = 0; i < num; i++) {
        let x = lineR * Math.sin(angle * i),
          y = lineR * Math.cos(angle * i)
        ctx.lineTo(0, 0)
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.save()
      //圆心为（0，0）
      //内部不规则多边形
      ctx.beginPath()
      ctx.lineWidth = 2 //5
      ctx.lineJoin = 'round'
      ctx.strokeStyle = '#baa7a3'
      if (!score.length) {
        for (let i = 0; i < num; i++) {
          let k = 0.6 + Math.random() * 0.4 //Math.random()
          //k = k < 0.2 ? 0.2 : k
          let x = lineR * Math.sin(angle * i),
            y = lineR * Math.cos(angle * i)
          ctx.lineTo(k * x, k * y)
          let kScore = Math.floor(k * 100)
          score.push(kScore)
        }
      } else {
        for (let i = 0; i < num; i++) {
          let k = score[i] / 100
          //k = k < 0.2 ? 0.2 : k
          let x = lineR * Math.sin(angle * i),
            y = lineR * Math.cos(angle * i)
          ctx.lineTo(k * x, k * y)
        }
      }
      window.localStorage.setItem(localName, score.toString())
      ctx.closePath()
      ctx.stroke()
      ctx.save()
      //画正多边形
      let points = []
      let pat = ctx.createPattern(border, 'repeat-x')
      ctx.lineWidth = 40
      ctx.lineJoin = 'round'
      ctx.strokeStyle = pat
      ctx.translate(0, radius)
      ctx.rotate(Math.PI * 3 - angle * 2)
      for (let i = 0; i < num; i++) {
        ctx.beginPath()
        ctx.translate(-side, 0)
        ctx.rotate(angle)
        ctx.lineTo(0, 0)
        ctx.lineTo(-side, 0)
        ctx.closePath()
        ctx.stroke()
        ctx.save()
      }

      //显示的数字值

      ctx.beginPath()
      ctx.rotate(-angle / 2)
      ctx.translate(0, -radius)
      ctx.rotate(-Math.PI)
      ctx.beginPath()
      ctx.font = 'bold 24px sans-serif'
      ctx.textAlign = screenLeft
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#baa7a3'
      ctx.rotate(-Math.PI * 2)
      ctx.strokeStyle = '#baa7a3'
      ctx.lineWidth = 10
      ctx.fillText(
        score[0],
        lineR * 1.5 * Math.sin(0) - 12,
        -lineR * 1.5 * Math.cos(0) + 8
      )
      ctx.fillText(
        score[4],
        lineR * 1.5 * Math.sin(angle) - 30,
        -lineR * 1.5 * Math.cos(angle) - 15
      )
      ctx.fillText(
        score[3],
        lineR * 1.5 * Math.sin(angle * 2) - 13,
        -lineR * 1.5 * Math.cos(angle * 2) - 43
      )
      ctx.fillText(
        score[2],
        lineR * 1.5 * Math.sin(angle * 3) - 15,
        -lineR * 1.5 * Math.cos(angle * 3) - 43
      )
      ctx.fillText(
        score[1],
        lineR * 1.5 * Math.sin(angle * 4) - 5,
        -lineR * 1.5 * Math.cos(angle * 4) - 15
      )
      ctx.closePath()
      ctx.fill()
      ctx.save()
      this.canvasToImage(canvas)
    },
    canvasToImage() {
      let url = canvas.toDataURL('image/png')
      let img = document.getElementById('mImg')
      img.src = url
      this.note = true
      this.loadingPage = false
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pandp/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  //background-color: #f1ece8;
}
.content {
  width: 100%;
  position: relative;
  background-color: #f1ece8;
  .loading {
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;
  }
  #canvas {
    display: none;
    position: relative;
    width: 100%;
    min-height: 100%;
    background-color: #f1ece8;
    z-index: 0;
  }
  #border {
    width: 72px;
    display: none;
  }
  #mImg {
    position: relative;
    width: 100%;
    z-index: 99;
  }
  .note {
    position: relative;
    width: 100%;
    margin-top: -10%;
    z-index: 300;
    pointer-events: none;
    user-select: none;
  }
}
@keyframes circle {
  0% {
    width: 26%;
    opacity: 1;
  }
  95% {
    width: 150%;
    opacity: 1;
  }
  100% {
    width: 150%;
    opacity: 0;
  }
}
@keyframes toRotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>

