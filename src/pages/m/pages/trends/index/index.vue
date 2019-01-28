<template>
  <div class="trends">
    <NoListContentReminder
      :show="trends.length ===0 && firstFetch"
      words="暂时还没有活动"
    />

    <MyTrendsSwiper />
    <ul
      v-infinite-scroll="loadMore"
      class="trends-wrapper"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div
        v-for="(item, index) in trends"
        :key="index"
        class="item-wrapper"
      >
        <TrendPhoto
          :image="item.image"
          :title="item.title"
          :clientdate="item.clientdate"
          :avrid="item.avrid"
          :type="item.ac_type"
        />
      </div>
    </ul>
    <div class="loadmore-add" />
    <div class="loadmore-add" />
  </div>
</template>

<script>
import Vue from "vue";
import TrendPhoto from "@/pages/m/components/ListItem/TrendPhoto";
import MyTrendsSwiper from "@/pages/m/components/Banner/MyTrendsSwiper";
import { InfiniteScroll } from "mint-ui";
import { getUserTrends } from "services";
import { mapGetters } from "vuex";
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder";
export default {
  name: "TrendsIndex",
  components: {
    TrendPhoto,
    MyTrendsSwiper,
    NoListContentReminder
  },

  data() {
    return {
      bindBottomDistance: 0,
      bottomStatus: "",
      currentPage: 1,
      isLoading: false,
      isAllLoaded: false,
      firstFetch: false,
      trends: []
    };
  },

  computed: {
    ...mapGetters(["z"])
  },

  created() {
    if (this.z === "") {
      return;
    }
    // this.fetchList();
    Vue.use(InfiniteScroll);
    this.fetchList();
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
        if (this.$route.name === "TrendsIndex") {
          this.fetchList();
        }
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
      getUserTrends(payload)
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
.trends {
  position: relative;
  width: 100%;
  min-height: 100vh;
  .trends-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .item-wrapper {
    width: 1.71rem;
    height: 3.045rem;
    margin: 0.1rem 0.08rem;
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
