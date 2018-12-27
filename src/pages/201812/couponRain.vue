<template>
  <div
    :style="style.root"
    class="content"
  >
    <div
      id="anim"
      :style="style.root"
      class="anim"
    />
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
import "animate.css";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/couponrain/",
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "猪福港味年，红包抢翻天！  ",
        desc: "点击马上抢【连卡福】新春红包！",
        link: "http://papi.xingstation.com/api/s/K8r" + window.location.search,
        imgUrl: CDNURL + "/fe/image/couponrain/share.png",
      }
    };
  },
  mounted() {
    this.doAnimate()
  },
  methods: {
    doAnimate() {
      import('pixi.js').then(PIXI => {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
        let app = new PIXI.Application(window.innerWidth, window.innerHeight, {
          antialias: true,
          transparent: true
        })

        let root = document.getElementById('anim')
        root.appendChild(app.view);
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerHeight)
        // holder to store the aliens
        let [url, as_width, as_height] = [CDNURL + '/fe/image/couponrain/', app.screen.width, app.screen.height]
        let aliens = [];
        let scores = 0
        let time = 21
        let totalDudes = 20;
        let bg = getNewSpriteImage(url + 'Background.png', {}, app.stage)//红色背景图片
        //新建容器1, 2, 3
        let container1 = getNewContainer({}, app.stage)
        let container2 = getNewContainer({}, app.stage) //容器二  倒计时
        let container3 = getNewContainer({}, app.stage)
        container2.visible = false
        container3.visible = false
        //容器一
        let pig = getNewSpriteImage(url + 'pig.png', { y: -as_height * 0.04, height: as_width / 750 * 1086 }, container1)//猪年大吉图像
        let logo = getNewSpriteImage(url + 'logo.png', { x: as_width * 0.83, y: as_height * 0.02, width: as_width * 0.15, height: as_width * 0.15 / 104 * 87 }, container1)
        let button = getNewSpriteImage(url + 'button.png', { x: as_width * 0.1, y: as_height * 0.815, width: as_width * 0.8, height: as_width * 0.8 / 608 * 158 }, container1) //按钮
        button.interactive = true
        button.buttonMode = true
        button.on('click', onCheckScene).on('touchend', onCheckScene)
        //容器二  倒计时
        let graphics = new PIXI.Graphics()
        graphics.beginFill(0x000000, 0.5)
        graphics.drawRect(0, 0, as_width, as_height)
        graphics.endFill()
        container2.addChild(graphics)
        let bigNUm = 3
        let bigStyle = new PIXI.TextStyle({
          fontFamily: '黑体',
          fontSize: 150,
          fontWeight: 'bold',
          fill: ['#fae767'],
          stroke: '#942013',
          strokeThickness: 7,
          dropShadow: true,
          dropShadowColor: 'rgba(0,0,0,0.5)',
          dropShadowBlur: 2,
          dropShadowAngle: Math.PI / 6,
        })
        let bigText = getNewText(bigNUm, bigStyle, 0.5, 0.5, { x: as_width / 2, y: as_height / 2 }, container2)
        //容器三，游戏界面
        let gold = getNewSpriteImage(url + 'gold.png', { x: as_width / 2, y: as_height / 2, width: as_width * 0.18, height: as_width * 0.18 / 133 * 70 }, container3)//元宝
        gold.anchor.set(0.5, 0.5)
        let cover = getNewSpriteImage(url + 'cover.png', { y: -as_height * 0.1, width: as_width, height: as_width / 750 * 1334 }, container3)//cover图

        //游戏时间与游戏积分
        let game_time = 15
        let game_score = 0
        let style = new PIXI.TextStyle({
          fontFamily: '黑体',
          fontSize: 20,
          fill: ['#e8c044'],
          stroke: '#942013',
          strokeThickness: 3,
          dropShadow: true,
          dropShadowColor: '#981d15',
        })
        let time_name = getNewText('游戏时间', style, 0, 0, { x: 20, y: 20 }, container3)
        let score_name = getNewText('游戏时间', style, 0, 0, { x: as_width - 100, y: 20 }, container3)
        console.log(container2.width)
        console.log(container2.height)
        console.log(container2.x)
        console.log(app.screen.width)
        //红包

        app.ticker.add(function () {

        });
        //新建容器和设置他们的基本属性
        function getNewContainer(args, parent) {
          let container = new PIXI.Container()
          container.x = args.x || 0
          container.y = args.y || 0
          container.width = args.width || app.screen.width
          container.height = args.height || app.screen.height
          for (let key in args) {
            container.key = args.key
          }
          parent.addChild(container)
          return container
        }
        //新建图片精灵和设置他们的基本属性
        function getNewSpriteImage(url, args, parent) {
          let sprite = PIXI.Sprite.fromImage(url)
          sprite.x = args.x || 0
          sprite.y = args.y || 0
          sprite.width = args.width || app.screen.width
          sprite.height = args.height || app.screen.height
          for (let key in args) {
            sprite.key = args.key
          }
          parent.addChild(sprite)
          return sprite
        }
        //新建文本和设置他们的基本属性
        function getNewText(text, style, centerX = 0, centerY = 0, args, parent) {
          let txt = new PIXI.Text(text, style)
          txt.anchor.set(centerX, centerY)
          for (let key in args) {
            txt.key = args.key
          }
          parent.addChild(txt)
          return txt
        }
        //动作
        function onCheckScene() {
          console.log('abs')
          container1.visible = false
          container2.visible = true
          let timer1 = setInterval(function () {
            if (bigNUm == 0) {
              clearInterval(timer1)
              container2.visible = false
              container3.visible = true
              bigNUm = 3
              return
            }

            bigText.text = --bigNUm
            console.log(bigNUm)
          }, 1000)
        }
        function onButtonDown() {
          console.log('1')
        }
        function onButtonUp() {
          console.log('2')
        }
        function onButtonOut() {
          console.log('3')
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.exe666.com/fe/image/couponrain/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  .anim {
    width: 100%;
    overflow: hidden;
  }
}
</style>


