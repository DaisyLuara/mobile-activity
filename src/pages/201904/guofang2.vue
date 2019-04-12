<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'bg.png'"
      class="cut-bg"
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
        v-show="Boolean(qrcodeImg)"
        class="erweima"
      >
        <img
          :src="base + 'erbg.png'"
          class="bg"
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
        <img
          v-show="passed"
          :src="base + 'passed.png'"
          class="used"
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
  sendV2Projects,
  batchV2CouponLimit,
  getInfoById
} from "services";
import moment from "moment";
const CDN_URL = process.env.CDN_URL;
export default {
  data() {
    return {
      base: CDN_URL + "/fe/image/guofang/",
      style: {
        root: {
          "min-height": this.$innerHeight() + "px"
        }
      },
      id: this.$route.query.id,
      coupon_img: null, //'https://cdn.xingstation.cn/fe/image/guofang/test.png',
      qrcodeImg: null, //'http://papi.xingstation.com/qrcode/5c7de9583796b.png',
      used: false, //false,
      passed: false, //false
      code: null, //'5c7de9583796b'
      userinfo: null,
      z: null,
      //微信分享
      wxShareInfoValue: {
        title: "前方高能！国芳百货【全城发红包啦】！",
        desc: "小伙伴们赶紧的，去现场抢红包啦！",
        imgUrl: CDN_URL + "/fe/image/guofang/icon.png"
      }
    };
  },
  // watch: {
  //   sertime() {
  //     if (localStorage.getItem("z")) {
  //       this.z = localStorage.getItem("z");
  //     } else {
  //       this.userinfo
  //         ? (this.z =
  //             this.userinfo.z && localStorage.setItem("z", this.userinfo.z))
  //         : null;
  //     }
  //     this.checkV2Coupon();
  //   }
  // },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        let { id, code, state } = this.$route.query;
        let { sertime, parms, userinfo, belong, oid } = await getInfoById(
          id,
          code,
          state
        );
        this.userinfo = userinfo;
        await this.checkZ();
        const checkV2CouponArgs = {
          z: this.z,
          qiniu_id: this.id,
          belong: belong,
          include: "couponBatch"
        };
        const getCouponBatchArgs = {
          qiniu_id: this.id,
          z: this.z,
          belong: belong
        };
        const sendV2ProjectsArgs = {
          qiniu_id: this.id,
          z: this.z,
          belong: belong,
          oid: oid
        };
        console.log(checkV2CouponArgs);
        const checkCouponResult = await checkV2Coupon(checkV2CouponArgs);
        if (checkCouponResult) {
          this.handleData();
        } else {
          const getCouponBatchResult = await batchV2CouponLimit(
            getCouponBatchArgs
          );
          const sendV2ProjectsResult = await sendV2Projects(sendV2CouponArgs);
          this.handleData(sendV2ProjectsResult);
        }
      } catch (err) {
        alert(err.message);
      } finally {
        this.handleForbiddenShare();
      }
    },
    checkZ() {
      return new Promise(resolve => {
        let localZ = localStorage.getItem("z");
        if (localZ) {
          this.z = localZ;
        } else {
          if (this.userInfo) {
            this.z = this.userinfo.z;
            localStorage.setItem("z", this.userInfo);
          }
        }
        resolve();
      });
    },
    //禁止微信分享
    handleForbiddenShare() {
      $wechat().then(res => {
        res.forbidden();
      });
    },
    //处理返回数据
    handleData(res) {
      this.qrcodeImg = res.qrcode_url;
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
@imgurl: "http://cdn.xingstation.cn/fe/image/guofang/";
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
    width: 145%;
    max-width: 200%;
    position: absolute;
    top: -14%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    margin-bottom: -10%;
  }
  .bg {
    position: relative;
    z-index: 0;
  }
  .coupon {
    width: 100%;
    position: relative;
    z-index: 99;
    margin-top: 34%;
    margin-bottom: 40%;
    .coupon-bg {
      width: 91%;
      position: relative;
      z-index: 0;
    }
    .erweima {
      width: 41.3%;
      position: absolute;
      top: 53%;
      left: 50%;
      transform: translateX(-50%);
      .clip {
        width: 20.5vw;
        height: 20.5vw;
        overflow: hidden;
        position: absolute;
        top: 18.2%;
        left: 49.3%;
        transform: translateX(-50%);
        z-index: 9;
        text-align: center;
        margin: 0 auto;
        img {
          width: 27vw;
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
        top: 41%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
      }
    }
  }
}
</style>
