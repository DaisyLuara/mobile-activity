<template>
  <div
    :style="style.root"
    class="root">
    <img 
      :src="serverUrl + 'lottie-bg.png'"
      class="root-bg"
      @touchstart="handleStopBubble">
    <div
      id="animation"
      class="animation"
    />
    <img 
      :style="style.photo"
      :src="photo"
      class="top-photo"
    >
    <div
      :style="style.score" 
      class="score">
      <span>{{ score.portugal }}</span>
      <span>{{ score.argentina }}</span>
      <span>{{ score.germany }}</span>
      <span>{{ score.brazil }}</span>
    </div>
  </div>
</template>
<script>
import lottie from 'lottie-web'
import { Toast } from 'mint-ui'
import {
  isInWechat,
  Cookies,
  $wechat,
  getInfoById,
  wechatShareTrack
} from 'services'

const serverUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lottie/'
export default {
  data() {
    return {
      serverUrl: serverUrl,
      style: {
        show: true,
        root: {
          width: '100%',
          height: window.innerHeight + 'px'
        },
        score: {
          top: window.innerWidth * 2.014 + 'px'
        },
        top: {
          top:
            this.$innerHeight() * 0.12 +
            this.$innerWidth() * 0.7 / 503 * 34 -
            38 +
            'px',
          right: this.$innerWidth() * 0.15 - 45 + 'px'
        },
        popupsContent: {
          height: this.$innerHeight() + 'px'
        },
        popups: {
          height: this.$innerWidth() / 1080 * 2578 + 'px'
        },
        photo: null
      },
      wxShareInfoValue: {
        title: '激情世界杯 2018',
        desc: '巅峰对决',
        imgUrl: serverUrl + 'share.png',
        success: () => {
          wechatShareTrack()
        }
      },
      photo: null,
      score: {
        portugal: '0',
        argentina: '0',
        germany: '0',
        brazil: '0'
      }
    }
  },
  mounted() {
    this.handleWechatShare()
    this.initAnimation()
    this.fetchNumberData()
    this.getPhotoById()
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test'
      ) {
        this.handleWechatAuth()
      }
      // this.handleWechatAuth()
    }
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
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
        let utm_campaign = this.$route.query.utm_campaign
        let user_id = Cookies.get('user_id')
      }
    },
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
        assetsPath: 'http://cdn.xingstation.com/fe/marketing/jqsjb/img/',
        path: 'http://cdn.xingstation.com/fe/marketing/jqsjb/json/data.json' // the path to the animation json
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
    getPhotoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
          this.style.photo = {
            width: '63.8%',
            zIndex: '12',
            position: 'absolute',
            left: '18.2%',
            top: window.innerWidth * 120 / 375 + 'px'
          }
        })
        .catch(err => {
          Toast(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  user-select: none;
  width: 100%;
  position: relative;
  -webkit-touch-callout: none;
  user-select: none;
  .root-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    pointer-events: none;
  }
  .animation {
    width: 100%;
  }
  .top-photo {
    width: 63.8%;
    z-index: 12;
    position: absolute;
    left: 18.2%;
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
  .popups-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 400;
    opacity: 0.94;
    .popups-content {
      width: 100%;
      height: 100%;
    }
    .main-content {
      position: relative;
      .popups-close {
        position: absolute;
        right: 4%;
        top: 9.5%;
        z-index: 40;
        img {
          width: 60%;
        }
      }
      .img-wrap {
        position: absolute;
        width: 70%;
        left: 15%;
        top: 12%;
        .bg {
          width: 100%;
          user-select: none;
          pointer-events: none;
        }
        .done1 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          top: 20%;
        }
        .done2 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          bottom: 40%;
        }
        .done3 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          bottom: 21%;
        }
        .done4 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          bottom: 2%;
        }
        .text {
          color: #fff;
          font-size: 16px;
          height: 18px;
          line-height: 18px;
          position: absolute;
          width: 95%;
          left: 5.5%;
          bottom: 4%;
        }
      }
    }
  }
}
</style>




