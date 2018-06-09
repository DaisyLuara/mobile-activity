<template>
  <div 
    id="sharecover"
    @click="handleShowClose"
    v-if="shouldShow"
    :style="style.root"
    class="share-root">
      <img 
        class="remind"
        :src="this.$parent.serverUrl + 'share-remind.png'" />
      <img 
        class="text"
        :src="this.$parent.serverUrl + 'share-text.png'" />
  </div>
</template>

<script>
export default {
  props: {
    shouldShow: Boolean
  },
  data() {
    return {
      style: {
        root: {
          height: window.innerHeight + 'px',
          width: window.innerWidth + 'px'
        }
      }
    }
  },
  methods: {
    handleShowClose() {
      this.$parent.handleCoverClose()
      document.body.style.overflow = ''
    }
  }
}
</script>

<style lang="less" scoped>
.share-root {
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
  .remind {
    z-index: 10001;
    width: 20%;
    margin-right: 5%;
  }
  .text {
    width: 60%;
    align-self: center;
  }
}
</style>

