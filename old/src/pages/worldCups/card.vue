<template>
  <!-- eslint-disable -->
  <!-- isAbandoned -->
  <div
    v-if="loadingDone === true"
    :style="style.root"
    class="card-root"
  >
    <div
      v-if="control.currentMenu === 0"
      :style="style.pic"
    >
      <img
        class="root-pic-inner"
        style="height: 100%;"
        :src="this.baseUrl + 'header.png'"
      />
    </div>
    <div
      :style="style.power"
      :class="{'show': this.control.powerStatus, 'hide': !this.control.powerStatus}"
      class="mid-power"
    >
      <Spider
        v-if="control.loadingData === false"
        :powerData="bindData"
        :width="style.bindWith"
        :style="style.spider"
      />
      <img
        @click="handlePowerStatusChange"
        class="power-img"
        :src="this.baseUrl + (this.control.powerStatus ? 'nav1.png' : 'nav2.png')"
      />
      <img
        style="width: 100%"
        :src="this.baseUrl + 'power.png'"
      />
    </div>

    <game-menu />
    <div class="root-header">

    </div>

    <div
      v-show="control.currentMenu === 0"
      :style="style.mid"
      class="root-mid"
    >

      <img
        :src="imgUrl"
        class="real-photo"
      />
      <img
        :src="baseUrl + 'light-left.png'"
        class="mid-left"
      />

      <img
        :src="baseUrl + 'light-right.png'"
        class="mid-right"
      />

      <div
        :style="style.casediv"
        class="mid-case-div"
      >
        <div class="scan-area">
          <img
            :src="baseUrl + 'scan.png'"
            class="mid-scan"
          />
        </div>
        <img
          :src="baseUrl + 'kuang.png'"
          class="mid-case"
        />

        <img
          :src="imgUrl"
          class="mid-photo"
        />
      </div>

    </div>

    <div
      v-show="control.currentMenu === 1"
      :style="style.mid"
      class="root-mid"
    >
      <img
        style="width: 80%"
        :src="baseUrl + 'card/next.png'"
      />
      <img
        :style="style.comming"
        :src="baseUrl + 'card/act2.png'"
      />
    </div>

    <div
      v-show="control.currentMenu === 2"
      :style="style.mid"
      class="root-mid"
    >
      <img
        style="width: 80%"
        :src="baseUrl + 'card/next.png'"
      />
      <img
        :style="style.comming"
        :src="baseUrl + 'card/act3.png'"
      />
    </div>

    <div
      v-show="control.currentMenu === 3"
      :style="style.mid"
      class="root-mid"
    >
      <img
        style="width: 80%"
        :src="baseUrl + 'card/rule.png'"
      />
    </div>

    <div class="root-bottom" />
  </div>
</template>

