<template>
    <div class="content" id="content">
        <canvas id="canvas"></canvas>
        <img id="border" src="/static/pandp/border.png"/>
        <img id="mImg" src=""/>
        <img class="note" :src="IMG_URL + 'note.png'" v-show ="note"/>
        <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    </div>

</template>
<script>
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      IMG_URL: IMAGE_SERVER + '/pages/pandp/',
      content: null,
      width: null,
      height: null,
      note: false,
      type: this.$route.query.type,
      id: this.$route.query.id,
      //微信分享
      wxShareInfo: {
        title: '天哪！我穿越了！',
        desc: '快来看看我穿越成了谁？',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pandp/share.jpg'
      }
    }
  },
  beforeCreate() {
    document.title = '星视度前世穿越机'
  },
  created() {},
  mounted() {
    this.width =
      window.innerWidth ||
      document.body.clientWidth ||
      document.documentElement.clientWidth
    this.height =
      window.innerHeight ||
      document.body.clientHeight ||
      document.documentElement.clientHeight
    this.content = document.getElementById('content')
    this.content.style.minHeight = this.height + 'px'
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      marketService
        .getInfoById(this, this.id)
        .then(res => {
          this.drawCanvas(res.code)
        })
        .catch(err => {})
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
        console.log(bg.height)
        img.onload = function() {
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            -bg.width * 0.09,
            bg.height * 0.24,
            bg.width * 1.18,
            img.height * bg.width * 1.18 / img.width
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
                bg.width * 0.15,
                bg.height * 0.052,
                bg.width * 0.7,
                bg.height * 0.19
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
            word.src = b_url + type + '.png'
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
      if (window.localStorage.getItem('ppscore')) {
        score = window.localStorage.getItem('ppscore').split(',')
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
          let k = Math.random()
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
      window.localStorage.setItem('ppscore', score.toString())
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
    }
  },
  components: {
    WxShare
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
  background-color: #f1ece8;
}
.content {
  width: 100%;
  position: relative;
  #canvas {
    display: none;
    position: relative;
    width: 100%;
    min-height: 100%;
    // background-color: antiquewhite;
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
    z-index: 999;
  }
}
</style>

