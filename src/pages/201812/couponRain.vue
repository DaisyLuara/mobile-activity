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
    <div
      v-show="cshow"
      class="coupon"
    >
      <img
        :src="coupon_img"
        class="bg"
      >
      <div class="clip">
        <img
          :src="qrcodeImg"
          class="qrcodeImg"
        >
      </div>
      <img
        v-show="used"
        :src="base + 'used.png'"
        class="used"
      >
    </div>
    <img
      v-show="cshow"
      :src="base + 'print.png'"
      class="hint"
    >
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
      id: this.$route.query.id,
      used: false,
      userId: null,
      cshow: false,//true
      coupon_img: null,//'https://cdn.exe666.com/fe/image/couponrain/Lee.png',
      qrcodeImg: null,// 'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      //微信分享
      wxShareInfoValue: {
        title: "高能预警！一大波“红包雨”强势来袭！",
        desc: "拼手速，抢抢抢抢抢抢连卡福新春红包",
        link: "http://papi.xingstation.com/api/s/K8r" + window.location.search,
        imgUrl: CDNURL + "/fe/image/couponrain/share.jpg",
      }
    };
  },
  watch: {
    parms() {
      this.checkGetCoupon()
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
    this.doAnimate()
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
      }
    },
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
        //通用变量
        let that = this
        let [url, as_width, as_height, game_start] = [CDNURL + '/fe/image/couponrain/', app.screen.width, app.screen.height, false];
        //容器
        let container1 = null, container2 = null, container3 = null;
        //精灵
        let [bg, title, pig, logo, button, gold, cover, red, graphics] = []
        //文本
        let [bigText, time_name, score_name, timeText, scoreText, addText] = []
        //第二屏计时使用到的变量
        let bigNUm = 3
        //第三屏 红包游戏变量
        let [game_time, game_score] = [15, 0]//游戏时间与游戏积分
        let aliens = [];
        let totalDudes = 16;
        //文本变量
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
        PIXI.loader
          .add([
            url + 'Background.png',
            url + 'title.json',
            url + 'pigbg.png',
            url + 'logo.png',
            url + 'down.png',
            url + 'cover.png',
            url + 'red.png',
          ])
          .load(setup)
        function setup() {
          // 背景
          bg = getNewSpriteImage(url + 'Background.png', {}, app.stage)//红色背景图片
          //新建容器1, 2, 3
          container1 = getNewContainer({ x: 0, y: 0, width: as_width, height: as_height }, app.stage)
          container3 = getNewContainer({ x: 0, y: 0, width: as_width, height: as_height }, app.stage)
          container2 = getNewContainer({ x: 0, y: 0, width: as_width, height: as_height }, app.stage) //容器二  倒计时
          container1.visible = true
          container2.visible = false
          container3.visible = false
          container2.interactive = true
          container2.buttonMode = true
          //容器一
          pig = getNewSpriteImage(url + 'pigbg.png', { y: -as_height * 0.04, height: as_width / 750 * 1068 }, container1)//猪年大吉图像
          logo = getNewSpriteImage(url + 'logo.png', { x: as_width * 0.83, y: as_height * 0.02, width: as_width * 0.15, height: as_width * 0.15 / 104 * 87 }, container1)
          title = getAnimation('title_000', 0, 12, { x: as_width * 0.12, y: as_height * 0.01, width: as_width * 0.76, height: as_width * 0.76 / 584 * 254 }, container1)
          title.animationSpeed = 0.4
          button = getNewSpriteImage(url + 'down.png', { x: as_width * 0.1, y: as_height * 0.815, width: as_width * 0.8, height: as_width * 0.8 / 608 * 158 }, container1) //按钮
          button.interactive = true
          button.buttonMode = true
          button.on('click', onCheckScene).on('touchend', onCheckScene)
          //容器二  倒计时
          graphics = new PIXI.Graphics()
          graphics.beginFill(0x000000, 0.5)
          graphics.drawRect(0, 0, as_width, as_height)
          graphics.endFill()
          container2.addChild(graphics)

          bigText = getNewText(bigNUm, bigStyle, as_width * 0.5, as_height * 0.5, container2)
          bigText.anchor.set(0.5)
          //容器三，游戏界面
          cover = getNewSpriteImage(url + 'cover.png', { y: -as_height * 0.1, width: as_width, height: as_height * 1.1 }, container3)//cover图as_width / 750 * 1334

          //红包
          getNewRed()
          time_name = getNewText('游戏时间', style1, 20, 20, container3)
          score_name = getNewText('游戏积分', style1, as_width - 15, 20, container3)
          score_name.anchor.set(1, 0)
          timeText = getNewText(game_time, style2, 20, 43, container3)
          scoreText = getNewText(game_score, style2, as_width - 15, 43, container3)
          scoreText.anchor.set(1, 0)
          addText = getNewText('+25', style2, as_width * 0.48, as_height * 0.65, container3)

          addText.alpha = 0
          addText.scale.set(1.2)
        }

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
          // let sprite = PIXI.Sprite.fromImage(url)
          let sprite = new PIXI.Sprite(PIXI.loader.resources[url].texture)
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
        //新建动画
        function getAnimation(name, start, length, args, parent) {
          let frames = []
          for (let i = start; i < length; i++) {
            let val = i < 10 ? '0' + i : i;
            frames.push(PIXI.Texture.fromFrame(name + val + '.png'))
          }
          let anim = new PIXI.extras.AnimatedSprite(frames)
          anim.x = args.x
          anim.y = args.y
          anim.width = args.width
          anim.height = args.height
          anim.animationSpeed = 0.5;
          anim.play()
          parent.addChild(anim)
          return anim
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
              that.cshow = true
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
            addText.x = as_width * 0.35 + Math.random() * as_width * 0.15
            addText.y = as_height * 0.4 + Math.random() * as_height * 0.4
            addText.alpha = 1
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
          addText.alpha -= 0.02
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
    },
    //判断是否领过优惠券
    checkGetCoupon() {
      let coupon_batch_id = this.coupon_batch_id
      let args = {
        coupon_batch_id: coupon_batch_id,
        include: 'couponBatch',
        qiniu_id: this.id
      }
      checkGetCoupon(args).then(res => {
        console.log(res)
        if (res) {
          this.handleData(res)
        } else {
          this.sendCoupon()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendCoupon() {
      let coupon_batch_id = this.coupon_batch_id
      let args = {
        include: 'couponBatch',
        qiniu_id: this.id,
        oid: this.oid,
        belong: this.belong
      }
      sendCoupon(args, coupon_batch_id)
        .then(res => {
          console.log('sendCoupon', res)
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url
      this.coupon_img = res.couponBatch.image_url
      if (parseInt(res.status) === 1) {
        this.used = true
      }
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
    position: relative;
    z-index: 9;
  }
  .coupon {
    width: 58.5%;
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    .bg {
      position: relative;
      z-index: 0;
    }
    .clip {
      width: 23.5vw;
      height: 23.5vw;
      overflow: hidden;
      position: absolute;
      top: 66%;
      left: 50.5%;
      z-index: 9;
      transform: translateX(-50%);
      text-align: center;
    }
    .qrcodeImg {
      position: absolute;
      width: 31vw;
      max-width: 35vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .used {
      position: absolute;
      width: 26vw;
      top: 68%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }
  }
  .hint {
    width: 25%;
    position: absolute;
    top: 55%;
    right: 4%;
    z-index: 999;
  }
  #pcanvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: none;
  }
}
</style>


