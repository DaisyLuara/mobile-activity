// 底部的按钮
<template>
  <div v-if="menuCode !== '00000' && showRoutes.includes(this.$route.name)" class="btb">
    <div
      v-for="(item, index) in this.menuCode"
      :key="index"
      class="bitem"
      @click="handleMenuClick(index)"
    >
      <img v-if="currentRoute !== 'TrendsIndex'" :src="photo">
      <img v-if="currentRoute === 'TrendsIndex'" :src="photo_p">
      <span>{{labels[index]}}</span>
    </div>
    <!-- <div v-if="menuCode[1] === '1'" class="bitem" @click="handleMenuClick('ActivityShop')">
      <img v-if="currentRoute !== 'ActivityShop'" :src="act">
      <img v-if="currentRoute === 'ActivityShop'" :src="act_p">
      <span>活动</span>
    </div>
    <div v-if="menuCode[2] === '1'" class="bitem" @click="handleMenuClick('BarrageIndex')">
      <img v-if="currentRoute !== 'BarrageIndex'" :src="barrage">
      <img v-if="currentRoute === 'BarrageIndex'" :src="barrage_p">
      <span>弹幕</span>
    </div>
    <div v-if="menuCode[3] === '1'" class="bitem" @click="handleMenuClick('MallIndex')">
      <img v-if="currentRoute !== 'MallIndex'" :src="mall">
      <img v-if="currentRoute === 'MallIndex'" :src="mall_p">
      <span>商城</span>
    </div>
    <div v-if="menuCode[4] === '1'" class="bitem" @click="handleMenuClick('CardIndex')">
      <img v-if="currentRoute !== 'CardIndex'" :src="card">
      <img v-if="currentRoute === 'CardIndex'" :src="card_p">
      <span>卡包</span>
    </div>
    <div v-if="menuCode[5] === '1'" class="bitem" @click="handleMenuClick('MyIndex')">
      <img v-if="currentRoute !== 'MyIndex'" :src="my">
      <img v-if="currentRoute === 'MyIndex'" :src="my_p">
      <span>我的</span>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    menucode: {
      type: String,
      default: "000000",
      required: false
    },
    replaceMkey: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      labelImg: [
        "https://cdn.exe666.com/fe/image/m/btn_photo_normal@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_sale_normal@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_mall_normal@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_card_normal@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_my_normal@3x.png",
        "https://cdn.exe666.com/fe/image/m/barrage.png"
      ],
      labelImgPressed: [
        "https://cdn.exe666.com/fe/image/m/btn_photo_pressed@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_sale_pressed@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_mall_pressed@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_card_pressed@3x.png",
        "https://cdn.exe666.com/fe/image/m/btn_my_pressed@3x.png",
        "https://cdn.exe666.com/fe/image/m/barrage-p.png"
      ],
      showRoutes: [
        "MyIndex",
        "MallIndex",
        "CardIndex",
        "TrendsIndex",
        "ActivityShop",
        "BarrageIndex",
        "new_blue",
        "new_red",
        "new_yellow",
        "lkf",
        "newDreamland"
      ],
      labels: ["照片", "活动", "弹幕", "商城", "卡包", "我的"],
      labelMarks: "000000"
    };
  },
  computed: {
    menuCode() {
      let number32 = this.menucode;
      if (number32 === undefined) {
        let marks = "";
        this.labels.forEach(element => {
          marks += "0";
        });
        return marks;
      }

      let ten = parseInt(number32, 32).toString(10);
      return this.padNumber(ten, this.labels.length);
    },
    currentRoute() {
      return this.$route.name;
    }
  },
  methods: {
    padNumber(num, fill) {
      var len = ("" + num).length;
      return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num;
    },
    handleMenuClick(routerName) {
      let { mkey, mcode } = this.$route.params;
      if (mkey === undefined) {
        mkey = this.replaceMkey;
      }
      if (mcode === undefined) {
        mcode = this.menucode;
      }
      this.$router.push({
        name: routerName,
        params: {
          mkey: mkey,
          mcode: mcode
        }
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
  padding-left: 0.3rem;
  padding-right: 0.3rem;
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
