<template>
  <div class="root">
    <div class="title">
      我的优惠券
    </div>
    <div class="list-container">
      <div
        v-for="(item, index) in bindData"
        :key="index" 
        class="coupon-item"
      >
        <div class="coupon-price">
          {{ item.CouponName }}
        </div>
        <div class="coupon-detail">
          <div class="detail-title">
            编号:
          </div>
          <div class="detail-number">
            {{ item.CouponRuleNo }}
          </div>
          <div class="detial-desc">
            {{ item.CouponDesc }}
          </div>
          <div class="detail-date">
            {{ fixedDate(item.FixedDateBegin) }} - {{ fixedDate(item.FixedDateEnd) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from './data'
export default {
  data() {
    return {
      bindData: null
    }
  },
  created() {
    document.title = '我的优惠券'
    this.handleWindowRisize()
    this.$http.get(process.env.SAAS_API + '/mallcoo/coupon').then(r => {
      console.dir(r)
      this.bindData = r.data.data
    })
  },
  mounted() {
    window.onresize = () => {
      this.handleWindowRisize()
    }
  },
  methods: {
    handleWindowRisize() {
      document.getElementsByTagName('html')[0].style.width = '100vw'
      document.getElementsByTagName('html')[0].style.fontSize =
        String(
          window.innerWidth / 375 * 10 > 25 ? 25 : window.innerWidth / 375 * 10
        ) + 'px'
    },
    fixedDate(value) {
      let date = new Date(value)
      let Y = date.getFullYear() + '.'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '.'
      let D = date.getDate() + ' '
      return Y + M + D
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  background-color: #edeced;
  min-height: 100vh;
  .title {
    position: relative;
    height: 65px;
    text-align: center;
    background-color: #ffffff;
    width: 100%;
    font-size: 16px;
    line-height: 65px;
    font-weight: 700;
  }
  .list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0;
    overflow: auto;
    .coupon-item {
      height: 10.8rem;
      width: 27.5rem;
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12);
      margin: 0.7rem 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .coupon-price {
        width: 11rem;
        height: 100%;
        display: inline-block;
        background-color: #f4cc1a;
        border: solid 1px #f4c600;
        color: white;
        text-align: center;
        line-height: 10.8rem;
        font-size: 1.5rem;
        word-wrap: break-word;
        word-break: normal;
      }
      .coupon-detail {
        width: 16.5rem;
        height: 10.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5% 5%;
        .detail-title {
          color: #222222;
          font-size: 1.4rem;
          font-weight: 400;
        }
        .detial-desc {
          color: #9d9d9d;
          margin-bottom: 0.5rem;
        }
        .detail-date {
          color: #9d9d9d;
        }
      }
    }
  }
}
</style>
