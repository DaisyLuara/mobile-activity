<template>
  <div
    id="bind"
    class="bind-wrap"
  >
    <div
      class="phone-wrap"
    >
      <!-- 手机号 -->
      <div 
        class="form-block"
      >
        <div 
          class="phone-lable"
        >
          手机号
        </div>
        <input
          v-model="bindPhoneNumber"
          maxlength="11"
          placeholder="请输入手机号" 
          class="phone"
          @click="phoneError=false"
          @keyup="phoneSuccessHandle"
        >
        <div
          v-show="phoneError"
          class="error"
        >
          手机号有误，请重新输入
        </div>
      </div>
      <!-- 图形验证码 -->
      <div 
        v-if="showImageCaptcha"
        class="form-block"
      >
        <div
          class="phone-code"
        >
          图片验证码
        </div>
        <input
          v-model="imageCaptcha.value"
          maxlength="5"
          placeholder="请输入图片验证码"
          class="code"
          @click="imageCaptchaError=false"
        >
        <div
          class="send-code"
        >
          <img 
            :src="image_url"
            class="image-code"
            alt="验证码图片"
            @click="getImageCaptcha()"
          >
        </div>
        <div
          v-show="imageCaptchaError"
          class="error"
        >
          图片验证码长度不对
        </div>
      </div>
      <!-- 短信验证码 -->
      <div
        v-if="showSmsCaptcha"
        class="form-block"
      >
        <div
          class="phone-code"
        >
          短信验证码
        </div>
        <input
          v-model="verificationCode"
          maxlength="6"
          placeholder="请输入短信验证码"
          class="code"
        >
        <div
          v-show="!sendingSmsCaptcha"
          class="send-verification-code"
          @click="sendSmsCaptcha"
        >
          发送验证码
        </div>
        <div
          v-show="sendingSmsCaptcha"
          class="send-verification-code"
        >
          重新获取({{ sendingSmsCaptchaTimer }}s)
        </div>
      </div>
      <!-- 提交 -->
      <div
        class="form-block"
      >
        <div
          class="btn"
          @click="submit"
        >
          绑定
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { Cookies } from 'services'

const HOST = process.env.AD_API

