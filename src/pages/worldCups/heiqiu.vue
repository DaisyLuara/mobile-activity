<template>
  <!-- eslint-disable -->
  <div
    v-if="loadingDone === true"
    :style="style.root"
    class="hj-root">

    <div class="root-rule" v-if="control.currentMenu === 1">
       <img 
        class="rule-img"
        src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card/next.png" />
        <img 
          :style="style.icon"
          src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card/act2.png" />
    </div>


    <div class="root-game" v-show="control.currentMenu === 2">
      <!-- top img -->
      <img 
        class="root-topimg"
        :src="this.baseUrl + 'bg1.png'" />
      <!-- mid photo -->
      <div
        :style="style.photoOuter" 
        class="root-photo">
        <img 
          :style="style.logo"
          :src="this.baseUrl + 'logo.png'" />
        <img
          :style="style.remind"
          :src="this.baseUrl + 'remind.png'" />
          <div class="inner-photo">
            <img
            :style="style.innerPhoto"
            :src="this.bindImage" />
          </div>
      </div>
      <!-- power -->
      <div
        :style="style.power" 
        class="root-power">
        <div
          :style="style.powerItem" 
          :class="{'power-item p':control.l === 1, 'power-item':control.l === 0}">
          <div
            class="item-numbers">
            <img
              v-for="(item, index) in String(bindData.l)"
              :key="index"
              :style="style.number" 
              :src="baseUrl + item + '.png'" />
          </div>
          <img 
            :style="style.numberLabel" 
            :src="baseUrl + 'power.png'" />
        </div>
        <div
          :style="style.balanceItem" 
          :class="{'balance-item p':control.r === 1, 'balance-item':control.r === 0}">
          <div
            class="item-numbers">
            <img
              v-for="(item, index) in String(bindData.r)"
              :key="index"
              :style="style.number" 
              :src="baseUrl + item + '.png'" />
          </div>
          <img 
            :style="style.numberLabel" 
            :src="baseUrl + 'balance.png'" />
        </div>

      </div>

      <!-- real photo -->
      <img 
        :src="bindImage"
        class="top-img"/>
    </div>

    <div class="root-rule" v-if="control.currentMenu === 3">
      <img 
        class="rule-img"
        src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card/rule.png" />
    </div>

    <GameMenu />
  </div>
</template>

