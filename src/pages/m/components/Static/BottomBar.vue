// 底部的按钮
<template>
  <div
    v-if="shouldMenuShow"
    :class="{'btb single': menuCode.length === 1, 'btb': menuCode.length > 1}"
  >
    <div
      v-for="(item, index) in menuCode"
      :key="index"
      class="bitem"
      @click="handleMenuClick(routes[item.index])"
    >
      <img
        v-if="currentRoute !== routes[item.index]"
        :src="labelImg[item.index]"
      >
      <img
        v-if="currentRoute === routes[item.index]"
        :src="labelImgPressed[item.index]"
      >
      <span>{{ labels[item.index] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MSiteBottomBar",
  props: {
    // 是否替换默认menucode
    // 传入 Prop 则自定义菜单
    replaceMenuCode: {
      type: String,
      default: "",
      required: false
    },
    // 在没有mkey的情况下需要传入
    replaceMkey: {
      type: String,
      default: "",
      required: false
    },
    // default 显示默认菜单
    // replace 则替换
    replaceMode: {
      type: String,
      default: "default",
      required: false
    }
  },
  data() {
    return {
      labelImg: [
        "https://cdn.xingstation.cn/fe/image/m/btn_cake.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_company.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_topic.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_photo_normal@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_sale_normal@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/barrage.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_mall_normal@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_card_normal@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_my_normal@3x.png"
      ],
      labelImgPressed: [
        "https://cdn.xingstation.cn/fe/image/m/btn_cake_pressed.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_company_pressed.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_topic_pressed.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_photo_pressed@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_sale_pressed@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/barrage-p.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_mall_pressed@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_card_pressed@3x.png",
        "https://cdn.xingstation.cn/fe/image/m/btn_my_pressed@3x.png"
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
        "newDreamland",
        "happy_newYearTwo",
        "TopicIndex",
        "ActivityBirthDayIndex",
        "ActivityBirthDayCake"
      ],
      labels: ["祝福", "公司动态", "话题", "照片", "活动", "弹幕", "商城", "卡包", "我的"],
      routes: [
        "ActivityBirthDayCake",
        "ActivityBirthDayIndex",
        "TopicIndex",
        "TrendsIndex",
        "ActivityShop",
        "BarrageIndex",
        "MallIndex",
        "CardIndex",
        "MyIndex"
      ]
    };
  },
  computed: {
    menuCode() {
      // if mcode should Repalce by Prop
      let { mcode } = this.$route.params;
      if (this.replaceMenuCode !== "") {
        mcode = this.replaceMenuCode;
      }

      // change 32 to 10 and fixed whith 0
      let ten = parseInt(mcode, 32).toString(10);
      let padNum = this.padNumber(ten, this.labels.length);

      // loop to return index
      let arr = [];
      this.labels.forEach((element, index) => {
        if (padNum[index] !== "0") {
          arr.push({
            index: index,
            order: Number(padNum[index])
          });
        }
      });
      arr.sort(function(a, b) {
        return a.order - b.order;
      });

      return arr;
    },
    currentRoute() {
      return this.$route.name;
    },
    shouldMenuShow() {
      // 只有一个菜单时不显示导航栏
      if (this.menuCode.length === 1) {
        return false
      }
      // 若从列表页进入祝福页则不显示底部导航
      if (this.$route.name === 'ActivityBirthDayCake' && this.$route.query.acid) {
        return false;
      }
      if (this.replaceMode === "default") {
        return this.showRoutes.includes(this.$route.name);
      } else {
        return true;
      }
    }
  },
  methods: {
    padNumber(num, fill) {
      var len = ("" + num).length;
      return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num;
    },
    handleMenuClick(routerName) {
      if (this.replaceMode === "preview") {
        return;
      }
      let { mkey, mcode } = this.$route.params;

      if (this.replaceMkey !== "") {
        mkey = this.replaceMkey;
      }

      if (this.replaceMenuCode !== "") {
        mcode = this.replaceMenuCode;
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
  &.single {
    justify-content: center;
  }
  .bitem {
    height: 100%;
    // width: 30px;
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
