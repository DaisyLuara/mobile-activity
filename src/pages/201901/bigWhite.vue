<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div class="main">
      <div
        v-show="ishave"
        class="one"
      >
        <img
          :src="base + '11.png' + this.$qiniuCompress()"
          class="note"
        >
        <div class="time">{{ s }}:{{ m }}</div>
      </div>
      <img
        v-show="!ishave"
        :src="base + '2.png' + this.$qiniuCompress()"
        class="note"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        :src="base + 'save.png' + this.$qiniuCompress()"
        class="save"
      >
      <img
        :src="base + 'logo.png' + this.$qiniuCompress()"
        class="logo"
      >
    </div>

    <img
      :src="base + 'bg.png' + this.$qiniuCompress()"
      class="bottom"
    >
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies } from 'services'
import { onlyGetPhoto } from '@/mixins/onlyGetPhoto'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [onlyGetPhoto],
  data() {
    return {
      base: CDN_URL + '/fe/image/bigwhite/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      ishave: false,
      arr: [false, false, false, true],
      s: 5,
      m: '00',
      id: this.$route.query.id,
    }
  },
  created() {

  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
    this.handleForbiddenShare()
    this.getHave()
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get("sign") === null) {
        let base_url = encodeURIComponent(String(window.location.href));
        let redirct_url =
          process.env.WX_API +
          "/wx/officialAccount/oauth?url=" +
          base_url +
          "&scope=snsapi_base";
        window.location.href = redirct_url;
      } else {
        this.userId = Cookies.get("user_id");
      }
    },
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getHave() {
      let isCheck = 'rabbit' + this.id
      let that = this
      let date = new Date().getTime()
      // let r = Math.round(Math.random() * 3)
      let r = Math.random()
      if (window.localStorage.getItem(isCheck)) {
        that.ishave = window.localStorage.getItem(isCheck) === 'false' ? false : true
        that.haveOrNot()
      } else {
        // that.ishave = that.arr[r]
        that.ishave = r >= 0.9 ? true : false
        window.localStorage.setItem(isCheck, this.ishave)
        window.localStorage.setItem(this.id, date)
        that.haveOrNot()
      }

    },
    haveOrNot() {
      let con = this.ishave
      if (con == true) {
        this.checkLocal()
        this.checkTime()
        return
      }
    },
    checkLocal() {
      let start = window.localStorage.getItem(this.id)
      let now = new Date().getTime()
      if ((now - start) >= 5 * 60 * 1000) {
        this.s = 0
        this.m = '00'
      } else if ((now - start) == 0) {
        this.s = 5
        this.m = '00'
      } else {
        let s = 5 - Math.ceil((now - start) / (1000 * 60))
        let m = 60 - Math.floor((now - start) / 1000 % 60)
        this.s = s < 0 ? 0 : s
        this.m = m < 0 ? 0 : (m < 10 ? '0' + m : m)
      }
    },
    checkTime() {
      let that = this
      let timer = setInterval(function () {
        if (that.s == 0 && that.m == '00') {
          clearInterval(timer)
        } else {
          that.startTime(that.s, that.m)
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
@url: "https://cdn.xingstation.com/fe/image/bigwhite/";
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
  background-color: #fff;
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
      pointer-events: auto;
      user-select: auto;
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
