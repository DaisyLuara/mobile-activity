<template>
  <div
    id="warp"
    :style="style.root"
    class="content"
  >
    <div class="div_img">
      <img
        :src="new_base + 'newbg.jpg'"
        class="bg"
      >
      <img
        :src="new_base + 'frame.png'"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const NEW_SERVER = process.env.CDN_URL
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  mixins: [normalPages],
  data() {
    return {
      IMAGE_URL: IMAGE_SERVER + '/pages/goodboy/',
      new_base: NEW_SERVER + '/fe/image/goodboy/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: '限时活动丨转发靓照集赞赢大奖！',
        desc: '点击领取你的高颜值靓照',
        link: process.env.AD_API+'/api/s/3M' + window.location.search,
        imgUrl: IMAGE_SERVER + '/pages/goodboy/share.png',
      }
    }
  },
  mounted() {
    let w = document.documentElement
    let a = w.getBoundingClientRect().width
    if (a > 750) {
      a = 750
    }
    let rem = a / 7.5
    w.style.fontSize = rem + 'px'
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@imgUrl: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/goodboy/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  text-align: center;
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
.content {
  width: 100%;
  overflow-x: hidden;
  background: url("@{imgUrl}bg.png") center bottom/100% auto repeat;
  .div_img {
    width: 100%;
    position: relative;
    .bg {
      position: relative;
    }
    .frame {
      width: 77%;
      position: absolute;
      top: 9.3%;
      left: 50%;
      transform: translateX(-50%);
    }
    .photo {
      width: 74.3%;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
}
</style>

