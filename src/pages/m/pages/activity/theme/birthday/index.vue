<template>
  <div class="birthday">
    <div class="trends-wrapper">
      <div class="month">{{ month }}月</div>
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        @endReached="loadMore"
      >
        <div class="scroll-top"/>
        <div
          v-for="(item, index) in trends"
          :key="index"
          class="item-wrapper"
        >
          <div 
            :class="[item.type === 'birthday' ? 'birthday-icon' : '']" 
            class="trend-icon">
            <p class="day">{{ getDay(item.date) }}</p>
            <p class="week">{{ getWeek(item.date) }}.</p>
            <img
              v-if="item.type === 'birthday'"
              class="candle"
              src="https://cdn.exe666.com/m/activity/shop/birthday/candle.png"
            >
          </div>
          <div
            class="trend-info"
            @click="handleNaviToActivity(item)"
          >
            <div class="trend-banner-wrapper">
              <img :src="item.image">
              <div class="trend-title">{{ item.title }}</div>
            </div>
            <div class="trend-detail">
              <div class="trend-date">
                <!-- <p>参与时间:</p>
                <p>{{ getTimeLimt(item.sdate, item.edate) }}</p> -->
                <p v-html="item.txt"/>
              </div>
              <div class="trend-number">{{ item.nums }}人已参与</div>
            </div>
          </div>
        </div>
        <!-- <md-scroll-view-more
          slot="more"
          :is-finished="isAllLoaded"
        >
        </md-scroll-view-more> -->
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ScrollView, ScrollViewMore } from "mand-mobile";
import { fetchShopActivityList } from "services";
import moment from "moment";

export default {
  name: "ActivityBirthDayIndex",
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore
  },
  data() {
    return {
      trends: [
        {
          acid: "25",
          title: "祝福:3月2号是韩珂的生日",
          txt: "立即点击参与，为他制作蛋糕，送<br/>上你的生日祝福吧~",
          nums: "431",
          image:
            "https://cdn.exe666.com/m/activity/shop/birthday/temp_banner_1.png",
          video: null,
          awardkey: "9smn38kb9g4529cw1lq49h6h",
          infolink:
            "http://cdn.exe666.com/1007/other/b7065882530f7a720af28d7d70524ba8.html",
          pslink: null,
          pass: "1",
          date: "2019-03-02 00:00:00",
          clientdate: "1550052236000",
          aname: "3月3生日祝福",
          aicon: "http://image.exe666.com/1007/image/775_birthday2.png",
          sdate: "1549987201",
          edate: "1581609599",
          passed: "forever",
          type: "birthday",
          value_mode: "most",
          user_per: "0",
          xid: "0"
        },
        {
          acid: "25",
          title: "投票:2019动景旅游投票开始了",
          txt: "立即参与投票决定旅游线路<br/>2019/3/17-2019/3/27",
          nums: "256",
          image:
            "https://cdn.exe666.com/m/activity/shop/birthday/temp_banner_2.png",
          video: null,
          awardkey: "9smn38kb9g4529cw1lq49h6h",
          infolink:
            "http://cdn.exe666.com/1007/other/b7065882530f7a720af28d7d70524ba8.html",
          pslink: null,
          pass: "1",
          date: "2019-03-03 00:00:00",
          clientdate: "1551542400000",
          aname: "3月3生日祝福",
          aicon: "http://image.exe666.com/1007/image/775_birthday2.png",
          sdate: "1549987201",
          edate: "1581609599",
          passed: "forever",
          type: "topic",
          value_mode: "most",
          user_per: "0",
          xid: "0"
        },
        {
          acid: "25",
          title: "通知:即日起每日签到即可抽红包",
          txt: "每日最高99元现金红包",
          nums: "97",
          image:
            "https://cdn.exe666.com/m/activity/shop/birthday/temp_banner_3.png",
          video: null,
          awardkey: "9smn38kb9g4529cw1lq49h6h",
          infolink:
            "http://cdn.exe666.com/1007/other/b7065882530f7a720af28d7d70524ba8.html",
          pslink: null,
          pass: "1",
          date: "2019-03-07 00:00:00",
          clientdate: "1551888000000",
          aname: "3月3生日祝福",
          aicon: "http://image.exe666.com/1007/image/775_birthday2.png",
          sdate: "1549987201",
          edate: "1581609599",
          passed: "forever",
          type: "check",
          value_mode: "most",
          user_per: "0",
          xid: "0"
        }
      ],
      isAllLoaded: false,
      currentPage: 1,
      firstFetch: false,
      weekday: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    };
  },
  computed: {
    ...mapGetters(["z"]),
    month() {
      return new Date().getMonth() + 1;
    },
    getDay() {
      return function(date) {
        return new Date(date).getDate();
      };
    },
    getWeek() {
      return function(date) {
        return this.weekday[new Date(date).getDay()];
      };
    }
  },
  mounted() {
    // this.fetchList()
  },
  methods: {
    // 拉取祝福活动列表
    fetchList() {
      if (this.isAllLoaded) {
        return;
      }
      let payload = {
        api: "json",
        cp: this.currentPage,
        size: 5,
        z: this.z,
        allt: "birthday",
        mkey: this.$route.params.mkey
      };
      fetchShopActivityList(this, payload)
        .then(r => {
          if (r.data.state !== "1") {
            this.isAllLoaded = true;
            return;
          }
          if (r.data.results.pageIndex >= r.data.results.totalPage) {
            this.isAllLoaded = true;
          }
          let res = r.data.results.data;
          this.trends = this.trends.concat(res);
          this.currentPage++;
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.$refs.scrollView.finishLoadMore();
        });
    },
    // 加载更多
    loadMore() {
      // setTimeout(() => {
      //   this.fetchList()
      // }, 2000)
    },
    handleNaviToActivity(item) {
      if (item.type === "birthday") {
        this.$router.push({
          name: "ActivityBirthDayCake",
          params: {
            mkey: this.$route.params.mkey
          },
          query: {
            acid: item.acid
          }
        });
      }
    },
    // 获取活动起始时间
    getTimeLimt(s, e) {
      const start = moment(Number(s + "000")).format("YYYY-M-D");
      const end = moment(Number(e + "000")).format("YYYY-M-D");
      return `${start}~${end}`;
    }
    // getWeek(date) {
    //   return this.weekday[new Date(date).getDay()];
    // }
    // getDay(date) {
    //   return new Date(date).getDate();
    // }
  }
};
</script>

