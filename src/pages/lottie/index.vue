<template>
  <div
    class="root"
    :style="style.root">
    <img 
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
      <span>{{score[0]}}</span>
      <span>{{score[1]}}</span>
      <span>{{score[2]}}</span>
      <span>{{score[3]}}</span>
    </div>
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
        photo: {
          top: window.innerWidth * 120 / 375 + 'px'
        }
      },
      wxShareInfoValue: {
        title: '浦江饭店',
        desc: '与浦江合影留念',
        imgUrl: serverUrl + 'share.png'
      },
      photo: null,
      score: [100, 200, 300, 400]
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
  created() {
    document.title = '世界杯'
  },
  mounted() {
    this.initAnimation()
    this.fetchNumberData()
    this.getPhotoById()
  },
  methods: {
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
        console.dir(r)
        this.score = []
        let resData = r.data.data
        for (let item of resData) {
          if (item.team_name === 'portugal') {
            this.score.push(item.total)
          }
          if (item.team_name === 'argentina') {
            this.score.push(item.total)
          }
          if (item.team_name === 'germany') {
            this.score.push(item.total)
          }
          if (item.team_name === 'brazil') {
            this.score.push(item.total)
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
  width: 100%;
  position: relative;
  .root-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
  .animation {
    width: 100%;
  }
  .top-photo {
    width: 63.8%;
    z-index: 12;
    position: absolute;
    left: 18.2%;
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




