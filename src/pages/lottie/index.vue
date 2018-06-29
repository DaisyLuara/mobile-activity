<template>
  <div
    class="root"
    :style="style.root">
    <img 
      @touchstart="handleStopBubble"
      class="root-bg"
      :src="serverUrl + 'lottie-bg.png'">
    <div
      id="animation"
      class="animation"
      />
    <img 
      :style="style.photo"
      :src="photo"
      class="top-photo"
      />
    <div
      :style="style.score" 
      class="score">
      <span>{{score.portugal}}</span>
      <span>{{score.argentina}}</span>
      <span>{{score.germany}}</span>
      <span>{{score.brazil}}</span>
    </div>

    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { Toast } from 'mint-ui'
import { customTrack } from 'modules/customTrack'
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
const serverUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lottie/'
export default {
  components: {
    WxShare
  },
  data() {
    return {
      serverUrl: serverUrl,
      style: {
        root: {
          width: '100%',
          height: window.innerHeight + 'px'
        },
        score: {
          top: window.innerWidth * 2.014 + 'px'
        },
        photo: null
      },
      wxShareInfoValue: {
        title: '激情世界杯 2018',
        desc: '巅峰对决',
        imgUrl: serverUrl + 'share.png'
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
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: () => {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  },
  mounted() {
    this.initAnimation()
    this.fetchNumberData()
    this.getPhotoById()
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
        path: '/static/lottie/data.json' // the path to the animation json
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
      marketService
        .getInfoById(this, id)
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
}
</style>




