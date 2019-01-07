<template>
  <div class="wallet">
    <NoListContentReminder :show="true" words="你还没有卡券"/>
  </div>
</template>

<script>
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder";

export default {
  components: {
    NoListContentReminder
  }
};
</script>

<style lang="less" scoped>
.wallet {
  position: relative;
  min-height: 100vh;
}
</style>
