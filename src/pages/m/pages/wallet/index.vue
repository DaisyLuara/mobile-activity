<template>
  <div class="wallet">
    <img 
      :src="imageHost + 'bg_blue_2x.png'" 
      class="header-bg">
    <div class="header">
      <img 
        :src="imageHost + 'coin_2x.png'" 
        class="coin-bg">
      <img 
        :src="imageHost + 'sixsix_2x.png'" 
        class="title-big">
      <img 
        :src="imageHost + 'title_2x.png'" 
        class="title-small">
    </div>
    <div class="wallet-area">
      <img 
        :src="imageHost + 'wallet_2x.png'" 
        class="wallet-bg">
      <img 
        :src="imageHost + 'wallet_title_2x.png'" 
        class="wallet-title">
      <div class="coupon-list">
        <img 
          :src="imageHost + 'coupon1_2x.png'" 
          class="coupon-item">
        <img 
          :src="imageHost + 'coupon2_2x.png'" 
          class="coupon-item">
        <img 
          :src="imageHost + 'coupon2_2x.png'" 
          class="coupon-item">
      </div>
      <img 
        :src="imageHost + 'actiview_2x.png'" 
        class="brand">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      imageHost: 'https://cdn.xingstation.cn/m/wallet/'
    };
  }
};
</script>

<style lang="less" scoped>
.wallet {
  position: relative;
  min-height: 100vh;
  z-index: 10;
  background: #FFC35A;
  padding-bottom: 48px;
  img {
    display: block;
    height: auto;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    pointer-events: none;
  }
  .header-bg {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
  .header {
    padding-top: 0.9rem;
    margin-bottom: 0.04rem;
    .coin-bg {
      position: absolute;
      top: 0.55rem;
      width: 100%;
    }
    .title-big {
      width: 1.5rem;
      margin: 0 auto;
      margin-bottom: 0.15rem;
    }
    .title-small {
      width: 1.4rem;
      margin: 0 auto;
    }
  }
  .wallet-area {
    position: relative;
    padding-top: 0.85rem;
    overflow: hidden;
    .wallet-bg {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
      width: 115%;
      z-index: -1;
    }
    .wallet-title {
      width: 2.1rem;
      margin: 0 auto;
      margin-bottom: 0.15rem;
    }
    .coupon-list {
      width: 3.1rem;
      margin: 0 auto 0.3rem;
      .coupon-item {
        width: 100%;
      }
    }
    .brand {
      width: 0.7rem;
      margin: 0 auto 0.35rem;
    }
  }
}
</style>
