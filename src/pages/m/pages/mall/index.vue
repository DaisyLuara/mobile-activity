<template>
  <div class="mall">
    <NoListContentReminder
      :show="true"
      words="商城还没有开放哦"
    />
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
.mall {
  position: relative;
  min-height: 100vh;
}
</style>