export default {
  data() {
    return {
      imageCaptchaError: false,
      bindPhoneNumber: '',
      verificationCode: '',
      showSmsCaptcha: false,
      imageCaptcha: {
        key: '',
        value: ''
      },
      verification_key: '',
      showImageCaptcha: false,
      sendingSmsCaptcha: false,
      sendingSmsCaptchaTimer: 60, //发送验证码计时器,
      phoneError: false,
      image_url: ''
    }
  },
  watch: {
    'imageCaptcha.value': function() {
      if (this.imageCaptcha.value.length === 5) {
        this.getSmsCaptcha()
      }
    }
  },
  mounted() {
    document.title = '微信绑定'
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    let content = document.getElementById('bind')
    content.style.height = height + 'px'
  },
  created() {
    if (Cookies.get('openid') === null) {
      this.handleFirstAuth()
    }
  },
  methods: {
    submit() {
      let phoneFlag = this.handleButtonClick()
      let imageCaptchaFlag = this.handleimageCaptcha()
      if (phoneFlag && imageCaptchaFlag) {
        let args
        if (Cookies.get('openid') === null) {
          args = {
            verification_key: this.verification_key,
            verification_code: this.verificationCode
          }
        } else {
          args = {
            verification_key: this.verification_key,
            verification_code: this.verificationCode,
            openid: Cookies.get('openid')
          }
        }
        this.$http
          .post(HOST + '/api/user/bind/weixin', args)
          .then(r => {
            Toast('绑定成功')
          })
          .catch(e => {
            console.log(e)
            let status_401 = 'Error: Request failed with status code 401'
            let status_422 = 'Error: Request failed with status code 422'
            let status_403 = 'Error: Request failed with status code 403'
            if (status_401 == e) {
              Toast('短信验证码错误')
              return
            }
            if (status_422 == e) {
              Toast('图片验证码失效')
              return
            }
            if (status_403 == e) {
              Toast('您还未注册，请联系管理员注册')
              return
            }
            Toast(e)
          })
      } else {
        Toast('请输入完整的信息')
      }
    },
    phoneSuccessHandle() {
      Cookies.removeItem('phone_captcha')
      this.imageCaptchaError = false
      if (!/^1[3456789]\d{9}$/.test(this.bindPhoneNumber)) {
        this.phoneError = true
        this.showImageCaptcha = false
        this.showSmsCaptcha = false
        return
      } else {
        Cookies.set('phone_captcha', true)
        this.phoneError = false
        if (Cookies.get('phone_captcha') !== null) {
          this.ImageCaptchaHandle()
        }
      }
    },
    ImageCaptchaHandle() {
      this.getImageCaptcha()
    },
    getImageCaptcha() {
      let args = {
        phone: this.bindPhoneNumber
      }
      this.$http
        .post(HOST + '/api/captchas', args)
        .then(r => {
          let result = r.data
          this.imageCaptcha.key = result.captcha_key
          this.image_url = result.captcha_image_content
          this.showImageCaptcha = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleimageCaptcha() {
      if (this.imageCaptcha.value.length !== 5) {
        this.imageCaptchaError = true
        return false
      } else {
        return true
      }
    },
    getSmsCaptcha() {
      if (this.imageCaptcha.value.length == 5) {
        this.sendSmsCaptcha()
      }
    },
    sendSmsCaptcha() {
      // 校验手机号码、验证码
      let args = {
        captcha_key: this.imageCaptcha.key,
        captcha_code: this.imageCaptcha.value
      }
      this.$http
        .post(HOST + '/api/verificationCodes', args)
        .then(r => {
          this.showSmsCaptcha = true
          let result = r.data
          let that = this
          // 改变发送验证码的文字，倒计时,开启语音验证码
          this.verification_key = result.key
          this.sendingSmsCaptcha = true
          let smsIntervel = function() {
            // 倒计时结束： 改变发送验证码的文字为重新获取
            if (that.sendingSmsCaptchaTimer == 0) {
              window.clearInterval('smsIntervel')
              that.sendingSmsCaptchaTimer = 59
              that.sendingSmsCaptcha = false
              return false
            }
            that.sendingSmsCaptchaTimer--
            setTimeout(smsIntervel, 1000)
          }
          smsIntervel()
        })
        .catch(e => {
          console.log(e)
          let status_401 = 'Error: Request failed with status code 401'
          let status_422 = 'Error: Request failed with status code 422'
          if (status_401 == e) {
            this.getImageCaptcha()
            Toast('图片验证码错误')
            return
          }
          if (status_422 == e) {
            Toast('图片验证码失效')
            this.getImageCaptcha()
            return
          }
          Toast(e)
        })
    },
    handleButtonClick() {
      if (!/^1[3456789]\d{9}$/.test(this.bindPhoneNumber)) {
        this.phoneError = true
        return false
      } else {
        return true
      }
    },
    handleFirstAuth() {
      let now_url = encodeURIComponent(window.location.href)
      let redirct_url =
        process.env.WX_API +
        '/wx/officialAccount/oauth?url=' +
        now_url +
        '&scope=snsapi_userinfo'
      window.location.href = redirct_url
    }
  }
}
</script>
<style lang="less" scoped>
.bind-wrap {
  padding: 20px;
  overflow: hidden;
  .phone-wrap {
    margin: 20% auto;
    .form-block {
      margin-bottom: 30px;
      position: relative;
    }
    .phone-lable {
      color: #444;
      font-size: 18px;
      padding-bottom: 10px;
    }
    .error {
      color: red;
      font-size: 14px;
      position: absolute;
      // margin-top: -25px;
      // margin-bottom: 10px;
    }
    .phone {
      border-bottom: 1px solid #d8d3d3;
      width: 100%;
      padding: 15px 5px;
      font-size: 16px;
    }
    .phone-code {
      color: #444;
      font-size: 18px;
      padding-bottom: 10px;
    }
    .code {
      border-bottom: 1px solid #d8d3d3;
      width: 100%;
      padding: 15px 5px;
      font-size: 16px;
    }
    .send-code {
      position: absolute;
      // border: 1px solid #20A0FF;
      // padding: 10px;
      border-radius: 5px;
      // background: #20A0FF;
      color: #20a0ff;
      bottom: 2%;
      right: 0;
    }
    .send-verification-code {
      position: absolute;
      // border: 1px solid #20A0FF;
      // padding: 10px;
      border-radius: 5px;
      // background: #20A0FF;
      color: #20a0ff;
      bottom: 20%;
      right: 0;
    }
    .btn {
      border: 1px solid #20a0ff;
      background: #20a0ff;
      border-radius: 5px;
      width: 100%;
      text-align: center;
      padding: 15px 0;
      color: #fff;
    }
  }
}
</style>



