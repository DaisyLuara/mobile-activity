<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>


<style lang="less">
  // reset 浏览器样式
  @import 'assets/css/reset.css';
  // normalize 浏览器样式
  @import 'assets/css/normalize.css';
</style>
