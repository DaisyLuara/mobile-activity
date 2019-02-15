<template>
  <div class="shop-act">
    <MyTrendsSwiper/>
    <ul
      v-infinite-scroll="loadMore"
      class="activity-wrapper"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div
        v-for="(item, index) in trends"
        :key="index"
        class="item-wrapper"
        @click="handleNaviToTrendDetail(item)"
      >
        <ActivityNums :nums="Number(item.nums)"/>
        <img 
          v-if="bindType(item.type) !== ''" 
          :src="bindType(item.type)" 
          class="type">
        <img 
          :src="item.image" 
          class="main">
        <div class="title">{{ item.title }}</div>
        <div class="time">{{ computedDate(item.sdate) }} 至 {{ computedDate(item.edate) }}</div>
        <img 
          :src="coverShadow" 
          class="time-shadow">
      </div>
    </ul>
    <div class="loadmore-add"/>
    <div class="loadmore-add"/>
  </div>
</template>

<script>
import Vue from "vue";
import MyTrendsSwiper from "@/pages/m/components/Banner/MyTrendsSwiper";
import { InfiniteScroll } from "mint-ui";
import { fetchShopActivityList } from "services";
import { mapGetters } from "vuex";
import moment from "moment";
import ActivityNums from "@/pages/m/components/Activity/ActivityNums";

export default {
  name: "TrendsIndex",
  components: {
    MyTrendsSwiper,
    ActivityNums
  },
  data() {
    return {
      bindBottomDistance: 0,
      bottomStatus: "",
      currentPage: 1,
      isLoading: false,
      isAllLoaded: false,
      trends: [],
      coverShadow:
        "https://cdn.exe666.com/fe/image/m/activity-cover-shadow.svg",
      tags: {
        alltop: "https://cdn.exe666.com/fe/image/m/tag-toupiao.svg",
        game: "https://cdn.exe666.com/fe/image/m/tag-paihang.svg",
        honour: "https://cdn.exe666.com/fe/image/m/tag-xunzhang.svg",
        options: "https://cdn.exe666.com/fe/image/m/tag-options.svg",
        birthday: "https://cdn.exe666.com/fe/image/m/tag-brithday.svg"
      }
    };
  },

  computed: {
    ...mapGetters(["z"])
  },

  created() {
    this.fetchList();
    Vue.use(InfiniteScroll);
    console.log("trendindex");
  },

  mounted() {
    this.currentPage = 1;
    this.isLoading = false;
    this.isAllLoaded = false;
    this.trends = [];
    this.bindBottomDistance = (this.$parent.screenWidth / 375) * 100 * 0.48;
  },

  methods: {
    handleNaviToTrendDetail(item) {
      this.$router.push({
        name: "ActivityShopDetail",
        params: {
          mkey: this.$route.params.mkey
        },
        query: {
          acid: item.acid
        }
      });
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.fetchList();
      }, 2000);
    },
    computedDate(clientdate) {
      let cld = moment(Number(clientdate) * 1000);
      return cld.format("YYYY-MM-DD HH:mm:ss");
    },
    fetchList() {
      if (this.isAllLoaded || this.isLoading) {
        return;
      }
      let payload = {
        z: this.z,
        api: "json",
        size: 10,
        cp: this.currentPage,
        allt: 0,
        mkey: this.$route.params.mkey
      };
      fetchShopActivityList(this, payload)
        .then(r => {
          const dataStatus = r.data && r.data.state;
          if (!dataStatus || r.data.state !== "1") {
            this.$router.push({
              name: "mSite404"
            });
            return;
          }
          let res = r.data.results.data;
          this.isLoading = false;
          this.trends = this.trends.concat(res);
          if (r.data.results.pageIndex >= r.data.results.totalPage) {
            this.isAllLoaded = true;
          }
          this.currentPage++;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    },
    bindType(type) {
      if (this.tags[type]) {
        return this.tags[type];
      }
      return "";
    }
  }
};
</script>

<style lang="less" scoped>
.mint-loadmore-bottom {
  font-size: 0.14rem !important;
}
.shop-act {
  position: relative;
  width: 100%;
  z-index: 10;
  .activity-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 20;
    .item-wrapper {
      width: 3.55rem;
      height: 1.75rem;
      margin: 0.1rem 0.08rem;
      border-radius: 0.15rem;
      position: relative;
      z-index: 30;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      overflow: hidden;
      .type {
        z-index: 60;
        top: 0;
        right: 0;
        width: 0.44rem;
        height: 0.44rem;
        position: absolute;
      }
      .main {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 40;
      }
      .title {
        z-index: 50;
        font-size: 0.17rem;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        margin-left: 0.145rem;
        margin-bottom: 0.05rem;
      }
      .time {
        z-index: 50;
        font-size: 0.1rem;
        font-weight: 500;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
        opacity: 0.76;
        line-height: 0.14rem;
        color: rgba(255, 255, 255, 1);
        margin-left: 0.145rem;
        margin-bottom: 0.08rem;
      }
      .time-shadow {
        z-index: 49;
        width: 100%;
        height: 0.67rem;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

  .mint-loadmore-bottom {
    font-size: 0.14rem;
  }
  .loadmore-add {
    height: 0.48rem;
    width: 100%;
    background-color: transparent;
  }
}
</style>
