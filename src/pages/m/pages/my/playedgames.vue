<template>
  <div class="achivement">
    <ul
      v-infinite-scroll="loadMore"
      class="games"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div 
        v-for="(item, index) in trends" 
        :key="index" 
        class="game"
      >
        <div class="icon">
          <img :src="item.picon">
        </div>
        <div class="texts">
          <div class="title">
            {{ item.pname }}
          </div>
          <div class="time">
            {{ computedDate(item.clientdate) }}
          </div>
        </div>
      </div>
      <div 
        v-if="trends.length === 0 && firstFetch" 
        class="no-game"
      >
        还没有玩过游戏呢～
      </div>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { mapGetters } from "vuex";
import { InfiniteScroll } from "mint-ui";
import { fetchGamesPlayed } from "services";
export default {
  name: "MyPlayedGames",
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
    computedDate(clientdate) {
      let now = moment(new Date().getTime());
      let cld = moment(Number(clientdate));
      // console.log(cld);
      let diffyear = cld.diff(now, "years");
      let diffday = now.diff(cld, "days");
      if (diffyear >= 1) {
        return cld.format("YYYY-MM-DD HH:mm:ss");
      } else if (moment(now).isSame(cld, "day")) {
        return cld.format("HH:mm:ss");
      } else {
        return cld.format("MM-DD HH:mm:ss");
      }
      return "";
    },
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
        // z: "4fk2d91686b0fcef93b6e594689846cb4631n5"
      };
      fetchGamesPlayed(payload)
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
  background-color: rgba(229, 229, 229, 1);
  .games {
    z-index: 50;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: white;
    .game {
      width: 100%;
      height: 0.96rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-bottom: rgba(229, 229, 229, 1) solid 1px;
      .icon {
        width: 0.68rem;
        height: 0.68rem;
        opacity: 1;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        margin-left: 0.14rem;
        margin-right: 0.14rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .texts {
        height: 0.68rem;
        width: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .title {
          font-size: 0.14rem;
          color: rgba(34, 34, 34, 1);
          width: 100%;
          height: 0.2rem;
        }
        .time {
          height: 0.14rem;
          font-size: 0.1rem;
          width: 100%;
          color: rgba(34, 34, 34, 1);
        }
      }
    }
    .no-game {
      width: 100%;
      height: 0.96rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      font-size: 0.14rem;
      text-align: center;
      color: #7b4a2d;
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
