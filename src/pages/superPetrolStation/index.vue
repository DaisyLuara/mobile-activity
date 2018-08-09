<template>
  <div
    :style="style.root" 
    class="root">
    <div 
      :class="{'x-center':iphoneX}"
      class="center">
      <img 
        :src="baseUrl + 'kuang.png'+ this.$qiniuCompress()"
        class="kuang" >
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        :class="{'iphone5-photo':iphone5}"
        class="photo" > 
    </div>
    <img 
      v-if="photo !== null" 
      :src="'http://cdn.exe666.com/fe/marketing/img/loveCard/666.jpeg'"
      :class="{'x-photoReal':photoReal}"
      class="photo-real" > 
    <div class="bottom">
      <img 
        :src="baseUrl + 'A.gif'"
        class="jiantou" >
      <img 
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save" >
    </div>
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
      baseUrl: cdnUrl + '/fe/marketing/img/superPetrolStation/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: '',
      iphoneX: false,
      iphone5: false,
      photoReal: false,
      wxShareInfoValue: {
        title: '刷脸为自己加油打call，让健康生活不只是口号！',
        desc: '星视度超级加油站',
        link: 'http://papi.xingstation.com/api/s/Dkx' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/superPetrolStation/icon.jpg',
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
      this.photoReal = true
    } else {
      this.iphoneX = false
      this.photoReal = false
    }
    if (height <= 504) {
      this.iphone5 = true
    } else {
      this.iphone5 = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/superPetrolStation';
.root {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.jpg');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  img {
    pointer-events: none;
    user-select: none;
  }
  .center {
    width: 78%;
    height: 83%;
    position: absolute;
    left: 50%;
    top: 4%;
    transform: translate(-50%, 0);
    pointer-events: none;
    user-select: none;
    .kuang {
      width: 100%;
      height: 100%;
    }
    .photo {
      position: absolute;
      left: 5%;
      top: 0.5%;
      width: 92.08%;
      z-index: -1;
    }
    .iphone5-photo {
      position: absolute;
      left: 5%;
      top: 0.5%;
      width: 90.05%;
      z-index: -1;
    }
  }
  .x-center {
    width: 90%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
  }
  .photo-real {
    position: absolute;
    left: 14.2%;
    top: 5%;
    width: 71.5%;
    pointer-events: auto;
    user-select: auto;
    z-index: 999;
    opacity: 0;
  }
  .x-photoReal {
    position: absolute;
    left: 9.2%;
    top: 6%;
    width: 82%;
    pointer-events: auto;
    user-select: auto;
    z-index: 999;
    opacity: 0;
  }
  .bottom {
    .jiantou {
      width: 13%;
      margin-bottom: 2%;
      position: absolute;
      left: 50%;
      bottom: 6%;
      transform: translate(-50%, 0);
    }
    .save {
      width: 74%;
      position: absolute;
      left: 50%;
      bottom: 1%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
