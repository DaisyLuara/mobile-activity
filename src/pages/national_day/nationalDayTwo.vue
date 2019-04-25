<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
      class="top">
    <img 
      :src="baseUrl + 'frame.png'+ this.$qiniuCompress()"
      :class="{'x-frame':iphoneX,'frame':!iphoneX}" 
      class="frame">
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
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/national_day_two/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '欢度国庆',
        desc: '团结一心，为祖国庆生',
        link: process.env.AD_API+'/api/s/j25' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/national_day_two/icon.png',
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
@imageHost: 'http://cdn.xingstation.cn/fe/marketing/img/national_day_two/';
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
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .frame {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-frame {
    width: 108%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -49%);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .photo {
    width: 65.2%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -46.9%);
    -webkit-user-select: auto;
    pointer-events: auto;
    z-index: 3;
  }
  .x-photo {
    width: 70.4%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -48.4%);
    -webkit-user-select: auto;
    pointer-events: auto;
    z-index: 3;
  }
  .save {
    width: 57%;
    position: absolute;
    left: 21%;
    bottom: 1%;
    animation: arrow 0.5s linear infinite alternate;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .x-save {
    width: 57%;
    position: absolute;
    left: 21%;
    bottom: 5%;
    animation: arrow 0.5s linear infinite alternate;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-7px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(7px);
  }
}
</style>
