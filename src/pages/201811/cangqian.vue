<template>
  <div
    :style="style.root"
    :class="{content:true,iphoneX:iphoneX}"
  >
    <div class="main">
      <img
        :src="photo"
        class="photo"
      >
      <a
        href="javascript:void(0)"
        class="zc"
        @click="goToRegister"
      >
        <img :src="base + 'zc.png'">
      </a>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { normalPages } from '@/mixins/normalPages'
const BASE_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: BASE_URL + '/fe/image/cangqian/',
      iphoneX: false,
      //微信分享
      wxShareInfoValue: {
        title: '仓前街道市民客厅',
        desc: '微笑转递',
        link: 'http://papi.xingstation.com/api/s/L84' + window.location.search,
        imgUrl: BASE_URL + '/fe/image/cangqian/icon.png',
      }
    }
  },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({
        path: 'cqRegister' + window.location.search
      })
    },
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.xingstation.com/fe/image/cangqian/";
html,
body {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #434343;
  position: relative;
  padding-top: 1%;
  .main {
    position: relative;
    width: 100%;
    background: url("@{base}frame.png") 65% top / 88.5% auto no-repeat;
    .photo {
      width: 74%;
      pointer-events: auto;
      user-select: auto;
      margin-top: 5.5%;
      margin-bottom: 3.5%;
    }
    .zc {
      width: 74.5%;
      position: relative;
      margin-bottom: 5px;
    }
  }
}
.iphoneX {
  padding-top: 15%;
}
</style>

