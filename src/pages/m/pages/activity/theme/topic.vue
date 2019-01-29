<template>
  <div class="activity-topic">
    <div class="progress">
      <img :src="avatar" class="avatar"/>
      <div class="text">
        答辩: {{computedProgress}}/{{calLenth}}题
      </div>
    </div>
    <TopicModule @onProgressCal="calprogress" @onCalLength="calLenth"/>
  </div>
</template>

<script>
import TopicModule from "@/pages/m/pages/topic/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      arr: []
    };
  },
  components: {
    TopicModule
  },
  computed: {
    ...mapGetters(["avatar"]),
    computedProgress() {
      let cal = 0;
      this.arr.map(ele => {
        if (ele.other1 !== "0" || ele.other2 !== "0") {
          cal++;
        }
      });
      return cal;
    },
    calLenth() {
      return this.arr.length;
    }
  },
  methods: {
    calprogress(arr) {
      this.arr = arr;
    }
  }
};
</script>

<style lang="less" scoped>
.activity-topic {
  position: relative;
  width: 100%;
  .progress {
    width: 3.75rem;
    height: 0.65rem;
    background: rgba(109, 30, 255, 1);
    box-shadow: 0rem 0rem 0rem rgba(37, 5, 96, 0.37);
    opacity: 1;
    display: flex;
    flex-direction: row;
    padding: 0 0.16rem;
    align-items: center;
    .avatar {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      opacity: 1;
    }
    .text {
      font-size: 0.13rem;
      color: white;
      margin-left: 0.11rem;
    }
  }
}
</style>

