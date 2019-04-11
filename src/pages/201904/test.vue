<template>
  <div
    :style="style.root"
    class="warp"
  >

    <div
      v-show="eshow.register"
      class="getphone"
    >
      <input
        type="number"
        v-model="arr.phone"
        @input="maxLength(11,arr,'phone')"
        placeholder="请输入手机号码"
        class="phone"
      >
      <div class="message-code">
        <input
          type="number"
          v-model="arr.vertify"
          @input="maxLength(4,arr,'vertify')"
          placeholder="验证码"
          class="vertify"
        >
        <a
          class="getvertify"
          @click="getVertify"
        >获取验证码</a>
      </div>
      <a
        class="register"
        @click="toRegister"
      >注册领券</a>
    </div>
    <div
      v-show="eshow.coupon"
      class="coupon"
    >
      <img
        :src="imgs.coupon_img"
        class="coupon-bg"
      >
      <div class="erweima">
        <div class="clip">
          <img
            :src="imgs.qrcodeImg"
            class="qrcode"
          >
        </div>
        <img
          v-show="eshow.used"
          :src="base + 'used.png'"
          class="used"
        >
        <img
          v-show="eshow.passed"
          :src="base + 'passed.png'"
          class="used"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, checkV2Coupon, sendV2Coupon, checkMallMember, sendMessageCode, getCardByPhone } from 'services'
import { normalPages } from '@/mixins/normalPages'
import moment from "moment";
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/mengbao/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      z: null,
      eshow: {
        register: false,//false
        coupon: false,
        used: false,//false,
        passed: false,//false
      },
      arr: {
        phone: null,
        vertify: null,
        vkey: null,
        vcode: null,
        open_user_id: null,

      },
      imgs: {
        coupon_img: 'https://cdn.xingstation.cn/fe/image/mengbao/2.png',//'https://cdn.xingstation.cn/fe/image/mengbao/2.png',
        qrcodeImg: 'http://papi.xingstation.com/qrcode/5c7de9583796b.png',//'http://papi.xingstation.com/qrcode/5c7de9583796b.png',
      },
      code: null,//'5c7de9583796b
      //微信分享
      wxShareInfoValue: {
        title: "领券注册测试",
        desc: "领券注册测试",
        imgUrl: "https://cdn.xingstation.cn/fe/image/mengbao/icon.jpg"
      }
    }
  },
  watch: {
    sertime() {
      if (localStorage.getItem('z')) {
        this.z = localStorage.getItem('z')
      } else {
        this.userinfo ? this.z = this.userinfo.z && localStorage.setItem('z', this.userinfo.z) : null
      }
      this.checkMallMember()
    }
  },
  mounted() {
    this.handleForbiddenShare()
  },
  methods: {
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden()
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    maxLength(max, arr, name) {
      if (Number(arr[name].length) > Number(max)) {
        arr[name] = arr[name].slice(0, Number(max))
      }
    },
    toRegister() {
      this.getCardByPhone()
    },
    checkMallMember() {
      let args = {
        z: this.z,
        oid: this.oid
      }
      checkMallMember(args).then(res => {
        if (res) {
          this.arr.open_user_id = res.mallcoo_open_user_id
          //查券
          this.checkV2Coupon()
        } else {
          this.eshow.register = true
        }
      }).catch(err => {
        alert(err.response.data.message)
      })
    },
    getVertify() {
      let reg = /^1[3|4|5|6|7|8][0-9]{9}$/
      let that = this
      if (!reg.test(this.arr.phone)) {
        alert('请输入11位有效的手机号码')
        return
      }
      this.sendMessageCode()
    },
    sendMessageCode() {
      sendMessageCode(this.arr.phone).then(res => {
        this.arr.vertify = res.key
      }).catch(err => {
        alert(err.response.data.message)
      })
    },
    getCardByPhone() {
      let args = {
        "verification_key": this.arr.vkey,
        "verification_code": this.arr.vcode,
        "oid": this.oid,
        "z": this.z
      }
      getCardByPhone(args).then(res => {
        this.arr.open_user_id = res.mallcoo_open_user_id
        this.eshow.register = false
        this.sendV2Coupon()
      }).catch(err => {
        alert(err.response.data.message)
      })
    },
    //发优惠券
    sendV2Coupon() {
      let args = {
        qiniu_id: this.id,
        z: this.z,
        belong: this.belong,
        oid: this.oid
      }
      sendV2Coupon(args, this.coupon_batch_id)
        .then(res => {
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //判断是否领过优惠券
    checkV2Coupon() {
      let args = {
        z: this.z,
        coupon_batch_id: this.coupon_batch_id,
        include: 'couponBatch',
      }
      checkV2Coupon(args).then(res => {
        if (res) {
          this.handleData(res)
        } else {
          let timer = setTimeout(() => {
            this.sendV2Coupon()
            clearTimeout(timer)
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //处理返回数据
    handleData(res) {
      this.eshow.coupon = true
      this.imgs.qrcodeImg = res.qrcode_url
      this.imgs.coupon_img = res.couponBatch.image_url
      this.code = res.code
      let now = moment()
      let end = moment(res.end_date)
      let diff = end.diff(now)
      if (parseInt(res.status) === 1) {
        this.eshow.used = true
      } else if (diff <= 0) {
        this.eshow.passed = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/mengbao/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.warp {
  position: relative;
  overflow-x: hidden;
  background-color: #434343;
  .register {
    display: block;
    width: 100%;
    position: relative;
    border: solid 1px #ccc;
    font-size: 5vw;
    color: #fff;
    padding: 5px 10px;
    margin-top: 20px;
  }
  .getphone {
    width: 50%;
    position: relative;
    z-index: 0;
    margin-top: 30%;
    input {
      border: solid 1px #fff;
      color: #fff;
      font-size: 3vw;
      height: 30px;
      line-height: 30px;
      background: transparent;
      text-align: left;
    }
    .phone {
      width: 100%;
      min-width: 120px;
      margin-top: 10px;
      padding-left: 10px;
    }
    .message-code {
      position: relative;
      overflow: hidden;
      margin-top: 10px;
    }
    .vertify {
      width: 25%;
      min-width: 80px;
      font-size: 3vw;
      line-height: 30px;
      float: left;
      text-align: center;
    }
    .getvertify {
      display: inline-block;
      width: 45%;
      float: right;
      font-size: 3vw;
      height: 30px;
      line-height: 30px;
      color: #fff;
    }
  }
  .coupon {
    width: 100%;
    position: relative;
    margin-top: 3%;
    margin-bottom: 15%;
    .coupon-bg {
      width: 92.5%;
      position: relative;
      z-index: 0;
    }
    .erweima {
      width: 19vw;
      height: 19vw;
      // position: absolute;
      // top: 17.3%;
      // right: 11%;
      position: relative;

      .clip {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 9;
        text-align: center;
        margin: 0 auto;
        img {
          width: 25vw;
          max-width: 35vw;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .used {
        width: 26vw;
        max-width: 35vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
      }
    }
  }
}
@keyframes toarrow {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(50%);
  }
}
</style>


