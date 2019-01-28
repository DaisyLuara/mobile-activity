<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <img
        :src="base + 'p1/frame.png'"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <a
      v-show="toshow"
      class="tolink"
      @click="toLink"
    >
      <img :src="base + 'p1/button.png'">
    </a>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, toApplication, Cookies } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/beauty/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      cookies_z: null,
      toshow: false,//false
      //微信分享
      wxShareInfoValue: {
        title: '最美瞬间',
        desc: '最美凯德，醉美上海',
        imgUrl: CDN_URL + '/fe/image/beauty/icon.png'
      }
    }
  },
  watch: {
    userinfo() {
      this.toshow = true
      if (Cookies.get('z')) {
        this.cookies_z = Cookies.get('z')
      } else {
        Cookies.set('z', this.userinfo.z)
      }
    }
  },
  mounted() {
    if (Cookies.get('z')) {
      this.cookies_z = Cookies.get('z')
      this.toshow = true
    }
  },
  methods: {
    toLink() {
      if (this.avrinfo == null) {
        console.log('avrinfo为空')
        return
      }
      let args = {
        avrid: this.avrinfo.avrid,
        z: this.cookies_z || this.userinfo.z,
        actid: 22
      }
      toApplication(args).then(res => {
        this.$router.push({
          path: 'beauty_list?' + window.location.search
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.exe666.com/fe/image/beauty/";
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
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("@{url}p1/back.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  .main {
    position: relative;
    width: 100%;
    margin-top: 6%;
    .frame {
      width: 84.5%;
      position: relative;
      z-index: 0;
      margin-left: 4%;
    }
    .photo {
      position: absolute;
      top: 3%;
      left: 13.5%;
      width: 66.5%;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .tolink {
    position: relative;
    width: 43%;
    margin-top: 5.5%;
  }
}
</style>

