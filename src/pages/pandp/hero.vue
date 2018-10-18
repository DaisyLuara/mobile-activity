<template>
  <div
    style="style.root"
    class="content">
    <img
      :src="base + 'bg.png'"
      class="bg">
    <span
      class="score">{{score}}</span>
    <div
      class="main">
      <div 
        class="mleft">
        <img
          :src="base + 'frame.png'"
          class="frame">
        <span>{{score}}</span>
        <div
          id="play">
        </div>
        <div
          class="text">
          <img
            :src="base + 'text.png'">
        </div>
      </div>
      <div 
        class="mright">
        <ul>
          <li> 
            <img
              :src="base + 'c' + sex_group[gender][0] +'.png'"
              class="pic">
            <img
              :src="base + (locked[sex_group[gender][0]]?'unlock':'locked')+'.png'"
              class="lock">
          </li>
          <li> 
            <img
              :src="base + 'c' + sex_group[gender][1] +'.png'"
              class="pic">
            <img
              :src="base + (locked[sex_group[gender][1]]?'unlock':'locked')+'.png'"
              class="lock">
          </li>
        </ul>
      </div>
    </div>
    <div
      class="list">
      <ul 
        class="rank-ul">
        <li v-for="(item,index) in 4" :key="item.id" >
          <img
            :src="base + 't' + item + '.png'"
            class="icon_cover">
          <img
            v-if="item===4"
            :src="base + num + '.png'"
            class="icon_num">
          <img
            :src="icon[index]"
            class="icon_img">
          <span>{{rank_score[index]}}</span>
        </li>
      </ul>
    </div>
    <div
      v-show="mask"
      class="mask"
      @click="()=>{mask=false;note=false;}">
      <div
        v-show="note"
        class="note">
        <img
          :src="base + 'note.png'">
      </div>
    </div>
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  wechatShareTrack
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/super_hero/',
      locked: ['', false, false, false, false],
      sex_group: ['', ['1', '2'], ['3', '4']],
      gender: this.$route.query.gender, //性别
      role: this.$route.query.role, //角色
      score: this.$route.query.score, //分数
      mask: true,
      note: true,
      photo: null,
      icon: [],
      rank_score: ['100', '98.6', '97'],
      params: {
        userId: null,
        id: this.$route.query.id,
        belong: this.$route.query.utm_campaign
      },
      rank_url: process.env.SAAS_API + '/game/rank',
      sign: null,
      data: null,
      num: 7,
      //微信分享
      wxShareInfoValue: {
        title: '超级英雄',
        desc: '超级英雄',
        link: 'http://papi.xingstation.com/api/s/X6m' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/super_hero/icon.jpg',
        success: () => {
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
    this.checkLocked()
    this.playAnim()
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_userinfo'
        window.location.href = redirct_url
      } else {
        this.sign = Cookies.get('sign')
        this.params.userId = Cookies.get('user_id')
        this.isGetPhoto()
      }
    },
    checkLocked() {
      let that = this
      if (localStorage.getItem('shero_role1')) {
        this.locked[1] = true
      }
      if (localStorage.getItem('shero_role2')) {
        this.locked[2] = true
      }
      if (localStorage.getItem('shero_role3')) {
        this.locked[3] = true
      }
      if (localStorage.getItem('shero_role4')) {
        this.locked[4] = true
      }
      this.locked[this.role] = true
      localStorage.setItem('shero_role' + that.role, that.role)
    },
    isGetPhoto() {
      if (this.photo) {
        cancelAnimationFrame(timer)
        this.userGame()
        this.icon[3] = this.photo
      }
      let timer = requestAnimationFrame(this.isGetPhoto)
    },
    userGame() {
      let args = {
        belong: this.params.belong,
        gender: this.gender,
        image_url: this.photo,
        score: this.score,
        qiniu_id: this.params.id
      }
      userGame(args, this.params.userId)
        .then(res => {
          this.getGradeList()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGradeList() {
      let query = '?belong=' + this.params.belong
      this.$http
        .get(this.rank_url + query)
        .then(res => {
          console.log(res)
          this.data = res.data.data.slice(0, 3)
          this.rank_score[0] = this.data[0].score
          this.rank_score[1] = this.data[1].score
          this.rank_score[2] = this.data[2].score
          this.con[0] = this.data[0].imgUrl
          this.con[1] = this.data[1].imgUrl
          this.con[2] = this.data[2].imgUrl
          console.log(this.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    playAnim() {
      import('pixi.js').then(PIXI => {
        let type = 'WebGL'
        if (!PIXI.utils.isWebGLSupported()) {
          type = 'canvas'
        }
        PIXI.utils.sayHello(type)
        let play_div = document.getElementById('play')
        let width = play_div.innerWidth
        let height = play_div.innerHeight
        let app = new PIXI.Application(width, height, {
          antialias: true,
          transparent: true
        })
        play_div.appendChild(app.view)
        app.renderer.autoResize = true
        app.renderer.resize(width, height)
        app.stop()
        if (this.role == 1) {
          PIXI.loader
            .add('spritesheet', 'required/assets/mc.json')
            .load(function() {
              var role1 = [],
                i
              for (i = 0; i < 26; i++) {
                var texture = PIXI.Texture.fromFrame(
                  'Explosion_Sequence_A ' + (i + 1) + '.png'
                )
                role1.push(texture)
              }
              for (i = 0; i < 50; i++) {
                // create an explosion AnimatedSprite
                var explosion = new PIXI.extras.AnimatedSprite(role1)

                explosion.x = Math.random() * app.screen.width
                explosion.y = Math.random() * app.screen.height
                explosion.anchor.set(0.5)
                explosion.rotation = Math.random() * Math.PI
                explosion.scale.set(0.75 + Math.random() * 0.5)
                explosion.gotoAndPlay(Math.random() * 27)
                app.stage.addChild(explosion)
              }

              app.start()
            })
          return
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@base: 'http://cdn.exe666.com/fe/image/super_hero/';
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
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .score {
    color: antiquewhite;
    font-size: 7vw;
    position: absolute;
    top: 12%;
    left: 61%;
    z-index: 999;
  }
  .main {
    position: absolute;
    top: 17%;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 9;
    .mleft {
      width: 69.5%;
      float: left;
      margin-left: 3%;
      position: relative;
      .frame {
        position: relative;
        z-index: 0;
      }
      span {
        display: inline-block;
        position: absolute;
        top: 18.5%;
        left: 12%;
        width: 11vw;
        height: 6vw;
        line-height: 6vw;
        font-size: 4vw;
        color: #fff;
        z-index: 9999;
      }
      #play {
        position: absolute;
        right: 0.5%;
        top: 15.5%;
        border: solid 1px red;
        width: 65%;
        height: 82%;
        z-index: 99;
      }
      .text {
        position: absolute;
        bottom: 2%;
        right: 0.5%;
        width: 94%;
        z-index: 999;
      }
    }
    .mright {
      width: 25%;
      float: right;
      margin-right: 2%;
      position: relative;
      ul,
      li {
        display: inline-block;
        width: 100%;
        position: relative;
      }
      ul {
        margin-top: -1%;
      }
      li {
        .pic {
          position: relative;
          z-index: 0;
        }
        .lock {
          position: absolute;
          width: 40%;
          top: 50%;
          left: 70%;
          transform: translate(-50%, -50%);
          z-index: 9;
        }
      }
    }
  }
  .list {
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 65%;
    left: 0%;
    z-index: 99;
    height: 32.5%;
    .rank-ul {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 0;
      li {
        display: inline-block;
        width: 100%;
        height: 24%;
        position: relative;
        overflow: hidden;
        &:last-child {
          height: 28%;
          margin-top: 2%;
        }
        .icon_cover {
          width: 33%;
          position: absolute;
          left: 4%;
          top: 8%;
          z-index: 99;
        }
        .icon_num {
          width: 3%;
          position: absolute;
          left: 7%;
          top: 31%;
          z-index: 999;
        }
        .icon_img {
          position: absolute;
          left: 21.5%;
          top: 23.2%;
          width: 12vw;
          height: 12vw;
          border: solid 1px green;
          z-index: 0;
          border-radius: 15px;
        }
        span {
          position: absolute;
          top: 50%;
          left: 70%;
          transform: translate(0, -50%);
          font-size: 6vw;
          color: #fff;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .note {
      width: 100%;
    }
  }
}
</style>


