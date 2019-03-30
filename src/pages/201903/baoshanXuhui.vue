<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="picture">
      <img
        :src="base + 'ka.png' + this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="base + 'save.png' + this.$qiniuCompress()"
      class="save"
    >
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/baoshan_xuhui/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: "您有一张金猪福照待认领~",
        desc: "点击领取专属照片>>>",
        link: 'http://papi.xingstation.com/api/s/l2J' + window.location.search,
        imgUrl: "https://cdn.xingstation.com/fe/image/baoshan_xuhui/icon.png"
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.com/fe/image/baoshan_xuhui/";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  width: 100%;
  overflow: hidden;
  position: relative;
  background-image: url("@{img}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .picture {
    width: 100%;
    position: relative;
    margin-top: 20%;
    .frame {
      position: relative;
      width: 91%;
      z-index: 0;
    }
    .photo {
      width: 54.5%;
      position: absolute;
      top: 14.8%;
      left: 49.8%;
      transform: translateX(-50%);
      pointer-events: auto;
      user-select: auto;
    }
  }
  .save {
    width: 55.5%;
    position: relative;
    margin-top: 2%;
  }
}
</style>

