<template>
  <div class="activity-bottom">
    <div class="progress" @click="naviGateToAct">查看活动进度</div>
    <div class="award" @click="awardIn">立即报名</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      nameMap: {
        alltop: "ActivityShopAllTopProgress"
      }
    };
  },
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
    }
  },
  methods: {
    naviGateToAct() {
      console.log(this.nameMap["alltop"]);
      if (this.acid === "" || this.acttype === "" || this.awardkey === "") {
        return;
      }
      this.$router.push({
        name: this.nameMap["alltop"],
        params: this.$route.params,
        query: {
          acid: this.acid,
          awardkey: this.awardkey
        }
      });
    },
    awardIn() {}
  }
};
</script>

<style lang="less" scoped>
.activity-bottom {
  position: fixed;
  bottom: 0;
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

