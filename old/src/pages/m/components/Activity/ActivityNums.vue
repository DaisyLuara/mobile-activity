<template>
  <div class="activity-nums">
    参与人数: {{ computedNums }}
  </div>  
</template>

<script>
export default {
  props: {
    nums: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    computedNums() {
      if (this.nums < 1000) {
        return this.nums;
      }
      if (this.nums >= 1000 && this.nums < 10000) {
        return (this.nums / 1000).toFixed(1) + "K";
      }
      if (this.nums > 10000) {
        return (this.nums / 10000).toFixed(1) + "W";
      }
      return 0;
    }
  }
};
</script>

<style lang="less" scoped>
.activity-nums {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.05rem;
  height: 0.26rem;
  background: rgba(57, 48, 104, 1);
  opacity: 0.94;
  border-radius: 0.15rem 0px 0.15rem 0px;
  line-height: 0.26rem;
  color: #ffffff;
  text-align: center;
  z-index: 60;
  font-size: 0.1rem;
}
</style>
