<template>
  <div
    @click="handleEvent"
    :style="style.root"
    class="root">
    <div
      id="animation"
      class="animation"
    />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { $_wechat, basicTrack, wechatShareTrack, getInfoById } from 'services'
export default {
  data() {
    return {
      style: {
        root: {
          height: this.innerHeight() + 'px'
        }
      }
    }
  },
  mounted() {
    this.initAnimation()
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
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
}
</style>
