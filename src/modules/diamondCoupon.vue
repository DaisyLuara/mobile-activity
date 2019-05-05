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
      <div :class="`${couponStyle}-container container`">
        <div
          :class="`${couponStyle}-ticket ticket`"
          @click="handleCouponClick"
        >
          <img
            v-if="coupon.qrcode_url"
            :src="coupon.qrcode_url"
            :class="`${couponStyle}-qr qr`"
          >
          <div
            v-if="couponStyle === 'maowang'"
            :class="`${couponStyle}-code`">
            {{ coupon.code }}
          </div>
        </div>
        <img
          v-if="couponStyle !== 'didi' && coupon.status === 1"
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
      CDNURL: CDNURL,
      couponList: [
        {
          name: '猫王',
          style: 'maowang'
        },
        {
          name: '滴滴',
          style: 'didi'
        },
        {
          name: '兜约春季新品尝鲜',
          style: 'douyueNew'
        },
        {
          name: '兜约消费满100元立减50元',
          style: 'douyue50'
        },
        {
          name: '爆米花',
          style: 'popcorn'
        },
        {
          name: '金石盟定制情侣对戒',
          style: 'diamond'
        }
      ]
    }
  },
  computed:{
    couponStyle() {
      if (!this.coupon) {
        return 'null'
      }
      const couponName = this.coupon.name
      let style = 'thx'
      this.couponList.forEach((item, index) => {
        if (item.name === couponName || couponName.indexOf(item.name) !== -1) {
          style = item.style
        }
      })
      return style
    }
  },
  methods: {
    handleCouponClick() {
      console.log(this.coupon.couponBatch)
      if (this.coupon.couponBatch) {
        const redirectUrl = this.coupon.couponBatch.redirect_url
        console.log(redirectUrl)
        redirectUrl && (location.href = redirectUrl)
      }
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

.container {
  position: relative;
}

.ticket {
  position: absolute;
  width: 2.67rem;
  height: 1.34rem;
  top: 0.24rem;
  left: 0.25rem;
}

.qr {
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

.null-container {
  display: none;
}

.maowang-container {
  width: 3.17rem;
  height: 2.6rem;
  background-image: url("@{cdnUrl}/dimond520/maowang_back.png");
  .maowang-ticket {
    background-image: url("@{cdnUrl}/dimond520/maowang_ticket.png");
    .maowang-qr {
      display: none;
    }
    .maowang-code {
      position: absolute;
      top: 0.925rem;
      left: 1.71rem;
      width: 0.725rem;
      line-height: 0.19rem;
      color: #FFF;
      text-align: center;
      font-size: 0.14rem;
    }
  }
}

.didi-container {
  width: 3.17rem;
  height: 1.69rem;
  background-image: url("@{cdnUrl}/dimond520/didi_back.png");
  .didi-ticket {
    background-image: url("@{cdnUrl}/dimond520/didi_ticket.png");
    .didi-qr {
      display: none;
    }
  }
}

.douyueNew-container {
  width: 3.17rem;
  height: 3.8rem;
  background-image: url("@{cdnUrl}/dimond520/douyueNew_back.png");
  .douyueNew-ticket {
    background-image: url("@{cdnUrl}/dimond520/douyueNew_ticket.png");
  }
}

.douyue50-container {
  width: 3.17rem;
  height: 3.48rem;
  background-image: url("@{cdnUrl}/dimond520/douyue50_back.png");
  .douyue50-ticket {
    background-image: url("@{cdnUrl}/dimond520/douyue50_ticket.png");
  }
}

.popcorn-container {
  width: 3.17rem;
  height: 2.49rem;
  background-image: url("@{cdnUrl}/dimond520/popcorn_back.png");
  .popcorn-ticket {
    background-image: url("@{cdnUrl}/dimond520/popcorn_ticket.png");
  }
}

.diamond-container {
  width: 3.17rem;
  height: 3.49rem;
  background-image: url("@{cdnUrl}/dimond520/jinshi_back.png");
  .diamond-ticket {
    background-image: url("@{cdnUrl}/dimond520/jinshi_ticket.png");
  }
}

.thx-container {
  width: 3.17rem;
  height: 2.32rem;
  background-image: url("@{cdnUrl}/dimond520/thx_back.png");
  .thx-ticket {
    display: none;
    .thx-qr {
      display: none;
    }
  }
}
</style>