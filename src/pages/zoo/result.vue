<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'mask.png'+ this.$qiniuCompress()"
      class="animate-cover"
    >
    <div
      v-show="photoWrap"
      class="photo-wrap"
    >
      <div
        :style="style.photoHei"
        class="photo"
      >
        <img :src="photo + this.$qiniuCompress()">
      </div>
      <img
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save-tips"
      >
    </div>
  </div>
</template>
<script>
const wih = window.innerHeight
const wiw = window.innerWidth
const baseUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/zoo/'
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: baseUrl,
      style: {
        root: {
          height: wih + 'px'
        },
        photoHei: {
          width: wiw * 1.3 * 569 / 1011 + 'px',
          height: wiw * 0.7 * 1011 / 569 + 'px',
          top: wiw * 20 / 375 + 'px'
        }
      },
      photoWrap: false,
      phoneValue: null,
      status: {
        isPhoneError: false,
        shouldInputRemindShow: true,
        step: 'input'
      },
      wxShareInfoValue: {
        title: '动物去哪了',
        desc: '让我们去动物园吧',
        imgUrl: baseUrl + 'share.png',
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.photoWrap = true
    }, 1500)
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #062313;
  .animate-cover {
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: -58%;
    z-index: 3;
    width: auto;
    height: 160%;
    animation: play 3s 1s;
    transform: rotate(100deg);
    transform-origin: 10% 0;
  }
  .photo-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    margin: 0 auto;
    .photo {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .save-tips {
      width: 70%;
      -webkit-touch-callout: none;
      user-select: none;
      pointer-events: none;
      margin: 0 auto;
      position: absolute;
      bottom: -1%;
      left: 0;
      right: 0;
    }
  }
}
@keyframes play {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(100deg);
  }
}
</style>
