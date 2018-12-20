<template>
  <div class="tab">
    <div 
      class="tab-item" 
      @click="handleRouterChange('wallet')">
      <img 
        v-if="currentRouteName !== 'PocketWallet'" 
        :src="wallet" 
        alt="卡包">
      <img 
        v-if="currentRouteName === 'PocketWallet'" 
        :src="walletSelected" 
        alt="卡包">
      <span>卡包</span>
    </div>
    <div 
      class="tab-item" 
      @click="handleRouterChange('mall')">
      <img 
        v-if="currentRouteName !== 'PocketMall'" 
        :src="mall" 
        alt="商城">
      <img 
        v-if="currentRouteName === 'PocketMall'" 
        :src="mallSelected" 
        alt="商城">
      <span>商城</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallet: "https://cdn.exe666.com/fe/hidol/img/card.png",
      walletSelected: "https://cdn.exe666.com/fe/hidol/img/card-selected.png",
      mall: "https://cdn.exe666.com/fe/hidol/img/shop.png",
      mallSelected: "https://cdn.exe666.com/fe/hidol/img/shop-selected.png"
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    handleRouterChange(name) {
      this.$router.push({
        path: "/hpocket/" + name
      });
    }
  }
};
</script>


<style lang="less" scoped>
.tab {
  position: relative;
  height: 0.48rem;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.16);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  .tab-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.08rem;
    color: rgba(77, 52, 46, 1);
    font-weight: 400;
    flex-direction: column;
    img {
      width: 0.28rem;
      height: 0.28rem;
      margin-bottom: 0.02rem;
    }
  }
}
</style>
