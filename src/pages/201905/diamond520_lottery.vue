<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <div class="content-wrap">
      <div class="lottery-area">
        <img
          :src="`${CDNURL}/dimond520/lottery-roller.png`"
          :style="rotateStyle"
          :class="['lottery-roller', { noAnime: noAnime }]"
        >
        <img
          :src="`${CDNURL}/dimond520/lottery_border.png`"
          class="lottery-border"
        >
        <div class="lottery-button">
          <img
            v-show="clickable"
            :src="`${CDNURL}/dimond520/lottery_button.png`"
            @click="clickable && handleLottery()"
          >
          <img
            v-show="!clickable"
            :src="`${CDNURL}/dimond520/lottery_button_disable.png`"
          >
        </div>
      </div>
      <DiamondCoupon
        :coupon="coupon"
        :status="status"
      />
      <img
        v-if="showJumpBtn"
        :src="`${CDNURL}/dimond520/jump_btn.png`"
        class="jump-button"
        @click="handleJump"
      >
      <img
        :src="`${CDNURL}/dimond520/activity_sponsor.png`"
        class="activity-sponsor"
      >
      <p class="activity-company">
        本活动最终解释权归星视度所有
      </p>
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import {
  $wechat,
  isInWechat,
  randomIntNum,
  getInfoById,
  queryUserCoupon,
  h5Batches,
  bindUserCoupon
} from 'services'
import { mapGetters } from "vuex"
import { Toast } from 'mand-mobile'
import DiamondCoupon from "@/modules/diamondCoupon"
import "../../assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "DiamondLottery",
  components: {
    DiamondCoupon
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      belong: null,
      qiniuId: null,
      oid: null,
      clickable: true,
      rotateDeg: 0,
      coupon: null,
      status: 'beforeRolling',
      noAnime: false,
      awardList: ['猫王·原子唱机B612', '滴滴出行优惠券', '兜约春季新品尝鲜', '兜约消费满100元立减50元', '5元换购爆米花(巨影)', '谢谢参与', '金石盟定制情侣对戒'],
      marketid: '',
      jumpMarketList: ['14', '220', '8']
    }
  },
  computed: {
    ...mapGetters(["z"]),
    showJumpBtn() {
      return this.marketid && (this.jumpMarketList.indexOf(this.marketid) !== -1)
    },
    rotateStyle() {
      return {
        transform: `rotate(${this.rotateDeg}deg)`
      }
    }
  },
  async mounted() {
    this.handleForbiddenShare()
    if (!this.z) {
      Toast.failed('用户信息为空', 0, true)
    } else {
      // mock
      Toast.loading('页面加载中')
      // debug
      // if (process.env.NODE_ENV === 'development') {
      //   this.qiniuId = 10929235
      //   this.belong = 'Love520Market'
      //   this.oid = 683
      //   let params = {
      //     // z: this.z,
      //     // z: '4al80b01d4c528dcd5eb9e094faf86f92cc25g',
      //     z: 'ky71a2d5dfff925b026de99489f68fd8a29f1t',
      //     qiniu_id: this.qiniuId,
      //     oid: this.oid,
      //     belong: this.belong
      //   }
      //   // 查询优惠券
      //   try {
      //     let res = await queryUserCoupon(params)
      //     if (res.code === 0) {
      //       this.clickable = false
      //       this.coupon = res.data
      //       this.status = 'showCoupon'
      //     }
      //     Toast.hide()
      //   } catch(e) {
      //     console.log(e)
      //     Toast.failed('加载失败', 0, true)
      //   }
      // } else {
      //   this.initState()
      // }
      this.initState()
    }
  },
  methods: {
    // 获取抽奖所需的信息
    async initState() {
      Toast.loading('页面加载中')
      this.qiniuId = Number(this.$route.query.id)
      let { id, code, state } = this.$route.query
      try {
        let { belong, oid, marketid } = await getInfoById(id, code, state)
        this.belong = belong
        this.oid = Number(oid)
        this.marketid = marketid
        let params = {
          z: this.z,
          qiniu_id: this.qiniuId,
          oid: this.oid,
          belong: this.belong
        }
        // // debug
        // let params = {
        //   z: this.z,
        //   qiniu_id: this.qiniuId,
        //   oid: 683,
        //   belong: 'Love520Market'
        // }
        // 查询用户是否有券，若有则直接显示
        let res = await queryUserCoupon(params)
        if (res.code === 0) {
          this.clickable = false
          this.coupon = res.data
          this.status = 'showCoupon'
        }
        Toast.hide()
      } catch(e) {
        console.log(e)
        Toast.failed('加载失败', 0, true)
      }
    },
    // 抽奖
    async handleLottery() {
      this.clickable = false
      this.status = 'rolling'
      this.rotateDeg = 0
      Toast.loading('请求中')
      let params = {
        z: this.z,
        qiniu_id: this.qiniuId,
        belong: this.belong,
        oid: this.oid
      }
      // // debug
      // let params = {
      //   z: this.z,
      //   qiniu_id: this.qiniuId,
      //   belong: 'Love520Market',
      //   oid: 683
      // }
      try {
        let res = await h5Batches(params)
        if (res.code === 0) {
          console.log(res)
          let res = await bindUserCoupon(params)
          if (res.code === 0) {
            this.coupon = res.data
            let awardIndex = this.getAwardIndex(this.coupon.name)
            // 轮盘动画
            Toast.hide()
            await this.playRollAnimation(awardIndex)
            this.noAnime = true
            this.status = 'showCoupon'
          } else {
            Toast.failed('抽奖失败', 2000, true)
            this.status = 'beforeRolling'
            this.clickable = true
          }
          // // debug
          // this.coupon = res.data
          // let awardIndex = this.getAwardIndex(this.coupon.name)
          // // 轮盘动画
          // Toast.hide()
          // await this.playRollAnimation(awardIndex)
          // this.noAnime = true
          // this.status = 'showCoupon'
          // setTimeout(() => {
          //   this.clickable = true //调试用
          // }, 1000)
        } else {
          Toast.failed('抽奖失败', 2000, true)
          this.status = 'beforeRolling'
          this.clickable = true
        }
      } catch(e) {
        console.log(e)
        Toast.failed('抽奖失败', 2000, true)
        this.status = 'beforeRolling'
        this.clickable = true
      }
    },
    // 转盘动画
    playRollAnimation(index) {
      this.noAnime = false
      const baseDeg = 2880
      const randomDeg = randomIntNum(38, 72) + index * 50
      this.rotateDeg = -(baseDeg + randomDeg)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 3000) // 转盘动画时长
      })
    },
    // 根据奖品名判断奖品序号
    getAwardIndex(awardName) {
      let awardIndex = 5 // 谢谢参与
      this.awardList.forEach((item, index) => {
        if (item === awardName || awardName.indexOf(item) !== -1) {
          awardIndex = index
        }
      })
      return awardIndex
    },
    //禁止微信分享
    handleForbiddenShare() {
      if (isInWechat() === true) {
        $wechat().then(res => {
          res.forbidden()
        })
      }
    },
    handleJump() {
      let jumpUrl = ''
      switch(this.marketid) {
        case '14':
          jumpUrl = 'https://mall.capitaland.com.cn/integral_mall/integral_index?mall_id=68'
          break
        case '220':
          jumpUrl = 'https://mall.capitaland.com.cn/LUONE/lottery/egg?id=FF85CA42773DFE92'
          break
        case '8':
          jumpUrl = 'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/shake_new?id=A181FB8888BD1D9D'
          break
      }
      if (jumpUrl) {
        location.href = jumpUrl
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/cdnUrl.less";

.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url("@{cdnUrl}/dimond520/photo_back.png");
  background-size: 100% auto;
  background-repeat: repeat;
}
img {
  display: block;
}
p {
  margin: 0
}
.back-top {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.content-wrap {
  position: relative;
  padding-top: 0.06rem;
  top: 0;
  left: 0;
  right: 0;
  .lottery-area {
    position: relative;
    width: 3.36rem;
    height: 3.51rem;
    margin: 0 auto;
    background-image: url("@{cdnUrl}/dimond520/lottery_back.png");
    background-size: 100% auto;
    background-repeat: repeat;
    .lottery-border {
      position: absolute;
      width: 2.57rem;
      height: 2.57rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .lottery-roller {
      position: absolute;
      width: 2.27rem;
      height: 2.26rem;
      top: 50%;
      left: 50%;
      margin-top: -1.135rem;
      margin-left: -1.13rem;
      transition: transform ease-in-out 3s;
      &.noAnime {
        transition: none;
      }
    }
    .lottery-button {
      position: absolute;
      width: 0.56rem;
      height: 0.56rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .jump-button {
    width: 2.04rem;
    height: 0.59rem;
    margin: 0 auto 0.2rem;
  }
  .activity-sponsor {
    margin: 0 auto;
    width: 1.48rem;
  }
  .activity-company {
    line-height: 0.41rem;
    text-align: center;
    font-size: 12px;
    color: #060606;
  }
}
</style>