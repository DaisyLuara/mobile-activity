<template>
  <div class="container">
    <img
      :src="base + 'bg.png'"
      class="bg"
    >
    <div class="main">
      <img
        :src="base+'logo.png'"
        class="title"
      >
      <div class="content">
        <img
          :src="base+'cover.png'"
          class="bg"
        >
        <div class="picture">
          <img
            :src="base+'frame.png'"
            class="bg"
          >
          <img
            :src="photo"
            class="photo"
          >
        </div>
        <img
          v-show="Boolean(coupon_img)"
          :src="coupon_img"
          class="coupon"
        >
      </div>
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  checkV2Coupon,
  sendV2Coupon,
  getInfoById,
  splitParms
} from "services";
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";
const CDN_URL = process.env.CDN_URL;
export default {
  data() {
    return {
      base: CDN_URL + "/fe/image/jiading_drc/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      id: this.$route.query.id,
      photo: null,
      coupon_img: null,
      qrcode_img: null,
      used: false,
      passed: false,
      code: null,
      userinfo: null,
    };
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    async init() {
      try {
        let { id, code, state } = this.$route.query;
        let { parms, image, userinfo, belong, oid } = await getInfoById(
          id,
          code,
          state
        );
        this.photo = image
        parms = splitParms(parms)
        let coupon_batch_id = parms.coupon_batch_id
        if (this.z === '') {
          this.setLoginState(userinfo);
          this.userinfo = userinfo;
        }
        const checkV2CouponArgs = {
          z: this.z,
          coupon_batch_id: coupon_batch_id,
          include: "couponBatch"
        };
        const sendV2CouponArgs = {
          qiniu_id: this.id,
          z: this.z,
          belong: belong,
          oid: oid
        };
        const checkCouponResult = await checkV2Coupon(checkV2CouponArgs);
        if (checkCouponResult) {
          alert('该券您已经领取过啦！')
          this.handleData(checkCouponResult);
        } else {
          const sendV2CouponResult = await sendV2Coupon(sendV2CouponArgs);
          this.handleData(sendV2CouponResult);
        }
      } catch (err) {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      } finally {
        this.handleForbiddenShare();
      }
    },
    //禁止微信分享
    handleForbiddenShare() {
      $wechat().then(res => {
        res.forbidden();
      });
    },
    //处理返回数据
    handleData(res) {
      this.qrcode_img = res.qrcode_url;
      this.coupon_img = res.couponBatch.image_url;
      this.code = res.code;
      let now = moment();
      let end = moment(res.end_date);
      let diff = end.diff(now);
      if (parseInt(res.status) === 1) {
        this.used = true;
      } else if (diff <= 0) {
        this.passed = true;
      }
    }
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
.container {
  position: relative;
  width: 100%;
  overflow: hidden;
  .bg {
    position: relative;
    z-index: 0;
    margin: 0 auto;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    overflow: hidden;
    z-index: 9;
    .title {
      width: 94%;
      margin-left: 2%;
      margin-top: 8%;
      margin-bottom: 8%;
      z-index: 0;
    }
    .content {
      width: 100%;
      position: relative;
      z-index: 0;
      overflow: hidden;
      & > .bg {
        width: 90%;
        margin-left: 3%;
        margin-top: 15%;
      }
      .picture {
        width: 51%;
        position: absolute;
        top: 0%;
        left: 4%;
        overflow: hidden;
        .photo {
          width: 91.6%;
          position: absolute;
          top: 49.5%;
          left: 49.5%;
          transform: translate(-50%, -50%);
          z-index: 99;
          pointer-events: auto;
          user-select: auto;
        }
      }
      .coupon {
        width: 40%;
        position: absolute;
        top: 0%;
        right: 2%;
        z-index: 999;
      }
    }
  }
}
</style>
