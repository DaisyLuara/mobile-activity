<template>
  <div
    :style="style.root"
    class="root">
     <img 
        :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
        class="bg"> 
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/lion/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      showImg: false,
      iphoneX: false,
      wxShareInfoValue: {
        title: '萌狮表情大作战',
        desc: '天降福利，身骑白马闯三关',
        link: 'http://papi.xingstation.com/api/s/oQK' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/lion/icon.png'
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/lion/';
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
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
