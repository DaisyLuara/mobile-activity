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
        let url = CDNURL + '/fe/image/couponrain/'
        let as_width = app.screen.width
        let as_height = app.screen.height;
        let aliens = [];
        let scores = 0
        let time = 21
        // let totalDudes = 20;

        // 背景设置
        let bg = PIXI.Sprite.fromImage(url + 'Background.png');
        bg.width = as_width
        bg.height = as_height
        bg.position.set(0, 0)
        app.stage.addChild(bg)
        //容器1，第一屏
        let container1 = new PIXI.Container()
        container1.width = as_width
        container1.height = as_height
        container1.position.set(0, 0)
        app.stage.addChild(container1)
        //猪图像
        let pig = PIXI.Sprite.fromImage(url + 'pig.png')
        pig.width = as_width
        pig.height = pig.width / 750 * 1086
        pig.position.set(0, -as_height * 0.04)
        //logo
        let logo = PIXI.Sprite.fromImage(url + 'logo.png')
        logo.width = as_width * 0.15
        logo.height = logo.width / 104 * 87
        logo.position.set(as_width * 0.83, as_height * 0.02)
        //按钮
        let button = PIXI.Sprite.fromImage(url + 'button.png')
        button.width = as_width * 0.8
        button.height = button.width / 608 * 158
        button.position.set(as_width * 0.1, as_height * 0.815)
        button.interactive = true;
        button.buttonMode = true
        button.on('click', onCheckScene).on('touchend', onCheckScene)

        //容器二  倒计时
        let container2 = new PIXI.Container()
        container2.width = as_width
        container2.height = as_height
        container2.position.set(0, 0);
        app.stage.addChild(container2)
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
        let bigText = new PIXI.Text(bigNUm, bigStyle)
        bigText.anchor.set(0.5)
        bigText.position.set(as_width / 2, as_height / 2)
        container2.addChild(bigText)
        //容器三，游戏界面
        let container3 = new PIXI.Container()
        container3.width = as_width
        container3.height = as_height
        container3.position.set(0, 0);
        //元宝
        let gold = PIXI.Sprite.fromImage(url + 'gold.png')
        gold.width = as_width * 0.18
        gold.height = gold.width / 133 * 70
        gold.anchor.set(0.5, 0.5)
        gold.position.set(as_width / 2, as_height / 2)
        //cover图
        let cover = PIXI.Sprite.fromImage(url + 'cover.png');
        cover.width = as_width
        cover.height = cover.width / 750 * 1334
        cover.position.set(0, -as_height * 0.1)
        app.stage.addChild(container3)

        container1.addChild(pig)
        container1.addChild(logo)
        container1.addChild(button)

        container3.addChild(gold)
        container3.addChild(cover)
        //红包
        for (let i = 0; i < 6; i++) {
          let dude = PIXI.Sprite.fromImage(url + 'red.png')
          dude.anchor.set(0.5);
          dude.width = as_width * 0.15;
          dude.height = dude.width / 122 * 162
          dude.x = dude.width / 2 + as_width * 0.15 * i + Math.random() * app.screen.width / 6;
          dude.y = Math.random() * app.screen.height * 2 / 3;
          dude.direction = Math.PI / 4;
          dude.speed = 2 + Math.random() * 2;
          dude.interactive = true;
          dude.buttonMode = true
          dude.on('pointerdown', onButtonDown)
            .on('pointerup', onButtonUp)
            .on('touchstart', onButtonDown)
            .on('touchend', onButtonUp)
          aliens.push(dude);
          container3.addChild(dude);
        }
        // container1.visible = true
        // container2.visible = false
        // container3.visible = false
        container1.visible = false
        container2.visible = false
        container3.visible = true
        app.ticker.add(function () {

          // for (let i = 0; i < aliens.length; i++) {

          //   let dude = aliens[i];
          //   dude.direction += dude.turningSpeed * 0.01;
          //   dude.x += Math.sin(dude.direction) * dude.speed;
          //   dude.y += Math.cos(dude.direction) * dude.speed;
          //   dude.rotation = -dude.direction - Math.PI / 2;

          //   if (dude.x < dudeBounds.x) {
          //     dude.x += dudeBounds.width;
          //   }
          //   else if (dude.x > dudeBounds.x + dudeBounds.width) {
          //     dude.x -= dudeBounds.width;
          //   }

          //   if (dude.y < dudeBounds.y) {
          //     dude.y += dudeBounds.height;
          //   }
          //   else if (dude.y > dudeBounds.y + dudeBounds.height) {
          //     dude.y -= dudeBounds.height;
          //   }
          // }
        });
        function onCheckScene() {
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


