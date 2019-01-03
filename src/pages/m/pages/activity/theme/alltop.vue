<template>
  <div class="alltop">
    <ul
      v-infinite-scroll="loadMore"
      class="trends-wrapper"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div v-for="(item, index) in trends" :key="index" class="item-wrapper">
        <ThemeVoteItem
          :image="item.image"
          :title="item.title"
          :clientdate="item.clientdate"
          :avrid="item.avrid"
        />
      </div>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { InfiniteScroll } from "mint-ui";
import { fetchShopActivityProgress } from "services";
import ThemeVoteItem from "@/pages/m/components/ListItem/ThemeVoteItem";
export default {
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
  components: {
    ThemeVoteItem
  },
  computed: {
    ...mapGetters(["z"])
  },
  created() {
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
        awardkey: this.$route.query.awardkey,
        z: this.z
      };
      fetchShopActivityProgress(this, payload)
        .then(r => {
          console.dir(r);
          if (r.state !== "1") {
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
    }
  }
};
</script>

<style lang="less" scoped>
.alltop {
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
