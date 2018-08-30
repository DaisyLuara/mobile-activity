<template>
  <div 
    id="content"
    :style="style.root"
    class="content">
    <canvas 
      id="canvas">
      浏览器不支持canvas画布
    </canvas>
    <img 
      :src="img"
      class="img">
    <img 
      v-show="Boolean(img)"
      :src="base+'save.png'"
      class="save">
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  createGame,
  getGame
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const IMGSERVER = 'http://p22vy0aug.bkt.clouddn.com/image/'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      belong: this.$route.query.utm_campaign,
      userId: null,
      photo: null,
      img: null,
      star: null,
      base: IMGSERVER + 'pandp/pk/',
      //微信分享
      wxShareInfoValue: {
        title: '狗狗大作战',
        desc: '指挥你的狗狗PK，进击王者不是梦！',
        link: 'http://papi.xingstation.com/api/s/OYp' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/pandp/pk/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    alert(window.location.href)
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('user_id') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
        alert(this.userId)
        this.createGame(this.belong, this.userId)
        alert(window.location.href)
      }
    },
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          if (res.success) {
            this.getGame(userId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGame(userId) {
      let args = {
        belong: this.belong
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.star = res[0].total || res.data[0].total
          this.handleTimer()
        })
        .catch()
    },
    handleTimer() {
      if (this.photo) {
        cancelAnimationFrame(timer)
        this.drawCanvas()
        alert(this.photo)
        return
      }
      let timer = requestAnimationFrame(this.handleTimer)
    },
    drawCanvas() {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let that = this
      let photo = new Image()
      let cover = new Image()
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      photo.setAttribute('crossOrigin', 'Anonymous')
      cover.setAttribute('crossOrigin', 'Anonymous')
      photo.onload = function() {
        cover.onload = function() {
          canvas.width = cover.width
          canvas.height = cover.height
          ctx.drawImage(
            photo,
            0,
            0,
            photo.width,
            photo.height,
            cover.width * 0.4,
            cover.height * 0.02,
            cover.width * 0.2,
            cover.width * 0.2 / photo.width * photo.height
          )
          ctx.drawImage(cover, 0, 0)
          that.img = canvas.toDataURL('image/png')
        }
        cover.src =
          'http://p22vy0aug.bkt.clouddn.com/image/pandp/pk/star' +
          that.star +
          '.png'
      }
      photo.src = this.photo
    }
  }
}
</script>
<style lang="less" scoped>
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
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #5d16a2;
  position: relative;
  #canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: none;
  }
  .img {
    width: 100%;
    position: relative;
  }
  .save {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    pointer-events: none;
    user-select: none;
  }
}
</style>


