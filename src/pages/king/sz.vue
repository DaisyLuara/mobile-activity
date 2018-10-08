<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'T.png'+ this.$qiniuCompress()"
      class="topImg">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}"
      class="frame">
    <!-- :src="baseUrl + '666.jpeg'+ this.$qiniuCompress()" -->
    <img 
      v-if="photo !== null" 
      :src="photo + this.$qiniuCompress()"
      :class="{'x-photo':iphoneX,'photo':!iphoneX}"
      class="photo">
    <img 
      :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
      :class="{'x-save':iphoneX,'save':!iphoneX}"
      class="save">
  </div>
</template>
<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/sz/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '翼彩纷城',
        desc: '羽翼之美，颜值倾城,翼彩纷城尽享融合美照。',
        link: 'http://papi.xingstation.com/api/s/KOn' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/sz/icon.png',
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/sz/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .topImg {
    width: 100%;
  }
  .frame {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -34%);
  }
  .x-frame {
    width: 98%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -37%);
  }
  .photo {
    width: 85%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -33.2%);
  }
  .x-photo {
    width: 92.8%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -36.5%);
  }
  .save {
    width: 48%;
    position: absolute;
    left: 50%;
    bottom: 4%;
    transform: translate(-50%, 0%);
  }
  .x-save {
    width: 48%;
    position: absolute;
    left: 50%;
    bottom: 9%;
    transform: translate(-50%, 0%);
  }
}
</style>
