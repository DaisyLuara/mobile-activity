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
        }
      },
      wxShareInfoValue: {
        title: '浦江饭店',
        desc: '与浦江合影留念',
        imgUrl: serverUrl + 'share.png'
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
      let rq = 'http://122.112.236.76/IStarGame/starGame/queryByWorldCup'
      this.$http.get(rq).then(r => {
        console.dir(r)
      })
    },
    getPhotoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.photo = res.code
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
  .root-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .animation {
    width: 100%;
  }
}
</style>




