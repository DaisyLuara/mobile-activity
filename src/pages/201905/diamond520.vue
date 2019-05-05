<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <div class="content-wrap">
      <div class="photo-area">
        <img :src="photo">
      </div>
      <div class="phone-verify-group">
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
          >{{ waitTime }}s</div>
          <img
            v-else
            :src="`${CDNURL}/dimond520/req_code_btn.png`"
            class="code-button"
            @click="waitTime === 0 && handleReqCodeClick()"
          >
        </div>
      </div>
      <div class="submit-btn-group">
        <img
          v-show="submitBtnClickable"
          :src="`${CDNURL}/dimond520/submit_btn.png`"
          @click="submitBtnClickable && handleSubmit()"
        >
        <img
          v-show="!submitBtnClickable"
          :src="`${CDNURL}/dimond520/submit_btn_disable.png`"
        >
      </div>
      <img
        :src="`${CDNURL}/dimond520/activity_rule.png`"
        class="activity-rule"
      >
      <img
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
        class="activity-sponsor"
      >
      <p class="activity-company">本活动最终解释权归星视度所有</p>
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import {
  filterNumber,
  validatePhone,
  getVerificationCodes,
  getInfoById,
  bindUserPhone
} from 'services'
import { mapGetters, mapMutations } from "vuex"
import { Toast } from 'mand-mobile'
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520",
  components: {

  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      photo: null,
      phone: '',
      code: '',
      waitTimer: null,
      waitTime: 0,
      verifyKey: ''
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
    // // debug
    // if (process.env.NODE_ENV !== 'development') {
    //   this.initState()
    // }
    this.initState()
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    // 根据id获取用户z值,照片等信息
    async initState() {
      Toast.loading('页面加载中')
      let { id, code, state } = this.$route.query
      try {
        let { userinfo, image } = await getInfoById(id, code, state)
        if (userinfo) {
          this.setLoginState(userinfo)
        } else {
          userinfo = loginState
        }
        if (userinfo.mobile) {
          this.$router.push({
            name: 'diamond520Lottery',
            query: this.$route.query
          })
          return
        }
        // debug
        // this.$router.push({
        //   name: 'diamond520Lottery',
        //   query: this.$route.query
        // })
        this.photo = image
        Toast.hide()
      } catch(e) {
        Toast.failed('获取用户信息失败', 0, true)
      }
    },
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
    async handleSubmit() {
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
          this.$router.push({
            name: 'diamond520Lottery',
            query: this.$route.query
          })
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
  .submit-btn-group {
    width: 1.39rem;
    height: 0.59rem;
    margin: 0 auto 0.11rem;
    img {
      width: 100%;
      height: 100%;
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