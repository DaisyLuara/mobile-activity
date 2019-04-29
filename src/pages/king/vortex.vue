<template>
  <div
    v-show="showImg" 
    :style="style.root"
    class="root"
  >
    <div 
      id="main" 
      class="top"
    >
      <img 
        v-show="showImg"
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      > 
      <img 
        v-show="showImg"
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo"
      > 
      <img 
        v-show="showImg"
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo-real"
      > 
    </div>
    <div 
      v-show="showImg" 
      class="bt"
    >
      <img 
        :src="baseUrl + 'arrow.png'+ this.$qiniuCompress()"
        class="arrow"
      > 
      <img 
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"
      > 
    </div>
  </div>
</template>
<script>
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/spacetime_vortex/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      showImg: false,
      iphoneX: false,
      wxShareInfoValue: {
        title: '历史的时空漩涡',
        desc: '名人穿越，即刻出发',
        link: process.env.AD_API+'/api/s/oQK' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/spacetime_vortex/icon.png'
      }
    }
  },
  created() {
    // this.playAnim()
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
    this.playAnim()
  },
  methods: {
    playAnim() {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application({
          width: window.innerWidth * 0.7,
          height: window.innerWidth * 1.02,
          transparent: true
        })
        document.getElementById('main').appendChild(app.view)
        let base = 'http://cdn.xingstation.cn/fe/marketing/img/spacetime_vortex/'
        app.view.style.position = 'absolute'
        app.view.style.top = '15%'
        app.view.style.left = '50%'
        app.view.style.transform = 'translateX(-50%)'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth * 0.7, window.innerWidth * 1.02)
        app.stop()
        PIXI.loader.add('vortex', base + 'vortex.json').load(setUp)
        function setUp() {
          let vortex = []
          let texture = null
          for (let i = 1; i <= 24; i++) {
            texture = PIXI.Texture.fromFrame('clock_' + i + '.png')
            vortex.push(texture)
          }
          let animal = new PIXI.extras.AnimatedSprite(vortex)
          animal.anchor.set(0.5, 0)
          animal.x = app.screen.width / 2
          animal.y = 0
          animal.width = app.screen.width / 2
          animal.height = (animal.width / 296) * 270
          animal.gotoAndPlay(0)
          animal.animationSpeed = 1.5
          app.stage.addChild(animal)
        }
        app.start()
        this.showImg = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/spacetime_vortex/';
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
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .top {
    width: 100%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .frame {
      width: 90%;
      margin-top: 3%;
    }
    .photo {
      width: 52.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49%, -26.5%);
      border-radius: 5%;
      user-select: auto;
      pointer-events: auto;
    }
    .photo-real {
      width: 52.5%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-49%, -26.5%);
      border-radius: 5%;
      z-index: 10000;
      user-select: auto;
      pointer-events: auto;
      opacity: 0;
    }
  }
  .bt {
    width: 100%;
    height: 30%;
    position: relative;
    pointer-events: none;
    user-select: none;
    .arrow {
      width: 8%;
      display: block;
      position: absolute;
      left: 46%;
      top: 8%;
      animation: arrow 0.5s linear infinite alternate;
    }
    .save {
      width: 70%;
      display: block;
      position: absolute;
      left: 17%;
      top: 38%;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
