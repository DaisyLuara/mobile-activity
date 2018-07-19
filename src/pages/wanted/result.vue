<template>
  <div class="root" :style="style.root">
    <img
      class="bg" 
      :src="serverUrl + 'bg-inner.jpg' + this.qiniuCompress()" />
    <img
      class="title"
      :src="serverUrl + 'title.png' + this.qiniuCompress()" />
    <img 
      class="dagger"
      :style="style.dagger"
      :src="serverUrl + 'dagger.png' + this.qiniuCompress()" />
    <img
      :style="style.photo"
      class="photo"
      :src="serverUrl + 'photo-cover.png' + this.qiniuCompress()" />
    <img
      :style="style.remind"
      class="remind" 
      :src="serverUrl + 'save-remind.png' + this.qiniuCompress()"/>
  </div>
</template>

<script>
const serverUrl = process.env.CDN_URL
import { getInfoById, $_wechat } from 'services'
export default {
  data() {
    return {
      style: {
        root: {
          height: this.innerHeight() + 'px'
        },
        dagger: {
          top: this.innerWidth() * 0.1 + 'px',
          width: this.innerWidth() * 0.2 + 'px'
        },
        photo: {
          top: this.innerWidth() * 0.2 + 'px'
        },
        remind: {
          top: this.innerWidth() * 1.45 + 'px'
        }
      },
      serverUrl: serverUrl + '/fe/marketing/wanted/'
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  background-color: black;
  z-index: 10;
  .bg {
    position: relative;
    width: 100%;
    z-index: 11;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
  }
  .dagger {
    position: absolute;
    left: 20%;
    z-index: 14;
  }
  .photo {
    z-index: 13;
    width: 80%;
    left: 10%;
    position: absolute;
  }
  .remind {
    position: absolute;
    z-index: 14;
    width: 50%;
    left: 10%;
  }
}
</style>
