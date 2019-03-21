<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="main">
      <img
        v-show="toshow"
        :src="photo"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const IMG_SERVER = process.env.CDN_URL + '/'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      base_url: IMG_SERVER + 'image/loveqixi',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      photo: null,
      toshow: false,
      img_list: [
        IMG_SERVER + 'image/loveqixi/word.png',
        IMG_SERVER + 'image/loveqixi/light.png',
        IMG_SERVER + 'image/loveqixi/dark.png',
        IMG_SERVER + 'image/loveqixi/circle.png',
        IMG_SERVER + 'image/loveqixi/save.png'
      ],
      //分享
      wxShareInfoValue: {
        title: '才子佳人 爱在七夕',
        desc: '牛郎织女测出你的CP属性',
        link: 'http://papi.xingstation.com/api/s/yP7' + window.location.search,
        imgUrl: IMG_SERVER + 'image/loveqixi/share.png',
      }
    }
  },
  mounted() {
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.loadImage(this.img_list)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadImage(arr) {
      let that = this,
        count = 0
      arr.push(that.photo)
      for (let i = 0; i < arr.length; i++) {
        let img = new Image()
        img.src = arr[i]
        img.onload = function () {
          count++
          if (count == arr.length) {
            that.showCanvas(that.photo)
          }
        }
      }
    },
    showCanvas(image) {
      import('pixi.js').then(PIXI => {
        let that = this
        let content = document.querySelector('.content')
        let main = document.querySelector('.main')
        let base = IMG_SERVER + 'image/loveqixi'
        let app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          transparent: true
        })
        main.appendChild(app.view)
        let width = app.screen.width
        let height = app.screen.height
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerHeight)

        //container
        let container = new PIXI.Container()
        container.width = width
        container.height = height
        container.position.set(0, 0)
        container.interactive = true
        container.buttonMode = true
        //点击祈福文本
        let word = PIXI.Sprite.fromImage(base + '/word.png')
        word.anchor.set(0.5, 0)
        word.position.set(width / 2, height * 0.12)
        word.width = width * 0.625
        word.height = word.width / 459 * 160
        //灯笼
        let light = PIXI.Sprite.fromImage(base + '/light.png')
        light.anchor.set(0.5, 0)
        light.position.set(width / 2, height * 0.41)
        light.width = width * 0.85
        light.height = light.width / 659 * 650
        let dark = PIXI.Sprite.fromImage(base + '/dark.png')
        dark.anchor.set(0.5, 0)
        dark.position.set(width / 2, height * 0.41)
        dark.width = width * 0.85
        dark.height = dark.width / 659 * 650
        //圆圈
        let circle = PIXI.Sprite.fromImage(base + '/circle.png')
        circle.anchor.set(0.5, 0.5)
        circle.width = width * 0.45
        circle.height = width * 0.45
        circle.position.set(
          width / 2,
          light.y + light.height * 0.1 + circle.height / 2
        )
        //照片
        let img = PIXI.Sprite.fromImage(image)
        img.anchor.set(0.5, 0)
        img.position.set(width / 2, light.y + light.height * 0.92)
        img.width = width * 0.887
        img.height = img.width / 1080 * 1920
        //边框
        let border = new PIXI.Graphics()
        border.lineStyle(4, 0xffffff, 1)
        border.drawRect(img.x - img.width / 2, img.y, img.width, img.height)

        //保存图片
        let save = PIXI.Sprite.fromImage(base + '/save.png')
        save.anchor.set(0.5, 0)
        save.position.set(width / 2, img.y + img.height * 0.9)
        save.width = width * 0.43
        save.height = save.width / 320 * 59
        app.stage.addChild(word)
        container.addChild(light)
        container.addChild(dark)
        container.addChild(circle)
        container.addChild(img)
        container.addChild(border)
        container.addChild(save)
        app.stage.addChild(container)
        container.alpha = 0
        dark.alpha = 0
        light.alpha = 1
        let scale_num = 0,
          is_play = false,
          speed = 0,
          margin = 0,
          count = 0,
          l_flag = true
        container.on('pointerdown', onClick)
        let total_height = img.height + light.height / 6

        app.ticker.add(function () {
          if (container.alpha < 1) {
            container.alpha += 0.01
            return
          }
          toCircle()
          if (is_play) {
            toTop()
          }
          count++
          if (count % 200 < 25) {
            return
          }
          if (count % 200 >= 25 && count % 200 < 100) {
            dark.alpha += 0.014
            return
          }
          if (count % 200 >= 125 && count % 200 < 175) {
            dark.alpha -= 0.013
            return
          }
          if (count % 200 >= 175) {
            dark.alpha = 0
            return
          }
        })
        function toCircle() {
          scale_num += 0.03
          circle.scale.set(0.1 + Math.sin(scale_num) / 2)
        }
        function onClick() {
          is_play = true
          word.visible = false
        }
        function toTop() {
          speed += Math.random() * Math.random()
          if (app.view.height < total_height) {
            app.renderer.resize(width, total_height)
          }
          if (container.y > -img.y + light.height * 0.08) {
            container.y -= speed
          } else {
            that.toshow = true
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: "http://cdn.exe666.com/image/loveqixi";
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
  font-size: 0;
  text-align: center;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{imgUrl}/bg.png");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
  .main {
    .photo {
      pointer-events: auto;
      user-select: auto;
      width: 88.5%;
      position: absolute;
      top: 4%;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
}
</style>


