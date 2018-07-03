<template>
  <div
    @click="handleEvent"
    :style="style.root"
    class="root">
    <div
      id="animation"
      class="animation"
    />
    <img
      :style="style.photo"
      v-if="photoUrl !== null"
      class="photo"
      :src="photoUrl"
      />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import {
  $_wechat,
  isInWechat,
  basicTrack,
  wechatShareTrack,
  getInfoById
} from 'services'
export default {
  data() {
    return {
      style: {
        root: {
          height: this.innerHeight() + 'px'
        },
        photo: {
          top: this.innerWidth() * 0.315 + 'px'
        }
      },
      photoUrl: null,
      wxShareInfo: {
        title: '激情世界杯 2018',
        desc: '巅峰对决',
        imgUrl: 'share.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.initAnimation()
    this.getImage()
    basicTrack(this.$route.query.id)
    if (isInWechat() === true) {
      $_wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    }
  },
  methods: {
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
    handleEvent(e) {
      if (
        e.toElement.href.baseVal ===
        'http://cdn.exe666.com/fe/marketing/img/wc/lottie/img_0.png'
      ) {
        this.$router.push({
          name: 'WorldCupsCardWithPeople'
        })
        console.log('bingo')
      }
    },
    getImage() {
      getInfoById(this.$route.query.id).then(r => {
        this.photoUrl = r.image
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
  .animation {
    position: relative;
    z-index: 11;
  }
  .photo {
    z-index: 12;
    position: absolute;
    width: 64%;
    left: 18.2%;
  }
}
</style>
