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
        :src="baseUrl + 'bg.png'"
        class="bg"
      >
      <span class="span">{{ num }}</span>
      <a
        v-show="chick"
        :class="{animated:!mask}"
        class="box infinite tada delay-2s"
        @click="()=>{mask = true;}"
      >
        <img :src="baseUrl + 'he.png'">
      </a>
    </div>
    <div
      v-show="mask"
      class="mask"
    >
      <div class="container">
        <a
          class="close"
          @click="()=>{mask = false;}"
        >
          <img :src="baseUrl + 'x.png'">
        </a>
        <img
          :src="baseUrl + 'buzhou.png'"
          class="tips"
        >
        <img
          :src="baseUrl + 'he.png'"
          :class="{animated:mask}"
          class="tu infinite tada delay-2s"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
import 'animate.css'
const IMGURL = process.env.CDN_URL + '/image/'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: IMGURL + 'chick/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      chick: false,
      mask: false,
      num: this.$route.query.num,
      //微信分享
      wxShareInfoValue: {
        title: '小鸡捉虫',
        desc: '消灭害虫，人人有责',
        link: 'http://papi.xingstation.com/api/s/R6q' + window.location.search,
        imgUrl: IMGURL + 'chick/share.png',
      }
    }
  },
  watch: {
    parms() {
      this.num = this.parms.num
    }
  },
  created() { },
  mounted() {
    let that = this
    let bg = new Image()
    bg.src = this.baseUrl + 'bg.png'
    bg.onload = function () {
      let chick = new Image()
      chick.src = this.baseUrl + 'he.png'
      chick.onload = function () {
        that.chick = true
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
        let base = 'http://cdn.xingstation.com/image/chick/'
        app.view.style.position = 'absolute'
        app.view.style.top = '8%'
        app.view.style.left = '50%'
        app.view.style.transform = 'translateX(-50%)'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth * 0.4, window.innerWidth * 0.8)
        app.stop()
        PIXI.loader.add('chick', base + 'tinified.json').load(setUp)
        function setUp() {
          let chicken = []
          let texture = null
          for (let i = 1; i <= 15; i++) {
            texture = PIXI.Texture.fromFrame('gongji_' + i + '.png')
            chicken.push(texture)
          }
          let animal = new PIXI.extras.AnimatedSprite(chicken)
          animal.anchor.set(0.5, 0)
          animal.x = app.screen.width / 2
          animal.y = 0
          animal.width = app.screen.width
          animal.height = (animal.width / 304) * 581
          animal.gotoAndPlay(0)
          animal.animationSpeed = 0.2
          app.stage.addChild(animal)
        }
        app.start()
        this.chick = true
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
    .bg {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .span {
      font-family: "黑体";
      font-size: 10vw;
      font-weight: 800;
      font-style: italic;
      position: absolute;
      top: 13%;
      left: 26.5%;
      z-index: 9;
    }
    .box {
      display: inline-block;
      width: 52%;
      position: absolute;
      top: 67%;
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
        width: 35%;
        position: absolute;
        bottom: -3%;
        right: 1%;
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
