<template>
  <div
    class="publish" 
    @click="handlePublish">
    发布
  </div>
</template>

<script>
export default {
  methods: {
    handlePublish() {
      this.$emit('onHandlePublish')
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  width: 100%;
  height: 48px;
  background: #1b1a20;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 5px;
  line-height: 48px;
  font-size: 0.18rem;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  font-weight: 300;
}
</style>
