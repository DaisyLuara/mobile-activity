<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/top.png`"
      class="back-top"
    >
    <div class="lottery-area">
      <img
        :src="`${CDNURL}/lottery_holder.png`"
        class="lottery-holder"
      >
      <img
        :src="`${CDNURL}/lottery_border.png`"
        class="lottery-border"
      >
      <div
        v-if="showCoupon && coupon"
        class="coupon"
      >
        <img
          :src="coupon.couponBatch.image_url"
          class="coupon-back"
        >
        <img
          :src="coupon.qrcode_url"
          class="coupon-qr"
        >
        <div class="coupon-code">
          {{ coupon.code }}
        </div>
        <img
          v-if="coupon.status === 1"
          :src="`${CDNURL}/coupon_used.png`"
          class="coupon-used"
        >
      </div>
      <div class="lottery-btn-wrap">
        <img
          v-show="clickable"
          :src="`${CDNURL}/lottery_btn.png`"
          class="lottery-btn"
          @click="clickable && handleLottery()"
        >
        <img
          v-show="!clickable"
          :src="`${CDNURL}/lottery_btn_disable.png`"
          class="lottery-btn"
        >
      </div>
    </div>
    <!-- <div
      v-show="showCoupon"
      class="lottery-rule"
    >
      <ul class="rules">
        <li class="rule">
          1、消费前请出示此券；本券不找零不兑现
        </li>
        <li class="rule">
          2、此券不与其他优惠活动同时使用，请保存好此券，遗失不补
        </li>
        <li class="rule">
          3、本券最终解释权归本店所有
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import {
  getInfoById,
  h5Batches,
  bindUserCoupon,
  queryUserCoupon,
  $wechat,
  isInWechat
} from 'services'
import { reCalculateRem } from '@/mixins/reCalculateRem'
import { mapGetters, mapMutations } from "vuex"
import { Toast, Dialog } from 'mand-mobile'
import "assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL + '/dimond520/heartCritical'

export default {
  name: "HeartCritical",
  components: {
    [Dialog.name]: Dialog,
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      showCoupon: false,
      clickable: true,
      coupon: null
    }
  },
  computed: {
    ...mapGetters(["z", "loginState"])
  },
  mounted() {
    this.handleForbiddenShare()
    this.initState()
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    //禁止微信分享
    handleForbiddenShare() {
      if (isInWechat() === true) {
        $wechat().then(res => {
          res.forbidden()
        })
      }
    },
    async initState() {
      Toast.loading('页面加载中')
      let { id, code, state, ser } = this.$route.query
      this.ser = Number(ser)
      this.qiniuId = Number(id)
      try {
        let { userinfo, belong, oid } = await getInfoById(id, code, state)
        this.belong = belong
        this.oid = Number(oid)
        if (userinfo) {
          this.setLoginState(userinfo)
        } else {
          userinfo = this.loginState
        }
        if (!userinfo.z) {
          Toast.failed('获取用户信息失败', 0, true)
        } else {
          this.queryCoupon()
        }
      } catch(e) {
        console.log(e)
        Toast.failed('出错了', 0, true)
      }
    },
    // 查询用户是否有券，若有则直接显示
     async queryCoupon() {
      let params = {
        z: this.z,
        qiniu_id: this.qiniuId,
        belong: this.belong,
        oid: this.oid,
        'ser_timestamp': this.ser
      }
      // debug
      if (process.env.NODE_ENV === 'development') {
        params = {
          z: '0gq9f26c63856b760a0507f5e8c5ac35516j7h',
          qiniu_id: 10929235,
          belong: 'leFitMotion',
          oid: 564,
          'ser_timestamp': this.ser
        }
      }
      try {
        let res = await queryUserCoupon(params)
        if (res.code === 0) {
          this.clickable = false
          this.coupon = res.data
          this.showCoupon = true
        }
        Toast.hide()
      } catch(e) {
        this.clickable = false
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 0, true)
        } else {
          Toast.failed('未知错误', 0, true)
        }
      }
    },
    async handleLottery() {
      this.clickable = false
      this.showCoupon = false
      Toast.loading('抽奖中')
      let params = {
        z: this.z,
        qiniu_id: this.qiniuId,
        belong: this.belong,
        oid: this.oid,
        'ser_timestamp': this.ser
      }
      // debug
      if (process.env.NODE_ENV === 'development') {
        params = {
          z: '0gq9f26c63856b760a0507f5e8c5ac35516j7h',
          qiniu_id: 10929235,
          belong: 'leFitMotion',
          oid: 564,
          'ser_timestamp': this.ser
        }
      }
      try {
        let res = await h5Batches(params)
        if (res.code === 0) {
          let res = await bindUserCoupon(params)
          if (res.code === 0) {
            this.coupon = res.data
            Toast.hide()
            this.showCoupon = true
            Dialog.alert({
              title: '抽奖成功',
              content: '请至服务台领取',
              confirmText: '确定'
            })
          } else {
            Toast.failed('抽奖失败', 2000, true)
          }
        } else {
          Toast.failed('抽奖失败', 2000, true)
        }
      } catch(e) {
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 2000, true)
        } else {
          Toast.failed('未知错误', 2000, true)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/cdnUrl.less";

img {
  display: block;
}

.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url("@{cdnUrl}/dimond520/heartCritical/back.png");
  background-size: 100% auto;
  background-repeat: repeat;
  padding-top: 0.03rem;
  overflow-y: scroll;
  .back-top {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
  }
  .lottery-area {
    width: 100%;
    height: 4.46rem;
    position: relative;
    margin-bottom: 0.25rem;
    .lottery-holder {
      position: absolute;
      width: 3.02rem;
      height: 1.96rem;
      top: 2.09rem;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .lottery-border {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .coupon {
      position: absolute;
      width: 3.34rem;
      top: 2.5rem;
      left: 0.2rem;
      .coupon-back {
        position: absolute;
        top: 0;
        width: 100%;
        height: auto;
      }
      .coupon-qr {
        position: absolute;
        top: 0.12rem;
        right: 0.45rem;
        width: 0.81rem;
        height: 0.81rem;
      }
      .coupon-code {
        position: absolute;
        top: 1.06rem;
        left: 2.5rem;
        font-size:0.1rem;
        color: #FFF;
      }
      .coupon-used {
        position: absolute;
        width: 0.94rem;
        height: 0.63rem;
        top: 0.2rem;
        right: 0.38rem;
      }
    }
    .lottery-btn-wrap {
      position: absolute;
      width: 0.9rem;
      height: 0.9rem;
      bottom: -0.28rem;
      left: 50%;
      transform: translate(-50%, 0);
      .lottery-btn {
        width: 100%;
        height: 100%;
      }
    }
  }
  .lottery-rule {
    position: relative;
    width: 3.34rem;
    height: 2.47rem;
    margin: 0 auto;
    background-image: url("@{cdnUrl}/dimond520/heartCritical/rule_back.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .rules {
      list-style: none;
      position: absolute;
      width: 3.34rem;
      padding: 0.48rem 0.28rem 0;
      box-sizing: border-box;
      .rule {
        display: block;
        font-size: 0.13rem;
        line-height: 0.2rem;
        color: #FFF;
      }
    }
  }
}
</style>