<template>
  <div
    :style="style.root" 
    class="root">
    <!-- 背景 -->
    <img 
      :style="style.bg"
      :src="baseUrl + 'bg.png'"
      class="root-bg" />
    
    <div
      v-show="status.step === 'input'"
      class="input-wrapper"
      >

      <img 
        :src="baseUrl + 'logo.png'"
        class="logo" />
      
      <div
        @click="clearError"
        class="input-area">
        <div 
          v-show="status.isPhoneError"
          class="input-error">
          您输入的手机号有误
        </div>

        <img 
          class="input-bg"
          :src="baseUrl + 'input.png'"
          />
        
        <input 
          ref="inputreal"
          maxlength="11"
          class="input-value"
          v-model="phoneValue" />
        
        <img
          v-if="status.shouldInputRemindShow"
          class="input-remind"
          :src="baseUrl + 'remind.png'" />

      </div>

      <img
        class="smsremind"
        :src="baseUrl + 'smsremind.png'" />

      <div
        @click="checkPhoneValue"
        class="input-button">
        <img 
          :src="baseUrl + 'btn-submit.png'" />
      </div>

      <img
        class="wrapper-time"
        :src="baseUrl + 'time.png'" />
    </div>

    <div
      v-show="status.step === 'coupon'"
      class="coupon-wrapper">

      <!-- 背景 -->
      <img
        class="coupon-bg"
        :src="baseUrl + 'coupon-bg.png'" />
      
      <div
        v-show="status.isGetCoupon === true"
        :style="style.coupon1"
        class="coupon-inner-1">
        <img
          class="inner-cover"
          :src="baseUrl + 'coupon-1.png'" />

        <div 
          class="coupon-number">
          <div
            class="number-inner"
            :key="index" 
            v-for="(item, index) of String(coupon_code)">
            <img 
              :src="baseUrl + item + '.png'" />
          </div>
        </div>

        <div
          class="inner-button"
          @click="handleRemindShow">
          <img
            style="pointer-events: none; "
            :src="baseUrl + 'btn-submit.png'" />
        </div>
        
      </div>

      <img
        v-show="status.isGetCoupon === false"
        :style="style.coupon2"
        class="coupon-inner-2"
        :src="baseUrl + 'coupon-2.png'" />

      <img
        class="wrapper-time"
        :src="baseUrl + 'time.png'" />
        
    </div>
    
    <Remind v-show="status.shouldRemindShow"/>

     <!-- 宝箱 -->
    <img 
      v-show="status.step === 'coupon'"
      @click="jumpToLink"
      class="link"
      :src="baseUrl + 'box.png'"
      />
    <!-- 弹出层 -->
    <div class="popups-wrapper" v-show="showPopups">
      <div class="popups-content">
        <div class="main-content" :style="style.popups">
          <div class="popups-close" :style="style.top" @click="closePopups">
            <img :src="imgUrl+'close.png'+ this.qiniuCompress()" alt="" />
          </div>
          <div class="img-wrap">
            <img 
              class="bg"
              :src="imgUrl+'bg.png'+ this.qiniuCompress()" >
            <img 
              class="done1"
              :src="imgUrl+'a.png'+ this.qiniuCompress()" v-show="projectOne">
              <img 
              class="done2"
              :src="imgUrl+'b.png'+ this.qiniuCompress()" v-show="projectTwo">
              <img 
              class="done3"
              :src="imgUrl+'c.png'+ this.qiniuCompress()" v-show="projectThree">
              <img 
              class="done4"
              :src="imgUrl+'d.png'+ this.qiniuCompress()" v-show="projectFour">
              <div class="text">
                {{randomNum}}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
const imgUrl = process.env.CDN_URL
import { isWeixin } from '../../modules/util'
import {
  isInWechat,
  Cookies,
  createGame,
  getInfoById,
  $_wechat,
  getGame
} from 'services'

