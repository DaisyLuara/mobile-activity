<template>
  <div class="root" :style="style.root">
    <img v-if="!hasSMSsended" class="title" :src="serverUrl + 'input-title.png' + this.qiniuCompress()">
    <div v-if="!hasSMSsended" class="input" :style="style.input">
       <div
        v-show="control.shouldRemindShow"
        :style="style.remind" 
        class="input-remind">
        请输入手机号
      </div>
      <img
        class="input-bg" 
        :src="serverUrl + 'input.png' + this.qiniuCompress()" />
      <div
        v-show="phoneError"
        class="input-error">
        {{errorMsg}}
      </div>
     
      <img 
        class="sms-remind"
        :src="serverUrl + 'sms-remind.png' + this.qiniuCompress()" />
      <input 
        v-model="phoneValue"
        @blur="handleRemindShow()"
        @click="handleInputClick()"
        class="input-input"
        maxlength="11">
      <img 
        @click="handleSubmit()"
        class="input-button"
        :src="serverUrl + 'input-btn.png' + this.qiniuCompress()" />
    </div>
    
    <Result v-if="hasSMSsended"/>
  </div>
</template>

<script>
import { basicTrack } from 'services'
import Result from './result'
const serverUrl = process.env.CDN_URL
export default {
  components: {
    Result
  },
  data() {
    return {
      serverUrl: serverUrl + '/fe/marketing/hiltonc/',
      style: {
        root: {
          height: this.innerHeight() + 'px',
          padding: '15% 0'
        },
        remind: {
          lineHeight: this.innerWidth() * 0.8 * 94 / 529 + 'px'
        },
        input: {
          width: this.innerWidth() * 0.8 + 'px',
          height: this.innerWidth() * 0.8 * 94 / 529 + 'px'
        }
      },
      control: {
        shouldRemindShow: true
      },
      phoneValue: null,
      phoneError: false,
      couponType: null,
      couponId: null,
      hasSMSsended: false,
      errorMsg: '输入的手机号有误'
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('coupon_id')) {
      this.couponId = this.$route.query.coupon_id
      this.getCouponFromId(this.couponId)
    }
  },
  methods: {
    handleInputClick() {
      this.control.shouldRemindShow = false
      this.phoneError = false
      this.errorMsg = '输入的手机号有误'
    },
    handleRemindShow() {
      if (this.phoneValue === null || this.phoneValue === '') {
        this.control.shouldRemindShow = true
      }
    },
    handleSubmit() {
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.phoneError = true
        return
      } else {
        basicTrack(null, this.phoneValue)
        this.handlePhoneBind(this.couponId)
      }
    },
    getCouponFromId(id) {
      let getUrl = process.env.SAAS_API + '/common/coupon/' + String(id)
      this.$http.get(getUrl).then(r => {
        if (r.data.data.coupon_batch_id === 1005) {
          this.couponType = 1
        } else if (r.data.data.coupon_batch_id === 1006) {
          this.couponType = 2
        } else if (r.data.data.coupon_batch_id === 1007) {
          this.couponType = 3
        }
      })
    },
    handlePhoneBind(id) {
      let putUrl = process.env.SAAS_API + '/v4/common/coupon'
      let putParam = {
        mobile: this.phoneValue,
        coupon_id: id
      }
      this.$http.put(putUrl, putParam).then(r => {
        if (r.data.success === true) {
          this.sendSMS(id)
        } else {
          this.phoneError = true
          this.errorMsg = '您的手机号已经领取过了'
        }
      })
    },
    sendSMS(id) {
      let postUrl = process.env.SAAS_API + '/v6/common/coupon/sms'
      let postParam = {
        mobile: this.phoneValue,
        coupon_id: id,
        sms_tmp_id: '2169978'
      }
      this.$http.post(postUrl, postParam).then(r => {
        if (r.data.success === true) {
          console.log('发送成功')
          this.style.root.padding = ''
          this.hasSMSsended = true
        } else {
          console.log('发送失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  background-image: url('http://cdn.exe666.com/fe/marketing/hiltonc/input-bg.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  .title {
    width: 80%;
    z-index: 11;
  }
  .input {
    position: relative;
    z-index: 12;
    margin-top: 20%;
    .input-bg {
      width: 100%;
      z-index: 13;
    }
    .sms-remind {
      width: 100%;
      margin: 5% 0;
    }
    .input-error {
      width: 100%;
      color: red;
      text-align: center;
      position: absolute;
      top: -30px;
    }
    .input-remind {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 14;
      color: white;
      text-align: center;
      font-weight: 200;
      font-size: 16px;
    }
    .input-input {
      padding: 5% 10%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      color: white;
      z-index: 15;
    }
    .input-button {
      width: 100%;
      -webkit-touch-callout: none;
      user-select: none;
    }
  }
}
</style>
