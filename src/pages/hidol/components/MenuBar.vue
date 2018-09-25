<template>
  <div class="menu">
    <div class="menu-item" @click="handleRefesh">
      <img class="item-img" src="http://cdn.exe666.com/fe/hidol/img/newthings.png" />
      <div class="item-text">新鲜事</div>
    </div>
    <div class="menu-add" @click="handleNewPost">
      <img class="add-img" src="http://cdn.exe666.com/fe/hidol/img/plus.svg" />
    </div>
    <div class="menu-item">
      <img class="item-img" src="http://cdn.exe666.com/fe/hidol/img/my.png" />
      <div class="item-text">我的</div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    handleNewPost() {
      this.$emit('onNewPost')
    },
    handleRefesh() {
      this.$emit('onRefesh')
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20%;
  background: rgba(27, 26, 32, 1);
  z-index: 1000;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 48px;
  font-size: 0.14rem;
  .menu-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .item-img {
      height: 60%;
    }
    .item-text {
      color: white;
      font-size: 0.1rem;
    }
  }
  .menu-add {
    width: 0.45rem;
    height: 0.35rem;
    border-radius: 18px;
    background: white;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    .add-img {
      height: 70%;
    }
  }
}
</style>
