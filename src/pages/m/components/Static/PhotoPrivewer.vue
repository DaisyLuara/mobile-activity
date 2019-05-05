<template>
  <div 
    v-if="show" 
    class="ptp"
  >
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
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.ptp {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    z-index: 100001;
  }
}
</style>
