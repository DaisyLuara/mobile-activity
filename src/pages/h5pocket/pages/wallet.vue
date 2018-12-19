<template>
  <div class="wallet">
    <p>{{errorMessage}}</p>
    <TabBar/>
    <div v-for="(item, index) in list" :key="index" class="coupon-wrapper">
      <CouponItem :couponType="couponType" :couponData="item"/>
    </div>
  </div>
</template>

<script>
import { getInfoById, getWalletListMini, bindCouponMini } from "services";
import CouponItem from "../components/CouponItem";
import TabBar from "../components/TabBar";
export default {
  data() {
    return {
      list: [],
      couponType: "wallet",
      errorMessage: ""
    };
  },
  components: {
    TabBar,
    CouponItem
  },
  mounted() {
    this.handleInit();
  },
  methods: {
    async handleInit() {
      this.errorMessage = "";
      const { id, code, state } = this.$route.query;
      let localZ = localStorage.getItem("z");
      let localMarketId = localStorage.getItem("marketid");
      try {
        if (localZ === null || localMarketId === null) {
          let infoRes = await getInfoById(id, code, state);
          console.dir(infoRes);
          if (infoRes.userinfo !== null) {
            if (infoRes.userinfo.hasOwnProperty("z")) {
              let setZ = infoRes.userinfo.z;
              localZ = setZ;
              localStorage.setItem("z", setZ);
              localStorage.setItem("marketid", infoRes.marketid);
              await this.hanldeFirstGetCoupon(localZ);
              await this.fetchWalletList();
            }
          }
        } else {
          await this.hanldeFirstGetCoupon(localZ);
          await this.fetchWalletList();
        }
      } catch (e) {
        Toast(e.data.message);
      }
    },
    async fetchWalletList() {
      const localZ = localStorage.getItem("z");
      try {
        let walletList = await getWalletListMini(localZ);
        console.dir(walletList);
        this.list = walletList.data.data;
      } catch {
        e => {
          console.log(e);
        };
      }
    },
    async hanldeFirstGetCoupon(z) {
      const { coupon_batch_id } = this.$route.query;
      if (coupon_batch_id === undefined) {
        return;
      }
      try {
        let bindRes = await bindCouponMini(coupon_batch_id, z);
      } catch (e) {
        Toast(e.data.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wallet {
  position: relative;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  .coupon-wrapper {
    margin-top: 14px;
  }
  p {
    font-size: 14px;
  }
}
</style>
