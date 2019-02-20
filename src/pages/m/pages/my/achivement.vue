<template>
  <div class="achivement">
    <div class="title">{{ fixedTitle }}</div>
    <ul
      v-infinite-scroll="loadMore"
      class="achives"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div 
        v-for="(item, index) in trends" 
        :key="index" 
        class="achive">
        <div class="header">
          <img 
            v-if="item.hid > 0" 
            :src="item.xicon">
          <img 
            v-if="item.hid <= 0" 
            :src="item.xtabicon">
        </div>
        <div class="text">{{ item.xname }}</div>
      </div>
      <div 
        v-if="trends.length === 0 && firstFetch" 
        class="no-achive">暂无解锁的成就</div>
    </ul>
    <ActivityThemeGameBottom :show="shouldButtonShow"/>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { InfiniteScroll } from "mint-ui";
import { fetchMyAchivement } from "services";
import ActivityThemeGameBottom from "@/pages/m/components/Activity/ActivityThemeGameBottom";

export default {
  name: "MyAchivement",
  components: {
    ActivityThemeGameBottom
  },
  data() {
    return {
      bindBottomDistance: 0,
      bottomStatus: "",
      currentPage: 1,
      isLoading: false,
      isAllLoaded: false,
      firstFetch: false,
      trends: [],
      fixedTitle: "我解锁的成就"
    };
  },
  computed: {
    ...mapGetters(["z"]),
    shouldButtonShow() {
      const { acid } = this.$route.query;
      if (acid) {
        return true;
      }
      return false;
    }
  },
  created() {
    if (this.z === "") {
      return;
    }
    this.fetchList();
    Vue.use(InfiniteScroll);
  },
  mounted() {
    this.currentPage = 1;
    this.isLoading = false;
    this.isAllLoaded = false;
    this.trends = [];
    this.bindBottomDistance = (this.$parent.screenWidth / 375) * 100 * 0.48;
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.fetchList();
      }, 2000);
    },
    fetchList() {
      if (this.isAllLoaded || this.isLoading) {
        return;
      }
      let payload = {
        api: "json",
        cp: this.currentPage,
        size: 10,
        mkey: this.$route.params.mkey,
        z: this.z
      };
      let { bid } = this.$route.query;
      if (bid !== undefined) {
        payload.bid = bid;
      }
      fetchMyAchivement(payload)
        .then(r => {
          if (r.data.results.info !== null) {
            this.fixedTitle = r.data.results.info.name;
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
          this.isLoading = false;
        })
        .finally(() => {
          this.firstFetch = true;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.mint-loadmore-bottom {
  font-size: 0.14rem !important;
}
.achivement {
  position: relative;
  width: 100%;
  min-height: 100vh;
  .title {
    width: 2.1rem;
    height: 0.33rem;
    background: rgba(248, 198, 124, 1);
    box-shadow: 0px 2px 0px rgba(219, 170, 97, 1);
    opacity: 1;
    border-radius: 33px;
    position: absolute;
    font-size: 0.14rem;
    line-height: 0.33rem;
    text-align: center;
    z-index: 100;
    margin-top: -0.2rem;
    margin-left: 0.83rem;
    color: rgba(123, 74, 45, 1);
    font-weight: bold;
  }
  .achives {
    z-index: 50;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 0.08rem;
    background: rgba(252, 246, 239, 1);
    border-radius: 38px;
    margin-top: 0.45rem;
    padding-top: 0.3rem;
    .achive {
      width: 1.16rem;
      height: 1.32rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .header {
        width: 0.84rem;
        border: 1px solid rgba(212, 212, 212, 1);
        height: 0.84rem;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .text {
        font-size: 0.14rem;
        height: 0.2rem;
        width: 100%;
        font-weight: 400;
        text-align: center;
        overflow: hidden;
        color: rgba(159, 110, 67, 1);
      }
    }
    .no-achive {
      align-self: center;
      font-size: 0.14rem;
      text-align: center;
      color: #7b4a2d;
      height: 1rem;
      width: 100%;
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
