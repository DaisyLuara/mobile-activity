<template>
  <div class="cqr">
    <div class="decoration-tr"></div>
    <div class="decoration-r"></div>
    <div class="qr-code">
      <div class="title">{{qrtitle}}</div>
      <div class="qr-img"></div>
      <div class="code">{{qrcode}}</div>
    </div>
    <div class="bottom-stupid-remind">
      <div class="xo">
        <img src="https://cdn.exe666.com/fe/hidol/img/h5/h5-xo-remind.svg">
      </div>
      <div class="remind">
        <img src="https://cdn.exe666.com/fe/hidol/img/h5/h5-xo-remind-qr.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      imgUrl: ""
    };
  },
  computed: {
    qrtitle() {
      return "优惠券名称";
    },
    qrcode() {
      return "兑换码：SSASFF";
    }
  }
};
</script>

<style lang="less" scoped>
.cqr {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: rgba(57, 48, 104, 1);
  z-index: 10;
  .decoration-tr {
    position: absolute;
    margin-top: -0.6rem;
    width: 2.96rem;
    height: 1.735rem;
    background: rgba(125, 68, 180, 1);
    opacity: 0.37;
    border-bottom-left-radius: 2.005rem;
    z-index: 20;
    right: 0;
  }
  .decoration-r {
    position: absolute;
    left: 0;
    top: 0.955rem;
    width: 1.525rem;
    height: 4.005rem;
    background: rgba(125, 68, 180, 1);
    opacity: 0.37;
    border-top-right-radius: 2.005rem;
    border-bottom-right-radius: 2.005rem;
  }
  .qr-code {
    width: 2.58rem;
    height: 3.14rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 2.5px rgba(0, 0, 0, 0.16);
    border-radius: 21px;
    margin-top: 0.675rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    .title {
      font-size: 0.24rem;
      font-weight: bold;
    }
    .qr-img {
      width: 2.5rem;
      height: 2.5rem;
      background: gray;
    }
    .code {
      font-size: 0.14rem;
      color: rgba(165, 165, 165, 1);
    }
  }
  .bottom-stupid-remind {
    z-index: 100;
    height: 2.76rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .xo {
      width: 2.34rem;
      height: 100%;
      margin-bottom: -0.48rem;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .remind {
      width: 1.7rem;
      height: 0.49rem;
      margin-left: -0.775rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
