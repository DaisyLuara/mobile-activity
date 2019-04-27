<template>
  <div class="wrap">
    <img
      class="back-top"
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
    />
    <div class="content-wrap">
      <div class="photo-area">
        <img class="" src="">
      </div>
      <div class="phone-verify-group">
        <input
          type="text"
          placeholder="输入手机号"
          class="input phone-input"
          maxlength="11"
          :value="phone"
          @input="handleInput($event, 'phone')"
        />
        <div class="code-input-wrap">
          <input
            type="text"
            placeholder="输入验证码"
            class="input code-input"
            maxlength="4"
            :value="code"
            @input="handleInput($event, 'code')"
          />
          <img
            :src="`${CDNURL}/dimond520/req_code_btn.png`"
            class="code-button"
            @click="handleReqCodeClick"
          />
        </div>
      </div>
      <div class="submit-btn-group">
        <img
          v-show="submitBtnClickable"
          @click="submitBtnClickable && handleSubmit()"
          :src="`${CDNURL}/dimond520/submit_btn.png`"
        />
        <img
          v-show="!submitBtnClickable"
          :src="`${CDNURL}/dimond520/submit_btn_disable.png`"
        />
      </div>
      <img
        class="activity-rule"
        :src="`${CDNURL}/dimond520/activity_rule.png`"
      />
      <img
        class="activity-sponsor"
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
      />
      <p class="activity-company">本活动最终解释权归星视度所有</p>
    </div>
  </div>
</template>

<script>
import { onlyGetPhoto } from '@/mixins/onlyGetPhoto'
import { reCalculateRem } from '@/mixins/reCalculateRem'
import { filterNumber, validatePhone } from 'services'
import { Toast } from 'mand-mobile'
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "diamond520",
  components: {

  },
  mixins: [onlyGetPhoto, reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      phone: '',
      code: ''
    }
  },
  computed: {
    submitBtnClickable() {
      return this.phone && this.code
    }
  },
  methods: {
    handleInput(event, type) {
      const number = filterNumber(event.target.value)
      this[type] = number
      event.target.value = number
    },
    // 手机号是否正确
    isValidPhone() {
      const valid = validatePhone(this.phone)
      !valid && Toast.info('手机号输入错误，请重新输入')
      return valid
    },
    handleReqCodeClick() {
      if (!this.isValidPhone()) {
        return
      }
    },
    isValidCode() {
      const valid = /^\d{4}$/.test(this.code)
      !valid && Toast.info('验证码错误，请重新输入')
      return valid
    },
    handleSubmit() {
      if (!this.isValidPhone() || !this.isValidCode()) {
        return
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/cdnUrl.less";

::-webkit-input-placeholder {
  color: #D01A2C;
  font-size: 0.15rem;
  font-weight: bold;
}
:-moz-placeholder {
  color: #D01A2C;
  opacity: 1;
  font-size: 0.15rem;
  font-weight: bold;
}
::-moz-placeholder {
  color: #D01A2C;
  opacity: 1;
  font-size: 0.15rem;
  font-weight: bold;
}
p {
  margin: 0
}

.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url("@{cdnUrl}/dimond520/photo_back.png");
  background-size: 100% auto;
  background-repeat: repeat;
}
.back-top {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.content-wrap {
  position: relative;
  padding-top: 0.14rem;
  top: 0;
  left: 0;
  right: 0;
  .photo-area {
    width: 2.64rem;
    height: 4.35rem;
    margin: 0 auto;
    padding: 0.15rem 0.215rem 0.285rem;
    box-sizing: border-box;
    background-image: url("@{cdnUrl}/dimond520/photo_border.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .phone-verify-group {
    width: 2.65rem;
    margin: 0 auto 0.03rem;
    .input {
      display: block;
      line-height: 0.35rem;
      height: 0.35rem;
      padding-left: 0.09rem;
      outline: none;
      border: 1px solid #E78E96;
      border-radius: 0.09rem;
      font-size: 0.15rem;
      margin-bottom: 0.05rem;
    }
    .phone-input {
      width: 100%;
    }
    .code-input-wrap {
      width: 100%;
      display: flex;
      .code-input {
        width: 1.63rem;
        margin-right: 0.08rem;
      }
      .code-button {
        display: block;
        width: 0.95rem;
        height: 0.35rem;
      }
    }
  }
  .submit-btn-group {
    width: 1.39rem;
    height: 0.59rem;
    margin: 0 auto 0.11rem;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .activity-rule {
    display: block;
    width: 3.3rem;
    margin: 0 auto 0.14rem;
  }
  .activity-sponsor {
    display: block;
    margin: 0 auto;
    width: 1.48rem;
  }
  .activity-company {
    line-height: 0.41rem;
    text-align: center;
    font-size: 12px;
    color: #060606;
  }
}
</style>