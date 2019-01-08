// 底部的按钮
<template>
  <div class="btb" v-if="menuCode !== '00000' && showRoutes.includes(this.$route.name)">
    <div class="bitem" v-if="menuCode[0] === '1'" @click="handleMenuClick('TrendsIndex')">
      <img :src="photo" v-if="currentRoute !== 'TrendsIndex'">
      <img :src="photo_p" v-if="currentRoute === 'TrendsIndex'">
      <span>照片</span>
    </div>
    <div class="bitem" v-if="menuCode[1] === '1'" @click="handleMenuClick('ActivityShop')">
      <img :src="act" v-if="currentRoute !== 'ActivityShop'">
      <img :src="act_p" v-if="currentRoute === 'ActivityShop'">
      <span>活动</span>
    </div>
    <div class="bitem" v-if="menuCode[2] === '1'" @click="handleMenuClick('BarrageIndex')">
      <img :src="barrage" v-if="currentRoute !== 'BarrageIndex'">
      <img :src="barrage_p" v-if="currentRoute === 'BarrageIndex'">
      <span>弹幕</span>
    </div>
    <div class="bitem" v-if="menuCode[3] === '1'" @click="handleMenuClick('MallIndex')">
      <img :src="mall" v-if="currentRoute !== 'MallIndex'">
      <img :src="mall_p" v-if="currentRoute === 'MallIndex'">
      <span>商城</span>
    </div>
    <div class="bitem" v-if="menuCode[4] === '1'" @click="handleMenuClick('CardIndex')">
      <img :src="card" v-if="currentRoute !== 'CardIndex'">
      <img :src="card_p" v-if="currentRoute === 'CardIndex'">
      <span>卡包</span>
    </div>
    <div class="bitem" v-if="menuCode[5] === '1'" @click="handleMenuClick('MyIndex')">
      <img :src="my" v-if="currentRoute !== 'MyIndex'">
      <img :src="my_p" v-if="currentRoute === 'MyIndex'">
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menucode: {
      type: String,
      default: "000000",
      required: false
    }
  },
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
      my_p: "https://cdn.exe666.com/fe/image/m/btn_my_pressed@3x.png",
      barrage: "https://cdn.exe666.com/fe/image/m/barrage.png",
      barrage_p: "https://cdn.exe666.com/fe/image/m/barrage-p.png",
      showRoutes: [
        "MyIndex",
        "MallIndex",
        "CardIndex",
        "TrendsIndex",
        "ActivityShop",
        "BarrageIndex"
      ]
    };
  },
  computed: {
    menuCode() {
      let ten = this.menucode;
      if (ten === undefined) {
        return "000000";
      } else {
        let bi = parseInt(ten).toString(2) || "000000";
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
    color: rgba(166, 153, 150, 1);
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
