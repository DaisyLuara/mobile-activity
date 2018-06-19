<template>
  <div
    :style="style.root"
    class="remind-root">
    <img
      class="content"
      src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/shuoming.png"
      />
  </div>
</template>

<script>
const wiw = window.innerWidth
const wih = window.innerHeight
export default {
  data() {
    return {
      style: {
        root: {
          width: 628 / 750 * wiw + 'px',
          height: 1078 / 1334 * wih + 'px',
          left: (1 - 628 / 750) / 2 * wiw + 'px',
          top: (1 - 1078 / 1334) / 2 * wih + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.remind-root {
  position: absolute;
  z-index: 9000;
  top: 0;
  left: 0;
  background-size: cover;
  background-image: url('https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/tc-bg.png');
  .bg {
    width: 100%;
  }
  .content {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    padding: 5%;
  }
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
