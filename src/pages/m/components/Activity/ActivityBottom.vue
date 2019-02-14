<template>
  <div class="activity-bottom">
    <div
      class="progress"
      @click="naviGateToAct"
    >{{ buttonText }}</div>
    <div
      v-if="isAllow === '1'"
      class="award"
      @click="awardIn"
    >立即报名</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { inShopActivityAward } from "services";
import { mapGetters } from "vuex";
export default {
  props: {
    acid: {
      type: String,
      default: "",
      requried: true
    },
    acttype: {
      type: String,
      default: "",
      requried: true
    },
    awardkey: {
      type: String,
      default: "",
      requried: true
    },
    isAllow: {
      type: String,
      default: "0",
      requried: true
    },
    xinfo: {
      type: Object,
      default: () => {
        bid: "";
      },
      required: false
    },
    tabs: {
      type: String,
      default: "",
      requried: false
    }
  },
  data() {
    return {
      nameMap: {
        alltop: "ActivityShopAllTopProgress",
        game: "ActivityShopGameProgress",
        honour: "MyAchivement",
        options: "ActivityTopic",
        birthday: "ActivityBirthDay"
      }
    };
  },
  computed: {
    ...mapGetters(["z"]),
    buttonText() {
      if (this.acttype === "alltop") {
        return "查看投票榜单";
      }
      if (this.acttype === "game") {
        return "查看活动排行榜";
      }
      if (this.acttype === "honour") {
        return "查看勋章收集进度";
      }
      if (this.acttype === "options") {
        return "查看我的进度";
      }
      return "查看活动进度";
    }
  },
  methods: {
    naviGateToAct() {
      console.log(this.nameMap["alltop"]);
      if (this.acid === "" || this.acttype === "" || this.awardkey === "") {
        return;
      }
      let bid = null;
      if (this.xinfo !== null) {
        if (this.xinfo.bid) {
          bid = this.xinfo.bid;
        }
      }
      let query = {
        acid: this.acid,
        awardkey: this.awardkey,
        bid: bid
      };
      if (this.tabs !== undefined && this.tabs !== null && this.tabs !== "") {
        query.tabs = this.tabs;
      }
      this.$router.push({
        name: this.nameMap[this.acttype],
        params: this.$route.params,
        query: query
      });
    },
    awardIn() {
      console.log("awardin");
      if (this.$route.query.avrid === undefined) {
        Toast("你还没有玩过这个活动呢，请参与你玩过的活动吧！");

        setTimeout(() => {
          this.$router.push({
            name: "TrendsIndex"
          });
        }, 1500);
        return;
      }
      let payload = {
        actid: this.$route.query.acid,
        avrid: this.$route.query.avrid,
        z: this.z,
        mkey: this.$route.params.mkey,
        api: "json"
      };
      inShopActivityAward(this, payload)
        .then(r => {
          if (r.data.state === "1") {
            Toast("报名成功");
            return;
          } else if (r.data.state !== "0") {
            Toast(r.data.results);
          }
        })
        .catch(e => {
          Toast("网络不太好，请重试");
          console.dir(e);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.activity-bottom {
  position: fixed;
  bottom: 0;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  left: 0;
  height: 0.47rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  .progress {
    flex: 1;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 0.47rem;
    font-size: 0.16rem;
  }
  .award {
    flex: 1;
    flex-shrink: 0;
    background: rgba(109, 30, 255, 1);
    line-height: 0.47rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.16rem;
  }
}
</style>

