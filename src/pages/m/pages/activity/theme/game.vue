<template>
  <div class="game">
    <div class="game-item" v-for="(item, index) in resData" :key="index">
      <div class="info">
        <img :src="item.face" class="avatar">
        <div class="info-more">
          <span class="yz">颜值: {{item.value}} 分</span>
          <span class="date">{{item.date.substring(0,10)}}</span>
        </div>
      </div>
      <img class="crown" v-if="index === 0" src="https://cdn.exe666.com/fe/image/m/first.png">
      <img class="crown" v-if="index === 1" src="https://cdn.exe666.com/fe/image/m/second.png">
      <img class="crown" v-if="index === 2" src="https://cdn.exe666.com/fe/image/m/third.png">
    </div>
    <ActivityThemeGameBottom/>
  </div>
</template>

<script>
import { fetchShopActivityProgress } from "services";
import ActivityThemeGameBottom from "@/pages/m/components/Activity/ActivityThemeGameBottom";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      resData: []
    };
  },
  components: {
    ActivityThemeGameBottom
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted() {
    this.fetchGameResults();
  },
  methods: {
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
          this.resData = res;
        })
        .catch(e => {
          console.dir(e);
        });
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
  padding-top: 20px;
  .game-item {
    width: 3.42rem;
    height: 0.685rem;
    border-top: rgba(194, 194, 194, 1) solid 0.5px;
    border-bottom: rgba(194, 194, 194, 1) solid 0.5px;
    border-left: rgba(194, 194, 194, 1) solid 1px;
    border-right: rgba(194, 194, 194, 1) solid 1px;
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
