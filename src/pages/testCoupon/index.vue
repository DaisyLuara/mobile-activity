<template>
  <div
    :style="style.root"
    class="test-coupon-content"
  >
    <!-- <img  class="bg" :src="imgServerUrl + '/pages/drc_ty/bg.png'" alt="" :style="style.bg"/> -->
    <div class="gender">
      <span>{{ gender }}</span>
      <span>{{ age }} 岁</span>
    </div>
    <!-- <img  class="photo" :src="couponUrl" alt=""/> -->
    <!-- <img  class="photo" src="/static/tmall/no_win.png" alt=""/> -->
    <div class="photo">
      {{ couponContent }}
    </div>
    <img
      :src="imgServerUrl + '/pages/zoo/b.png'"
      class="input-bg"
    >
    <img
      v-show="isPhoneError"
      :src="imgServerUrl + '/pages/zoo/error.png'"
      class="input-error"
    >
    <input
      ref="inputreal"
      v-model="phoneValue"
      maxlength="11"
      class="input-value"
      @click="isPhoneError=false"
    >
    <img
      :src="imgServerUrl + '/pages/zoo/a.png'"
      class="remind-bt"
      @click="submit"
    >
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { Toast } from 'mint-ui'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      style: {
        root: {
          width: '100%',
          'min-height': this.$innerHeight() + 'px'
        },
        bg: {
          height: this.$innerHeight() + 'px'
        }
      },
      couponId: null,
      couponContent: '',
      phoneValue: '',
      imgServerUrl: IMAGE_SERVER,
      couponUrl: '',
      gender: '',
      age: '',
      isPhoneError: false,
      //微信分享信息
      wxShareInfo: {
        title: '测试',
        desc: '测试',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/tmall_share_icon.jpg'
      }
    }
  },
  mounted() {
    this.wechatShare()
    this.gender = this.$route.query.gender === '1' ? '女' : '男'
    this.age = this.$route.query.age
    this.getCoupon()
  },
  methods: {
    submit() {
      if (!/^1[3456789]\d{9}$/.test(this.phoneValue)) {
        this.isPhoneError = true
        return
      } else {
        if (this.couponId) {
          let rUrl = process.env.AD_API + '/api/open/coupons/' + this.couponId
          let args = {
            mobile: this.phoneValue
          }
          this.$http
            .post(rUrl, args)
            .then(r => {
              let data = r.data
              Toast('领取成功！')
            })
            .catch(e => {
              console.log(e)
              // let status_500 = 'Error: Request failed with status code 500'
              // if (status_500 == e) {
              //   this.couponContent = '无可用优惠券'
              //   Toast('无可用优惠券')
              //   return
              // }
              Toast(e)
            })
        } else {
          Toast('无可用优惠券,不能领取。')
        }
      }
    },
    wechatShare() {
      $wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function () {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getCoupon() {
      let rq = process.env.AD_API + '/api/open/coupon/batches'
      let policy_id = this.$route.query.policy_id
      let gender = this.$route.query.gender
      let age = this.$route.query.age
      let rd = {
        policy_id: policy_id,
        gender: gender,
        age: age
      }
      this.$http
        .get(rq, { params: rd })
        .then(r => {
          let data = r.data
          this.couponId = data.id
          this.couponContent = data.name
        })
        .catch(e => {
          let status_500 = 'Error: Request failed with status code 500'
          if (status_500 == e) {
            this.couponContent = '无可用优惠券'
            Toast('无可用优惠券')
            return
          }
          Toast(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmall";
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.test-coupon-content {
  width: 100%;
  height: 100%;
  background: #f5f5dc;
  overflow-x: hidden;
  position: relative;
  user-select: none;
  z-index: 10;
  // .bg {
  //   width: 100%;
  //   z-index: -10;
  //   user-select: none;
  //   pointer-events: none;
  // }
  .photo {
    width: 60%;
    text-align: center;
    position: absolute;
    left: 20%;
    top: 27.4%;
    border: 2px solid #e9c693;
    border-radius: 5px;
    padding: 20px;
    font-size: 18px;
    letter-spacing: 2px;
    color: #e9c693;
  }
  .input-bg {
    position: absolute;
    top: 50%;
    width: 80%;
    left: 10%;
    user-select: none;
    pointer-events: none;
  }
  .remind-bt {
    position: absolute;
    top: 64%;
    width: 80%;
    left: 10%;
    user-select: none;
  }
  .input-error {
    position: absolute;
    top: 46%;
    width: 40%;
    left: 30%;
    user-select: none;
    pointer-events: none;
  }
  .input-value {
    background-color: transparent;
    z-index: 14;
    width: 100%;
    position: absolute;
    top: 53%;
    left: 0;
    padding: 0 18%;
    color: #fff;
  }
  .gender {
    width: 100%;
    position: absolute;
    left: 0;
    text-align: center;
    top: 13%;
    font-size: 24px;
    color: #e9c693;
  }
}
</style>


