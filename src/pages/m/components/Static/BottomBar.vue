// 底部的按钮
<template>
  <div 
    v-if="menuCode !== '00000'" 
    class="btb">
    <div 
      v-if="menuCode[0] === '1'" 
      class="bitem" 
      @click="handleMenuClick('TrendsIndex')">
      <img 
        v-if="currentRoute !== 'TrendsIndex'" 
        :src="photo">
      <img 
        v-if="currentRoute === 'TrendsIndex'" 
        :src="photo_p">
      <span>照片</span>
    </div>
    <div 
      v-if="menuCode[1] === '1'" 
      class="bitem" 
      @click="handleMenuClick('ActivityShop')">
      <img 
        v-if="currentRoute !== 'ActivityShop'" 
        :src="act">
      <img 
        v-if="currentRoute === 'ActivityShop'" 
        :src="act_p">
      <span>活动</span>
    </div>
    <div 
      v-if="menuCode[2] === '1'" 
      class="bitem" 
      @click="handleMenuClick('MallIndex')">
      <img 
        v-if="currentRoute !== 'MallIndex'" 
        :src="mall">
      <img 
        v-if="currentRoute === 'MallIndex'" 
        :src="mall_p">
      <span>商城</span>
    </div>
    <div 
      v-if="menuCode[3] === '1'" 
      class="bitem" 
      @click="handleMenuClick('CardIndex')">
      <img 
        v-if="currentRoute !== 'CardIndex'" 
        :src="card">
      <img 
        v-if="currentRoute === 'CardIndex'" 
        :src="card_p">
      <span>卡包</span>
    </div>
    <div 
      v-if="menuCode[4] === '1'" 
      class="bitem" 
      @click="handleMenuClick('MyIndex')">
      <img 
        v-if="currentRoute !== 'MyIndex'" 
        :src="my">
      <img 
        v-if="currentRoute === 'MyIndex'" 
        :src="my_p">
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: "https://cdn.exe666.com/fe/image/m/btn_photo_normal@3x.png",
      photo_p: "https://cdn.exe666.com/fe/image/m/btn_photo_pressed@3x.png",
      act: "https://cdn.exe666.com/fe/image/m/btn_sale_normal@3x.png",
      act_p: "https://cdn.exe666.com/fe/image/m/btn_sale_pressed@3x.png",
      mall: "https://cdn.exe666.com/fe/image/m/btn_mall_normal@3x.png",
      mall_p: "https://cdn.exe666.com/fe/image/m/btn_mall_pressed@3x.png",
      card: "https://cdn.exe666.com/fe/image/m/btn_card_normal@3x.png",
      card_p: "https://cdn.exe666.com/fe/image/m/btn_card_pressed@3x.png",
      my: "https://cdn.exe666.com/fe/image/m/btn_my_normal@3x.png",
      my_p: "https://cdn.exe666.com/fe/image/m/btn_my_pressed@3x.png"
    };
  },
  computed: {
    menuCode() {
      let ten = this.$route.params.mcode;
      if (ten === undefined) {
        return "00000";
      } else {
        let bi = parseInt(ten).toString(2) || "00000";
        return bi;
      }
    },
    currentRoute() {
      return this.$route.name;
    }
  },
  methods: {
    handleMenuClick(routerName) {
      this.$router.push({
        name: routerName,
        params: this.$route.params
      });
    }
  }
};
</script>

<style lang="less" scoped>
.btb {
  margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.16);
  z-index: 10000;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .bitem {
    height: 100%;
    width: 30px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 12px;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
