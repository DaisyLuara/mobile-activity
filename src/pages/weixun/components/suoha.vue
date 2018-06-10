<template>
  <div
    @click.self="handleSuoHaClose"
    v-if="shouldShow"
    :style="style.root"
    class="suoha-root">
    <div
      v-show="!hasButtonClicked && isGetCoupon"
      class="phone-input">
      <img :src="serverUrl + 'card.png'" />
      <img class="prompt" :src="serverUrl + 'prompt.png'" />
      <div class="input-area">
        <div 
          v-show="isPhoneError"
          class="input-error">
          手机号有误
        </div>
        <input 
          @click="clearError"
          maxlength="11"
          placeholder="请输入手机号码"
          class="input-value"
          v-model="phoneValue" />
        <div
          @click='handleButtonClick'
          class="input-button">
          确定
        </div>
      </div>
      <div
        class="w-1">
        可凭手机号至现场领取
      </div>
      <div
        class="w-2">
        (需购票入场)
      </div>
    </div>


    <div 
      class="result">
      <div
        v-show="isGetCoupon && hasButtonClicked">
        <img 
          @click.self="handleSuoHaClose"
          class="bg"
          :src="serverUrl + 'prompt_bg.png'" />
        <img 
          @click.self="handleSuoHaClose"
          class="right"
          :src="serverUrl + 'prompt_bg_right.png'" />
        <div
          @click.self="handleSuoHaClose"
          class="text"
          >
          您的手机号已成功提交
        </div>
      </div>
      <div
        v-show="!isGetCoupon">
        <img 
          @click.self="handleSuoHaClose"
          class="not-bg"
          :src="serverUrl + 'card_2.png'" />
        <img
          @click.self="handleSuoHaClose"
          class="not-box" 
          :src="serverUrl + 'box.png'" />
        <div
          @click.self="handleSuoHaClose"
          class="not-text">
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
    shouldShow: Boolean
  },
  data() {
    return {
      style: {
        root: {
          height: window.innerHeight + 'px',
          width: window.innerWidth + 'px'
        }
      },
      control: {
        shouldResultShow: false
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
    handleButtonClick() {
      if (!/^1[345678]\d{9}$/.test(this.phoneValue)) {
        this.isPhoneError = true
        return
      } else {
        this.sendSms(this.savedId)
        this.showResult()
      }
    },
    clearError() {
      this.isPhoneError = false
    },
    checkCoupon() {
      let rq = process.env.WX_API + '/v6/common/coupon'
      let rd = {
        coupon_batch_id: process.env.NODE_ENV === 'production' ? '39' : '46'
      }
      this.$http.post(rq, rd).then(r => {
        console.dir(r)
        if (r.data.data.coupon_batch.name === '签名海报一张') {
          this.isGetCoupon = true
          this.savedId = r.data.data.id
        } else {
          this.isGetCoupon = false
        }
      })
      localStorage.setItem('hasSuoha', JSON.stringify(false))
    },
    showResult() {
      this.hasButtonClicked = true
    },
    sendSms(id) {
      let rq = process.env.WX_API + '/v6/common/coupon/sms'
      let rd = {
        mobile: this.phoneValue,
        coupon_id: id,
        sms_tmp_id: '2169978'
      }
      this.$http.post(rq, rd).then(r => {
        console.dir(r)
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
      top: 40%;
      text-align: center;
    }
  }
}
</style>
