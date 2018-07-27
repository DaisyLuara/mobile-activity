<template>
  <div
    :style="style.root" 
    class="root"
  >
    <img 
      :src="IMAGE_URL + 'bg.png'" 
      class="bg"
    >
    <img
      :src="IMAGE_URL + 'header.png'" 
      class="header"
    >
    <div class="coupon">
      <img 
        :src="IMAGE_URL + '1.png'"
        class="coupon-inner"
      >
      <img  
        :src="IMAGE_URL + 'remind.png'" 
        class="tip"
      >
    </div>
    <img 
      :src="IMAGE_URL + '1.png'" 
      class="real"
    >
  </div> 
</template>

<script>
const wih = window.innerHeight
export default {
  data() {
    return {
      IMAGE_URL:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/circletalent/',
      style: {
        root: {
          height: wih + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  z-index: 1;
  .bg {
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .header {
    position: absolute;
    top: 0;
    z-index: 11;
    width: 100%;
  }
  .coupon {
    width: 90%;
    position: absolute;
    left: 5%;
    z-index: 11;
    top: 23%;
    .coupon-inner {
      width: 100%;
    }
    .tip {
      position: absolute;
      top: 87%;
      z-index: 12;
      width: 50%;
      left: 25%;
    }
  }
  .real {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    opacity: 0;
  }
}
</style>
