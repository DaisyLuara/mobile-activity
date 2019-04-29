<template>
  <div
    v-if="shouldShow"
    :style="style.root"
    class="suoha-root"
    @click.self="handleSuoHaClose"
  >
    <div
      v-show="!hasButtonClicked && isGetCoupon"
      class="phone-input"
    >
      <img 
        :src="serverUrl + 'card.png'"
      >
      <img
        :src="serverUrl + 'prompt.png'" 
        class="prompt" 
      >
      <div class="input-area">
        <div 
          v-show="isPhoneError"
          class="input-error"
        >
          手机号有误
        </div>
        <input 
          v-model="phoneValue"
          class="input-value"
          maxlength="11"
          placeholder="请输入手机号码"
          @click="clearError"
        >
        <div
          class="input-button"
          @click="handleButtonClick"
        >
          确定
        </div>
      </div>
      <div
        class="w-1"
      >
        可凭手机号至现场领取
      </div>
      <div
        class="w-2"
      >
        (需购票入场)
      </div>
    </div>


    <div 
      class="result"
    >
      <div
        v-show="isGetCoupon && hasButtonClicked"
      >
        <img 
          :src="serverUrl + 'prompt_bg.png'" 
          class="bg"
          @click.self="handleSuoHaClose"
        >
        <img 
          :src="serverUrl + 'prompt_bg_right.png'"
          class="right"
          @click.self="handleSuoHaClose"
        >
        <div
          class="text"
          @click.self="handleSuoHaClose"
        >
          您的手机号已成功提交
        </div>
      </div>
      <div
        v-show="!isGetCoupon"
      >
        <img 
          :src="serverUrl + 'card_2.png'" 
          class="not-bg"
          @click.self="handleSuoHaClose"
        >
        <img
          :src="serverUrl + 'box.png'" 
          class="not-box" 
          @click.self="handleSuoHaClose"
        >
        <div
          class="not-text"
          @click.self="handleSuoHaClose"
        >
          很遗憾，您没有中奖
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const serverUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/weixun/suoha/'
export default {
  props: {
    shouldShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      style: {
        root: {
          height: window.innerHeight + 'px',
          width: window.innerWidth + 'px'
        }
      },
      serverUrl: serverUrl,
      phoneValue: null,
      isPhoneError: false,
      isGetCoupon: false,
      hasButtonClicked: false,
      savedId: null
    }
  },
  methods: {
    checkCoupon() {
      this.handleReset()
      let rq = process.env.WX_API + '/v6/common/coupon'
      let rd = {
        tenant_id: process.env.NODE_ENV === 'production' ? '17' : '19'
      }
      this.$http.post(rq, rd).then(r => {
        if (r.data.data.coupon_batch.id !== 1000) {
          this.isGetCoupon = true
          this.savedId = r.data.data.id
        } else {
          this.isGetCoupon = false
          this.showResult()
        }
      })
      this.$parent.control.shouldBoxShow = false
    },
    handleReset() {
      this.isGetCoupon = false
      this.hasButtonClicked = false
      this.clearError()
    },
    handleButtonClick() {
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.isPhoneError = true
        return
      } else {
        this.handlePhoneBind()
      }
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
      this.isPhoneError = false
    },
    showResult() {
      this.hasButtonClicked = true
    },
    sendSms(id) {
      let rq = process.env.WX_API + '/v6/common/coupon/sms'
      let rd = {
        mobile: this.phoneValue,
        coupon_id: id,
        sms_tmp_id: '2336866'
      }
      this.$http.post(rq, rd).then(r => {
        this.showResult()
      })
    },
    handleSuoHaClose() {
      this.$parent.handleSuoHaClose()
      document.body.style.overflow = ''
    }
  }
}
</script>

<style lang="less" scoped>
.suoha-root {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .phone-input {
    width: 60%;
    // margin-top: 30%;
    position: relative;
    z-index: 10001;
    img {
      width: 100%;
    }
    .prompt {
      width: 90%;
      position: absolute;
      top: 64%;
      left: 5%;
    }
    .input-area {
      width: 90%;
      margin-left: 5%;
      position: absolute;
      bottom: 18%;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      z-index: 10002;
      .input-error {
        position: absolute;
        top: -18px;
        width: 100%;
        color: red;
        font-size: 14px;
        text-align: center;
      }
      .input-value {
        height: 34px;
        width: 70%;
        border-radius: 5px;
        display: inline-block;
        font-size: 1.6rem;
        padding: 0 5%;
        z-index: 10003;
      }
      .input-button {
        display: inline-block;
        height: 34px;
        width: 28%;
        border-radius: 5px;
        background-color: #c933ff;
        line-height: 34px;
        text-align: center;
        color: white;
        font-size: 1.6rem;
        z-index: 10004;
      }
    }
    .w-1 {
      position: absolute;
      color: #333333;
      text-align: center;
      font-size: 1.4rem;
      top: 84%;
      width: 100%;
    }
    .w-2 {
      position: absolute;
      color: #333333;
      text-align: center;
      font-size: 1.4rem;
      top: 90%;
      width: 100%;
    }
  }
  .result {
    width: 60%;
    position: relative;
    .bg {
      width: 100%;
    }
    .right {
      position: absolute;
      width: 24%;
      left: 38%;
      top: 28%;
    }
    .text {
      position: absolute;
      bottom: 22%;
      color: white;
      width: 100%;
      text-align: center;
      font-size: 1.6rem;
    }
    .not-bg {
      width: 100%;
    }
    .not-box {
      position: absolute;
      width: 40%;
      left: 30%;
      bottom: -29%;
    }
    .not-text {
      font-size: 1.6rem;
      width: 100%;
      position: absolute;
      top: 35%;
      text-align: center;
    }
  }
}
</style>
