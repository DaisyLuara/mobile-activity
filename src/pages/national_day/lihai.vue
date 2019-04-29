<template>
  <div class="lihai">
    <img 
      :src="url + 'top.png'" 
      class="top"
    >
    <img 
      :src="url + 'bottom.png'" 
      class="bottom"
    >
    <img 
      :style="style.title" 
      :src="url + 'top-text.png'" 
      class="title"
    >
    <div class="photo-wrapper">
      <img 
        :src="url + 'photo-wrapper.png'" 
        class="wrapper-inner"
      >
      <img 
        :src="photo + this.$qiniuCompress()" 
        class="show-photo"
      >
    </div>
    <img 
      :src="photo + this.$qiniuCompress()" 
      class="real-photo"
    >
  </div>
</template>

<script>
const baseUrl = process.env.CDN_URL
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      url: baseUrl + '/fe/marketing/img/nationday/lihaiguo/',
      style: {
        title: {
          marginTop: this.$innerWidth() * 0.1 + 'px',
          width: this.$innerWidth() * 0.5 + 'px'
        }
      },
      photo: null,
      wxShareInfoValue: {
        title: '为祖国庆生',
        desc: '我爱你，中国！',
        link: process.env.AD_API+'/api/s/vgr' + window.location.search,
        imgUrl: baseUrl + '/fe/marketing/img/nationday/lihaiguo/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lihai {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #b8240f;
  z-index: 10;
  overflow-y: scroll;
  min-height: 100vh;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 11;
  }
  .title {
    position: relative;
    z-index: 11;
  }
  .real-photo {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 120;
    opacity: 0;
    top: 0;
    left: 0;
  }
  .photo-wrapper {
    width: 80%;
    position: relative;
    margin-top: 3%;
    z-index: 13;
    .wrapper-inner {
      position: relative;
      width: 100%;
      margin-left: 5%;
      z-index: 20;
    }
    .show-photo {
      position: absolute;
      top: 2.5%;
      left: 10.4%;
      width: 79%;
      z-index: 15;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>

