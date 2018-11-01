<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top">
        <img 
        :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
        class="frame"> 
    </div>
    <div class="bt">
          <img 
          :src="baseUrl + 'arrow.png'+ this.$qiniuCompress()"
          class="arrow"> 
          <img 
          :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
          class="save"> 
      </div>
  </div>
</template>
<script>
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/spacetime_vortex/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: '历史的时空漩涡',
        desc: '名人穿越，即刻出发',
        link: 'http://papi.xingstation.com/api/s/oYj' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/spacetime_vortex/icon.png'
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/spacetime_vortex/';
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
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .top {
    width: 100%;
    position: relative;
    .frame {
      width: 90%;
      margin-top: 3%;
    }
  }
  .bt {
    width: 100%;
    position: relative;
    margin: 0 auto;
    text-align: center;
    .arrow {
      width: 50%;
      display: block;
    }
    .save {
      width: 65%;
      display: block;
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
