<template>
  <div>
    <OldPeter
      ref="oldPeter"
      :link-data="link"
    />
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
      link: process.env.AD_API+'/api/s/q73'
    }
  },
  mounted() {
    // console.log(this.$refs.oldPeter.wxShareInfoValue)
  }
}
</script>
