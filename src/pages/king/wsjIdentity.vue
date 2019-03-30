<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :style="style.root" 
      :src="baseUrl + 'frame2.png'+ this.$qiniuCompress()"
      class="frame"> 
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'photo-frame':!iphoneX}"
      class="photo-frame">
    <!-- :src="baseUrl + '666.jpeg'+ this.$qiniuCompress()"  -->
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo">
    <img 
      :src="baseUrl + 'copy.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save">
  </div>
</template>
<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/wsj_identity/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      iphoneX: false,
      wxShareInfoValue: {
        title: '狂欢万圣节，测测你是什么鬼？',
        desc: '星视度万圣节全城刷脸变“鬼”。',
        link: 'http://papi.xingstation.com/api/s/0VX' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/wsj_identity/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/wsj_identity/';
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
  .frame {
    width: 100%;
    position: absolute;
    left: 0;
    top: -2%;
  }
  .photo-frame {
    width: 70%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -54%);
  }
  .x-frame {
    width: 80%;
  }
  .photo {
    width: 60.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -54.5%);
    user-select: auto;
    pointer-events: auto;
  }
  .x-photo {
    width: 69%;
  }
  .save {
    width: 64%;
    position: absolute;
    left: 50%;
    bottom: 2%;
    transform: translate(-50%, 0);
  }
  .x-save {
    width: 75%;
  }
}
</style>