<script>
const wiw = window.innerWidth
import marketService from 'services/marketing'
import { Toast, Indicator } from 'mint-ui'
import GameMenu from './components/gameMenu'
export default {
  components: {
    GameMenu
  },
  data() {
    const baseUrl =
      'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/'
    return {
      loadingDone: false,
      style: {
        root: {
          width: wiw + 'px',
          height: window.innerHeight + 'px',
          backgroundSize: wiw + 'px '
        },
        power: {
          width: wiw + 'px',
          height: 0.36 * wiw + 'px'
        },
        powerItem: {
          width: 0.36 * wiw + 'px',
          height: 0.36 * wiw + 'px',
          backgroundSize: 0.36 * wiw + 'px ' + 0.36 * wiw + 'px'
        },
        balanceItem: {
          width: 0.36 * wiw + 'px',
          height: 0.36 * wiw + 'px',
          backgroundSize: 0.36 * wiw + 'px ' + 0.36 * wiw + 'px'
        },
        photoOuter: {
          width: 55 / 75 * wiw + 'px',
          height: 970 / 566 * 55 / 75 * wiw + 'px',
          position: 'relative'
        },
        logo: {
          position: 'absolute',
          width: 0.506 * wiw + 'px',
          top: -(0.506 * wiw * 220 / 410 / 2) + 'px',
          left: (55 / 75 * wiw - 0.506 * wiw) / 2 + 'px'
        },
        remind: {
          position: 'absolute',
          width: 126 / 750 * wiw + 'px',
          left: (55 / 75 * wiw - 126 / 750 * wiw) / 2 + 'px',
          bottom: -(126 / 750 * wiw * 169 / 133 / 2) + 'px'
        },
        number: {
          width: 0.08 * wiw + 'px',
          marginLeft: -0.01 * wiw + 'px'
        },
        numberLabel: {
          width: 0.1 * wiw + 'px'
        },
        innerPhoto: {
          width: '100%'
        },
        control: {
          l: false,
          r: false
        },
        icon: {
          width: window.innerWidth * 0.3 + 'px',
          position: 'absolute',
          top: '35%',
          left: window.innerWidth * 0.35 + 'px'
        }
      },
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/',
      control: {
        l: 0,
        r: 0,
        currentMenu: 2
      },
      bindImage: '',
      bindData: {
        l: 0,
        r: 0
      },
      gamerst: null
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      this.handleNext()
    } else {
      this.Init()
    }
  },
  methods: {
    Init() {
      if (localStorage.getItem('wc_heijiu') === null) {
        this.handleAuth()
      } else {
        let wc_store = JSON.parse(localStorage.getItem('wc_heijiu'))
        if (!wc_store.game_ids.includes(String(this.$route.query.game_id))) {
          this.handleAuth()
        } else {
          this.getUserData()
        }
      }
    },
    handleAuth() {
      if (localStorage.getItem('wc_heijiu') === null) {
        let storeData = {
          game_ids: [],
          id: this.$route.query.id
        }
        storeData.game_ids.push(String(this.$route.query.game_id))
        localStorage.setItem('wc_heijiu', JSON.stringify(storeData))
      } else {
        let storeData = JSON.parse(localStorage.getItem('wc_heijiu'))
        storeData.game_ids.push(String(this.$route.query.game_id))
        storeData.id = this.$route.query.id
        localStorage.setItem('wc_heijiu', JSON.stringify(storeData))
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
        String(this.$route.query.game_id)

      this.$http.get(rq, { withCredentials: true }).then(r => {
        // console.dir(r)
        if (r.data.hasOwnProperty('data')) {
          let score = r.data.data.games.total
          this.gamerst = r.data.data.games.played
          this.bindData.l = Number(score.strength)
          this.bindData.r = Number(score.balance)
          this.handleNext()
        } else {
          Indicator.open()
          if (localStorage.getItem('wc_heijiu') !== null) {
            let storeData = JSON.parse(localStorage.getItem('wc_heijiu'))
            if (storeData.hasOwnProperty('try_times')) {
              if (storeData.try_times > 2) {
                Toast('数据生成中，请稍后刷新')
                delete storeData.try_times
              } else {
                storeData.try_times = storeData.try_times + 1
                localStorage.setItem('wc_heijiu', JSON.stringify(storeData))
                setTimeout(() => {
                  location.reload()
                }, 2000)
              }
            } else {
              storeData.try_times = 1
              localStorage.setItem('wc_heijiu', JSON.stringify(storeData))
              setTimeout(() => {
                location.reload()
              }, 2000)
            }
          }
        }
      })
    },
    handleNext() {
      this.loadingDone = true
      this.getInfoById()
      let ltime = parseInt(this.bindData.l / 100 * 10000)
      let rtime = parseInt(this.bindData.r / 100 * 10000)

      setTimeout(() => {
        this.control.l = 1
      }, ltime)
      setTimeout(() => {
        this.control.r = 1
      }, rtime)
    },
    getInfoById() {
      if (this.$route.query.hasOwnProperty('id')) {
        let id = this.$route.query.id
        let that = this
        marketService
          .getInfoById(this, id)
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
        football = {}
      for (let item of this.gamerst) {
        if (item.belong === 'starfuse') {
          starfuse.id = item.id
          starfuse.face_id = item.face_id
        }
        if (item.belong === 'football') {
          football.id = item.id
          football.face_id = item.face_id
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
      } else if (index === 1 && football.hasOwnProperty('id')) {
        let new_url =
          window.location.origin +
          '/marketing/wc_shemen?id=' +
          String(football.face_id) +
          '&game_id=' +
          String(football.id)
        window.location.href = new_url
      } else if (index === 2 || index === 3) {
        return
      } else {
        Toast('你还没有玩过这个游戏')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/';
.hj-root {
  background-image: url('@{imgServerUrl}bg2.png');
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  .root-game {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-size: contain;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    .root-topimg {
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 2;
    }
    .root-photo {
      z-index: 3;
      border: solid 3px #325f32;
      background-color: white;
      .inner-photo {
        @diff : 10px;
        width: calc(~'100% - @{diff}');
        margin: 5px;
        border: 1px solid black;
        height: calc(~'100% - @{diff}');
        overflow: hidden;
      }
    }
    .root-power {
      z-index: 4;
      position: absolute;
      bottom: 2%;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .power-item {
        animation: linear tineng 10s forwards;
        transition-property: all;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item-numbers {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        &.p {
          animation-play-state: paused;
        }
      }
      .balance-item {
        animation: linear pingheng 10s forwards;
        transition-property: all;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item-numbers {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        &.p {
          animation-play-state: paused;
        }
      }
      background-size: contain;
    }
    .top-img {
      width: 80vw;
      height: 100vh;
      z-index: 1000;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .root-rule {
    .rule-img {
      width: 80%;
    }
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
@keyframes tineng {
  0% {
    background-image: url('@{imgServerUrl}tn/power01.png');
  }
  2% {
    background-image: url('@{imgServerUrl}tn/power02.png');
  }
  4% {
    background-image: url('@{imgServerUrl}tn/power03.png');
  }
  6% {
    background-image: url('@{imgServerUrl}tn/power04.png');
  }
  7% {
    background-image: url('@{imgServerUrl}tn/power05.png');
  }
  8% {
    background-image: url('@{imgServerUrl}tn/power06.png');
  }
  9% {
    background-image: url('@{imgServerUrl}tn/power07.png');
  }
  13% {
    background-image: url('@{imgServerUrl}tn/power08.png');
  }
  14% {
    background-image: url('@{imgServerUrl}tn/power09.png');
  }
  18% {
    background-image: url('@{imgServerUrl}tn/power10.png');
  }
  22% {
    background-image: url('@{imgServerUrl}tn/power11.png');
  }
  26% {
    background-image: url('@{imgServerUrl}tn/power12.png');
  }
  30% {
    background-image: url('@{imgServerUrl}tn/power13.png');
  }
  33% {
    background-image: url('@{imgServerUrl}tn/power14.png');
  }
  36% {
    background-image: url('@{imgServerUrl}tn/power15.png');
  }
  40% {
    background-image: url('@{imgServerUrl}tn/power16.png');
  }
  44% {
    background-image: url('@{imgServerUrl}tn/power17.png');
  }
  47% {
    background-image: url('@{imgServerUrl}tn/power18.png');
  }
  50% {
    background-image: url('@{imgServerUrl}tn/power19.png');
  }
  53% {
    background-image: url('@{imgServerUrl}tn/power20.png');
  }
  57% {
    background-image: url('@{imgServerUrl}tn/power21.png');
  }
  60% {
    background-image: url('@{imgServerUrl}tn/power22.png');
  }
  63% {
    background-image: url('@{imgServerUrl}tn/power23.png');
  }
  67% {
    background-image: url('@{imgServerUrl}tn/power24.png');
  }
  70% {
    background-image: url('@{imgServerUrl}tn/power25.png');
  }
  73% {
    background-image: url('@{imgServerUrl}tn/power26.png');
  }
  76% {
    background-image: url('@{imgServerUrl}tn/power27.png');
  }
  79% {
    background-image: url('@{imgServerUrl}tn/power28.png');
  }
  81% {
    background-image: url('@{imgServerUrl}tn/power29.png');
  }
  84% {
    background-image: url('@{imgServerUrl}tn/power30.png');
  }
  86% {
    background-image: url('@{imgServerUrl}tn/power31.png');
  }
  88% {
    background-image: url('@{imgServerUrl}tn/power32.png');
  }
  90% {
    background-image: url('@{imgServerUrl}tn/power33.png');
  }
  92% {
    background-image: url('@{imgServerUrl}tn/power34.png');
  }
  96% {
    background-image: url('@{imgServerUrl}tn/power35.png');
  }
  98% {
    background-image: url('@{imgServerUrl}tn/power36.png');
  }
  100% {
    background-image: url('@{imgServerUrl}tn/power37.png');
  }
}
@keyframes pingheng {
  0% {
    background-image: url('@{imgServerUrl}ph/balance01.png');
  }
  2% {
    background-image: url('@{imgServerUrl}ph/balance02.png');
  }
  4% {
    background-image: url('@{imgServerUrl}ph/balance03.png');
  }
  6% {
    background-image: url('@{imgServerUrl}ph/balance04.png');
  }
  7% {
    background-image: url('@{imgServerUrl}ph/balance05.png');
  }
  8% {
    background-image: url('@{imgServerUrl}ph/balance06.png');
  }
  9% {
    background-image: url('@{imgServerUrl}ph/balance07.png');
  }
  13% {
    background-image: url('@{imgServerUrl}ph/balance08.png');
  }
  14% {
    background-image: url('@{imgServerUrl}ph/balance09.png');
  }
  18% {
    background-image: url('@{imgServerUrl}ph/balance10.png');
  }
  22% {
    background-image: url('@{imgServerUrl}ph/balance11.png');
  }
  26% {
    background-image: url('@{imgServerUrl}ph/balance12.png');
  }
  30% {
    background-image: url('@{imgServerUrl}ph/balance13.png');
  }
  33% {
    background-image: url('@{imgServerUrl}ph/balance14.png');
  }
  36% {
    background-image: url('@{imgServerUrl}ph/balance15.png');
  }
  40% {
    background-image: url('@{imgServerUrl}ph/balance16.png');
  }
  44% {
    background-image: url('@{imgServerUrl}ph/balance17.png');
  }
  47% {
    background-image: url('@{imgServerUrl}ph/balance18.png');
  }
  50% {
    background-image: url('@{imgServerUrl}ph/balance19.png');
  }
  53% {
    background-image: url('@{imgServerUrl}ph/balance20.png');
  }
  57% {
    background-image: url('@{imgServerUrl}ph/balance21.png');
  }
  60% {
    background-image: url('@{imgServerUrl}ph/balance22.png');
  }
  63% {
    background-image: url('@{imgServerUrl}ph/balance23.png');
  }
  67% {
    background-image: url('@{imgServerUrl}ph/balance24.png');
  }
  70% {
    background-image: url('@{imgServerUrl}ph/balance25.png');
  }
  73% {
    background-image: url('@{imgServerUrl}ph/balance26.png');
  }
  76% {
    background-image: url('@{imgServerUrl}ph/balance27.png');
  }
  79% {
    background-image: url('@{imgServerUrl}ph/balance28.png');
  }
  81% {
    background-image: url('@{imgServerUrl}ph/balance29.png');
  }
  84% {
    background-image: url('@{imgServerUrl}ph/balance30.png');
  }
  86% {
    background-image: url('@{imgServerUrl}ph/balance31.png');
  }
  88% {
    background-image: url('@{imgServerUrl}ph/balance32.png');
  }
  90% {
    background-image: url('@{imgServerUrl}ph/balance33.png');
  }
  92% {
    background-image: url('@{imgServerUrl}ph/balance34.png');
  }
  96% {
    background-image: url('@{imgServerUrl}ph/balance35.png');
  }
  98% {
    background-image: url('@{imgServerUrl}ph/balance36.png');
  }
  100% {
    background-image: url('@{imgServerUrl}ph/balance37.png');
  }
}
</style>
