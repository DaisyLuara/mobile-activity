<template>
  <div
    :style="style.root"
    class="content"
  >
    <div
      :style="style.root"
      class="center"
    >
      <div class="picture">
        <img
          :src="base + 'kuang.png'"
          class="frame"
        >
        <img
          :src="photo + this.$qiniuCompress()"
          class="photo"
        >
        <img
          :src="base + 'save.png'"
          class="note"
        >
      </div>

    </div>
    <img
      :src="base + 'di.png'"
      class="light"
    >
  </div>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import { $wechat, isInWechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/dgm/',
      //微信分享
      wxShareInfoValue: {
        title: '比高电影城欢迎您',
        desc: '点击可获取您的照片',
        link: 'http://papi.xingstation.com/api/s/j0W' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/dgm/bigao.png'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.exe666.com/fe/image/dgm/";
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
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #210707;
  .center {
    width: 100%;
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -10%;
    .picture {
      position: relative;
      z-index: 0;
      .frame {
        width: 88.5%;
        position: relative;
        z-index: 0;
        margin-left: -3.5%;
      }
      .photo {
        position: absolute;
        width: 76.5%;
        top: 6%;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: auto;
        user-select: auto;
      }
      .note {
        width: 34vw;
        position: absolute;
        bottom: -5%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
  }
  .light {
    width: 120%;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
}
</style>


