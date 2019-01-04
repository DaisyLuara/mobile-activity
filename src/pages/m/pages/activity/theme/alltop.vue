<template>
  <div class="alltop">
    <NoListContentReminder :show="trends.length === 0 && firstFetch" words="暂时没有活动内容哦"/>
    <img class="main-photo" :src="actData.image" v-if="actData.image !== ''">
    <ul
      v-infinite-scroll="loadMore"
      class="trends-wrapper"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div v-for="(item, index) in trends" :key="index" class="item-wrapper">
        <ThemeVoteItem
          :auid="item.auid"
          :photoUrl="item.link"
          :face="item.face"
          :nickname="item.nickname"
          :views="item.views"
        />
      </div>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { InfiniteScroll } from "mint-ui";
import { fetchShopActivityProgress, fetchActivityDetail } from "services";
import ThemeVoteItem from "@/pages/m/components/ListItem/ThemeVoteItem";
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder";
export default {
  data() {
    return {
      bindBottomDistance: 0,
      bottomStatus: "",
      currentPage: 1,
      isLoading: false,
      isAllLoaded: false,
      trends: [],
      actData: {
        image: ""
      },
      firstFetch: false
    };
  },
  components: {
    ThemeVoteItem,
    NoListContentReminder
  },
  computed: {
    ...mapGetters(["z"])
  },
  created() {
    this.fetchList();
    Vue.use(InfiniteScroll);
    this.fetchHeader();
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
          if (r.data.state !== "1") {
            this.isAllLoaded = true;
            return;
          }
          if (r.data.results.pageIndex >= r.data.results.totalPage) {
            this.isAllLoaded = true;
          }
          let res = r.data.results.data;
          this.isLoading = false;
          this.trends = this.trends.concat(res);

          this.currentPage++;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        })
        .finally(() => {
          this.firstFetch = true;
        });
    },
    async fetchHeader() {
      let { acid } = this.$route.query;
      if (acid !== undefined) {
        const payload = {
          actid: acid,
          z: this.z,
          api: "json"
        };
        try {
          let r = await fetchActivityDetail(this, payload);
          this.actData = r.data.results;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.alltop {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgba(243, 243, 243, 1);
  .trends-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .item-wrapper {
    width: 1.71rem;
    height: 3.6rem;
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
  .main-photo {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
