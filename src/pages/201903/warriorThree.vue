<template>
  <div>
    <warrior :link-data="link" />
  </div>
</template>
<script>
import warrior from '@/pages/201903/components/warrior'
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    warrior
  },
  data() {
    return {
      link: window.location.href
    }
  },
  mounted() { }
}
</script>

