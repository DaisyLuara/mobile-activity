<template>
  <div 
    v-if="show" 
    class="nct"
  >
    <div class="word">
      <img 
        class="bg" 
        src="https://cdn.xingstation.cn/fe/image/m/xo-remind-text.svg"
      >
      <span class="text">{{ words }}</span>
    </div>
    <img 
      class="img" 
      src="https://cdn.xingstation.cn/fe/image/m/xo-no-content.png"
    >
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: String,
      default: "",
      required: true
    },
    show: {
      type: Boolean,
      default: false,
      require: true
    }
  }
};
</script>

<style lang="less" scoped>
.nct {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 3.75rem;
  height: 3.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  .word {
    width: 1.875rem;
    height: 0.51rem;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    font-size: 0.12rem;
    position: relative;
    z-index: 20;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 30;
    }
    .text {
      z-index: 50;
    }
  }
  .img {
    width: 3.75rem;
  }
}
</style>
