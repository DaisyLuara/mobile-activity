<template>
  <div class="wallet">
    <NoListContentReminder :show="true" words="你还没有卡券"/>
    <BottomBar/>
  </div>
</template>

<script>
import BottomBar from "@/pages/m/components/Static/BottomBar";
import NoListContentReminder from "@/pages/m/components/Reminder/NoListContentReminder";

export default {
  components: {
    BottomBar,
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