import Remind from './remind'
const baseUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/'
export default {
  components: {
    Remind
  },
  data() {
    return {
      projectOne: false,
      projectTwo: false,
      projectThree: false,
      projectFour: true,
      showPopups: true,
      imgUrl: imgUrl + '/fe/marketing/img/fourProject/',
      baseUrl: baseUrl,
      randomNum: '',
      style: {
        root: {
          height: wih + 'px'
        },
        coupon2: {},
        coupon1: {
          height: wiw * 0.5 * 260 / 373 * 1.5 + 'px'
        },
        top: {
          top:
            this.innerHeight() * 0.12 +
            this.innerWidth() * 0.7 / 503 * 34 -
            38 +
            'px',
          right: this.innerWidth() * 0.15 - 45 + 'px'
        },
        popups: {
          height: this.innerHeight() + 'px'
        }
      },
      // arr: [
      //   {
      //     id: 1,
      //     belong: 'colorPrintHilton'
      //   },
      //   {
      //     id: 2,
      //     belong: 'LXXJTurntable'
      //   },
      //   {
      //     id: 3,
      //     belong: 'WorldCup2018'
      //   }
      //   // {
      //   //   id: 4,
      //   //   belong: 'passPalace'
      //   // }
      // ],
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
      this.handleWechatAuth()
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
        this.createGame(utm_campaign)
        this.randomNum = Cookies.get('user_id')
        // this.projectStatus()
      }
    },
    createGame(belong) {
      let args = {
        belong: belong
      }
      createGame(args)
        .then(res => {
          if (res.success) {
            this.getGame()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame() {
      getGame()
        .then(res => {
          console.log(res)
          this.projectStatus(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    projectStatus(list) {
      let data = list
      data.map(r => {
        if (r.belong === 'colorPrintHilton') {
          this.projectOne = true
        }
        if (r.belong === 'LXXJTurntable') {
          this.projectTwo = true
        }
        if (r.belong === 'WorldCup2018') {
          this.projectThree = true
        }
        if (r.belong === 'previousLift') {
          this.projectFour = true
        }
      })
    },
    closePopups() {
      this.showPopups = false
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
      $_wechat()
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

<style lang="less" scoped>
@imgServerUrl: 'http://cdn.exe666.com//fe/marketing/img/sndy';
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
  .root-bg {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .input-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    .logo {
      width: 80%;
      position: absolute;
      top: 10%;
      z-index: 12;
      left: 10%;
    }
    .input-area {
      position: absolute;
      width: 80%;
      top: 43%;
      width: 80%;
      left: 10%;
      z-index: 12;
      .input-error {
        position: absolute;
        top: -35%;
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 200;
      }
      .input-bg {
        width: 100%;
        z-index: 13;
      }
      .input-value {
        background-color: transparent;
        z-index: 14;
        width: 100%;
        position: absolute;
        top: 0;
        height: 100%;
        left: 0;
        padding: 0 18%;
      }
      .input-remind {
        position: absolute;
        width: 50%;
        top: 0;
        left: 25%;
        z-index: 15;
        bottom: 0;
        right: 0;
        margin: auto 0;
      }
    }
    .smsremind {
      position: absolute;
      width: 60%;
      left: 20%;
      top: 55%;
      z-index: 11;
    }
    .input-button {
      position: absolute;
      width: 40%;
      left: 30%;
      top: 60%;
      z-index: 11;
      img {
        width: 100%;
      }
    }
    .wrapper-time {
      z-index: 11;
      width: 30%;
      left: 35%;
      position: absolute;
      bottom: 5%;
    }
  }
  .coupon-wrapper {
    .wrapper-time {
      z-index: 12;
      width: 30%;
      left: 35%;
      position: absolute;
      bottom: 5%;
    }
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    .coupon-bg {
      width: 100%;
      margin: auto;
      position: absolute;
      top: -10%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
    }

    .coupon-inner-1 {
      width: 50%;
      margin: auto;
      position: absolute;
      top: -2%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
      .coupon-number {
        height: 12%;
        position: absolute;
        top: 51.8%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0 5%;
        .number-inner {
          height: 100%;
          img {
            width: 100%;
          }
        }
      }
      .inner-cover {
        width: 100%;
      }
      .inner-button {
        width: 80%;
        position: absolute;
        bottom: 10%;
        left: 10%;
        margin-top: 5%;
        img {
          width: 100%;
        }
      }
    }
    .coupon-inner-2 {
      width: 50%;
      margin: auto;
      position: absolute;
      top: -4%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
    }
  }
  .link {
    position: absolute;
    width: 20%;
    top: 38%;
    right: 0;
    z-index: 10000;
  }
  .popups-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 400;
    opacity: 0.94;
    .popups-content {
      width: 100%;
      height: 100%;
    }
    .main-content {
      position: relative;
      .popups-close {
        position: absolute;
        right: 4%;
        top: 9.5%;
        z-index: 40;
        img {
          width: 60%;
        }
      }
      .img-wrap {
        position: absolute;
        width: 70%;
        left: 15%;
        top: 12%;
        .bg {
          width: 100%;
          user-select: none;
          pointer-events: none;
        }
        .done1 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          top: 20%;
        }
        .done2 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          bottom: 40%;
        }
        .done3 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          bottom: 21%;
        }
        .done4 {
          position: absolute;
          width: 95%;
          left: 2.5%;
          bottom: 2%;
        }
        .text {
          color: #fff;
          font-size: 16px;
          height: 18px;
          line-height: 18px;
          position: absolute;
          width: 95%;
          left: 5.5%;
          bottom: 4%;
        }
      }
    }
  }
}
</style>
