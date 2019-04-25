<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + '1.png'"
      class="right"
    >
    <div class="main">
      <img
        :src="coupon_img + this.$qiniuCompress()"
        class="coupon"
      >
      <div class="erweima">
        <img
          :src="base + '3.png'"
          class="erbg"
        >
        <div class="clip">
          <img
            :src="qrcodeImg"
            class="qrcode"
          >
        </div>
        <img
          v-show="used"
          :src="base + 'used.png'"
          class="used"
        >
      </div>
    </div>
    <!-- <BottomBar :menucode="'56'" /> -->
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, Cookies, sendCoupon, checkGetCoupon } from 'services'
import { normalPages } from '@/mixins/normalPages'
// import BottomBar from "@/pages/m/components/Static/BottomBar";
const CDN_URL = process.env.CDN_URL
export default {
  components: {
    // BottomBar
  },
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/couponrain/lkf/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      userId: null,
      coupon_img: null,//'https://cdn.xingstation.cn/fe/image/couponrain/lkf/Lee.png',
      qrcodeImg: null,//'https://cdn.xingstation.cn/fe/image/couponrain/5c22f3d46c008.png',
      used: false,
      arr: [190, 193, 194, 195, 196],
      num: parseInt(Math.random() * 4),
      //微信分享
      wxShareInfoValue: {
        title: "高能预警！一大波“红包雨”强势来袭！",
        desc: "拼手速，抢抢抢抢抢抢连卡福新春红包",
        link: "http://papi.xingstation.com/api/s/K8r" + window.location.search,
        imgUrl: CDN_URL + "/fe/image/couponrain/share.jpg",
      }
    }
  },
  watch: {
    parms() {
      this.checkGetCoupon()
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
      }
    },
    //判断是否领过优惠券
    checkGetCoupon() {
      let coupon_batch_id = this.coupon_batch_id
      let args = {
        coupon_batch_id: coupon_batch_id,
        include: 'couponBatch',
        qiniu_id: this.id
      }
      checkGetCoupon(args).then(res => {
        console.log(res)
        if (res) {
          this.handleData(res)
        } else {
          this.sendCoupon()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendCoupon() {
      let args = {
        include: 'couponBatch',
        qiniu_id: this.id,
        oid: this.oid,
        belong: this.belong
      }
      let coupon_batch_id = this.coupon_batch_id
      sendCoupon(args, coupon_batch_id)
        .then(res => {
          console.log('sendCoupon', res)
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url
      this.coupon_img = res.couponBatch.image_url
      if (parseInt(res.status) === 1) {
        this.used = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.xingstation.cn/fe/image/couponrain/lkf/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  background-image: url("@{img}2.jpg");
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #c71429;
  .right {
    width: 21.5%;
    position: absolute;
    top: 25%;
    right: 1%;
    z-index: 99;
  }
  .main {
    width: 72%;
    position: relative;
    z-index: 0;
    margin-top: 32%;
    margin-left: 20%;
    margin-bottom: 5%;
    .coupon {
      position: relative;
      z-index: 0;
    }
    .erweima {
      position: absolute;
      top: 55%;
      left: 43%;
      transform: translateX(-50%);
      width: 40vw;
      .erbg {
        position: relative;
        z-index: 0;
      }
      .clip {
        width: 20vw;
        height: 20vw;
        overflow: hidden;
        position: absolute;
        top: 15.5%;
        left: 50%;
        z-index: 9;
        transform: translateX(-50%);
        text-align: center;
      }
      .qrcode {
        width: 25vw;
        max-width: 30vw;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // height: 25vw;
      }
      .used {
        width: 27vw;
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
  }
  .btb {
    margin-bottom: 0;
    // padding-left: 30px;
    // padding-right: 30px;
    justify-content: space-around;
    .bitem {
      width: 33%;
    }
  }
}
</style>


