<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      style: {
        root: {
          height: window.innerHeight + 'px',
          width: window.innerWidth + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.suoha-root {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>
