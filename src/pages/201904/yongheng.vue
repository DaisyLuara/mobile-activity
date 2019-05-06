<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'yh_bg.jpg'"
      class="cut-bg"
    >
    <img
      v-show="!Boolean(coupon_img)"
      :src="base + 'loading.png'"
      class="loading"
    >
    <div
      v-show="Boolean(coupon_img)"
      class="coupon"
    >
      <img
        :src="coupon_img"
        class="coupon-bg"
      >
      <div
        v-show="Boolean(qrcode_img)"
        class="erweima"
      >
        <div class="qr-code">
          <GetCoupon
            ref="coupons"
            :style-data="style.qr"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const CDN_URL = process.env.CDN_URL;
import GetCoupon from '@/modules/getCouponByH5'
export default {
  components: {
    GetCoupon
  },
  data() {
    return {
      base: CDN_URL + "/fe/image/guofang/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        },
        qr: {
          code: {
            marginTop: '29%'
          }
        }
      },
      coupon_img: this.$refs.coupons.coupon_img, //'https://cdn.xingstation.cn/fe/image/guofang/test.png',
      qrcode_img: this.$refs.coupons.qrcode_img, //'http://papi.xingstation.com/qrcode/5c7de9583796b.png',
    };
  }
};
</script>
<style lang="less" scoped>
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
  overflow: hidden;
  .cut-bg {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 0;
  }
  .bg {
    position: relative;
    z-index: 0;
  }
  .loading {
    width: 52%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  .coupon {
    width: 100%;
    position: relative;
    z-index: 99;
    margin-top: 41%;
    margin-bottom: 5%;
    .coupon-bg {
      width: 91%;
      position: relative;
      z-index: 0;
    }
    .erweima {
      width: 42%;
      position: absolute;
      top: 60.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
  }
}
</style>
