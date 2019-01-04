<template>
  <div class="mall">
    <NoListContentReminder 
      :show="true" 
      words="商城还没有开放哦"/>
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
.mall {
  position: relative;
  min-height: 100vh;
}
</style>
