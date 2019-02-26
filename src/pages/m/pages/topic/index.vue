<template>
  <div class="topic">
    <NoListContentReminder
      :show="topics.length ===0 && firstFetch"
      words="暂时还没有活动"
    />

    <ul
      v-infinite-scroll="loadMore"
      class="topic-wrapper"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div
        v-for="(item, index) in topics"
        :key="index"
        class="item-wrapper"
      >
        <TopicItem 
          :img-urls="item.image"
          :avatar="item.face"
          :user-name="item.username"
          :post-time="item.clientdate"
          :title="item.title"
          :othertype1="item.othertype1"
          :othertype2="item.othertype2"
          :otherid1="item.otherid1"
          :otherid2="item.otherid2"
          :avrid="item.avrid"
          :other1="item.other1"
          :other2="item.other2"
          :acid="item.acid"
        />
      </div>
    </ul>
    <div class="loadmore-add" />
    <div class="loadmore-add" />
  </div>
</template>

<script>
import Vue from "vue";
import { InfiniteScroll } from "mint-ui";
import { fetchTopics } from "services";
import { mapGetters } from "vuex";
import TopicItem from "@/pages/m/components/Topic/TopicItem";
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder";
export default {
  name: "TopicIndex",
  components: {
    NoListContentReminder,
    TopicItem
  },

  data() {
    return {
      bindBottomDistance: 0,
      bottomStatus: "",
      currentPage: 1,
      isLoading: false,
      isAllLoaded: false,
      firstFetch: false,
      topics: []
    };
  },

  computed: {
    ...mapGetters(["z"])
  },

  created() {
    if (this.z === "") {
      return;
    }
    Vue.use(InfiniteScroll);
    this.fetchList();
  },

  mounted() {
    this.currentPage = 1;
    this.isLoading = false;
    this.isAllLoaded = false;
    this.topics = [];
    this.bindBottomDistance = (this.$parent.screenWidth / 375) * 100 * 0.48;
  },

  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        if (this.$route.name === "TopicIndex") {
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
      const { acid } = this.$route.query;
      if (acid && acid !== "0") {
        payload.acid = acid;
        payload.size = 20;
      }
      fetchTopics(payload)
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
          this.topics = this.topics.concat(res);
          // if in activity, progress must be cal
          if (this.$route.name === "ActivityTopic") {
            this.$emit("onProgressCal", this.topics);
          }
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
.topic {
  background: rgba(243, 243, 243, 1);
  position: relative;
  width: 100%;
  min-height: 100vh;
  .topic-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .item-wrapper {
    width: 3.43rem;
    height: 5.03rem;
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
