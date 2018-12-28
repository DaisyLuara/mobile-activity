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
import { $wechat, isInWechat, wechatShareTrack, Cookies, sendCoupon, checkGetCoupon } from "services";
import { normalPages } from "@/mixins/normalPages";
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
        //通用变量
        let [url, as_width, as_height, game_start] = [CDNURL + '/fe/image/couponrain/', app.screen.width, app.screen.height, false]
        //第二屏计时使用到的变量
        let bigNUm = 3
        //第三屏 红包游戏变量
        let [game_time, game_score] = [15, 0]//游戏时间与游戏积分
        let aliens = [];
        let totalDudes = 16;
        // 背景
        let bg = getNewSpriteImage(url + 'Background.png', {}, app.stage)//红色背景图片
        //新建容器1, 2, 3
        let container1 = getNewContainer({ x: 0, y: 0, width: as_width, height: as_height }, app.stage)
        let container3 = getNewContainer({ x: 0, y: 0, width: as_width, height: as_height }, app.stage)
        let container2 = getNewContainer({ x: 0, y: 0, width: as_width, height: as_height }, app.stage) //容器二  倒计时
        container1.visible = true
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
        let bigText = getNewText(bigNUm, bigStyle, as_width * 0.5, as_height * 0.5, container2)
        bigText.anchor.set(0.5)
        //容器三，游戏界面
        let gold = getNewSpriteImage(url + 'gold.png', { x: as_width / 2, y: as_height / 2, width: as_width * 0.18, height: as_width * 0.18 / 133 * 70 }, container3)//元宝
        gold.anchor.set(0.5, 0.5)
        let cover = getNewSpriteImage(url + 'cover.png', { y: -as_height * 0.1, width: as_width, height: as_height * 1.1 }, container3)//cover图as_width / 750 * 1334
        let style1 = new PIXI.TextStyle({
          fontFamily: '黑体',
          fontSize: 18,
          fill: ['#e8c044'],
          stroke: '#942013',
          letterSpacing: 2,
          strokeThickness: 3,
          dropShadow: true,
          dropShadowBlur: 2,
          dropShadowColor: '#981d15',
        })
        let style2 = new PIXI.TextStyle({
          fontFamily: '黑体',
          fontSize: 30,
          fill: ['#e8c044'],
          stroke: '#942013',
          letterSpacing: 2,
          strokeThickness: 3,
          dropShadow: true,
          dropShadowBlur: 2,
          dropShadowColor: '#981d15',
        })
        //红包
        getNewRed()
        let time_name = getNewText('游戏时间', style1, 20, 20, container3)
        let score_name = getNewText('游戏积分', style1, as_width - 15, 20, container3)
        score_name.anchor.set(1, 0)
        let timeText = getNewText(game_time, style2, 20, 43, container3)
        let scoreText = getNewText(game_score, style2, as_width - 15, 43, container3)
        scoreText.anchor.set(1, 0)

        //新建容器和设置他们的基本属性
        function getNewContainer(args, parent) {
          let container = new PIXI.Container()
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
        function getNewText(text, style, x, y, parent) {
          let txt = new PIXI.Text(text, style)
          txt.x = x;
          txt.y = y;
          parent.addChild(txt)
          return txt
        }
        function getNewRed() {
          for (let i = 0; i < totalDudes; i++) {
            let x = Math.random() * as_width * 0.85
            let y = Math.random() * as_height
            let dude = getNewSpriteImage(url + 'red.png', { x: x, y: y, width: as_width * 0.15, height: as_width * 0.15 / 122 * 162 }, container3)
            dude.direction = Math.random() * Math.PI / 2;
            dude.speed = 2 + Math.random() * 2;
            dude.interactive = true
            dude.buttonMode = true
            dude.on('click', onButtonUp).on('touchend', onButtonUp)
            aliens.push(dude)
          }
        }
        //动作
        function onCheckScene() {
          container1.visible = false
          container3.visible = true
          container2.visible = true
          let timer = setInterval(function () {
            if (bigNUm == 0) {
              clearInterval(timer)
              container2.visible = false
              game_start = true
              deleteTime()
              bigNUm = 3
              return
            }
            bigText.text = --bigNUm
          }, 1000)
        }
        //15秒计时
        function deleteTime() {
          let timer = setInterval(function () {
            if (game_time == 0) {
              clearInterval(timer)
              return
            }
            game_time--
            timeText.text = game_time
          }, 1000)
        }
        function onButtonDown() {
        }
        function onButtonUp(e) {
          if (game_time > 0) {
            game_score += 25
            scoreText.text = game_score
            e.target.x = Math.random() * as_width * 0.85
            e.target.y = -Math.random() * as_height
          }

        }
        app.ticker.add(function () {
          if (!game_start || game_time == 0) {
            return
          }
          for (let i = 0; i < aliens.length; i++) {
            let dude = aliens[i]
            dude.y += 3 + Math.cos(dude.direction) * dude.speed;
            if (dude.y > as_height) {
              dude.x = Math.random() * as_width * 0.85
              dude.y = Math.random() * as_height * 0.25 - as_height * 0.2
            }
          }
        });
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


