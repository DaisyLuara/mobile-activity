<template>
  <div class="mall">
    <p>{{ errorMessage }}</p>
    <TabBar />
    <mt-loadmore
      ref="loadmore"
      :bottom-distance="bindBottomDistance"
      :bottom-method="loadBottom"
      :auto-fill="false"
      @top-status-change="handleTopChange"
      @bottom-status-change="handleBottomChange"
    >
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
      <div 
        slot="top" 
        class="mint-loadmore-top"
      >
        <span 
          v-show="topStatus !== 'loading'" 
          :class="{ 'rotate': topStatus === 'drop' }"
        >↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div 
        slot="bottom" 
        class="mint-loadmore-bottom"
      >
        <span 
          v-show="bottomStatus !== 'loading'" 
          :class="{ 'rotate': topStatus === 'drop' }"
        >释放加载更多</span>
        <span v-show="bottomStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
    <div class="loadmore-add" />
    <div class="loadmore-add" />
  </div>
</template>

<script>
import CouponItem from "../components/CouponItem";
import { Loadmore } from "mint-ui";
import TabBar from "../components/TabBar";
import { getMallListMini } from "services";
export default {
  components: {
    "mt-loadmore": Loadmore,
    CouponItem,
    TabBar
  },
  data() {
    return {
      list: [],
      topStatus: "",
      bottomStatus: "",
      couponType: "default",
      bindBottomDistance: 0,
      isFetching: false,
      isAllLoaded: false,
      errorMessage: "",
      currentPage: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.bindBottomDistance = (this.$parent.screenWidth / 375) * 100 * 0.48;
    this.handleInit();
  },
  methods: {
    handleInit() {
      this.errorMessage = "";
      this.list = [];
      this.fetchList();
    },
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
        this.currentPage = 1;
        this.list = [];
        this.fetchList();
        this.$refs.loadmore.onTopLoaded();
        this.topStatus = "";
      }, 2000);
    },
    loadBottom() {
      this.bottomStatus = "loading";
      setTimeout(() => {
        this.fetchList();
        this.$refs.loadmore.onBottomLoaded();
        this.bottomStatus = "";
      }, 2000);
    },
    fetchList() {
      if (this.isAllLoaded || this.isFetching) {
        return;
      }
      let localZ = localStorage.getItem("z");
      let localMarketId = localStorage.getItem("marketid");
      if (localZ === null || localMarketId === null) {
        this.errorMessage = "未授权，请通过二维码进入";
      } else {
        this.isFetching = true;
        getMallListMini(localZ, this.currentPage, this.pageSize, localMarketId)
          .then(r => {
            console.dir(r);
            this.isFetching = false;
            let { data } = r.data;
            let { pagination } = r.data.meta;
            this.list = this.list.concat(data);
            if (pagination.current_page >= pagination.total_pages) {
              this.isAllLoaded = true;
            } else {
              this.currentPage++;
            }
          })
          .catch(e => {
            this.isFetching = false;
            this.errorMessage = String(e.response.data.message);
          });
      }
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
  p {
    font-size: 14px;
  }
}
</style>
