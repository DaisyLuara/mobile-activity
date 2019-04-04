<template>
  <!-- eslint-disable -->
  <!-- isAbandoned -->
  <div
    v-if="loadingDone === true"
    :style="style.root"
    class="root-sm"
  >
    <GameMenu />

    <img
      :src="bindImage"
      v-if="control.currentMenu === 1"
      class="root-real-photo"
    />

    <div
      v-if="control.currentMenu === 1"
      class="root-head-img"
    >

      <img :src="this.baseUrl + 'sm-header.png'" />

      <div
        :style="style.headScore"
        class="head-score"
      >
        <div
          v-for="(item, index) in score.toString()"
          :key="index"
          style="height: 100%"
        >
          <img
            style="height: 100%"
            :src="baseUrl + 'df/' + item + '.png'"
          />
        </div>
      </div>

      <div
        :style="style.headPlayer"
        class="head-player"
      >
        <div
          style="height: 100%"
          v-for="(item, index) in player.toString()"
          :key="index"
        >
          <img
            style="height: 100%"
            :src="baseUrl + 'df/' + item + '.png'"
          />
        </div>
      </div>

      <div class="head-l">
        <img
          :style="style.leftArrow"
          :src="this.baseUrl + 'sm-l-1.png'"
        />
      </div>

      <div class="head-r">
        <img
          :style="style.rightArrow"
          :src="this.baseUrl + 'rm-r-1.png'"
        />
      </div>
    </div>

    <div class="root-header" />

    <div
      :style="style.mid"
      :class="{'root-mid hasBg':control.currentMenu === 1, 'root-mid offBg': control.currentMenu !== 1}"
    >

      <!-- 1 -->
      <div
        v-if="control.currentMenu === 1"
        class="mid-game"
      >
        <!-- cover photo -->
        <img
          class="mid-photo"
          :src="bindImage"
        />

        <div class="mid-l-s">
        </div>

        <div class="mid-r-s">
        </div>

        <div
          class="mid-mj"
          :style="style.mj"
        >
          <img
            style="position: absolute; z-index: 20"
            :src="this.baseUrl + 'sm-mj.png'"
          />

          <canvas
            style="width: 100%; z-index: 20; position: absolute"
            id="canvas-left"
          />

          <canvas
            style="width: 100%; z-index: 30; position: absolute"
            id="canvas-left-min"
          />

          <div :style="style.mj1">
            <span
              style="display:inline-block"
              v-for="(item, index) in this.mj.toString()"
              :key="index"
            >
              <img :src="baseUrl + 'mt/' + item + '.png'" />
            </span>
          </div>
        </div>

        <div
          class="mid-tl"
          :style="style.tl"
        >
          <img
            style="position: absolute; z-index: 20"
            :src="this.baseUrl + 'sm-tl.png'"
          />

          <canvas
            style="width: 100%; z-index: 20; position: absolute"
            id="canvas-right"
          />

          <canvas
            style="width: 100%; z-index: 30; position: absolute"
            id="canvas-right-min"
          />
          <div :style="style.tl1">
            <span
              style="display:inline-block"
              v-for="(item, index) in this.tl.toString()"
              :key="index"
            >
              <img :src="baseUrl + 'mt/' + item + '.png'" />
            </span>
          </div>

        </div>

        <img
          class="mid-card"
          :style="style.card"
          :src="this.baseUrl + 'sm-card.png'"
        />

        <img
          v-if="this.title === 0"
          class="mid-card-text"
          :style="style.cardText"
          :src="this.baseUrl + 'word-1.png'"
        />

        <img
          v-if="this.title === 1"
          class="mid-card-text"
          :style="style.cardText"
          :src="this.baseUrl + 'word-2.png'"
        />

        <img
          v-if="this.title === 2"
          class="mid-card-text"
          :style="style.cardText"
          :src="this.baseUrl + 'word-3.png'"
        />

        <img
          v-if="this.title === 3"
          class="mid-card-text"
          :style="style.cardText"
          :src="this.baseUrl + 'word-4.png'"
        />

        <img
          v-if="this.title === 4"
          class="mid-card-text"
          :style="style.cardText"
          :src="this.baseUrl + 'word-5.png'"
        />

        <img
          v-if="this.title < 0 || this.title > 4"
          class="mid-card-text"
          :style="style.cardText"
          :src="this.baseUrl + 'word-5.png'"
        />

      </div>

      <!-- 3 -->
      <div
        class="mid-game"
        style="width: 80%"
        v-if="control.currentMenu === 3"
      >
        <img
          class="rule-img"
          src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card/rule.png"
        />
      </div>
    </div>

    <div class="root-footer" />
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import GameMenu from './components/gameMenu'
import { normalPages } from '@/mixins/normalPages'
const wiw = window.innerWidth
export default {
  components: {
    GameMenu
  },
  mixins: [normalPages],
  data() {
    return {
      loadingDone: false,
      bindImage: null,
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/',
      style: {
        root: {
          minHeight: window.innerHeight + 'px',
          maxHeight: window.innerHeight + 'px'
        },
        mid: {},
        mj: {
          width: window.innerWidth * 200 / 750 + 'px'
        },
        tl: {
          width: window.innerWidth * 200 / 750 + 'px'
        },
        card: {
          width: window.innerWidth * 0.6 + 'px'
        },
        cardText: {
          width: window.innerWidth * 0.6 + 'px',
          zIndex: '40'
        },
        leftArrow: {
          position: 'absolute',
          top: window.innerWidth * 15 / 750 + 'px',
          left: window.innerWidth * 20 / 750 + 'px',
          width: window.innerWidth * 100 / 750 + 'px'
        },
        rightArrow: {
          position: 'absolute',
          top: window.innerWidth * 15 / 750 + 'px',
          right: window.innerWidth * 20 / 750 + 'px',
          width: window.innerWidth * 100 / 750 + 'px'
        },
        headScore: {
          position: 'absolute',
          top: wiw * 8 / 750 + 'px',
          right: wiw * 260 / 750 + 'px',
          width: wiw * 0.08 + 'px',
          height: wiw * 0.034 + 'px',
          display: 'flex',
          zIndex: '30'
        },
        headPlayer: {
          position: 'absolute',
          top: wiw * 45 / 750 + 'px',
          right: wiw * 340 / 750 + 'px',
          height: wiw * 0.03 + 'px',
          width: wiw * 0.08 + 'px',
          display: 'flex',
          zIndex: '30'
        },
        mj1: {
          position: 'absolute',
          top: window.innerWidth * 75 / 750 + 'px',
          left: window.innerWidth * 85 / 750 + 'px',
          width: window.innerWidth * 30 / 750 + 'px',
          zIndex: '30',
          display: 'flex'
        },
        mj2: {
          position: 'absolute',
          top: window.innerWidth * 80 / 750 + 'px',
          left: window.innerWidth * 100 / 750 + 'px',
          width: window.innerWidth * 20 / 750 + 'px',
          zIndex: '30'
        },
        tl1: {
          position: 'absolute',
          top: window.innerWidth * 75 / 750 + 'px',
          left: window.innerWidth * 90 / 750 + 'px',
          width: window.innerWidth * 30 / 750 + 'px',
          zIndex: '30',
          display: 'flex'
        }
      },
      score: 1000,
      player: 100,
      mj: 30,
      tl: 30,
      mjadd: 34,
      tladd: 45,
      control: {
        currentMenu: 1
      },
      title: -1,
      gamerst: null,
      game_id: null
    }
  },
  watch: {
    parms() {
      this.game_id = this.parms.game_id
      if (process.env.NODE_ENV !== 'development') {
        this.Init()
      } else {
        this.loadingDone = true
      }
    }
  },
  created() {
    this.InitBasic()
    if (process.env.NODE_ENV !== 'development') {
      this.Init()
    } else {
      this.loadingDone = true
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.handleNext()
    }
    this.getInfoById()
  },
  methods: {
    InitBasic() {
      document.title = '吹气射门'
      this.style.mid.height = window.innerWidth * 1334 / 750 + 'px'
    },
    handleNext() {
      this.handleDrawCircleLeftBase()
      this.handleDrawCircleLeftMin()
      this.handleDrawCircleRightBase()
      this.handleDrawCircleRightMin()
    },
    Init() {
      if (localStorage.getItem('wc_shemen') === null) {
        this.handleAuth()
      } else {
        let wc_store = JSON.parse(localStorage.getItem('wc_shemen'))
        if (!wc_store.game_ids.includes(String(this.game_id))) {
          this.handleAuth()
        } else {
          this.getUserData()
        }
      }
    },
    handleAuth() {
      if (localStorage.getItem('wc_shemen') === null) {
        let storeData = {
          game_ids: [],
          id: this.$route.query.id
        }
        storeData.game_ids.push(String(this.game_id))
        localStorage.setItem('wc_shemen', JSON.stringify(storeData))
      } else {
        let storeData = JSON.parse(localStorage.getItem('wc_shemen'))
        storeData.game_ids.push(String(this.game_id))
        storeData.id = this.$route.query.id
        localStorage.setItem('wc_shemen', JSON.stringify(storeData))
      }

      // console.log(window.location.href)
      let now_url = encodeURIComponent(String(window.location.href))

      // console.dir(now_url)
      let redirct_url =
        process.env.WX_API +
        '/wx/officialAccount/oauth?url=' +
        now_url +
        '&scope=snsapi_userinfo'
      // 这狗娘养的参数必须拼在后面
      // console.dir(redirct_url)
      window.location.href = redirct_url
    },
    getUserData() {
      let rq =
        process.env.WX_API +
        '/wx/officialAccount/user?game_id=' +
        String(this.game_id)

      this.$http.get(rq, { withCredentials: true }).then(r => {
        // console.dir(r)
        if (r.data.hasOwnProperty('data')) {
          this.loadingDone = true
          this.gamerst = r.data.data.games.played
          let score = r.data.data.games
          this.score = score.total.score
          this.player = Math.floor(Math.random() * (1000 - 1) + 1)
          this.mjadd = score.total.agile
          this.tladd = score.total.strength
          this.mj = parseInt(score.total.agile) - parseInt(score.latest.agile)
          this.tl =
            parseInt(score.total.strength) - parseInt(score.latest.strength)
          this.title = Math.floor(Math.random() * (5 - 1) + 1)
          this.handleNext()
        } else {
          Indicator.open()
          if (localStorage.getItem('wc_shemen') !== null) {
            let storeData = JSON.parse(localStorage.getItem('wc_shemen'))
            if (storeData.hasOwnProperty('try_times')) {
              if (storeData.try_times > 2) {
                Toast('数据生成中，请稍后刷新')
                delete storeData.try_times
              } else {
                storeData.try_times = storeData.try_times + 1
                localStorage.setItem('wc_shemen', JSON.stringify(storeData))
                setTimeout(() => {
                  location.reload()
                }, 2000)
              }
            } else {
              storeData.try_times = 1
              localStorage.setItem('wc_shemen', JSON.stringify(storeData))
              setTimeout(() => {
                location.reload()
              }, 2000)
            }
          }
        }
      })
    },
    processStartAngle(score) {
      return (score - 50) * 3 / 2 * Math.PI
    },
    processEndAngle(score) { },
    drawCircle(circleObj) {
      let ctx = circleObj.ctx
      ctx.beginPath()
      ctx.arc(
        circleObj.x,
        circleObj.y,
        circleObj.radius,
        circleObj.startAngle,
        circleObj.endAngle,
        true
      )
      //设定曲线粗细度
      ctx.lineWidth = circleObj.lineWidth
      //给曲线着色
      ctx.strokeStyle = circleObj.color
      //连接处样式
      // ctx.lineCap = 'round'
      //给环着色
      ctx.stroke()
      ctx.closePath()
    },
    handleDrawCircleLeftBase() {
      let canvasLeft = document.getElementById('canvas-left')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 50 * canvasLeft.width / 100,
        y: 48 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle =
        -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.mjadd / 100
      circleObj.endAngle = Math.PI * 2 * 0.5 - Math.PI * 1 / 4
      circleObj.color = '#e24464'
      this.drawCircle(circleObj)
    },
    handleDrawCircleLeftMin() {
      let canvasLeft = document.getElementById('canvas-left-min')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 50 * canvasLeft.width / 100,
        y: 48 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle = -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.mj / 100
      circleObj.endAngle = Math.PI * 3 / 4
      circleObj.color = '#22B5E7'
      this.drawCircle(circleObj)
    },
    handleDrawCircleRightBase() {
      let canvasLeft = document.getElementById('canvas-right')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 52.5 * canvasLeft.width / 100,
        y: 49 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle =
        -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.tladd / 100

      circleObj.endAngle = Math.PI * 3 / 4
      circleObj.color = '#e24464'
      this.drawCircle(circleObj)
    },
    handleDrawCircleRightMin() {
      let canvasLeft = document.getElementById('canvas-right-min')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 52.5 * canvasLeft.width / 100,
        y: 49 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle = -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.tl / 100

      circleObj.endAngle = Math.PI * 3 / 4
      circleObj.color = '#22B5E7'
      this.drawCircle(circleObj)
    },
    getInfoById() {
      if (this.$route.query.hasOwnProperty('id')) {
        let id = this.$route.query.id
        let that = this
        getInfoById(id)
          .then(res => {
            that.bindImage = res.image
          })
          .catch(err => {
            Toast('网络错误，请重试')
          })
      } else {
        Toast('没有照片id')
      }
    },
    SwitchMenu(index) {
      this.control.currentMenu = index
      let starfuse = {},
        hijiu = {}
      for (let item of this.gamerst) {
        if (item.belong === 'starfuse') {
          starfuse.id = item.id
          starfuse.face_id = item.face_id
        }
        if (item.belong === 'hijiu') {
          hijiu.id = item.id
          hijiu.face_id = item.face_id
        }
      }
      if (index === 0 && starfuse.hasOwnProperty('id')) {
        let new_url =
          window.location.origin +
          '/marketing/wc_card?id=' +
          String(starfuse.face_id) +
          '&game_id=' +
          String(starfuse.id)
        window.location.href = new_url
      } else if (index === 2 && hijiu.hasOwnProperty('id')) {
        let new_url =
          window.location.origin +
          '/marketing/wc_hj?id=' +
          String(hijiu.face_id) +
          '&game_id=' +
          String(hijiu.id)
        window.location.href = new_url
      } else if (index === 1 || index === 3) {
        return
      } else {
        Toast('你还没有玩过这个游戏')
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
@imgServerUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup";

.root-sm {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  .root-real-photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
  }
  .root-head-img {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    &.hasBg {
      background-image: url("@{imgServerUrl}/sm-bg.png");
    }
    &.offBg {
      background-color: black;
    }
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .mid-game {
      width: 100%;
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .rule-img {
        width: 80%;
      }
      .mid-photo {
        z-index: -1;
        width: 80%;
      }
      .mid-l-s {
        position: absolute;
        bottom: 0;
        width: 100px;
        height: 100px;
        z-index: 20;
        .circle {
          stroke: rgb(53, 157, 218);
          stroke-width: 5;
          fill: none;
        }
      }
      .mid-mj {
        position: absolute;
        bottom: 37.2%;
        left: 7%;
      }
      .mid-tl {
        position: absolute;
        bottom: 37.2%;
        right: 7%;
      }
      .mid-card {
        position: absolute;
        bottom: -22%;
      }
      .mid-card-text {
        position: absolute;
        bottom: -22%;
      }
    }
  }

  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    position: relative;
    width: 100%;
    background-color: black;
  }
  .root-footer {
    flex-grow: 1;
    flex-shrink: 1;
    position: relative;
    width: 100%;
    background-color: black;
  }
}
</style>
