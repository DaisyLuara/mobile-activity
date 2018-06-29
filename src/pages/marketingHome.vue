<template>
  <div id="marketing" class="marketing-wrap">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'marketingHome'
}
</script>

<style lang="less">
// marketing page 的公用样式
@import '~assets/css/marketing.less';
</style>
