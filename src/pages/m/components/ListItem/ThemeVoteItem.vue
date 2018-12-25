<template>
  <div class="vote-item">
    <div class="vote-photo"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.vote-item {
  position: relative;
  z-index: 10;
  .vote-photo {
    width: 3.42rem;
    height: 6.09rem;
    border-radius: 0.2rem;
    .photo-cover {
      width: 100%;
      height: 0.82rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
  .vote-title {
    height: 0.5rem;
    width: 100%;
    text-align: center;
  }
}
</style>
