<template>
  <div class="my">
    <NoListContentReminder :show="true" words="你还没有解锁嗨玩屏"/>
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
.my {
  position: relative;
  min-height: 100vh;
}
</style>
