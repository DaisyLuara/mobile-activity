<template>
  <div class="mall">
    <TabBar/>
    <mt-loadmore
      :bottomDistance="bindBottomDistance"
      ref="loadmore"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :auto-fill="false"
      @top-status-change="handleTopChange"
      @bottom-status-change="handleBottomChange"
    >
      <div v-for="(item, index) in list" :key="index" class="coupon-wrapper">
        <CouponItem :couponType="couponType" :imgUrl="''"/>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">释放加载更多</span>
        <span v-show="bottomStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
    <div class="loadmore-add"/>
    <div class="loadmore-add"/>
  </div>
</template>

<script>
import CouponItem from "../components/CouponItem";
import { Loadmore } from "mint-ui";
import TabBar from "../components/TabBar";
export default {
  data() {
    return {
      list: Array(10).fill(0),
      topStatus: "",
      bottomStatus: "",
      couponType: "default",
      bindBottomDistance: 0,
      isFetching: false,
      isAllLoaded: false
    };
  },
  mounted() {
    this.bindBottomDistance = (this.$parent.screenWidth / 375) * 100 * 0.48;
    this.fetchList();
  },
  components: {
    "mt-loadmore": Loadmore,
    CouponItem,
    TabBar
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    handleRefresh() {
      // this.loadTop()
      this.topStatus = "pull";
      console.log("refresh");
    },
    loadTop() {
      this.topStatus = "loading";
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
        this.topStatus = "";
      }, 2000);
    },
    loadBottom() {
      this.bottomStatus = "loading";
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded();
        this.bottomStatus = "";
      }, 2000);
    },
    fetchList() {
      if (this.isAllLoaded || this.isFetching) {
        return;
      }
      const requestUrl = "";
      let requestParms = {};
      this.$http
        .get(requestUrl, requestParms)
        .then(r => {})
        .catch(e => {});
    }
  }
};
</script>

<style lang="less" scoped>
.mall {
  position: relative;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  .mint-loadmore-top {
    font-size: 0.14rem;
  }
  .mint-loadmore-bottom {
    font-size: 0.14rem;
  }
  .coupon-wrapper {
    margin-top: 14px;
  }
  .loadmore-add {
    height: 0.48rem;
    width: 100%;
    background-color: transparent;
  }
}
</style>
