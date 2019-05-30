<template>
  <div 
    v-if="show" 
    class="spd" 
    @click.self="handleModalHide"
  >
    <div class="remind">
      请点击右上角分享
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    handleModalHide() {
      this.$emit("onHandleShareModalHide");
    }
  }
};
</script>

<style lang="less" scoped>
.spd {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  .remind {
    position: absolute;
    z-index: 10001;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.18rem;
    color: white;
  }
}
</style>
