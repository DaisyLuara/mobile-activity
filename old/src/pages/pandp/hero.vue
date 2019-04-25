<template>
  <div
    style="style.root"
    class="content">
    <img
      :src="base + 'bg.png'"
      class="bg">
    <span
      class="score">{{ score }}</span>
    <div
      class="main">
      <div 
        class="mleft">
        <img
          :src="base + 'frame.png'"
          class="frame">
        <span>{{ score }}</span>
        <div
          id="play"/>
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
        <li 
          v-for="(item,index) in 4" 
          :key="item.id" >
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
          <span>{{ rank_score[index] }}</span>
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
import { normalPages } from '@/mixins/normalPages'
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
      rank_score: [],
      params: {
        userId: null,
        id: this.$route.query.id,
        belong: this.$route.query.utm_campaign
      },
      rank_url: process.env.SAAS_API + '/game/rank',
      user_rank: process.env.SAAS_API + '/user/',
      sign: null,
      data: null,
      num: null,
      //微信分享
      wxShareInfoValue: {
        title: '超级英雄',
        desc: '超级英雄',
<<<<<<< HEAD:src/pages/pandp/hero.vue
        link: process.env.AD_API+'/api/s/X6m' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/super_hero/icon.jpg',
=======
        link: 'http://papi.xingstation.com/api/s/X6m' + window.location.search,
        imgUrl: 'http://cdn.xingstation.cn/fe/image/super_hero/icon.jpg',
>>>>>>> feature-master-to-dev:old/src/pages/pandp/hero.vue
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
          this.getRank(this.params.userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRank(userId) {
      let query = '?belong=' + this.params.belong + '&score=' + this.score
      this.$http
        .get(this.user_rank + userId + '/rank' + query)
        .then(res => {
          console.log('res.data.data')
          console.log(res.data)
          console.log(res.data.data)
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
        let that = this
        let play_div = document.getElementById('play')
        let width = play_div.clientWidth
        let height = play_div.clientHeight
        let app = new PIXI.Application(width, height, {
          antialias: true,
          transparent: true
        })
        play_div.appendChild(app.view)
        app.renderer.autoResize = true
        app.renderer.resize(width, height)
        let bg = imageSprite(that.base + 'test1/bg.png', 0, 0, width, height)

        if (this.role == 1) {
          playRole1()
          return
        }
        if (this.role == 2) {
          playRole2()
          return
        }
        if (this.role == 3) {
          playRole3()
          return
        }
        if (this.role == 4) {
          playRole4()
          return
        }

        // 动画
        function doAnimate(number, name, x, y, width, height, speed, start) {
          let frames = []
          for (let i = 0; i < number; i++) {
            let val = i < 10 ? '0' + i : i
            start === 1 && i === 0
              ? null
              : frames.push(PIXI.Texture.fromFrame(name + val + '.png'))
          }
          let anim = new PIXI.extras.AnimatedSprite(frames)
          anim.x = x
          anim.y = y
          anim.width = width
          anim.height = height
          anim.animationSpeed = speed
          anim.play()
          app.stage.addChild(anim)
          return anim
        }
        //设置样式
        function setAttribute(sprite, width, height, x, y) {
          sprite.width = width
          sprite.height = height
          ;(sprite.x = x), (sprite.y = y)
        }
        //循环获取帧
        function getFrames(number, name, type) {
          let frames = []
          for (let i = 0; i < number; i++) {
            let val = i < 10 ? '0' + i : i
            frames.push(PIXI.Texture.fromFrame(name + val + type))
          }
          return frames
        }
        //图片精灵
        function imageSprite(url, x, y, width, height) {
          let sprite = PIXI.Sprite.fromImage(url)
          sprite.x = x
          sprite.y = y
          sprite.width = width
          sprite.height = height
          app.stage.addChild(sprite)
          return sprite
        }
        //角色1，女机甲
        function playRole1() {
          PIXI.loader
            .add(that.base + 'test1/1/lightning1.json')
            .add(that.base + 'test1/1/lightning2.json')
            .add(that.base + 'test1/1/pifeng.json')
            .load(function(loader, res) {
              //披风
              let pifeng = doAnimate(
                21,
                'pifeng_00052_000',
                width * 0.1,
                height * 0.2,
                width * 0.8,
                (450 / 336) * width * 0.8,
                0.2
              )
              let lightning2 = doAnimate(
                36,
                'thunder2_2_000',
                0,
                0,
                width,
                height,
                0.5
              )
              //人
              let people = imageSprite(
                that.base + 'test1/1/people.png',
                0,
                0,
                width,
                height
              )
              //头部
              let kui = imageSprite(
                that.base + 'test1/1/toukui.png',
                width * 0.3,
                0,
                width * 0.4,
                (163 / 354) * width * 0.4
              )
              let head = imageSprite(
                that.base + 'test1/1/head.png',
                width * 0.41,
                height * 0.075,
                width * 0.2,
                (136 / 235) * width * 0.2
              )
              let pa = imageSprite(
                that.base + 'test1/1/pa.png',
                width * 0.42,
                height * 0.13,
                width * 0.18,
                (138 / 190) * width * 0.18
              )
              let lightning1 = doAnimate(36, '34_000', 0, 0, width, height, 0.5)
              app.ticker.add(function() {
                head.y > height * 0.05 ? (head.y -= 0.08) : height * 0.05
                pa.y < height * 0.2 ? (pa.y += 0.2) : height * 0.2
              })
            })
        }
        //角色2  雅典娜
        function playRole2() {
          PIXI.loader
            .add(that.base + 'test1/2/Athena.json')
            .add(that.base + 'test1/2/fires.json')
            .load(function(loader, res) {
              //人
              let people = imageSprite(
                that.base + 'test1/2/people.png',
                0,
                0,
                width,
                height
              )
              let fires = doAnimate(
                24,
                'FIRE_0',
                -width * 0.35,
                -height * 0.35,
                width,
                height,
                0.5
              )
              let Athena = doAnimate(
                24,
                'Athena_016_000',
                width * 0.35,
                -height * 0.02,
                width * 0.3,
                (215 / 121) * width * 0.3,
                0.4,
                1
              )
              Athena.loop = false
            })
        }
        //角色3  钢铁侠
        function playRole3() {
          PIXI.loader
            .add(that.base + 'test1/3/body1.json')
            .add(that.base + 'test1/3/head.json')
            .load(function(loader, res) {
              //人
              let people = doAnimate(
                46,
                'black 2_000',
                0,
                0,
                width,
                height,
                0.1,
                1
              )
              // let head1 = doAnimate(
              //   13,
              //   'maozi_00168_000',
              //   width * 0.3,
              //   height * 0.03,
              //   width * 0.4,
              //   (192 / 266) * width * 0.4,
              //   0.05
              // )
              let head2 = doAnimate(
                20,
                'man_053_00002_000',
                width * 0.41,
                height * 0.02,
                width * 0.2,
                (113 / 100) * width * 0.2,
                0.2
              )
              head2.loop = false
              people.loop = false
              // head1.loop = false
            })
        }
        //角色4  超人
        function playRole4() {
          PIXI.loader
            .add(that.base + 'test1/4/piao.json')
            .load(function(loader, res) {
              let pao = doAnimate(
                32,
                'piao_000',
                0,
                height * 0.12,
                width,
                (293 / 226) * width,
                0.5
              )
              //人
              let people = imageSprite(
                that.base + 'test1/4/people.png',
                (width - (284 / 846) * height) / 2,
                0,
                (284 / 846) * height,
                height
              )
              // let sao = imageSprite(
              //   that.base+'test1/4/sao.png',
              //   0,
              //   0,
              //   width,
              //   height
              // )
              let light = imageSprite(
                that.base + 'test1/4/light.png',
                0,
                0,
                width,
                height
              )
            })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@base: 'http://cdn.xingstation.cn/fe/image/super_hero/';
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
        width: 65%;
        height: 82%;
        z-index: 99;
        canvas {
          width: 100%;
          height: 100%;
        }
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


