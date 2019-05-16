<template>
  <div class="coupon-display">
    <div
      v-if="status === 'beforeRolling'"
      class="roll-tip"
    >
      点击转盘抽取奖品
    </div>
    <div
      v-if="status === 'rolling'"
      class="roll-loader"
    >
      <md-icon
        name="spinner"
        size="md"
        style="-webkit-filter:invert(1)"
      />
    </div>
    <div
      v-if="status === 'showCoupon' && coupon"
      class="coupon-wrap"
    >
      <div class="coupon-container">
        <div
          class="coupon-ticket"
          @click="handleCouponClick"
        >
          <img
            v-if="coupon.qrcode_url"
            :src="coupon.qrcode_url"
            class="coupon-qr"
          >
          <div
            class="coupon-code"
          >
            {{ coupon.code }}
          </div>
        </div>
        <img
          v-if="coupon.status === 1"
          :src="`${CDNURL}/dimond520/coupon_used.png`"
          class="coupon-used"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'mand-mobile'
const CDNURL = process.env.CDN_URL

export default {
  name: 'DiamondCoupon',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    coupon: {
      type: Object,
      default: null
    },
    status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      CDNURL: CDNURL
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/cdnUrl.less";

img {
  display: block;
}

.coupon-display {
  width: 3.17rem;
  margin: 0 auto 0.24rem;
  min-height: 1.25rem;
  .roll-tip {
    text-align: center;
    color: #000;
    line-height: 1.25rem;
    font-size: 0.18rem;
    font-weight: bold;
  }
  .roll-loader {
    line-height: 1.25rem;
    text-align: center;
  }
}

.coupon-wrap {
  position: relative;
}

.coupon-container {
  position: relative;
}

.coupon-ticket {
  position: absolute;
  width: 2.67rem;
  height: 1.34rem;
  top: 0.24rem;
  left: 0.25rem;
}

.coupon-qr {
  position: absolute;
  width: 0.74rem;
  height: 0.74rem;
  top: 0.1rem;
  right: 0.2rem;
}

.coupon-used {
  position: absolute;
  top: 0.27rem;
  right: 0.22rem;
  width: 1.22rem;
  height: 0.82rem;
}

.container, .ticket {
  background-size: 100% auto;
  background-repeat: repeat;
}
</style>