<template>
  <div
    :style="style.root"
    class="root"
    @click="handleEvent"
  >
    <img 
      class="root-bg"
      src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lottie/lottie-bg.png"
      @touchstart="handleStopBubble"
    >
    <div
      id="animation"
      class="animation"
    />
    <img
      v-if="photoUrl !== null"
      :style="style.photo"
      :src="photoUrl + this.$qiniuCompress()"
      class="photo"
    >
    <div
      :style="style.score"
      class="score"
    >
      <span>{{ score.portugal }}</span>
      <span>{{ score.argentina }}</span>
      <span>{{ score.germany }}</span>
      <span>{{ score.brazil }}</span>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import {
  $wechat,
  isInWechat,
  basicTrack,
  wechatShareTrack,
  getInfoById
} from 'services'
const imgUrl = process.env.CDN_URL
export default {
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        score: {
          top: window.innerWidth * 2.014 + 'px'
        },
        photo: {}
      },
      photoUrl: null,
      wxShareInfo: {
        title: '激情世界杯 2018',
        desc: '巅峰对决',
        imgUrl: imgUrl + '/fe/marketing/img/wc/share-icon.png',
        success: () => {
          wechatShareTrack()
        }
      },
      score: {
        portugal: '0',
        argentina: '0',
        germany: '0',
        brazil: '0'
      }
    }
  },
  mounted() {
    this.fetchNumberData()
    this.initAnimation()
    this.getImage()
    basicTrack(this.$route.query.id)
    if (isInWechat() === true) {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    }
  },
  methods: {
    handleStopBubble(e) {
      e.preventDefault()
    },
    initAnimation() {
      const el = document.getElementById('animation')
      lottie.loadAnimation({
        container: el, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath: 'http://cdn.exe666.com/fe/marketing/img/wc/lottie/',
        path: 'http://cdn.exe666.com/fe/marketing/img/wc/lottie/h5-2.json' // the path to the animation json
      })
    },
    fetchNumberData() {
      let rq = process.env.WX_API + '/game/rank'
      let rd = {
        params: {
          belong: 'WorldCup2018'
        }
      }
      this.$http.get(rq, rd).then(r => {
        this.score = []
        let resData = r.data.data
        for (let item of resData) {
          if (item.team_name === 'portugal') {
            this.score.portugal = item.total
          }
          if (item.team_name === 'argentina') {
            this.score.argentina = item.total
          }
          if (item.team_name === 'germany') {
            this.score.germany = item.total
          }
          if (item.team_name === 'brazil') {
            this.score.brazil = item.total
          }
        }
      })
    },
    handleEvent(e) {
      if (
        e.toElement.href.baseVal ===
        'http://cdn.exe666.com/fe/marketing/img/wc/lottie/img_0.png'
      ) {
        this.$router.push({
          name: 'WorldCupsCardWithPeople'
        })
      }
    },
    getImage() {
      getInfoById(this.$route.query.id).then(r => {
        this.photoUrl = r.image
        this.style.photo = {
          top: this.$innerWidth() * 120 / 375 + 'px',
          width: '63.8%',
          zIndex: 12,
          position: 'absolute',
          left: '18.2%'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  z-index: 10;
  .root-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    pointer-events: none;
  }
  .animation {
    position: relative;
    z-index: 11;
  }
  .photo {
    pointer-events: auto;
  }
  .score {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    padding: 0 10%;
    z-index: 12;
    span {
      width: 20%;
      text-align: center;
    }
  }
}
</style>
