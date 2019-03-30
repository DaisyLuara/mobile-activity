<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top">
      <img 
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="topImg">
    </div>
    <div 
      :class="{'x-center':iphoneX,'center':!iphoneX}" 
      class="center">
      <img 
        :src="baseUrl + 'photo_bg.png'+ this.$qiniuCompress()"
        class="photo-bg">
      <!-- :src="baseUrl + '666.png'+ this.$qiniuCompress()" -->
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photo">

    </div>
    <div class="bottom">
      <img 
        :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
        class="bottomImg">
      <img 
        :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
        class="nav">
      <img 
        :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
        class="prompt">
    </div>
  </div>
</template>
<script>
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/national_day/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: '国庆快乐',
        desc: '我为祖国打call！！！',
        link: 'http://papi.xingstation.com/api/s/oYj' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/national_day/icon.png'
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
@imageHost: 'http://cdn.xingstation.com/fe/marketing/img/national_day/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #ffe0bc;
  .top {
    width: 100%;
    height: 30%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .topImg {
      width: 100%;
      height: 100%;
    }
  }
  .center {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .photo-bg {
      width: 93%;
    }
    .photo {
      width: 78%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -58%);
      border-radius: 5%;
      -webkit-user-select: auto;
      pointer-events: auto;
    }
  }
  .x-center {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -43%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .photo-bg {
      width: 100%;
    }
    .photo {
      width: 86%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -57%);
      border-radius: 5%;
      -webkit-user-select: auto;
      pointer-events: auto;
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .bottomImg {
      width: 100%;
    }
    .nav {
      width: 16%;
      position: absolute;
      left: 42%;
      bottom: 36%;
      display: block;
      animation: arrow 1.2s linear infinite alternate;
    }
    .prompt {
      width: 65%;
      position: absolute;
      left: 20%;
      bottom: 23%;
      display: block;
      animation: arrow 1.2s linear infinite alternate;
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
