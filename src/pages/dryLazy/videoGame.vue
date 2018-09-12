<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 遮罩 -->
    <div class="shade">
      <div class="back"/>
      <img 
        :src="baseUrl + 'loading1.png'+ this.$qiniuCompress()"
        class="loading1">
      <img 
        :src="baseUrl + 'loading2.png'+ this.$qiniuCompress()"
        class="loading2">
    </div>
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      class="frame">
    <img 
      :src="baseUrl + '666.png'+ this.$qiniuCompress()"
      class="photo">
    <img 
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      class="save">
  </div>
</template>

<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/videoGame/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        link: 'http://papi.xingstation.com/api/s/g5Y' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/videoGame/icon.png',
        success: () => {
          wechatShareTrack()
        }
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/videoGame/';
img {
  max-width: 100%;
}
.root {
  width: 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .shade {
    width: 100%;
    height: 100%;
    .back {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.8;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
    }
    .loading1 {
      width: 15%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -70%);
      z-index: 100;
    }
    .loading2 {
      width: 25%;
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, 0%);
      z-index: 100;
    }
  }
  .frame {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 4%;
    transform: translate(-50%, 0);
  }
  .photo {
    width: 75%;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
  }
  .save {
    width: 38%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
  }
}
</style>
