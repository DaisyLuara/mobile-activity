<template>
  <div class="root">
    <img
      class="root-title" 
      :src="serverUrl + String(currentCoupon) + '-1.png' + this.qiniuCompress()" />
    <img 
      class="root-content"
      :src="serverUrl + String(currentCoupon) + '-2.png' + this.qiniuCompress()" />
  </div>
</template>

<script>
import { basicTrack } from 'services'
const serverUrl = process.env.CDN_URL
export default {
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
