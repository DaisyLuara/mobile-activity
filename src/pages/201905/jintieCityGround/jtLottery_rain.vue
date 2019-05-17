<template>
  <div class="wrap">
    <div class="content-wrap">
      <img
        :src="`${CDNURL}/fe/jintie-logo.png`"
        class="logo"
      >
      <div class="lottery-area">
        <img
          :src="`${CDNURL}/jtree/lottery-roller.png`"
          :style="rotateStyle"
          :class="['lottery-roller', { noAnime: noAnime }]"
        >
        <img
          :src="`${CDNURL}/jtree/lottery_border.png`"
          class="lottery-border"
        >
        <div class="lottery-button">
          <img
            v-show="clickable"
            :src="`${CDNURL}/jtree/lottery_button.png`"
            @click="clickable && handleLottery()"
          >
          <img
            v-show="!clickable"
            :src="`${CDNURL}/dimond520/lottery_button_disable.png`"
          >
        </div>
      </div>
      <TreeCoupon
        :coupon="coupon"
        :status="status"
      />
    </div>
  </div>
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import {
  Cookies,
  $wechat,
  isInWechat,
  isiOS,
  randomIntNum,
  getInfoById,
  queryUserCoupon,
  h5Batches,
  bindUserCoupon
} from 'services'
import { mapGetters } from "vuex"
import { Toast } from 'mand-mobile'
import TreeCoupon from "@/modules/TreeCoupon"
import "assets/less/reset-mand.less"
const CDNURL = process.env.CDN_URL

