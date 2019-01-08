<template>
  <div class="star-animation"></div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.star-animation {
  position: relative;
}
</style>
