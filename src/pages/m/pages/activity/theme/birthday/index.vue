<template>
  <div class="birthday">
    <div class="header">
      <div class="white-space"></div>
    </div>
    <div class="trends-wrapper">
      <div class="item-wrapper">
        <div class="trend-icon">
          <p class="day">2</p>
          <p class="week">Thu</p>
          <img class="candle" src="https://cdn.exe666.com/m/activity/shop/birthday/candle.png" alt="candle">
        </div>
        <router-link :to="{ name: 'ActivityBirthDayCake', query: { acid: '24' } }" class="trend-info">
          <div class="trend-banner-wrapper">
            <!-- <img src="" alt=""> -->
            <div class="trend-title">今天是 韩珂 的生日，祝他生日快乐吧</div>
          </div>
          <div class="trend-detail">
            <div class="trend-date">
              <p>参与时间:</p>
              <p>2019/1/23~2019/1/24</p>
            </div>
            <div class="trend-number">256人已参与</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchShopActivityProgress } from "services";

export default {
  name: "ActivityBirthDayIndex",
  data() {
    return {
      trends: [],
      isLoading: false,
      isAllLoaded: false,
      currentPage: 1,
      firstFetch: false
    };
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      if (this.isLoading || this.isAllLoaded) {
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "./mixin.less";
* {
  margin: 0;
  padding: 0;
}

.birthday {
  .wrapper();
  .header {
    position: absolute;
    top: 0;
    width: 100%;
    background: #28264E;
    .white-space {
      width: 100%;
      height: 0.25rem;
      background: #F2F2F2;
      border-radius: 0.25rem 0.25rem 0 0;
    }
  }
  .trends-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.74rem 0.1rem 0 0.03rem;
    .item-wrapper {
      width: 100%;
      display: flex;
      .trend-icon {
        width: 0.54rem;
        height: 0.68rem;
        margin-right: 0.06rem;
        padding-top: 0.04rem;
        background: url(https://cdn.exe666.com/m/activity/shop/birthday/red-icon.png) no-repeat;
        background-size: 100% 100%;
        .day, .week {
          color: #FFF;
          text-align: center;
        }
        .day {
          font-size: 0.14rem;
        }
        .week {
          font-size: 0.1rem;
        }
        .candle {
          display: block;
          width: 0.35rem;
          height: 0.24rem;
          margin: 0 auto;
        }
      }
      .trend-info {
        flex: 1;
        background-color: #FFF;
        border-radius: 0.1rem;
        box-shadow: 0 0 9px 0 rgba(223,223,223,0.59);
        .trend-banner-wrapper {
          position: relative;
          width: 100%;
          height: 1.51rem;
          background-color: #FE556F;
          border-radius: 0.1rem;
          overflow: hidden;
          .trend-title {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            line-height: 0.4rem;
            color: #FFF;
            font-size: 0.14rem;
            padding: 0.4rem 0 0 0.11rem;
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
            .ellipsis();
          }
        }
        .trend-detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.49rem;
          padding: 0 0.1rem;
          .trend-date {
            line-height: 0.15rem;
            color: #BCBCBC;
            font-size: 0.11rem;
          }
          .trend-number {
            font-size: 0.11rem;
            color: #46B9C7;
            line-height: 0.28rem;
            height: 0.28rem;
            padding: 0 0.1rem;
            border: 1px solid #46B9C7;
            border-radius: 0.14rem;
          }
        }
      }
    }
  }
}
</style>
