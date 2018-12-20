<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top">
      <img 
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="topImg">
    </div>
    <div class="photo">
      <img 
        :src="baseUrl + 'frame2.png'+ this.$qiniuCompress()"
        class="frame">
      <!-- :src="baseUrl + '666.png'+ this.$qiniuCompress()" -->
      <img 
        v-if="photo !== null" 
        :src="photo + this.$qiniuCompress()"
        class="photoImg">
    </div>
    <div 
      :class="{'x-bottom':iphoneX,'bottom':!iphoneX}" 
      class="bottom">
      <div class="bt">
        <img 
          :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
          class="nav">
        <img 
          :src="baseUrl + '1.png'+ this.$qiniuCompress()"
          class="tip">
      </div>
      <img 
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
        class="tip2">
    </div>
    <img 
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="bottomImg">
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
      baseUrl: cdnUrl + '/fe/marketing/img/play_century/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '玩转世纪，世纪汇广场邀你嗨翻世纪',
        desc: '世纪汇广场美食节，狂欢就现在',
        link: 'http://papi.xingstation.com/api/s/73j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/play_century/icon.png',
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
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/play_century/';
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
    .topImg {
      width: 100%;
    }
  }
  .photo {
    width: 100%;
    height: 68%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .frame {
      width: 110%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -48%);
    }
    .photoImg {
      width: 84%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -46%);
      -webkit-user-select: auto;
      pointer-events: auto;
    }
  }
  .bottom {
    width: 100%;
    height: 20%;
    position: relative;
    z-index: 2;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .bt {
      animation: arrow 1.2s linear infinite alternate;
    }
    .nav {
      width: 16%;
      display: block;
      position: absolute;
      left: 50%;
      top: 6%;
      transform: translate(-50%, 0);
    }
    .tip {
      width: 60%;
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      margin-top: 11%;
    }
    .tip2 {
      width: 80%;
      display: block;
      position: absolute;
      left: 50%;
      top: 36%;
      transform: translate(-50%, 0);
      margin-top: 10%;
    }
  }
  .x-bottom {
    width: 100%;
    height: 20%;
    position: relative;
    z-index: 2;
    margin-top: -6%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .bt {
      animation: arrow 1.2s linear infinite alternate;
    }
    .nav {
      width: 16%;
      display: block;
      position: absolute;
      left: 50%;
      top: 6%;
      transform: translate(-50%, 0);
    }
    .tip {
      width: 60%;
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      margin-top: 11%;
    }
    .tip2 {
      width: 80%;
      display: block;
      position: absolute;
      left: 50%;
      top: 36%;
      transform: translate(-50%, 0);
      margin-top: 10%;
    }
  }
  .bottomImg {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
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
