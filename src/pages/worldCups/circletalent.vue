<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      class="bg"
      :src="IMAGE_URL + 'bg.png'" />
    
    <img
      class="header"
      :src="IMAGE_URL + 'header.png'" />

    <div
      class="coupon"
      >
      <img 
        class="coupon-inner"
        :src="IMAGE_URL + '1.png'" />
      <img  
        class="tip"
        :src="IMAGE_URL + 'remind.png'" />
    </div>
    

    

    <img 
      class="real"
      :src="IMAGE_URL + '1.png'" />
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
