<template>
  <div>
    <PeterRabbit
      ref="peterRabbit"
      :link-data="link"
    />
  </div>
</template>
<script>
import PeterRabbit from '@/pages/201812/components/peterRabbit'
export default {
  components: {
    PeterRabbit
  },
  data() {
    return {
      link: process.env.AD_API+'/api/s/36r'
    }
  },
  mounted() {
    // console.log(this.$refs.peterRabbit.wxShareInfoValue)
  }
}
</script>
