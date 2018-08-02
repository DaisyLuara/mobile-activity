<template>
  <div 
    :style="style.root"
    class="content"
  >
    <div
      class="main">
      <img 
        :src="base_url + 'bottom.png'" 
        class="bottom"
      >
      <img 
        :src="photo" 
        class="photo"
      >
      <img 
        :src="photo" 
        class="photo top"
      >
      <img 
        :src="base_url + 'frame.png'"
        class="frame" 
      >
      <canvas 
        id="canvas"
      />
    </div>
    <img 
      v-show="Boolean(photo)"
      :src="base_url + 'save.png'" 
      class="save"
    >
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
        let app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          transparent: true
        })
        document.body.appendChild(app.view)
        app.view.style.position = 'absolute'
        app.view.style.zIndex = '9999'
        app.view.style.top = '0px'
        app.view.style.left = '0px'
        app.stop()
        let textureArray = []
        for (let i = 0; i < 12; i++) {
          i = i < 10 ? '0' + i : i
          let texture = PIXI.Texture.fromImage(
            'http://p22vy0aug.bkt.clouddn.com/image/rainer/frame/frame_000' +
              i +
              '.png'
          )
          textureArray.push(texture)
        }

        let end = PIXI.Texture.fromImage(
          'http://p22vy0aug.bkt.clouddn.com/image/rainer/frame/frame_00011.png'
        )
        for (let i = 0; i < 4; i++) {
          textureArray.push(end)
        }
        let animatedSprite = new PIXI.extras.AnimatedSprite(textureArray)
        animatedSprite.anchor.set(0.5, 0)
        animatedSprite.position.set(app.screen.width / 2, 10)
        animatedSprite.scale.set(0.5)
        animatedSprite.animationSpeed = 0.1
        animatedSprite.gotoAndPlay(0)
        app.stage.addChild(animatedSprite)
        app.start()
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
      z-index: 999;
      pointer-events: auto;
      user-select: auto;
      opacity: 0;
    }
    .frame {
      width: 91%;
      opacity: 0;
      position: relative;
      margin: 0 auto;
      margin-top: 1.5%;
      margin-bottom: 2%;
      z-index: 99;
    }
  }
  .save {
    width: 56%;
    margin: 0 auto;
    margin-bottom: 4%;
    margin-top: 0.5%;
  }
  #canvas {
    width: 91%;
    position: absolute;
    top: 1.5%;
    left: 50%;
    z-index: 99;
    transform: translateX(-50%);
  }
}

@media screen {
  @media (min-height: 700px) {
    .content {
      padding-top: 7%;
    }
  }
}
</style>


