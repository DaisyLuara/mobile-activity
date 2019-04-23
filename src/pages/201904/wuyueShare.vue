<template>
  <div class="warp">
    <!-- 游戏 -->
    <div class="game-group">
      <CouponRain
        ref="game"
        :spritesData="sprites"
        @listenGameEnd="listenGameEnd"
      />
    </div>
    <div
      v-show="end"
      class="coupons-show"
    >
      <img :src="base + '4.png'">
    </div>
    <!-- 发券 -->
    <div class="send-coupon">

    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, sendCoupon, checkGetCoupon } from "services";
import { normalPages } from "@/mixins/normalPages";
import CouponRain from "@/modules/couponRain"
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  components: {
    CouponRain
  },
  data() {
    return {
      base: CDNURL + "/fe/image/wuyueShare/",
      sprites: {
        bg: CDNURL + '/fe/game/couponrain/Background.png',
        title: CDNURL + '/fe/image/wuyueShare/title.png',
        pig: CDNURL + '/fe/image/wuyueShare/pig.png',
        logo: CDNURL + '/fe/image/wuyueShare/logo.png',
        button: CDNURL + '/fe/game/couponrain/button.png',
        buttonDown: CDNURL + '/fe/game/couponrain/down.png',
        cover: CDNURL + '/fe/game/couponrain/cover.png',
        red: CDNURL + '/fe/game/couponrain/red.png',
      },
      end: false,
      wxShareInfoValue: {
        title: "前方高能！一大波吾悦广场红包等你疯抢！",
        desc: "拼手速，抢吾悦广场惊喜好礼",
        link: window.location.href,
        imgUrl: CDNURL + "/fe/image/wuyueShare/icon.jpg"
      }
    }
  },
  mounted() {
  },
  methods: {
    listenGameEnd(end) {
      this.end = end
    }
  }
}
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.warp {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  .game-group {
    position: relative;
    z-index: 0;
  }
  .coupons-show {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
}
</style>


