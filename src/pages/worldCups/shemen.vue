<template>
  <div class="root-sm">

  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.root-sm {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
  }
  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
  }
  .root-footer {
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
