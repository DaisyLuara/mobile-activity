<template>
  <div class="game">
    <img
      v-if="actData.image !== ''"
      :src="actData.image"
      class="main-photo"
    >
    <div
      v-if="myData !== null"
      class="game-my"
    >
      <img
        class="bg"
        src="https://cdn.exe666.com/fe/image/m/game-my.png"
      >
      <div class="info">
        <img
          :src="myData.face"
          class="avatar"
        >
        <div class="info-more">
          <span class="yz">{{ my.tabs }}: {{ myData.value }} 分</span>
          <span class="date">{{ computedDate(myData.clientdate) }}</span>
        </div>
      </div>
      <div class="my-rank">
        <div class="rank">{{ myData.topnum }}</div>
        <div class="label">我的排名</div>
      </div>
    </div>
    <div
      v-for="(item, index) in resData"
      :class="{'game-item': index !== resData.length - 1, 'game-item last': index === resData.length - 1}"
      :key="index"
    >
      <div class="info">
        <img
          :src="item.face"
          class="avatar"
        >
        <div class="info-more">
          <span class="yz">{{ my.tabs }}: {{ item.value }} 分</span>
          <span class="date">{{ computedDate(item.clientdate) }}</span>
        </div>
      </div>
      <img
        v-if="index === 0"
        class="crown"
        src="https://cdn.exe666.com/fe/image/m/first.png"
      >
      <img
        v-if="index === 1"
        class="crown"
        src="https://cdn.exe666.com/fe/image/m/second.png"
      >
      <img
        v-if="index === 2"
        class="crown"
        src="https://cdn.exe666.com/fe/image/m/third.png"
      >
    </div>
    <ActivityThemeGameBottom :show="shouldButtonShow"/>
    <div class="bottom-holder" />
  </div>
</template>

<script>
import moment from "moment";
import { fetchShopActivityProgress, fetchActivityDetail } from "services";
import ActivityThemeGameBottom from "@/pages/m/components/Activity/ActivityThemeGameBottom";
import { mapGetters } from "vuex";
export default {
  components: {
    ActivityThemeGameBottom
  },
  data() {
    return {
      resData: [],
      my: {
        tabs: "颜值"
      },
      actData: {
        image: ""
      }
    };
  },
  computed: {
    ...mapGetters(["z"]),
    myData() {
      if (this.my.hasOwnProperty("user")) {
        return this.my.user;
      } else {
        return null;
      }
    },
    shouldButtonShow() {
      if (this.$route.name === "ActivityShopGameProgress") {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.fetchGameResults();
    this.fetchHeader();
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
    fetchGameResults() {
      let payload = {
        api: "json",
        cp: 1,
        size: 10,
        awardkey: this.$route.query.awardkey,
        z: this.z
      };
      fetchShopActivityProgress(this, payload)
        .then(r => {
          console.dir(r);
          let res = r.data.results.data;
          this.my = r.data.results;
          this.resData = res;
        })
        .catch(e => {
          console.dir(e);
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
          document.title = this.actData.title;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.game {
  position: relative;
  background: rgba(243, 243, 243, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  .main-photo {
    width: 100%;
    margin-bottom: 20px;
  }
  .bottom-holder {
    width: 100%;
    height: 1.2rem;
    background: transparent;
  }
  .game-my {
    position: relative;
    width: 3.63rem;
    height: 0.9rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.17rem;
    margin-bottom: -0.1rem;
    z-index: 20;
    .info {
      height: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      z-index: 30;
      .avatar {
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
        z-index: 40;
      }
      .info-more {
        z-index: 40;
        span {
          width: 100%;
        }
        margin-left: 0.1rem;
        width: 2rem;
        height: 0.45rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        font-size: 0.1rem;
        .yz {
          font-size: 0.13rem;
          font-weight: bold;
          color: white;
        }
        .date {
          color: rgba(204, 204, 204, 1);
          font-size: 0.1rem;
        }
      }
    }
    .my-rank {
      z-index: 40;
      width: 2.535rem;
      height: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      justify-content: space-around;
      .rank {
        font-size: 0.2rem;
        z-index: 40;
      }
      .label {
        font-size: 0.1rem;
        z-index: 40;
      }
    }
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .game-item {
    &.last {
      border-bottom-left-radius: 0.05rem;
      border-bottom-right-radius: 0.05rem;
      border-bottom: none;
    }
    width: 3.42rem;
    height: 0.685rem;
    border-bottom: rgba(194, 194, 194, 1) solid 0.5px;
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.17rem;
    justify-content: space-between;
    .info {
      height: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .avatar {
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
      }
      .info-more {
        span {
          width: 100%;
        }
        margin-left: 0.1rem;
        width: 2rem;
        height: 0.45rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        font-size: 0.1rem;
        .yz {
          font-size: 0.13rem;
          font-weight: bold;
        }
        .date {
          color: rgba(204, 204, 204, 1);
          font-size: 0.1rem;
        }
      }
    }
    .crown {
      width: 0.535rem;
      height: 0.405rem;
    }
  }
}
</style>
