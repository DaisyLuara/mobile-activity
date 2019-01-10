<template>
  <div>
<<<<<<< HEAD
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
=======
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
>>>>>>> develop
  },
  data() {
    return {
      link: 'http://papi.xingstation.com/api/s/k8x'
    }
  },
  mounted() {
<<<<<<< HEAD
    // console.log(this.$refs.oldPeter.wxShareInfoValue)
  }
}
</script>

=======
    // console.log(this.$refs.peterRabbit.wxShareInfoValue)
  }
}
</script>
>>>>>>> develop