<style lang="less" scoped>
@import "./mixin.less";

.birthday {
  .wrapper();
  background: #28264e;
  .trends-wrapper {
    position: absolute;
    top: 0;
    bottom: 48px;
    width: 100%;
    padding: 0 0.1rem 0 0.03rem;
    border-radius: 0.25rem 0.25rem 0 0;
    background: #f2f2f2;
    overflow: hidden;
    .month {
      font-size: 0.58rem;
      color: #e7e7e7;
      line-height: 0.52rem;
      position: absolute;
      top: 0.44rem;
      right: 0.1rem;
    }
    .scroll-top {
      width: 100%;
      height: 0.74rem;
    }
    .item-wrapper {
      width: 100%;
      display: flex;
      margin-bottom: 0.1rem;
      .trend-icon {
        width: 0.54rem;
        height: 0.68rem;
        margin-right: 0.06rem;
        padding-top: 0.04rem;
        background: url(https://cdn.exe666.com/m/activity/shop/birthday/black-icon.png)
          no-repeat;
        background-size: 100% 100%;
        &.birthday-icon {
          background: url(https://cdn.exe666.com/m/activity/shop/birthday/red-icon.png)
            no-repeat;
          background-size: 100% 100%;
        }
        .day,
        .week {
          color: #fff;
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
        background-color: #fff;
        border-radius: 0.1rem;
        box-shadow: 0 0 9px 0 rgba(223, 223, 223, 0.59);
        .trend-banner-wrapper {
          position: relative;
          width: 100%;
          height: 1.51rem;
          background-color: #fe556f;
          border-radius: 0.1rem;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .trend-title {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            line-height: 0.4rem;
            color: #fff;
            font-size: 0.14rem;
            padding: 0.4rem 0 0 0.11rem;
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
            .ellipsis();
          }
        }
        .trend-detail {
          display: flex;
          justify-content: space-between;
          padding: 0.1rem;
          .trend-date {
            line-height: 0.15rem;
            color: #bcbcbc;
            font-size: 0.11rem;
          }
          .trend-number {
            font-size: 0.11rem;
            color: #46b9c7;
            line-height: 0.28rem;
            height: 0.28rem;
            padding: 0 0.1rem;
            border: 1px solid #46b9c7;
            border-radius: 0.14rem;
            flex-shrink: 0;
          }
        }
      }
    }
  }
}
.md-scroll-view {
  background: transparent;
}
.md-scroll-view-more {
  font-size: 0.15rem;
}
</style>
