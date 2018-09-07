<template>
  <div 
    :style="style.root"
    class="content">
    <img 
      :src="base+'frame.png'"
      class="cover">
    <div 
      id="vdiv"/>
    <div 
      class="task-group">
      <img 
        :src="origin + 'proj/' + task.left + '.png'"
        class="left">
      <img 
        :src="origin +'proj/' + task.right + '.png'"
        class="right">
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  $wechat,
  wechatShareTrack,
  getWxUserInfo,
  createGame,
  getInfoById,
  getGame
} from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      origin: IMG_SERVER + '/image/zhongqiu/',
      base: IMG_SERVER + '/image/zhongqiu/3/',
      userId: null,
      belong: this.$route.query.utm_campaign,
      task: {
        left: '11',
        right: '22'
      },
      video: null,
      //微信分享
      wxShareInfoValue: {
        title: '中秋快乐',
        desc: '月饼被谁吃了',
        link: 'http://papi.xingstation.com/api/s/1wR' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/3/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
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
    this.getInfoById()
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
        this.createGame(this.belong, this.userId)
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.video = res.url
          this.playVideo(res.url)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          this.getGame(userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGame(userId) {
      let that = this
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list, userId) {
      let data = list
      data.map(r => {
        if (r.belong === 'MoonCakeFactory') {
          this.task.left = '1'
        }
        if (r.belong === 'GroceryShop') {
          this.task.left = '2'
        }
      })
    },
    handlePost() {
      let oid = this.$route.query.utm_source
      let belong = this.belong
      let id = this.$route.query.id
      let voice = ''
      let url = {
        cakeID: 0,
        voice: voice,
        people_type: this.people
      }
      this.$http
        .post(
          'http://exelook.com:8010/pushdiv/?oid=' +
            oid +
            '&belong=WhoTakeMoonCake' +
            '&id=' +
            id +
            '&url=' +
            Json.stringify(url) +
            '&name=&image=&api=json'
        )
        .then(res => {})
        .catch(err => {})
    },
    playVideo(url) {
      import('pixi.js').then(PIXI => {
        let app = new PIXI.Application(window.innerWidth, window.innerHeight, {
          transparent: true
        })
        document.getElementById('vdiv').appendChild(app.view)
        app.renderer.autoResize = true
        app.renderer.resize(window.innerWidth, window.innerHeight)
        app.view.style.position = 'absolute'
        app.view.style.top = '5%'
        app.view.style.left = '0%'
        app.view.style.zIndex = '0'
        let button = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRoundedRect(0, 0, 100, 100, 10)
          .endFill()
          .beginFill(0xffffff)
          .moveTo(36, 30)
          .lineTo(36, 70)
          .lineTo(70, 50)
        button.x = (app.screen.width - button.width) / 2
        button.y = (app.screen.height - button.height) / 2
        button.interactive = true
        button.buttonMode = true

        let texture = PIXI.Texture.fromVideo(url)
        //'http://cdn.exe666.com/1007/video/WhoTakeMoonCake_235_96_1492926959345.mp4'
        let videoSprite = new PIXI.Sprite(texture)
        videoSprite.width = app.screen.width
        videoSprite.height = app.screen.height
        app.stage.addChild(videoSprite)
        button.on('pointertap', function() {
          app.stop()
        })
        app.stage.addChild(button)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@base: 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/3/';

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
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #281765;
  position: relative;
  background-color: #69339b;
  .cover {
    width: 100%;
    position: relative;
    z-index: 999;
  }
  .task-group {
    width: 100%;
    overflow: hidden;
    margin-top: 5%;
    margin-bottom: 10%;
    img {
      width: 46%;
    }
    .left {
      float: left;
      margin-left: 3%;
    }
    .right {
      float: right;
      margin-right: 3%;
    }
  }
}
</style>


