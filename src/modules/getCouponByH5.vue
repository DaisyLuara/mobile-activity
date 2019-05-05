<template>
  <!-- 静止微信分享，从h5页面查券，发券，领券 调取券策略-->
  <div>
    <div class="ma">
      <div
        :style="style_data.clip ? style_data.clip:null"
        class="clip"
      >
        <img
          :style="style_data.clip ? style_data.clip.img:null"
          :src="qrcode_img"
          class="qrcode"
        >
      </div>
      <img
        v-show="used"
        :style="style_data.used ? style_data.used:null"
        :src="common_url + 'used.png'"
        class="used"
      >
      <img
        v-show="passed"
        :style="style_data.used?style_data.used:null"
        :src="common_url + 'passed.png'"
        class="used"
      >
    </div>
    <div
      :style="style_data.code?style_data.code:null"
      class="code"
    >
      {{ code }}
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
  getInfoById,
} from "services";
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";
const CDN_URL = process.env.CDN_URL;
export default {
  props: {
    styleData: {
      type: Object,
      required: false,
      default: ()=>{
        return {clip: '', used: '', code: ''}
      }
    },
    couponImg: {
      type: String,
      required: true,
      default: ''
    },
    qrcodeImg: {
      type: String,
      required: true,
      default: ''
    },
    used: {
      type: Boolean,
      required: true,
      default: false
    },
    passed: {
      type: Boolean,
      required: true,
      default: false
    },
    code: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      common_url: CDN_URL + "/common/",
      id: this.$route.query.id,
      userinfo: null
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
        let { parms, userinfo, belong, oid } = await getInfoById(
          id,
          code,
          state
        );
        if (this.z === '') {
          this.setLoginState(userinfo);
          this.userinfo = userinfo;
        }
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
        const checkCouponResult = await checkV2Coupon(checkV2CouponArgs);
        if (checkCouponResult) {
          alert('该券您已经领取过啦！')
          this.handleData(checkCouponResult);
        } else {
          const getCouponBatchResult = await batchV2CouponLimit(
            getCouponBatchArgs
          );
          const sendV2ProjectsResult = await sendV2Projects(sendV2ProjectsArgs);
          this.handleData(sendV2ProjectsResult);
        }
      } catch (err) {
        if (err.response) {
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
.ma {
  position: relative;
  .clip {
    width: 20.5vw;
    height: 20.5vw;
    overflow: hidden;
    position: relative;
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
    width: 28vw;
    max-width: 35vw;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
}
.code {
  position: relative;
  width: 100%;
  text-align: center;
  z-index: 999;
  color: #000;
  font-weight: bold;
  font-size: 5vw;
  margin-top: 15px;
}
</style>

