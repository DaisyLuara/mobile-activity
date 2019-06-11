<template>
  <div
    v-if="show"
    class="activity-theme-game-bottom"
    @click="naviToActivitys"
  >
    查看更多热门活动
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    naviToActivitys() {
      this.$router.push({
        name: "ActivityShop"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.activity-theme-game-bottom {
  position: fixed;
  bottom: 0;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  left: 0;
  height: 0.47rem;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  background: rgba(109, 30, 255, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 0.16rem;
  line-height: 0.47rem;
  z-index: 10000;
}
</style>
