<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top2.png'+ this.$qiniuCompress()"
      class="top"
    >
    <div class="center">
      <div id="main"></div>
      <img
        :src="baseUrl + '666.jpeg'+ this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <div
      class="bt"
      :class="{'x-bt':iphoneX,'bt':!iphoneX}"
    >
      <img
        :src="baseUrl + 'mid.png'+ this.$qiniuCompress()"
        class="mid"
      >
      <img
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="bottom"
      >
    </div>

  </div>
</template>
<script>
import { wechatShareTrack } from "services";
import { normalPages } from "../../mixins/normalPages";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/christmas_throw/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: "Merry Christmas",
        desc: "我的圣诞礼物卡",
        link: "http://papi.xingstation.com/api/s/W7g" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/christmas_throw/icon.jpg",
        success: () => {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    } else {
      this.iphoneX = false;
    }
    this.playAnim()
  },
  methods: {
    playAnim() {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerWidth * 0.5,
          transparent: true
        })
        document.getElementById('main').appendChild(app.view)
        let base = 'http://cdn.exe666.com/fe/marketing/img/christmas_throw/'
        app.view.style.top = '15%'
        app.view.style.left = '50%'
        app.view.style.transform = 'translateX(-50%)'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerWidth * 0.5)
        app.stop()
        PIXI.loader.add('guashi', base + 'guashi.json').load(setUp)
        function setUp() {
          let guashi = []
          let texture = null
          for (let i = 0; i <= 11; i++) {
            texture = PIXI.Texture.fromFrame('guashi_' + i + '.png')
            guashi.push(texture)
          }
          let animal = new PIXI.extras.AnimatedSprite(guashi)
          animal.anchor.set(0.5, 0)
          animal.x = app.screen.width / 2
          animal.y = 0
          animal.width = app.screen.width / 2
          animal.height = (animal.width / 296) * 107
          animal.gotoAndPlay(0)
          animal.animationSpeed = 0.5
          app.stage.addChild(animal)
        }
        app.start()
        // this.showImg = true
      })
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/christmas_throw/";
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
  overflow-x: hidden;
  .top {
    width: 100%;
    position: relative;
  }
  .center {
    width: 100%;
    position: absolute;
    .photo {
      width: 85%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 11;
    }
  }
  .bt {
    width: 100%;
    position: absolute;
    left: 0;
    top: 30%;
    .mid {
      width: 100%;
    }
    .bottom {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 9;
    }
  }
  .x-bt {
    width: 100%;
    position: absolute;
    left: 0;
    top: 34%;
  }
  // .mid {
  //   width: 100%;
  //   position: relative;
  // }
  // .bottom {
  //   width: 100%;
  //   position: relative;
  // }
}
</style>
