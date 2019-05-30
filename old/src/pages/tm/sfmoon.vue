<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="picture">
      <img
        :src="base + 'frame.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <img
      :src="base+'save.png'"
      class="save"
    >
    <div class="coup">
      <img
        v-show="Boolean(score>=4000)"
        :src="base+'coupon00.png'"
        class="coupon0"
      >
      <img
        v-show="Boolean(score>=4000)"
        :src="base+'rule0.png'"
      >
      <a
        :href="link.link1"
        class="link1"
      >
        <img :src="base+'coupon1.png'">
      </a>
      <a
        :href="link.link2"
        class="link1"
      >
        <img :src="base+'coupon2.png'">
      </a>
      <img
        :src="base+'rule1.png'"
        class="rule"
      >
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame
} from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMG_SERVER = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMG_SERVER + '/fe/image/sfmoon/',
      // score: Number(this.$route.query.score),
      userId: null,
      link: {
        link1: process.env.AD_API+'/api/s/5yB', //新人注册-券
        //短链'http://sfreg.oramage.com'
        link2: process.env.AD_API+'/api/s/mwO' //20减3券
      },
      //分享
      wxShareInfoValue: {
        title: '中秋豪礼 味你而来',
        desc: '中秋豪礼 味你而来',
        link: process.env.AD_API+'/api/s/W6J' + window.location.search,
        imgUrl: IMG_SERVER + '/fe/image/sfmoon/share.jpg',
      }
    }
  },
  watch: {
    parms() {
      this.score = Number(this.score)
      this.userGame()
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.photo,
        score: this.score,
        qiniu_id: this.$route.query.id
      }
      userGame(args, this.userId)
        .then(res => {
          if (res.success) {
            console.log(res)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@base: "https://cdn.xingstation.cn/fe/image/sfmoon/";
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
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{base}bgbg.png");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .picture {
    width: 73%;
    margin-top: 7%;
    position: relative;
    .frame {
      position: relative;
      width: 100%;
      z-index: 0;
    }
    .photo {
      width: 93%;
      pointer-events: auto;
      user-select: auto;
      position: absolute;
      top: 1.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
  }
  .save {
    width: 65.5%;
    margin-top: 5%;
    margin-bottom: 2%;
  }
  .coup {
    width: 76%;
    img {
      max-width: 100%;
    }
    .coupon0 {
      margin-bottom: 5%;
    }
    .link1 {
      width: 100%;
      display: inline-block;
      margin-top: 2%;
      margin-bottom: 3%;
    }
    .rule {
      margin-top: 5%;
      margin-bottom: 8%;
    }
  }
}
</style>


