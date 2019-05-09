<template>
  <div class="pocket">
    <router-view v-if="wechat === true" />
    <div 
      v-else 
      class="remind"
    >
      请在微信中打开
    </div>
  </div>
</template>

<script>
import { isInWechat } from "services";
import { reCalculateRem } from "./mixins/reCalculateRem";
export default {
  mixins: [reCalculateRem],
  data() {
    return {
      wechat: true
    };
  },
  mounted() {
    if (isInWechat() === true) {
      this.wechat = true;
    }
  }
};
</script>

<style lang="less" scoped>
.pocket {
  position: relative;
  background: rgba(243, 243, 243, 1);
  min-height: 100vh;
  .remind {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
</style>
