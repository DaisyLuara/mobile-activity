<template>
  <div class="root">
     <img
      class="bg"
      :src="IMAGE_URL + 'bg.png'" />
  </div>  
</template>

<script>
export default {
  data() {
    return {
      IMAGE_URL:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pjfd/'
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  overflow: hidden;
  .bg {
    height: 100%;
    position: relative;
  }
}
</style>
