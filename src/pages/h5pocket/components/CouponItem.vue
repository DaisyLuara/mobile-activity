<template>
  <div class="citem">
    <img :src="imgUrl">
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: "",
      required: true
    },
    couponType: {
      type: String,
      default: "default",
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.citem {
  position: relative;
}
</style>
