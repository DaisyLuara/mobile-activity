<template>
  <div class="trends">
    <div class="item-wrapper" v-for="(item, index) in trends" :key="index">
      <TrendPhoto/>
    </div>
  </div>
</template>

<script>
import TrendPhoto from "@/pages/m/components/ListItem/TrendPhoto";
export default {
  name: "trendsIndex",
  components: {
    TrendPhoto
  },
  data() {
    return {
      trends: []
    };
  }
};
</script>

<style lang="less" scoped>
.trends {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item-wrapper {
    width: 3.42rem;
    height: 6.09rem;
    margin: 0.2rem 0.1rem;
  }
}
</style>
