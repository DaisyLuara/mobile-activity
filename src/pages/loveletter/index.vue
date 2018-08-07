<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      id="anim"
      class="anim"
    />
  </div>
</template>
<script>
import lottie from 'lottie-web'
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com/'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function() {}
      }
    }
  },
  mounted() {
    this.doAnim()
  },
  methods: {
    doAnim() {
      const el = document.getElementById('anim')
      let anim = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        assetsPath:
          'http://p22vy0aug.bkt.clouddn.com/image/loveletter/json/images/',
        path: 'http://p22vy0aug.bkt.clouddn.com/image/loveletter/json/qixi.json'
      })
      anim.goToAndStop(10, true)
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: '';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #a90d0e;
  background-image: url(), url();
}
</style>


