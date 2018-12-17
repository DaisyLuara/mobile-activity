<template>
  <div class="cdt">
    <div class="coupon-img"></div>
    <div class="explain-text">
      这是一个使用说明使用说明使用说明使用说明使用说
      使用说明使用说明使用说明使用说明使用说明使用说
      使用说明使用说明使用说明使用说明使用说明
    </div>
    <div class="btn">{{computedBtnText}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    couponStatus() {
      return "canget";
    },
    computedBtnText() {
      if (this.couponStatus === "canget") {
        return "立即兑换";
      }
      if (this.couponStatus === "canuse") {
        return "立即使用";
      }
      return "";
    }
  }
};
</script>

<style lang="less" scoped>
.cdt {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 10;
  .coupon-img {
    margin-top: 20px;
    width: 3.56rem;
    height: 1.65rem;
    background: gray;
    z-index: 20;
  }
  .explain-text {
    margin-top: -0.28rem;
    width: 3.56rem;
    background: rgba(235, 235, 235, 1);
    border-radius: 15px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(106, 106, 106, 1);
    padding-left: 0.14rem;
    padding-right: 0.14rem;
    padding-top: 0.42rem;
    padding-bottom: 0.14rem;
    z-index: 15;
  }
  .btn {
    margin-top: 1.775rem;
    width: 3.54rem;
    height: 45px;
    background: rgba(109, 30, 255, 1);
    border-radius: 22.5px;
    font-size: 14px;
    line-height: 45px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    font-weight: bold;
  }
}
</style>
