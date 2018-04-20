<template>
  <div 
    class="act-root"
    :style="style.root">
    <img
      :style="style.logo"
      :src="this.baseUrl + 'logo.png'" />

    <img
      :style="style.people"
      :src="this.baseUrl + 'people.png'" />

    <img
      :style="style.bg"
      :src="this.baseUrl + 'bg.png'" />

    <div
      v-show="this.phoneError"
      :style="style.errormsg">
      手机号有误，请重新输入
    </div>
    <input 
      maxlength="11"
      :class="{ 'phoneError': this.phoneError}"
      @click="handlePhoneError"
      v-model="bindPhoneNumber"
      placeholder="请输入手机号"
      :style="style.input"
      />

    <img
      @click="handleButtonClick"
      :style="style.button"
      :src="this.baseUrl + 'button.png'" />

    <img
      :style="style.bgadd" 
      :src="this.baseUrl + 'bg-add.png'" />
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { isWeixin } from '../../modules/util'
const wx = require('weixin-js-sdk')

export default {
  data() {
    return {
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/',
      style: {
        root: {
          height: window.innerHeight + 'px'
        },
        logo: {
          position: 'absolute',
          width: window.innerWidth + 'px',
          zIndex: '10',
          top: '0'
        },
        people: {
          position: 'absolute',
          width: window.innerWidth * 0.7 + 'px',
          left: window.innerWidth * 0.15 + 'px',
          zIndex: '10',
          top: window.innerWidth * 303 / 750 * 1.2 + 'px'
        },
        bgadd: {
          width: window.innerWidth + 'px',
          position: 'absolute',
          bottom: '0',
          right: '0'
        },
        bg: {
          width: window.innerWidth + 'px',
          position: 'absolute',
          top: '0'
        },
        errormsg: {
          position: 'absolute',
          zIndex: '30',
          left: window.innerWidth * 0.1 + 'px',
          width: window.innerWidth * 0.8 + 'px',
          top:
            window.innerWidth * 303 / 750 * 1.2 +
            window.innerWidth * 0.7 * 434 / 624 * 0.98 +
            'px',
          textAlign: 'center',
          color: 'red'
        },
        input: {
          position: 'absolute',
          zIndex: '30',
          borderRadius: '20px',
          height: window.innerWidth * 0.8 * 94 / 604 + 'px',
          padding: '10px 20px',
          fontWeight: '300',
          left: window.innerWidth * 0.1 + 'px',
          width: window.innerWidth * 0.8 + 'px',
          top:
            window.innerWidth * 303 / 750 * 1.2 +
            window.innerWidth * 0.7 * 434 / 624 * 1.1 +
            'px'
        },
        button: {
          zIndex: '30',
          position: 'absolute',
          width: window.innerWidth * 0.8 + 'px',
          left: window.innerWidth * 0.1 + 'px',
          top:
            window.innerWidth * 303 / 750 * 1.2 +
            window.innerWidth * 0.7 * 434 / 624 * 1.1 +
            window.innerWidth * 0.8 * 94 / 604 * 1.5 +
            'px'
        }
      },
      bindPhoneNumber: null,
      phoneError: false
    }
  },
  mounted() {
    // this.handleForbiddenShare()
    if (localStorage.getItem('xingstation51act') !== null) {
      let pushData = {
        params: JSON.parse(localStorage.getItem('xingstation51act')),
        name: '51actcp',
        query: {}
      }
      if (this.$route.query.hasOwnProperty('pid') === true) {
        pushData.query.pid = this.$route.query.pid
      }
      this.$router.push(pushData)
    }
  },
  methods: {
    handleForbiddenShare() {
      if (isWeixin() === true) {
        let requestUrl = process.env.WX_API + '/wx/officialAccount/sign'
        this.$http.get(requestUrl).then(response => {
          let resData = response.data.data
          let wxConfig = {
            debug: false,
            appId: resData.appId,
            timestamp: resData.timestamp,
            nonceStr: resData.nonceStr,
            signature: resData.signature,
            jsApiList: [
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ]
          }
          wx.config(wxConfig)
          wx.ready(() => {
            wx.showMenuItems({
              menuList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
              ] // 要显示的菜单项，所有menu项见附录3
            })
          })
        })
      }
    },
    handleButtonClick() {
      if (!/^1[345678]\d{9}$/.test(this.bindPhoneNumber)) {
        this.phoneError = true
        return
      } else {
        this.checkCoupon()
      }
    },
    handlePhoneError() {
      this.phoneError = false
    },
    checkCoupon() {
      const url = process.env.STORE_API + '/rest/coupon/'

      if (this.$route.query.hasOwnProperty('coupon_id')) {
        let pdata = {
          mobile: this.bindPhoneNumber,
          coupon_id: this.$route.query.coupon_id
        }
        this.$http
          .put(url, pdata)
          .then(r => {
            console.dir(r)
            if (r.status === 200) {
              if (r.data.hasOwnProperty('error')) {
                Toast(r.data.error.msg)
              } else {
                let para = {
                  coupon_data: r.data,
                  pid: this.$route.query.pid
                }
                localStorage.setItem('xingstation51act', JSON.stringify(para))
                let pushData = {
                  params: para,
                  name: '51actcp',
                  query: {}
                }
                if (this.$route.query.hasOwnProperty('pid')) {
                  pushData.query.pid = this.$route.query.pid
                }
                this.$router.push(pushData)
              }
            }
          })
          .catch(err => {
            Toast('网络错误，请重试')
          })
      } else {
        Toast('未获取到优惠券，请重新扫码')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.phoneError {
  border: 1px solid red;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}
.act-root {
  position: relative;
  background-color: #f7ead3;
}
</style>
