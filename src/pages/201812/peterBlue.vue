<template>
  <div>
    <OldPeter
      ref="oldPeter"
      :link-data="link"
    ></OldPeter>
  </div>
</template>
<script>
import OldPeter from '@/pages/201812/components/oldPeter'
export default {
  components: {
    OldPeter
  },
  data() {
    return {
      link: 'http://papi.xingstation.com/api/s/k8x'
    }
  },
  mounted() {
    // console.log(this.$refs.oldPeter.wxShareInfoValue)
  }
}
</script>

