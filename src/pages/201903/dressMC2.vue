<template>
  <div>
    <SummerDress
      :link-data="link"
      :bg-data="bg"
    />
    <img
      :src="base + 'coupon2.png'"
      class="coupon"
    >
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
      bg: CDN_URL + '/fe/image/summer_dress/back.jpg',
      link: 'http://papi.xingstation.com/api/s/x1n' + window.location.search,
    }
  }
}
</script>
<style lang="less" scoped>
.coupon {
  width: 81%;
  position: absolute;
  bottom: -10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  pointer-events: auto;
  user-select: auto;
}
</style>



