<template>
  <div class="wallet">
    <p>{{ errorMessage }}</p>
    <TabBar />
    <div 
      v-for="(item, index) in list" 
      :key="index" 
      class="coupon-wrapper"
    >
      <CouponItem 
        :coupon-type="couponType" 
        :coupon-data="item"
      />
    </div>
    <div class="loadmore-add" />
    <div class="loadmore-add" />
  </div>
</template>

<script>
import {
  getInfoById,
  getWalletListMini,
  bindCouponMini,
  splitParms
} from "services";
import { Toast } from "mint-ui";
import CouponItem from "../components/CouponItem";
import TabBar from "../components/TabBar";
export default {
  components: {
    TabBar,
    CouponItem
  },
  data() {
    return {
      list: [],
      couponType: "wallet",
      errorMessage: ""
    };
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
      let localOid = localStorage.getItem("oid");
      try {
        if (localZ === null || localMarketId === null || localOid === null) {
          let infoRes = await getInfoById(id, code, state);
          // console.dir(infoRes);
          if (infoRes !== undefined) {
            if (infoRes.hasOwnProperty("userinfo")) {
              if (infoRes.userinfo !== null) {
                if (infoRes.userinfo.hasOwnProperty("z")) {
                  let { z, marketid } = infoRes.userinfo;
                  let { oid } = infoRes;
                  localStorage.setItem("z", z);
                  localStorage.setItem("marketid", marketid);
                  localStorage.setItem("oid", oid);
                  let parms = splitParms(infoRes.parms);
                  if (parms.hasOwnProperty("coupon_batch_id")) {
                    await this.hanldeFirstGetCoupon(
                      z,
                      parms["coupon_batch_id"],
                      oid
                    );
                  }
                }
              }
            }
          }
          await this.fetchWalletList();
        } else {
          let infoRes = await getInfoById(id, code, state);
          if (infoRes !== undefined) {
            // 存在更新点位信息
            if (infoRes.hasOwnProperty("oid")) {
              if (infoRes.oid !== null) {
                let { oid } = infoRes;
                localStorage.setItem("oid", oid);
              }
            }
            // 存在更新用户信息
            if (infoRes.hasOwnProperty("userinfo")) {
              if (infoRes.userinfo !== null) {
                let { z, marketid } = infoRes.userinfo;
                localStorage.setItem("z", z);
                localStorage.setItem("marketid", marketid);
              }
            }
            // 存在更新优惠券
            if (infoRes.hasOwnProperty("parms")) {
              let parms = splitParms(infoRes.parms);
              if (parms.hasOwnProperty("coupon_batch_id")) {
                await this.hanldeFirstGetCoupon(
                  localZ,
                  parms["coupon_batch_id"],
                  localOid
                );
              }
            }
          }
          await this.fetchWalletList();
        }
      } catch (e) {
        console.dir(e);
        Toast(e.message);
      }
    },
    async fetchWalletList() {
      const localZ = localStorage.getItem("z");
      try {
        let walletList = await getWalletListMini(localZ, 3);
        console.dir(walletList);
        this.list = walletList.data.data;
      } catch {
        e => {
          Toast(e.message);
          console.dir(e);
        };
      }
    },
    async hanldeFirstGetCoupon(z, coupon_batch_id, oid) {
      try {
        let bindRes = await bindCouponMini(coupon_batch_id, z, oid);
      } catch (e) {
        console.dir(e);
        // Toast(e.message);
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
  .coupon-wrapper {
    margin-top: 14px;
  }
  p {
    font-size: 14px;
  }
  .loadmore-add {
    height: 0.48rem;
    width: 100%;
    background-color: transparent;
  }
}
</style>
