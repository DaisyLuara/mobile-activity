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

      <!-- 宝箱 -->
      <img 
        class="link"
        :src="baseUrl + 'box.png'"
        />
      

      <!-- button -->
      <!-- <img 
        class="button"
        :src="baseUrl + ''"
        /> -->
      <div
        v-show="status.resultType === 1"
        :style="style.coupon1"
        class="coupon-inner-1">
        <img
          class="inner-cover"
          :src="baseUrl + 'coupon-1.png'" />
        <img
          class="inner-button"
          :src="baseUrl + 'btn-submit.png'" />
      </div>

      <img
        v-show="status.resultType === 2"
        :style="style.coupon2"
        class="coupon-inner-2"
        :src="baseUrl + 'coupon-2.png'" />
    </div>
    
    <Remind />
  </div>
</template>

<script>
const wih = window.innerHeight
const wiw = window.innerWidth
import Remind from './remind'
const baseUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/'
export default {
  components: {
    Remind
  },
  data() {
    return {
      baseUrl: baseUrl,
      style: {
        root: {
          height: wih + 'px'
        },
        coupon2: {},
        coupon1: {
          height: wiw * 0.5 * 260 / 373 * 1.5 + 'px'
        }
      },
      phoneValue: null,
      status: {
        isPhoneError: false,
        isGetCoupon: false,
        step: 'coupon',
        shouldInputRemindShow: true,
        resultType: 1
      }
    }
  },
  methods: {
    checkPhoneValue() {
      console.log('clicked')
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.status.isPhoneError = true
        return
      } else {
        this.status.step = 'coupon'
        this.handlePhoneBind()
      }
    },
    checkCoupon() {
      let rq = process.env.WX_API + '/v6/common/coupon'
      let rd = {
        coupon_batch_id: process.env.NODE_ENV === 'production' ? '39' : '46'
      }
      this.$http.post(rq, rd).then(r => {
        if (r.data.data.coupon_batch_id !== 1000) {
          this.savedCounponId = r.data.data.id
          this.status.isGetCoupon = true
        } else {
          this.status.isGetCoupon = false
        }
      })
    },
    handlePhoneBind() {
      let rq = process.env.WX_API + '/v4/common/coupon'
      let rd = {
        mobile: this.phoneValue,
        coupon_id: this.savedId
      }
      this.$http.put(rq, rd).then(r => {
        if (r.data.success === 'false' || r.data.success === false) {
          this.showResult()
        } else {
          this.sendSms(this.savedId)
        }
      })
    },
    clearError() {
      this.status.isPhoneError = false
      this.status.shouldInputRemindShow = false
      this.$refs.inputreal.focus()
    }
  }
}
</script>

<style lang="less" scoped>
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
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
    }
    .link {
      position: absolute;
      width: 20%;
      top: 38%;
      right: 0;
      z-index: 10000;
    }
    .coupon-inner-1 {
      width: 50%;
      margin: auto;
      position: absolute;
      top: 6%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
      .inner-cover {
        width: 100%;
      }
      .inner-button {
        width: 80%;
        position: absolute;
        bottom: 10%;
        left: 10%;
        margin-top: 5%;
      }
    }
    .coupon-inner-2 {
      width: 50%;
      margin: auto;
      position: absolute;
      top: 6%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 12;
    }
  }
}
</style>
