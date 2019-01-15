<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <div
        v-show="have"
        class="one"
      >
        <img
          :src="base + '1.png'"
          class="note"
        >
        <div class="time">{{s}}:{{m}}</div>
      </div>
      <img
        v-show="!have"
        :src="base + '2.png'"
        class="note"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        :src="base + 'save.png'"
        class="save"
      >
      <img
        :src="base + 'logo.png'"
        class="logo"
      >
    </div>

    <img
      :src="base + 'bg.png'"
      class="bottom"
    >
  </div>
</template>
<script>
import { } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/bigwhite/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      have: true,
      s: 5,
      m: '00',
      id: this.$route.query.id,
      //微信分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/bigwhite/icon.png'
      }
    }
  },
  mounted() {
    this.checkLocal()
    this.checkTime()
  },
  methods: {
    checkLocal() {
      let key = 'rabbit' + this.id
      if (window.localStorage.getItem(key)) {
        let time = window.localStorage.getItem(key)
        let s = time.split(':')[0]
        let m = time.split(':')[1]
        this.s = s
        this.m = m
      } else {
        window.localStorage.setItem(key, '5:00')
      }
    },
    checkTime() {
      let that = this
      let key = 'rabbit' + this.id
      let timer = setInterval(function () {
        if (that.s == 0 && that.m == 0) {
          clearInterval(timer)
          that.have = false
        } else {
          that.startTime(that.s, that.m)
          window.localStorage.setItem(key, that.s + ':' + that.m)
        }
      }, 1000)
    },
    startTime(s, m) {
      if (m == 0) {
        this.s = s > 0 ? --s : 0
        m = 60
        this.m = --m
      } else {
        this.m = --m
      }
      this.m = this.m < 10 ? '0' + this.m : this.m
    }
  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.exe666.com/fe/image/bigwhite/";
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
.warp {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-image: url("@{url}bgg.png");
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  .main {
    width: 100%;
    position: relative;
    .one {
      width: 100%;
      text-align: right;
      position: relative;
      .note {
        width: 83%;
        position: relative;
        margin-top: 5%;
        margin-bottom: 0%;
        margin-right: 2%;
      }
      .time {
        width: 16vw;
        position: absolute;
        top: 78%;
        right: 2%;
        color: #fff;
        font-size: 7vw;
        font-weight: 600;
        z-index: 9;
      }
    }
    .note {
      width: 93%;
      position: relative;
      z-index: 0;
      margin-top: 8%;
      margin-bottom: 12%;
    }
    .photo {
      width: 61%;
      position: relative;
      z-index: 0;
      border-top: solid 9px #0071bf;
      border-bottom: solid 9px #0071bf;
      border-left: solid 7px #0071bf;
      border-right: solid 7px #0071bf;
    }
    .save {
      width: 9%;
      position: absolute;
      top: 42%;
      right: 9.5%;
      z-index: 9;
    }
    .logo {
      width: 24%;
      display: block;
      margin-top: 5%;
      margin-bottom: 2%;
    }
  }
  .bottom {
    width: 100%;
    position: relative;
  }
}
</style>
