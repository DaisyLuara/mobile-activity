<template>
  <div 
    id="content"
    :style="style.root"
    class="content">
    <div
      class="frame">
      <img
        :src="base+'frame.png'"
        class="fbg">
      <img
        :src="base+'luobo'+num+'.gif'"
        class="gif">
      <img
        :src="base+num+'.png'"
        class="png">
      <img
        :src="base+'luobo'+num+'.gif'"
        class="top">
    </div>
    <img
      :src="base+'save.png'"
      class="save">
    <img
      :src="base+'cloud.png'"
      class="animated bounceInLeft cloud1" >
    <img
      :src="base+'cloud.png'"
      class="animated bounceInLeft cloud2" >
    <img
      :src="base+'cloud.png'"
      class="animated bounceInRight cloud3" >
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import 'animate.css'
const IMGSERVER = process.env.CDN_URL + '/image/'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      num: Math.random() > 0.5 ? 1 : 2,
      base: IMGSERVER + 'luobo/',
      //微信分享
      wxShareInfoValue: {
        title: '萝卜sos',
        desc: '不要一直吸我~',
        link: process.env.AD_API+'/api/s/Nk6' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/image/luobo/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.playAnim()
  },
  methods: {
    playAnim() {
      import('pixi.js').then(PIXI => {
        import('pixi-spine').then(Spine => {
          let base = 'http://cdn.exe666.com/image/luobo/assets/'
          let app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true
          })
          document.getElementById('content').appendChild(app.view)
          app.renderer.autoResize = true
          app.renderer.resize(window.innerWidth, window.innerHeight)
          app.view.style.position = 'absolute'
          app.view.style.top = '0%'
          app.view.style.left = '0%'
          app.view.style.zIndex = '0'
          app.stop()
          PIXI.loader.add('sos', base + 'erweima.json').load(setUp)
          let ani = null
          let animal = null
          function setUp(loader, res) {
            animal = new PIXI.spine.Spine(res.sos.spineData)
            animal.skeleton.setToSetupPose()
            animal.update(0)
            animal.autoUpdate = false

            var animalCage = new PIXI.Container()
            animalCage.addChild(animal)

            var localRect = animal.getLocalBounds()
            animal.position.set(-localRect.x, -localRect.y)

            var scale = Math.min(
              (app.screen.width * 0.8) / animalCage.width,
              (app.screen.height * 0.8) / animalCage.height
            )
            animalCage.scale.set(scale, scale)
            animalCage.position.set(
              (app.screen.width - animalCage.width) * 0.5,
              -app.screen.height * 0.12
            )

            app.stage.addChild(animalCage)
            animal.state.setAnimation(0, 'animation', true)
            app.start()
          }
          app.ticker.add(function() {
            animal.update(0.01666666666667)
          })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://cdn.exe666.com/image/luobo/';
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
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url('@{imgUrl}bg.png');
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .frame {
    width: 100%;
    position: relative;
    margin-top: 23%;
    z-index: 99;
    .fbg {
      width: 78%;
      margin: 0 auto;
      position: relative;
      z-index: 0;
    }
    .gif {
      width: 11%;
      position: absolute;
      top: 63%;
      left: 65%;
      z-index: 99;
    }
    .png {
      width: 52%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
    }
    .top {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      opacity: 0;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 62%;
    margin: 0 auto;
    animation: updown 0.8s linear infinite alternate;
  }
  .cloud1,
  .cloud2,
  .cloud3 {
    position: absolute;
  }
  .cloud1 {
    width: 16.4%;
    top: 3%;
    left: 5%;
    z-index: 99;
  }
  .cloud2 {
    width: 21%;
    top: 23%;
    right: -2%;
    z-index: 999;
  }
  .cloud3 {
    width: 17.5%;
    top: 39%;
    left: -2%;
    z-index: 999;
  }
  .bounceInLeft {
    animation-duration: 2000ms;
  }
  .bounceInRight {
    animation-duration: 3000ms;
  }
  @keyframes updown {
    0% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(-10px);
    }
  }
}
</style>


