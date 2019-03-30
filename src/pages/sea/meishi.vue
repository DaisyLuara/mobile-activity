<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      id="main"
      class="main">
      <img
        :src="baseUrl + 'meishi/bg.png'+this.$qiniuCompress()"
        class="bg">
      <span
        class="span">{{ score }}</span>
      <a 
        v-show="meishi"
        :class="{animated:!mask}"
        class="box infinite tada delay-2s"
        @click="()=>{mask = true;meishi=false;}">
        <img 
          :src="baseUrl + 'meishi/rabbit.png'">
      </a>
    </div>
    <div 
      v-show="mask"
      class="mask">
      <div 
        class="container">
        <a
          class="close"
          @click="()=>{mask = false;meishi=true;}">
          <img 
            :src="baseUrl + 'chick/x.png'">
        </a>
        <img 
          :src="baseUrl + 'meishi/pop.png'" 
          class="tips">
        <img 
          :src="baseUrl + 'meishi/rabbit.png'" 
          :class="{animated:mask}"
          class="tu infinite tada delay-2s">
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import 'animate.css'
const IMGURL = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: IMGURL + '/image/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      meishi: false,
      mask: false,
      score: this.$route.query.score,
      //微信分享
      wxShareInfoValue: {
        title: '美食PK',
        desc: '发光的美食，你见过吗',
        link: 'http://papi.xingstation.com/api/s/2kK' + window.location.search,
        imgUrl: 'http://cdn.xingstation.cn/image/meishi/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let that = this
    let bg = new Image()
    bg.src = this.baseUrl + 'meishi/bg.png'
    bg.onload = function() {
      let sheet1 = new Image()
      sheet1.src = this.baseUrl + 'chick/tinified.png'
      sheet1.onload = function() {
        let sheet2 = new Image()
        sheet2.src = this.baseUrl + 'meishi/win.png'
        sheet2.onload = function() {}
      }
    }
    this.playAnim()
  },
  methods: {
    playAnim() {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerWidth,
          transparent: true
        })
        document.getElementById('main').appendChild(app.view)
        let base = 'http://cdn.xingstation.cn/image/'
        app.view.style.position = 'absolute'
        app.view.style.top = '11%'
        app.view.style.left = '50%'
        app.view.style.transform = 'translateX(-50%)'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerWidth)
        app.stop()
        PIXI.loader
          .add('chick', base + 'chick/tinified.json')
          .add('rabbit', base + 'meishi/win.json')
          .load(setUp)
        function setUp() {
          let chicken = [],
            bunny = [],
            texture = null,
            texture2 = null
          for (let i = 1; i <= 15; i++) {
            texture = PIXI.Texture.fromFrame('gongji_' + i + '.png')
            chicken.push(texture)
          }
          for (let i = 1; i <= 15; i++) {
            texture2 = PIXI.Texture.fromFrame('tuzi_' + i + '.png')
            bunny.push(texture2)
          }
          let animal1 = new PIXI.extras.AnimatedSprite(chicken)
          let animal2 = new PIXI.extras.AnimatedSprite(bunny)
          animal1.x = app.screen.width * 0.05
          animal1.y = 0
          animal1.width = app.screen.width / 2
          animal1.height = (animal1.width / 304) * 581
          animal1.gotoAndPlay(0)
          animal1.animationSpeed = 0.2
          animal2.x = app.screen.width * 0.51
          animal2.y = app.screen.height * 0.29
          animal2.width = app.screen.width * 0.38
          animal2.height = (animal2.width / 226) * 372
          animal2.gotoAndPlay(0)
          app.stage.addChild(animal1)
          app.stage.addChild(animal2)
        }
        app.start()
        this.meishi = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  background-color: #282f39;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #392c28;
  .main {
    width: 100%;
    overflow-x: hidden;
    position: relative;
    z-index: 0;
    margin-top: -50px;
    .bg {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .span {
      font-family: '黑体';
      font-size: 10vw;
      font-weight: 800;
      color: #452514;
      position: absolute;
      top: 19.2%;
      left: 26%;
      z-index: 9;
    }
    .box {
      display: inline-block;
      width: 52%;
      position: absolute;
      top: 76%;
      right: 3%;
      z-index: 999;
      img {
        width: 100%;
      }
    }
  }
  .mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    .container {
      width: 100%;
      position: relative;
      margin-top: 10%;
      .tips {
        position: relative;
        width: 98%;
        margin: 0 auto;
        z-index: 0;
        pointer-events: auto;
        user-select: auto;
      }
      .tu {
        width: 50%;
        position: absolute;
        bottom: -3%;
        right: 3%;
      }
      .close {
        display: inline-block;
        width: 10%;
        position: absolute;
        right: 2.5%;
        top: 0.5%;
        z-index: 99;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
