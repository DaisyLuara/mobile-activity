<template>
  <div class="pocket">
    <router-view></router-view>
  </div>
</template>

<script>
import { reCalculateRem } from "./mixins/reCalculateRem";
export default {
  mixins: [reCalculateRem]
};
</script>

<style lang="less" scoped>
.pocket {
  position: relative;
  background: rgba(243, 243, 243, 1);
  min-height: 100vh;
}
</style>
