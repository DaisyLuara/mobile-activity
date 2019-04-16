<template>
  <div
    :style="style.root"
    class="content">
    <div 
      class="main">
      <img
        :src="base+'bunny.png'">
      <div 
        class="scores">
        <img
          :src="base + 'tittle.png'"
          class="title">
        <span>{{ total }}</span>
        <img
          :src="base + 'frame.png'"
          class="frame">
        <img
          :src="base + coupon + '.png?111'"
          class="coupon">
        <a
          class="button"
          @click="getCheck">
          <img
            :src="base+'button.png'"
            class="button">
        </a>
      </div>
    </div>
    <div
      v-show="mask"
      class="mask"
      @click.self="mask = false;telform = false;note = false;success = false;">
      <div 
        v-show="note"
        class="note"
        @click="()=>{note = false;mask=false;}">
        <img
          :src="base + 'note3.png'">
      </div>
      <div 
        v-show="telform"
        class="tel">
        <img
          :src="base+'tel.png'"
          class="telbg">
        <div 
          class="form"
          @click.stop="()=>{}">
          <input 
            v-model="mobile"
            placeholder="输入手机号" 
            maxlength="11" 
            class="input"
            @change="mask = true;telform = true;">
          <button
            class="check"
            @click.stop="checkMobile(mobile)">
            <img
              :src="base+'check.png'">
          </button>
        </div>
      </div>
      <div 
        v-show="success"
        class="success tel">
        <img
          :src="base+'success.png'"
          class="telbg">
      </div>
    </div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.CDN_URL
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame,
  getGame,
  setParameter,
  getAdCoupon,
  checkCouponNumber
} from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMAGE_SERVER + '/image/kaixue/',
      score: this.$route.query.score,
      total: 0,
      coupon: 0,
      mask: true,
      note: true,
      telform: false,
      mobile: null,
      belong: null,
      photo: null,
      userId: null,
      sign: null,
      success: false,
      coupon_arr: [3, 4, 5, 6],
      deUrl:
        'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
      //微信分享
      wxShareInfoValue: {
        title: '开学送福利',
        desc: '亲爱的，礼物准备好了',
        link: process.env.AD_API+'/api/s/j2R' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/image/kaixue/icon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
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
    if (this.note) {
      let that = this
      let once = setTimeout(function() {
        that.note = false
        that.mask = false
        clearTimeout(once)
      }, 5000)
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
        this.sign = Cookies.get('sign')
        this.belong = this.$route.query.utm_campaign
        this.userGame()
      }
    },
    handleTrack(mobile) {
      let url =
        'http://exelook.com/client/goodsxsd/?id=' +
        String(this.$route.query.id) +
        '&mobile=' +
        String(mobile) +
        '&api=json'
      this.$http.get(url).then(r => {
        console.log(r)
      })
    },
    userGame() {
      let id = this.$route.query.id
      let args = {
        belong: this.belong,
        image_url: this.deUrl,
        score: this.score,
        qiniu_id: id
      }
      userGame(args, this.userId)
        .then(res => {
          this.getGame()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame() {
      let score1 = 0,
        score2 = 0,
        score_total = 0
      let url = process.env.SAAS_API + '/user/' + this.userId + '/games?belong='
      this.$http
        .get(url + 'FarmSchool')
        .then(res => {
          score1 = parseInt(res.data.data[0].total_score) || 0
          this.$http
            .get(url + 'FarmSchoolHigh')
            .then(res => {
              score2 = parseInt(res.data.data[0].total_score) || 0
              score_total = score1 + score2
              this.docheckScore(score_total)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    docheckScore(score_total) {
      this.total = score_total
      if (score_total <= 200) {
        this.coupon = 0
        return
      }
      if (score_total <= 400) {
        this.coupon = 1
        return
      }
      if (score_total <= 800) {
        this.coupon = 2
        return
      }
      if (score_total > 800) {
        this.coupon = 3
        return
      }
    },
    checkMobile(mobile) {
      if (!/^1[3456789]\d{9}$/.test(mobile)) {
        alert('您输入的手机号有误')
        return
      } else {
        this.handleTrack(mobile)
        this.sendCoupon()
      }
    },
    getCheck() {
      let id = this.coupon_arr[this.coupon]
      checkCouponNumber(id)
        .then(res => {
          console.log(res)
          this.mask = true
          this.telform = true
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    sendCoupon() {
      let couponId = this.coupon_arr[this.coupon]
      let args = {
        mobile: this.mobile
      }
      if (this.userId) {
        args = {
          mobile: this.mobile,
          userId: this.userId
        }
      }
      getAdCoupon(args, couponId)
        .then(res => {
          let data = res.data
          this.success = true
          this.telform = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@base: 'http://cdn.exe666.com/image/kaixue/';
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
  text-align: center;
  font-size: 0;
}
a {
  display: inline-block;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  .main {
    width: 100%;
    position: relative;
    z-index: 0;
    .scores {
      width: 100%;
      position: relative;
      background-image: url('@{base}green.png');
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      img {
        position: relative;
        z-index: 0;
      }
      .title {
        width: 68%;
        margin-left: -22%;
        margin-top: -2%;
      }
      .frame {
        width: 90%;
        margin-top: 5%;
        margin-bottom: 2%;
        margin-left: -3%;
      }
      .coupon {
        width: 60%;
        position: absolute;
        top: 30%;
        left: 52%;
        transform: translateX(-50%);
        z-index: 99;
      }
      .button {
        width: 85%;
        margin-bottom: 3%;
      }
      span {
        position: absolute;
        top: 2%;
        left: 75%;
        font-family: '黑体';
        font-size: 13vw;
        z-index: 9;
        color: #fff;
        font-weight: bold;
      }
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    .note {
      width: 100%;
      height: 100%;
      img {
        width: 80.4%;
        margin-top: 15%;
      }
    }
    .tel {
      margin: 0 auto;
      position: relative;
      margin-top: 30%;
      width: 80%;
      .telbg {
        position: relative;
      }
      .input {
        position: absolute;
        width: 86%;
        height: 27%;
        left: 7%;
        top: 16%;
        background: transparent;
        border-radius: 30px;
        font-size: 8vw;
        text-align: center;
        color: #fff;
      }
      .check {
        position: absolute;
        width: 86%;
        left: 7%;
        top: 55%;
        background: transparent;
        border: none;
      }
    }
  }
}
</style>


