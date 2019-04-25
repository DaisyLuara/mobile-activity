<template>
  <div
    v-show="showImg"
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'top2.png'+ this.$qiniuCompress()"
      class="top"
    >
    <div id="main" />
    <img
      v-if="photo !== null"
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo"
    >
    <img
      v-if="photo !== null"
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo-real':!iphoneX}"
      class="photo-real"
    >
    <img
      :src="baseUrl + 'snow_1.png'+ this.$qiniuCompress()"
      :class="{'x-snow-1':iphoneX,'snow-1':!iphoneX}"
      class="snow-1"
    >
    <img
      :src="baseUrl + 'snow_2.png'+ this.$qiniuCompress()"
      :class="{'x-snow-2':iphoneX,'snow-2':!iphoneX}"
      class="snow-2"
    >
    <img
      :src="baseUrl + 'snow_3.png'+ this.$qiniuCompress()"
      :class="{'x-snow-3':iphoneX,'snow-3':!iphoneX}"
      class="snow-3"
    >
    <img
      :src="baseUrl + 'snow_4.png'+ this.$qiniuCompress()"
      :class="{'x-snow-4':iphoneX,'snow-4':!iphoneX}"
      class="snow-4"
    >
    <img
      :src="baseUrl + 'snowman.png'+ this.$qiniuCompress()"
      :class="{'x-snowman':iphoneX,'snowman':!iphoneX}"
      class="snowman"
    >
    <img
      :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
      :class="{'x-nav':iphoneX,'nav':!iphoneX}"
      class="nav"
    >
    <img
      :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
      :class="{'x-prompt':iphoneX,'prompt':!iphoneX}"
      class="prompt"
    >
    <div
      :class="{'x-bt':iphoneX,'bt':!iphoneX}"
      class="bt"
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
import { normalPages } from "@/mixins/normalPages";
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
      iphoneX: false,
      showImg: false,
      wxShareInfoValue: {
        title: "Merry Christmas",
        desc: "我的圣诞礼物卡",
        link: "http://papi.xingstation.com/api/s/W7g" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/christmas_throw/icon.jpg"
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
          width: window.innerWidth * 2,
          height: window.innerWidth * 1.02,
          transparent: true
        })
        document.getElementById('main').appendChild(app.view)
        let base = 'http://cdn.xingstation.cn/fe/marketing/img/christmas_throw/'
        app.view.style.position = 'absolute'
        app.view.style.top = '0%'
        app.view.style.left = '50%'
        app.view.style.transform = 'translateX(-50%)'
        app.view.style.zIndex = '9999'
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth * 2, window.innerWidth * 1.02)
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
        this.showImg = true
      })
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/christmas_throw/";
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
  -webkit-overflow-scrolling: touch;
  .top {
    width: 100%;
    position: relative;
  }
  .photo {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -47%);
    z-index: 11;
  }
  .photo-real {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -47%);
    z-index: 10001;
    pointer-events: auto;
    user-select: auto;
    opacity: 0;
  }
  .x-photo {
    width: 85%;
    transform: translate(-50%, -53%);
  }
  .snow-1 {
    width: 10%;
    position: absolute;
    left: 7%;
    top: 18%;
    z-index: 12;
    animation: scale 1.5s linear infinite alternate;
  }
  .snow-2 {
    width: 8%;
    position: absolute;
    left: 5%;
    top: 58%;
    z-index: 12;
    animation: scale 1.5s linear infinite alternate;
  }
  .x-snow-1,
  .x-snow-2 {
    left: 2%;
  }
  .snow-3 {
    width: 14%;
    position: absolute;
    right: 5%;
    top: 45%;
    z-index: 12;
    animation: scale 1.5s linear infinite alternate;
  }
  .snow-4 {
    width: 8%;
    position: absolute;
    right: 7%;
    top: 20%;
    z-index: 12;
    animation: scale 1.5s linear infinite alternate;
  }
  .x-snow-3,
  .x-snow-4 {
    right: 2%;
  }
  .snowman {
    width: 32%;
    position: absolute;
    left: 0;
    bottom: -8%;
    z-index: 12;
  }
  .x-snowman {
    bottom: 0%;
  }
  .nav {
    width: 15%;
    position: absolute;
    left: 43%;
    bottom: -1%;
    z-index: 12;
    animation: arrow 0.8s linear infinite alternate;
  }
  .x-nav {
    bottom: 11%;
  }
  .prompt {
    width: 55%;
    position: absolute;
    left: 25%;
    bottom: -5%;
    z-index: 13;
    animation: arrow 0.8s linear infinite alternate;
  }
  .x-prompt {
    bottom: 7%;
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
}
@keyframes scale {
  from {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.25, 1.25);
  }
  to {
    transform: scale(1, 1);
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
