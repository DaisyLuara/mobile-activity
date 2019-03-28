<template>
  <div class="root">
    <SummerDress
      ref="summer"
      :link-data="link"
      :bg-data="bg"
    />
  </div>
</template>
<script>
import SummerDress from '@/pages/201903/components/summerDress'
const CDN_URL = process.env.CDN_URL;
export default {
  components: {
    SummerDress
  },
  data() {
    return {
      base: CDN_URL + '/fe/image/summer_dress/',
      bg: CDN_URL + '/fe/image/summer_dress/logo.jpg',
      link: 'http://papi.xingstation.com/api/s/zX7' + window.location.search,
    }
  },
  mounted() {
    this.$refs.summer.wxShareInfoValue.desc = '来吾悦广场，秀“舞”姿嗨翻全场！'
  }

}
</script>
<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>