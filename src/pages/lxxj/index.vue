<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 背景 -->
    <img 
      :src="baseUrl + 'bg.png'"
      :style="style.bg"
      class="root-bg" 
    >
    <div
      v-show="status.step === 'input'"
      class="input-wrapper"
    >
      <img 
        :src="baseUrl + 'logo.png'"
        class="logo" 
      >
      <div
        class="input-area"
        @click="clearError"
      >
        <div 
          v-show="status.isPhoneError"
          class="input-error"
        >
          您输入的手机号有误
        </div>
        <img 
          :src="baseUrl + 'input.png'"
          class="input-bg"
        >
        <input 
          ref="inputreal"
          v-model="phoneValue"
          maxlength="11"
          class="input-value" >
        
        <img
          v-if="status.shouldInputRemindShow" 
          :src="baseUrl + 'remind.png'"
          class="input-remind"
        >

      </div>

      <img
        :src="baseUrl + 'smsremind.png'" 
        class="smsremind"
      >

      <div
        class="input-button"
        @click="checkPhoneValue"
      >
        <img 
          :src="baseUrl + 'btn-submit.png'" 
        >
      </div>

      <img
        :src="baseUrl + 'time.png'" 
        class="wrapper-time"
      >
    </div>

    <div
      v-show="status.step === 'coupon'"
      class="coupon-wrapper">

      <!-- 背景 -->
      <img
        :src="baseUrl + 'coupon-bg.png'" 
        class="coupon-bg"
      >
      
      <div
        v-show="status.isGetCoupon === true"
        :style="style.coupon1"
        class="coupon-inner-1"
      >
        <img
          :src="baseUrl + 'coupon-1.png'" 
          class="inner-cover"
        >

        <div 
          class="coupon-number"
        >
          <div
            v-for="(item, index) of String(coupon_code)"
            :key="index" 
            class="number-inner">
            <img 
              :src="baseUrl + item + '.png'" 
            >
          </div>
        </div>

        <div
          class="inner-button"
          @click="handleRemindShow"
        >
          <img
            :src="baseUrl + 'btn-submit.png'" 
            style="pointer-events: none; "
          >
        </div>
        
      </div>

      <img
        v-show="status.isGetCoupon === false" 
        :src="baseUrl + 'coupon-2.png'"
        :style="style.coupon2"
        class="coupon-inner-2"
      >

      <img
        :src="baseUrl + 'time.png'" 
        class="wrapper-time"
      >
        
    </div>
    
    <Remind v-show="status.shouldRemindShow"/>

    <!-- 宝箱 -->
    <img 
      v-show="status.step === 'coupon'"
      :src="baseUrl + 'box.png'"
      class="link"
      @click="jumpToLink"
    >
    <!-- 弹出层 -->
    <GameShow 
      ref="gameShow" 
      :style-data="style"/>
  </div>
</template>

<script>
import './lxxj.less'
const wih = window.innerHeight
const wiw = window.innerWidth
const imgUrl = process.env.CDN_URL
import GameShow from 'modules/gameShow'
import {
  isInWechat,
  getWxUserInfo,
  Cookies,
  getInfoById,
  $wechat
} from 'services'

import Remind from './remind'

const baseUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/'
export default {
  components: {
    Remind,
    GameShow
  },
  data() {
    return {
      baseUrl: baseUrl,
      style: {
        root: {
          height: wih + 'px'
        },
        show: true,
        coupon2: {},
        coupon1: {
          height: wiw * 0.5 * 260 / 373 * 1.5 + 'px'
        },
        top: {
          top:
            this.$innerHeight() * 0.12 +
            this.$innerWidth() * 0.7 / 503 * 34 -
            38 +
            'px',
          right: this.$innerWidth() * 0.15 - 45 + 'px'
        },
        popupsContent: {
          height: this.$innerHeight() + 'px'
        },
        popups: {
          height: this.$innerHeight() + 'px'
        }
      },
      phoneValue: null,
      coupon_code: 580870245930946,
      status: {
        isPhoneError: false,
        isGetCoupon: null,
        // step: 'coupon',
        step: 'input',
        shouldInputRemindShow: true,
        shouldRemindShow: false
      }
    }
  },
  created() {
    document.title = '龙虾刑警'
    this.handleStorage()
  },
  mounted() {
    this.handleForbiddenShare()
    this.getInfo()
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test'
      ) {
        this.handleWechatAuth()
      }
      // this.handleWechatAuth()
    }
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('user_id') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        let utm_campaign = this.$route.query.utm_campaign
        let user_id = Cookies.get('user_id')
        this.$refs.gameShow.createGame(utm_campaign, user_id)
      }
    },
    handleTrack() {
      let url =
        'http://exelook.com/client/goodsxsd/?id=' +
        String(this.$route.query.id) +
        '&mobile=' +
        String(this.phoneValue) +
        '&api=json'
      this.$http.get(url).then(r => {})
    },
    getInfo() {
      let id = this.$route.query.id
      getInfoById(id).then(res => {})
    },
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    handleStorage() {
      if (localStorage.getItem('longxia') !== null) {
        let getData = JSON.parse(localStorage.getItem('longxia'))
        this.coupon_code = getData.coupon_code
        this.status.isGetCoupon = getData.isGetCoupon
        this.status.step = 'coupon'
      }
    },
    saveStorage() {
      let saveData = {
        coupon_code: this.coupon_code,
        isGetCoupon: this.status.isGetCoupon
      }
      localStorage.setItem('longxia', JSON.stringify(saveData))
    },
    checkPhoneValue() {
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.status.isPhoneError = true
        return
      } else {
        this.status.step = 'coupon'
        this.handleTrack()
        this.getCoupon()
      }
    },
    getCoupon() {
      let rq = process.env.WX_API + '/v6/common/coupon'
      let rd = {
        tenant_id: process.env.NODE_ENV === 'production' ? '18' : '20'
      }
      this.$http.post(rq, rd).then(r => {
        this.savedCounponId = r.data.data.id
        if (r.data.data.coupon_batch.name === '龙虾刑警观影券') {
          this.status.isGetCoupon = true
          this.coupon_code = r.data.data.code
        } else {
          this.status.isGetCoupon = false
        }
        this.handlePhoneBind()
        this.saveStorage()
      })
    },
    handleRemindShow() {
      this.status.shouldRemindShow = !this.status.shouldRemindShow
    },
    handlePhoneBind() {
      let rq = process.env.WX_API + '/v4/common/coupon'
      let rd = {
        mobile: this.phoneValue,
        coupon_id: this.savedCounponId
      }
      this.$http.put(rq, rd).then(r => {
        if (r.data.success === false) {
        } else {
          if (this.status.isGetCoupon === true) {
            this.sendSms(this.savedCounponId)
          }
        }
      })
    },
    sendSms(id) {
      let rq = process.env.WX_API + '/v6/common/coupon/sms'
      let rd = {
        mobile: this.phoneValue,
        coupon_id: id,
        sms_tmp_id: '2351522'
      }
      this.$http.post(rq, rd).then(r => {})
    },
    clearError() {
      this.status.isPhoneError = false
      this.status.shouldInputRemindShow = false
      this.$refs.inputreal.focus()
    },
    jumpToLink() {
      window.location.href =
        process.env.NODE_ENV === 'production'
          ? 'http://papi.xingstation.com/api/s/pyX'
          : 'http://papi.newgls.cn/api/s/vm'
    }
  }
}
</script>