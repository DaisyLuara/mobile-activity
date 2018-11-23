<template>
  <div
    :style="style.root"
    class="root">
  <!-- 遮罩 -->
    <div 
      v-show="showImg"
      @click="go"
      class="shade">
       <img 
        :src="baseUrl + 'hua.png'+ this.$qiniuCompress()"
        class="hua"> 
      <img 
        :src="baseUrl + 'tip.png'+ this.$qiniuCompress()"
        class="tip"> 
    </div>
    <!-- 内容 -->
    <div 
      v-show="contentShow"
      class="content">
      <!-- <img 
        :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
        class="bg">  -->
      <div id="main"></div>
      <img
      id="test" 
      :src="base64Data"
      :class="{'x-photoImg':iphoneX,'photoImg':!iphoneX}" 
      alt=""
      class="photoImg" >
    <canvas 
      id="canvas" 
      class="photoImg"
      style="display: none" />
    <img  
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"> 
    </div>
     
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
import MC from 'mcanvas'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/dreamland/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      showImg: true,
      contentShow: false,
      peopleID: this.$route.query.peopleID,
      iphoneX: false,
      base64Data: null,
      man: ['man_1.png', 'man_2.png', 'man_3.png', 'man_4.png', 'man_5.png'],
      woman: [
        'woman_1.png',
        'woman_2.png',
        'woman_3.png',
        'woman_4.png',
        'woman_5.png'
      ],
      wxShareInfoValue: {
        title: '历史的时空漩涡',
        desc: '名人穿越，即刻出发',
        link: 'http://papi.xingstation.com/api/s/oQK' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/dreamland/icon.png'
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.drawing()
    this.randomImg()
  },
  methods: {
    go() {
      this.showImg = false
      this.contentShow = true
      this.playAnim()
    },
    //获取随机数图片
    randomImg() {
      let that = this
      let num = Math.round(Math.random() * 5)
    },
    //动画
    playAnim() {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application({
          width: window.innerWidth * 2,
          height: window.innerWidth * 1.8,
          transparent: true
        })
        document.getElementById('main').appendChild(app.view)
        let base = 'http://cdn.exe666.com/fe/marketing/img/dreamland/'
        app.view.style.position = 'absolute'
        app.view.style.top = '0'
        app.view.style.left = '0'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth * 2, window.innerWidth * 1.8)
        app.stop()
        PIXI.loader.add('flower', base + 'flower.json').load(setUp)
        function setUp() {
          let flower = []
          let texture = null
          for (let i = 0; i <= 39; i++) {
            texture = PIXI.Texture.fromFrame('hua_' + i + '.png')
            flower.push(texture)
          }
          let animal = new PIXI.extras.AnimatedSprite(flower)
          animal.anchor.set(0.5, 0)
          animal.x = 0
          animal.y = 0
          animal.width = app.screen.width / 1
          animal.height = (animal.width / 296) * 527
          animal.gotoAndPlay(0)
          animal.animationSpeed = 0.2
          app.stage.addChild(animal)
        }
        app.start()
        this.contentShow = true
      })
    },
    //合成图片
    drawing() {
      let width = this.$innerWidth()
      let height = this.$innerHeight()
      let that = this
      let backgroundColor = 'white'
      let mc = new MC({
        width,
        height,
        backgroundColor
      })
      //let url = this.photo + this.$qiniuCompress()
      let url = that.baseUrl + 'pic.jpg'
      let imgUrl = null
      if (that.peopleID >= 0 || that.peopleID <= 6) {
        imgUrl = that.baseUrl + that.woman[that.randomImg()]
      }
      mc.background(that.baseUrl + 'bg.png', {
        left: 0,
        top: 0,
        type: 'origin',
        width: that.$innerWidth(),
        pos: {
          x: '0%',
          y: '0%'
        }
      })
        .add(url, {
          width: '70%',
          pos: {
            x: '15%',
            y: '18%'
          }
        })
        .add(that.baseUrl + 'juanzhou.png', {
          width: '100%',
          color: '#000000',
          pos: {
            x: '0%',
            y: '0%'
          }
        })
        .draw({
          // 导出图片格式： png/jpg/jpeg/webp;
          // default : png;
          type: 'jpg',
          //  图片质量，对 png 格式无效； 0~1；
          // default: .9;
          quality: 1,
          // 成功回调；
          success(b64) {
            that.base64Data = b64
            let url = canvas.toDataURL('image/png')
            let img = document.getElementById('test')
            img.src = url
          },
          // 错误回调；
          error(err) {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/dreamland/';
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
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  .shade {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-image: url('@{imageHost}bg2.png');
    background-size: 100% 100%;
    background-position: center top;
    background-repeat: no-repeat;
    .hua {
      width: 100%;
      animation: scale 1.5s linear infinite alternate;
    }
    .tip {
      width: 50%;
      position: absolute;
      left: 20%;
      top: 0%;
      animation: scale 1.5s linear infinite alternate;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .photoImg {
      width: 100%;
      position: absolute;
      left: 0%;
      top: 0%;
      -webkit-user-select: auto;
      pointer-events: auto;
    }
  }
  .save {
    width: 40%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
  }
}
@keyframes scale {
  from {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.05, 1.05);
  }
  to {
    transform: scale(1, 1);
  }
}
</style>
