<template>
  <div>
    <PeterRabbit
      ref="peterRabbit"
      :link-data="link"
    ></PeterRabbit>
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
      link: 'http://papi.xingstation.com/api/s/q73'
    }
  },
  mounted() {
    // console.log(this.$refs.peterRabbit.wxShareInfoValue)
  }
}
</script>
