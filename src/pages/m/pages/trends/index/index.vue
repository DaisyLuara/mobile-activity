<template>
  <div class="trends">
    <MyTrendsSwiper/>
    <ul
      class="trends-wrapper"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="item-wrapper" v-for="(item, index) in trends" :key="index">
        <TrendPhoto
          :image="item.avr.image"
          :title="item.avr.title"
          :clientdate="item.avr.clientdate"
          :avrid="item.avr.avrid"
        />
      </div>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import TrendPhoto from "@/pages/m/components/ListItem/TrendPhoto";
import MyTrendsSwiper from "@/pages/m/components/Banner/MyTrendsSwiper";
import { InfiniteScroll } from "mint-ui";
import { getUserTrends } from "services";
import { mapGetters } from "vuex";
export default {
  name: "trendsIndex",

  components: {
    TrendPhoto,
    MyTrendsSwiper
  },

  computed: {
    ...mapGetters(["z"])
  },

  created() {
    if (this.z === "") {
      return;
    }
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

  data() {
    return {
      bindBottomDistance: 0,
      bottomStatus: "",
      currentPage: 1,
      isLoading: false,
      isAllLoaded: false,
      trends: []
    };
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
        z: this.z,
        api: "json",
        size: 10,
        cp: this.currentPage
      };
      getUserTrends(payload)
        .then(r => {
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
