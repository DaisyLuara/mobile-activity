<template>
  <div class="bcomment" @click="handleInputClick">
    <div class="input">
      请发表你的观点
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleInputClick() {
      this.$router.push({
        path: 'newcomment'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bcomment {
  position: fixed;
  z-index: 20000;
  width: 100%;
  height: 0.48rem;
  background: #1b1a20;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  .input {
    width: 92%;
    height: 0.3rem;
    border-radius: 0.15rem;
    background: rgba(236, 236, 236, 1);
    color: rgba(153, 153, 153, 1);
    line-height: 0.3rem;
    padding-left: 0.3rem;
    font-size: 0.12rem;
  }
}
</style>