<script>
import GameMenu from './components/gameMenu'
import Spider from './components/spider'
import { Toast, Indicator } from 'mint-ui'
import { normalPages } from '@/mixins/normalPages'
export default {
  components: {
    GameMenu,
    Spider
  },
  mixins: [normalPages],
  data() {
    return {
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/',
      style: {
        pic: {
          position: 'absolute',
          zIndex: 10,
          left: '0',
          bottom: '0',
          top: '0',
          right: '0',
          margin: '0 auto',
          width: '100%',
          height: '10%'
        },
        power: {
          top: '0px'
        },
        root: {
          minHeight: window.innerHeight + 'px',
          maxHeight: window.innerHeight + 'px'
        },
        casediv: {
          height: '0px'
        },
        mid: {},
        spider: {
          position: 'absolute',
          left: '0',
          bottom: '0',
          top: '0',
          right: '0',
          margin: '0 auto'
        },
        comming: {
          width: window.innerWidth * 0.3 + 'px',
          position: 'absolute',
          top: '35%',
          left: window.innerWidth * 0.35 + 'px'
        },
        bindWith: 0
      },
      bindData: [
        ['point1', 0],
        ['point2', 0],
        ['point3', 0],
        ['point4', 0],
        ['point5', 0]
      ],
      control: {
        powerStatus: false,
        currentMenu: 0,
        loadingData: true
      },
      imgUrl: '',
      gamerst: null,
      loadingDone: false,
      game_id: null,
    }
  },
  created() {

    document.title = '球星卡'
    this.style.mid.height = window.innerWidth * 1124 / 690 + 'px'
    this.style.casediv.height = window.innerWidth * 0.9 * 1130 / 659 + 'px'
    this.style.bindWith = window.innerWidth * 0.65
    this.style.power.top =
      window.innerHeight - window.innerWidth * 0.8 * 0.2 + 'px'
    if ((window.innerHeight - window.innerWidth * 1124 / 690) / 2 > 0) {
      this.style.pic.top =
        (window.innerHeight - window.innerWidth * 1124 / 690) / 2 + 'px'
    }
  },
  wacth: {
    parms() {
      this.game_id = this.parms.game_id
      if (localStorage.getItem('wc_card') === null) {
        this.handleAuth()
      } else {
        let wc_store = JSON.parse(localStorage.getItem('wc_card'))
        if (!wc_store.game_ids.includes(String(this.game_id))) {
          this.handleAuth()
        } else {
          this.getUserData()
        }
      }

    }
  },
  mounted() {
    this.getPhoto()
  },
  methods: {
    handleAuth() {
      if (localStorage.getItem('wc_card') === null) {
        let storeData = {
          game_ids: [],
          id: this.$route.query.id
        }
        storeData.game_ids.push(String(this.game_id))
        localStorage.setItem('wc_card', JSON.stringify(storeData))
      } else {
        let storeData = JSON.parse(localStorage.getItem('wc_card'))
        storeData.game_ids.push(String(this.game_id))
        storeData.id = this.$route.query.id
        localStorage.setItem('wc_card', JSON.stringify(storeData))
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
          let score = r.data.data.games.init
          this.gamerst = r.data.data.games.played
          this.bindData = [
            ['point1', Number(score.intelligence)],
            ['point2', Number(score.strength)],
            ['point3', Number(score.balance)],
            ['point4', Number(score.agile)],
            ['point5', Number(score.face_score)]
          ]
          this.control.loadingData = false
        } else {
          Indicator.open()
          if (localStorage.getItem('wc_card') !== null) {
            let storeData = JSON.parse(localStorage.getItem('wc_card'))
            if (storeData.hasOwnProperty('try_times')) {
              if (storeData.try_times > 2) {
                Toast('数据生成中，请稍后刷新')
                delete storeData.try_times
              } else {
                storeData.try_times = storeData.try_times + 1
                localStorage.setItem('wc_card', JSON.stringify(storeData))
                setTimeout(() => {
                  location.reload()
                }, 2000)
              }
            } else {
              storeData.try_times = 1
              localStorage.setItem('wc_card', JSON.stringify(storeData))
              setTimeout(() => {
                location.reload()
              }, 2000)
            }
          }
        }
      })
    },
    getPhoto() {
      if (this.$route.query.hasOwnProperty('id')) {
        getInfoById(this.$route.query.id)
          .then(res => {
            if (res.code !== null) {
              this.imgUrl = res.code
            } else {
              this.imgUrl = res.image
            }
          })
          .catch(err => {
            Toast(err)
          })
      } else if (
        JSON.parse(localStorage.getItem('wc_card')).hasOwnProperty('id')
      ) {
        getInfoById(JSON.parse(localStorage.getItem('wc_card')).id)
          .then(res => {
            if (res.code !== null) {
              this.imgUrl = res.code
            } else {
              this.imgUrl = res.image
            }
          })
          .catch(err => {
            Toast(err)
          })
      } else {
        Toast('无法获得照片信息')
      }
    },
    handlePowerStatusChange() {
      if (this.control.powerStatus) {
        this.style.power.top =
          window.innerHeight - window.innerWidth * 0.8 * 0.2 + 'px'
      } else {
        this.style.power.top =
          window.innerHeight - window.innerWidth * 0.8 + 'px'
      }
      this.control.powerStatus = !this.control.powerStatus
    },
    SwitchMenu(index) {
      this.control.currentMenu = index
      let hijiu = {},
        football = {}
      for (let item of this.gamerst) {
        // console.dir(item)
        if (item.belong === 'football') {
          football.id = item.id
          football.face_id = item.face_id
        }
        if (item.belong === 'hijiu') {
          hijiu.id = item.id
          hijiu.face_id = item.face_id
        }
      }
      // console.dir(hijiu)
      // console.dir(football)

      if (index === 1 && football.hasOwnProperty('id')) {
        let new_url =
          window.location.origin +
          '/marketing/wc_shemen?id=' +
          String(football.face_id) +
          '&game_id=' +
          String(football.id)
        window.location.href = new_url
      } else if (index === 2 && hijiu.hasOwnProperty('id')) {
        let new_url =
          window.location.origin +
          '/marketing/wc_hj?id=' +
          String(hijiu.face_id) +
          '&game_id=' +
          String(hijiu.id)
        window.location.href = new_url
      } else if (index === 0 || index === 3) {
        return
      } else {
        Toast('你还没有玩过这个游戏')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup";
@keyframes flash {
  from {
    top: -20%;
    opacity: 1;
  }

  to {
    top: 120%;
    opacity: 0;
  }
}
@keyframes scanFlash {
  from {
    top: -30%;
  }
  to {
    top: 50%;
  }
}
@keyframes photoFlash {
  from {
    top: -30%;
  }
  to {
    top: 5%;
  }
}
.card-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  .root-pic-inner {
    position: absolute;
    top: 1%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: auto;
  }
  .mid-power {
    position: absolute;
    width: 80%;
    left: 10%;
    min-height: 100px;
    transition: ease-in 0.2s;
    z-index: 10000;
    .power-img {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 7%;
      margin: 0 auto;
      width: 15%;
    }
  }
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-image: url("@{imgServerUrl}/bg_mid.png");
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #131314;
    overflow: hidden;
    .real-photo {
      position: absolute;
      width: 83%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 100;
      opacity: 0;
    }
    .mid-left {
      position: absolute;
      left: 0;
      width: 5%;
      animation: flash infinite 1s;
      animation-timing-function: linear;
    }
    .mid-right {
      width: 10%;
      position: absolute;
      right: 0;
      width: 5%;
      animation: flash infinite 1s;
      animation-timing-function: linear;
    }

    .mid-case-div {
      width: 86%;
      left: 5%;
      position: absolute;
      top: 5%;
      z-index: 9;
      overflow: hidden;
      .scan-area {
        height: 90%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .mid-scan {
          position: absolute;
          top: -100%;
          width: 80%;
          left: 10%;
          animation: 1s scanFlash forwards;
          animation-timing-function: linear;
          animation-delay: 0.5s;
          z-index: 8;
        }
      }

      .mid-case {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
      }
      .mid-photo {
        width: 80%;
        left: 10%;
        top: 7%;
        position: absolute;
        z-index: 7;
      }
    }
  }
  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url("@{imgServerUrl}/bg_top.png");
    background-size: cover;
    width: 100%;
    position: relative;
  }
  .root-bottom {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url("@{imgServerUrl}/bg_bottom.png");
    background-size: cover;
    width: 100%;
  }
}
</style>
