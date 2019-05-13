<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <div class="content-wrap">
      <img
        :src="`${CDNURL}/dimond520/head_diamond.png`"
        class="diamond-head"
      >
      <div class="photo-area">
        <img :src="photo">
      </div>
      <div
        v-if="!verifiedPhone"
        class="phone-verify-group"
      >
        <input
          :value="phone"
          type="text"
          placeholder="输入手机号"
          class="input phone-input"
          maxlength="11"
          @input="handleInput($event, 'phone')"
        >
        <div class="code-input-wrap">
          <input
            :value="code"
            type="text"
            placeholder="输入验证码"
            class="input code-input"
            maxlength="4"
            @input="handleInput($event, 'code')"
          >
          <div
            v-if="waitTimer"
            class="countdown"
          >
            {{ waitTime }}s
          </div>
          <img
            v-else
            :src="`${CDNURL}/dimond520/req_code_btn.png`"
            class="code-button"
            @click="waitTime === 0 && handleReqCodeClick()"
          >
        </div>
      </div>
      <div class="buttons-wrap">
        <img
          v-if="verifiedPhone"
          :src="`${CDNURL}/dimond520/sub_to_top.png`"
          class="button"
          @click="handleSubmitPhoto"
        >
        <template v-else>
          <img
            v-show="submitBtnClickable"
            :src="`${CDNURL}/dimond520/verify_phone.png`"
            class="button"
            @click="submitBtnClickable && handleVerifyPhone()"
          >
          <img
            v-show="!submitBtnClickable"
            :src="`${CDNURL}/dimond520/verify_phone_disable.png`"
            class="button"
          >
        </template>
        <img
          :src="`${CDNURL}/dimond520/navi_top_btn.png`"
          class="button"
          @click="handleNaviTop"
        >
      </div> 
      <img
        :src="`${CDNURL}/dimond520/couple_rule.png`"
        class="activity-rule"
      >
      <img
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
        class="activity-sponsor"
      >
      <p class="activity-company">
        本活动最终解释权归星视度所有
      </p>
    </div>
  </div>
</template>

<script>
import {
  filterNumber,
  validatePhone,
  getVerificationCodes,
  getInfoById,
  bindUserPhone,
  addToBoard
} from 'services'
import { mapGetters, mapMutations } from "vuex"
import { Toast } from 'mand-mobile'
import "../../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520Couple",
  props: {
    photo: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      CDNURL: CDNURL,
      phone: '',
      code: '',
      waitTimer: null,
      waitTime: 0,
      verifyKey: '',
      verifiedPhone: false,
      userinfo: null
    }
  },
  computed: {
    ...mapGetters(["z", "loginState"]),
    // 提交按钮是否可点击
    submitBtnClickable() {
      return this.phone && this.code
    }
  },
  mounted() {
    this.userinfo = this.loginState
    if (this.userinfo.mobile) {
      this.verifiedPhone = true
    }
    if (!this.z) {
      Toast.failed('获取用户信息失败', 0, true)
    }
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
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
    async handleReqCodeClick() {
      if (!this.isValidPhone()) {
        return
      }
      this.setCountdown()
      let params = {
        phone: this.phone
      }
      try {
        Toast.loading('验证码发送中')
        let res = await getVerificationCodes(params)
        if (res.code === 0) {
          Toast.succeed('验证码发送成功')
          this.verifyKey = res.data.key
        } else {
          Toast.failed('未知错误')
        }
      } catch(e) {
        console.log(e)
        Toast.failed('验证码发送失败')
      }
    },
    isValidCode() {
      const valid = /^\d{4}$/.test(this.code)
      !valid && Toast.info('验证码错误，请重新输入')
      return valid
    },
    async handleSubmitPhoto() {
      let params = {
        z: this.z,
        qiniu_id: this.$route.query.id,
        campaign: "520Diamonds"
      }
      Toast.loading('提交中')
      try {
        let res = await addToBoard(params)
        if (res.code === 0) {
          Toast.succeed('提交成功', 0, true)
          this.$router.push({
            name: 'diamond520LotteryCouple', // 双人抽奖页
            query: this.$route.query
          })
        } else {
          Toast.failed('提交失败', 2000, true)
        }
      } catch(e) {
        console.log(e)
        if (e.response.data) {
          Toast.failed(e.response.data.message, 2000, true)
          setTimeout(() => {
            this.$router.push({
              name: 'diamond520LotteryCouple', // 双人抽奖页
              query: this.$route.query
            })
          }, 2000)
        } else {
          Toast.failed('未知错误，请稍后重试', 2000, true)
        }
      }
    },
    handleNaviTop() {
      this.$router.push({
        name: 'diamond520Top'
      })
    },
    async handleVerifyPhone() {
      if (!this.isValidPhone() || !this.isValidCode()) {
        return
      }
      let params = {
        z: this.z,
        verification_key: this.verifyKey,
        verification_code: this.code
      }
      Toast.loading('验证中')
      try {
        let res = await bindUserPhone(params)
        if (res.code === 0) {
          Toast.succeed('验证成功')
          // 更新用户手机号信息
          this.userinfo.mobile = this.phone
          this.setLoginState(this.userinfo)
          this.verifiedPhone = true
        } else {
          Toast.failed('验证失败', 2000, true)
        }
      } catch(e) {
        console.log(e)
        Toast.failed('验证失败', 2000, true)
      }
    },
    // 点击获取验证码后设置60秒等待时间
    setCountdown() {
      this.waitTime = 60
      this.waitTimer = setInterval(() => {
        if (this.waitTime === 0) {
          clearInterval(this.waitTimer)
          this.waitTimer = null
        } else {
          this.waitTime--
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/cdnUrl.less";

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
img {
  display: block;
}
.back-top {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.content-wrap {
  position: relative;
  padding-top: 0.19rem;
  top: 0;
  left: 0;
  right: 0;
  .diamond-head {
    width: 3.24rem;
    height: 1.57rem;
    margin: 0 auto -0.06rem;
  }
  .photo-area {
    width: 2.64rem;
    height: 4.35rem;
    margin: 0 auto;
    padding: 0.15rem 0.215rem 0.285rem;
    box-sizing: border-box;
    background-image: url("@{cdnUrl}/dimond520/photo_border.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .phone-verify-group {
    width: 2.65rem;
    margin: 0 auto 0.03rem;
    .input {
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
      display: block;
    }
    .code-input-wrap {
      width: 100%;
      display: flex;
      .code-input {
        width: 1.63rem;
        margin-right: 0.08rem;
      }
      .code-button, .countdown {
        width: 0.95rem;
        height: 0.35rem;
      }
      .countdown {
        color: #FFF;
        line-height: 0.35rem;
        background: #FBA6C6;
        text-align: center;
        font-size: 0.15rem;
        border-radius: 0.1rem;
      }
    }
  }
  .buttons-wrap {
    display: flex;
    padding: 0 0.48rem;
    justify-content: space-between;
    margin-bottom: 0.11rem;
    .button {
      width: 1.39rem;
      height: 0.59rem;
    }
  }
  .activity-rule {
    width: 3.3rem;
    margin: 0 auto 0.14rem;
  }
  .activity-sponsor {
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