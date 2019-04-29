<template>
  <div class="verify">
    <div class="verify-qrcode">
      <div class="verify-qrcode_input">
        <img 
          :src="img_url+'qrcode.png?v='+version" 
          @click="wxQrCode"
        >
        <input 
          v-model="verifyForm.coupon" 
          type="text" 
          placeholder="请输入优惠券码" 
          maxlength="11"
        >
      </div>
    </div>
    <div class="verify-camera">
      <div class="verify-camera_input">
        <img :src="img_url+'camera.png?v='+version">
        <input 
          id="image" 
          type="file" 
          accept="image/*" 
          class="camera-input"
        >
        <input 
          v-model="verifyForm.order" 
          type="type" 
          placeholder="请输入订单号" 
          maxlength="8"
        >
      </div>
    </div>
    <div class="verify-money">
      <div class="verify-money_input">
        <img :src="img_url+'money.png?v='+version">
        <input 
          v-model="verifyForm.money" 
          type="type" 
          placeholder="请输入订单金额" 
          maxlength="4"
        >
      </div>
    </div>
    <div class="verify-button">
      <span class="submit">核销</span>
      <span class="cancle">取消</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { $wechat } from 'services'
import wx from 'weixin-js-sdk'
const CDN_URL = process.env.CDN_URL
export default {
  name: 'Verify',
  data() {
    return {
      img_url: CDN_URL + '/shopM/img/',
      version: 1,
      verifyForm: {
        coupon: '',
        order: '',
        money: ''
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    wxQrCode() {
      let qrCode = {
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          alert(res.resultStr)
          this.verifyForm.coupon = res.resultStr
        }
      }
      $wechat()
        .then(res => {
          res.qRCode(qrCode)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.verify {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: #fff;
  .verify-qrcode,
  .verify-camera,
  .verify-money {
    position: relative;
    text-align: center;
    .verify-qrcode_input,
    .verify-camera_input,
    .verify-money_input {
      width: 100%;
      position: relative;
      height: 39px;
      line-height: 1.15;
      .camera-input {
        height: 35px;
        width: 28px;
        position: absolute;
        left: 9%;
        opacity: 0;
      }
      img {
        position: absolute;
        top: 25%;
        left: 10%;
        height: 50%;
      }
    }
    input {
      background: none;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 35px;
      color: #444;
      font-size: 16px;
      width: 90%;
      text-align: center;
      appearance: none;
    }
  }
  .verify-qrcode,
  .verify-camera,
  .verify-money {
    padding: 0 10% 30px;
  }

  .verify-money {
    padding: 0 10%;
  }
  .verify-button {
    margin-top: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .submit {
      border-radius: 5px;
      letter-spacing: 2px;
      padding: 15px 30px;
      font-size: 16px;
      text-align: center;
      background: #19bf68;
      color: #fff;
    }
    .cancle {
      border-radius: 5px;
      letter-spacing: 2px;
      padding: 15px 30px;
      font-size: 16px;
      text-align: center;
      background: #dedede;
      color: #444;
    }
  }
}
</style>

