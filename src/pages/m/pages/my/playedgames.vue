<template>
  <div class="playedgames">
    <ul
      v-infinite-scroll="loadMore"
      class="games"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div v-for="(item, index) in games" :key="index" class="game"></div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: []
    };
  }
};
</script>

<style lang="less" scoped>
.playedgames {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .game {
    width: 100%;
    height: 96px;
  }
}
</style>
