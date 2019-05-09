<template>
  <div class="root">
    <img
      :src="serverUrl + String(type) + '-1.png' + this.$qiniuCompress()" 
      class="root-title"
    >
    <img 
      :src="serverUrl + String(type) + '-2.png' + this.$qiniuCompress()"
      class="root-content"
    >
  </div>
</template>

<script>
import { basicTrack } from 'services'
const serverUrl = process.env.CDN_URL
export default {
  props: {
    type: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      currentCoupon: 3,
      serverUrl: serverUrl + '/fe/marketing/hiltonc/'
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  .root-title {
    position: relative;
    width: 100%;
  }
  .root-content {
    position: relative;
    width: 100%;
  }
}
</style>