export default {
  name: "DiamondLottery",
  components: {
    TreeCoupon
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL,
      sign: '',
      ser: null,
      belong: null,
      qiniuId: null,
      oid: null,
      defaultBelong: 'leFitMotion',
      defaultQiniuId: 10929238,
      defaultOid: 564,
      clickable: true,
      rotateDeg: 0,
      coupon: null,
      status: 'beforeRolling',
      noAnime: false,
      awardList: ['戴森吹风机', '抵用券', '现金券', '欢唱券', '咖啡券', '现金券', '点阵告白']
    } 
  },
  computed: {
    ...mapGetters(["weixinUrl"]),
    rotateStyle() {
      return {
        transform: `rotate(${this.rotateDeg}deg)`
      }
    }
  },
  async mounted() {
    if (isiOS && !this.$route.query.iosRand) {
      const iosRand = 'iosRand=' + new Date().getTime()
      let url = location.href
      if (url.indexOf('?') > 0) {
        url = url + '&' + iosRand
      } else {
        url = url + '?' + iosRand
      }
      location.replace(url)
      return
    }
    if (process.env.NODE_ENV === 'development') {
      this.sign = 'eyJpdiI6ImpaM3NZQ0U1dVdBTEs0SjkwSTVmUlE9PSIsInZhbHVlIjoiTDhtbGp0MitjdmsxZFNUdkRFcjN6QT09IiwibWFjIjoiYTQ2Y2YzMzc4YzM0ZDQ4OGRkNjgwZGU4N2M3MTMwZmM3NjkyMTlhMGJmM2Q1MzM3YTU2Mzc2NWYzM2NmNjBhYiJ9'
    } else {
      this.handleWechatAuth()
    }
    if (this.sign) {
      this.initState()
    }
    this.handleForbiddenShare()
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
        this.sign = Cookies.get('sign')
      }
    },
    // 获取抽奖所需的信息
    async initState() {
      let { id, ser } = this.$route.query
      this.ser = ser ? Number(ser) : null
      if (id) {
        try {
          Toast.loading('页面加载中')
          let { belong, oid } = await getInfoById(id)
          this.belong = belong
          this.oid = Number(oid)
        } catch(e) {
          console.log(e)
          Toast.failed('加载失败', 0, true)
          return
        }
      } else {
        this.belong = this.defaultBelong
        this.oid = this.defaultOid
      }
      this.queryCoupon()
    },
    async queryCoupon() {
      let params = {
        sign: this.sign,
        qiniu_id: this.qiniuId ? this.qiniuId : this.defaultQiniuId,
        belong: this.belong,
        ser_timestamp: this.ser
      }
      // debug
      if (process.env.NODE_ENV === 'development') {
        params = {
          sign: 'eyJpdiI6IlliSytIYzZIZlZraVwvNkJtSjZYbmFBPT0iLCJ2YWx1ZSI6IndZSk16THJabzVGRnZmY1RKN01Ncmc9PSIsIm1hYyI6ImEzMTA0YzE4ODViNGNjZTUwYzQ4NzdkYzM4Mzg0N2QwMTNkNTIwNGEzYzNkYWRmZGRiMmFiNGIxZGYwMTdkZjQifQ==',
          qiniu_id: 10929238,
          belong: 'leFitMotion',
          ser_timestamp: this.ser
        }
      }
      // 查询用户是否有券，若有则直接显示
      try {
        let res = await queryUserCoupon(params)
        if (res.code === 0) {
          this.clickable = false
          this.coupon = res.data
          this.status = 'showCoupon'
        }
        Toast.hide()
      } catch(e) {
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 0, true)
        } else {
          Toast.failed('未知错误', 0, true)
        }
        this.status = 'beforeRolling'
      }
    },
    // 抽奖
    async handleLottery() {
      this.clickable = false
      this.status = 'rolling'
      this.rotateDeg = 0
      Toast.loading('请求中')
      let params = {
        sign: this.sign,
        qiniu_id: this.qiniuId ? this.qiniuId : this.defaultQiniuId,
        belong: this.belong,
        oid: this.oid,
        ser_timestamp: this.ser
      }
      // debug
      if (process.env.NODE_ENV === 'development') {
        params = {
          sign: 'eyJpdiI6IlliSytIYzZIZlZraVwvNkJtSjZYbmFBPT0iLCJ2YWx1ZSI6IndZSk16THJabzVGRnZmY1RKN01Ncmc9PSIsIm1hYyI6ImEzMTA0YzE4ODViNGNjZTUwYzQ4NzdkYzM4Mzg0N2QwMTNkNTIwNGEzYzNkYWRmZGRiMmFiNGIxZGYwMTdkZjQifQ==',
          qiniu_id: 10929238,
          oid: 564,
          belong: 'leFitMotion',
          ser_timestamp: this.ser
        }
      }
      try {
        let res = await h5Batches(params)
        if (res.code === 0) {
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
        }
      } catch(e) {
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 2000, true)
        } else {
          Toast.failed('未知错误', 2000, true)
        }
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
      let awardIndex = 0
      this.awardList.forEach((item, index) => {
        if (item === awardName || awardName.indexOf(item) !== -1) {
          awardIndex = index
        }
      })
      if (awardIndex === 2) {
        awardIndex = (Math.random() > 0.5) ? 2 : 5
      }
      return awardIndex
    },
    //禁止微信分享
    handleForbiddenShare() {
      if (isInWechat() === true) {
        $wechat(this.weixinUrl).then(res => {
          res.forbidden()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/cdnUrl.less";

.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-image: url("@{cdnUrl}/jtree/lottery_back_rain.png");
  background-size: 100% auto;
  background-repeat: repeat;
}
img {
  display: block;
}
p {
  margin: 0
}
.content-wrap {
  .logo {
    width: 0.94rem;
    height: 0.19rem;
    padding-top: 0.14rem;
    margin: 0 auto;
    box-sizing: content-box;
  }
  position: relative;
  padding-top: 0.06rem;
  top: 0;
  left: 0;
  right: 0;
  .lottery-area {
    position: relative;
    width: 3.16rem;
    height: 3.16rem;
    margin: 0 auto;
    background-image: url("@{cdnUrl}/jtree/lottery_back.png");
    background-size: 100% auto;
    background-repeat: repeat;
    .lottery-border {
      position: absolute;
      width: 2.48rem;
      height: 2.48rem;
      top: 0.31rem;
      left: 50%;
      transform: translate(-50%);
    }
    .lottery-roller {
      position: absolute;
      width: 2.19rem;
      height: 2.14rem;
      top: 0.49rem;
      left: 0.48rem;
      transition: transform ease-in-out 3s;
      &.noAnime {
        transition: none;
      }
    }
    .lottery-button {
      position: absolute;
      width: 0.56rem;
      height: 0.56rem;
      top: 1.28rem;
      left: 50%;
      transform: translate(-50%);
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