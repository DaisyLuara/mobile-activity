<template>
  <div 
    :style="style.root"
    class="content"
  >
    <div
      :style="style.root"
      class="main">
      <!-- <img 
        :src="base_url + 'bottom.png'" 
        class="bottom"
      >
      <img 
        :src="photo" 
        class="photo"
      > -->
      <img 
        :src="photo" 
        class="photo top"
      >
    </div>
    <!-- <img 
      v-show="Boolean(photo)"
      :src="base_url + 'save.png'" 
      class="save"
    > -->
  </div>

</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  mixins: [normalPages],
  data() {
    return {
      base_url: IMG_SERVER + 'image/rainer/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      note: Boolean(this.photo),
      photo: null,
      playAnim: true,
      //分享
      wxShareInfoValue: {
        title: '秘密花园 尽显美颜',
        desc: '快来寻找秘密花园，施展你的小小控雨魔法',
        link: 'http://papi.xingstation.com/api/s/n5R' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/rainer/icon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.doFrame()
  },
  methods: {
    doFrame() {
      import('pixi.js').then(PIXI => {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
        let app = new PIXI.Application({
          width: window.innerWidth,
          transparent: true
        })
        document.querySelector('.main').appendChild(app.view)
        app.view.style.position = 'relative'
        app.view.style.zIndex = '9999'
        app.stop()
        let base = 'http://p22vy0aug.bkt.clouddn.com/image/rainer/'
        let width = app.screen.width
        let height = app.screen.height
        let bottom = PIXI.Sprite.fromImage(base + 'bottom.png')
        bottom.anchor.set(0.5, 0)
        bottom.width = width * 0.81
        bottom.height = width * 0.81 / 630 * 1016
        bottom.position.set(width / 2, height * 0.05)
        app.stage.addChild(bottom)
        let mImg = this.photo //this.$qiniuCompress()
        let photo = PIXI.Sprite.fromImage(mImg)
        photo.anchor.set(0.5, 0)
        photo.width = width * 0.675
        photo.height = width * 0.675 / 1080 * 1920
        photo.position.set(width / 2, height * 0.132)
        app.stage.addChild(photo)

        let textureArray = []
        for (let i = 0; i < 12; i++) {
          i = i < 10 ? '0' + i : i
          let texture = PIXI.Texture.fromImage(
            base + 'frame/frame_000' + i + '.png'
          )
          textureArray.push(texture)
        }

        let end = PIXI.Texture.fromImage(base + '/frame/frame_00011.png')
        for (let i = 0; i < 4; i++) {
          textureArray.push(end)
        }
        let animatedSprite = new PIXI.extras.AnimatedSprite(textureArray)
        animatedSprite.anchor.set(0.5, 0)
        animatedSprite.position.set(width / 2, 10)
        animatedSprite.width = width * 0.91
        animatedSprite.height = width * 0.91 / 685 * 1096
        animatedSprite.animationSpeed = 0.1
        animatedSprite.gotoAndPlay(0)
        app.stage.addChild(animatedSprite)
        app.start()

        let save = PIXI.Sprite.fromImage(base + 'save.png')
        save.anchor.set(0.5, 0)
        save.width = width * 0.56
        save.height = width * 0.56 / 412 * 82
        save.position.set(
          width / 2,
          animatedSprite.height + animatedSprite.y + 5
        )
        app.stage.addChild(save)
        app.screen.height = save.height + save.y + 10
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, save.height + save.y)
        app.view.style.marginBottom = '20px'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@baseUrl: 'http://p22vy0aug.bkt.clouddn.com/image/rainer/';

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-image: url('@{baseUrl}/bg.jpg');
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #2b1c17;
  .main {
    width: 100%;
    position: relative;
    .photo {
      position: absolute;
      width: 67.5%;
      top: 13.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .bottom {
      width: 81%;
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
    }
    .top {
      z-index: 999999;
      pointer-events: auto;
      user-select: auto;
      opacity: 0;
    }
  }
  .save {
    width: 56%;
    margin: 0 auto;
    margin-bottom: 4%;
    margin-top: -10%;
    position: relative;
    z-index: 999;
  }
}

// @media screen {
//   @media (min-height: 700px) {
//     .content {
//       padding-top: 7%;
//       overflow: hidden;
//     }
//     .main {
//       overflow: hidden;
//     }
//   }
// }
</style>


