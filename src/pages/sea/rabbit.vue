<template>
  <div 
    :style="style.root"
    class="content"
  >
    <div 
      id="main"
      class="main"
    >
      <img
        :src="baseUrl + 'bg.jpg'"
        class="bg"
      >
      <span
        class="span"
      >{{ num }}</span>
      <a 
        v-show="bunny"
        :class="{animated:!mask}"
        class="box infinite tada delay-2s"
        @click="()=>{mask = true;}"
      >
        <img 
          :src="baseUrl + 'bunny.png'"
        >
      </a>
    </div>
    <div 
      v-show="mask"
      class="mask"
    >
      <div 
        class="container"
      >
        <a
          class="close"
          @click="()=>{mask = false;}"
        >
          <img 
            :src="baseUrl + 'x.png'"
          >
        </a>
        <img 
          :src="baseUrl + 'tips.png'" 
          class="tips"
        >
        <img 
          :src="baseUrl + 'tu.png'" 
          :class="{animated:mask}"
          class="tu infinite tada delay-2s"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import 'animate.css'
const IMGURL = process.env.CDN_URL + '/image/'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: IMGURL + 'rabbit/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      bunny: false,
      mask: false,
      num: this.$route.query.num,
      //微信分享
      wxShareInfoValue: {
        title: '兔兔这么可爱当然要吃萝卜',
        desc: '内有萌兔，请小心点开',
        link: process.env.AD_API+'/api/s/L9w' + window.location.search,
        imgUrl: IMGURL + 'rabbit/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    let bg = new Image()
    bg.src = this.baseUrl + 'bg.jpg'
    bg.onload = function() {
      let sheet = new Image()
      sheet.src = this.baseUrl + 'rabbit.png'
      sheet.onload = function() {
        let bunny = new Image()
        bunny.src = this.baseUrl + 'bunny.png'
        bunny.onload = function() {}
      }
    }
    this.playAnim()
  },
  methods: {
    playAnim() {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application({
          width: window.innerWidth * 0.4,
          height: window.innerWidth * 0.8,
          transparent: true
        })
        document.getElementById('main').appendChild(app.view)
        let base = 'http://cdn.xingstation.cn/image/rabbit/'
        app.view.style.position = 'absolute'
        app.view.style.top = '10%'
        app.view.style.left = '50%'
        app.view.style.transform = 'translateX(-50%)'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth * 0.4, window.innerWidth * 0.8)
        app.stop()
        PIXI.loader.add('tutu', base + 'rabbit.json').load(setUp)
        function setUp() {
          let rabbits = []
          let texture = null
          for (let i = 1; i <= 19; i++) {
            texture = PIXI.Texture.fromFrame('tuzi_' + i + '.png')
            rabbits.push(texture)
          }
          let animal = new PIXI.extras.AnimatedSprite(rabbits)
          animal.anchor.set(0.5, 0)
          animal.x = app.screen.width / 2
          animal.y = 0
          animal.width = app.screen.width
          animal.height = (animal.width / 296) * 527
          animal.gotoAndPlay(0)
          animal.animationSpeed = 0.6
          app.stage.addChild(animal)
        }
        app.start()
        this.bunny = true
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
  background-color: #392c28;
  // max-width: 750px;
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
  // background: url('@{imgUrl}bg.jpg') center top/100% auto no-repeat;
  .main {
    width: 100%;
    overflow-x: hidden;
    position: relative;
    z-index: 0;
    .bg {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .span {
      font-family: '黑体';
      font-size: 10vw;
      font-weight: 800;
      font-style: italic;
      position: absolute;
      top: 14%;
      left: 69.5%;
      z-index: 9;
    }
    .box {
      display: inline-block;
      width: 50%;
      position: absolute;
      top: 63%;
      right: 5%;
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
        width: 40%;
        position: absolute;
        bottom: -1%;
        right: 4%;
      }
      .close {
        display: inline-block;
        width: 12%;
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
