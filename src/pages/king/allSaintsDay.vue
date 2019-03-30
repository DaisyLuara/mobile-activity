<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'bg.png'+ this.$qiniuCompress()"
      class="bg">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      class="frame">
    <!-- :src="baseUrl + '666.png'+ this.$qiniuCompress()" -->
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      class="photo">
    <img 
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      class="save">
    <img 
      :src="baseUrl + 'coupon.png'+ this.$qiniuCompress()"
      class="coupon02">
  </div>
</template>
<script>
import { Cookies, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/baoli/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      score: this.$route.query.score,
      wxShareInfoValue: {
        title: '点击领取你的餐饮券',
        desc: '终于等到你了，还不快行动',
        link: 'http://papi.xingstation.com/api/s/vm' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/baoli/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.xingstation.com/fe/marketing/img/baoli/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .frame {
    width: 64%;
    position: absolute;
    left: 5%;
    top: 3%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 62%;
    position: absolute;
    left: 6%;
    top: 3.5%;
    user-select: auto;
    pointer-events: auto;
  }
  .save {
    width: 17%;
    position: absolute;
    right: 5%;
    top: 0%;
    margin-top: 24.5%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .coupon02 {
    width: 100%;
    position: absolute;
    left: 0%;
    top: 0%;
    margin-top: 128%;
    user-select: auto;
    pointer-events: auto;
  }
}
</style>
