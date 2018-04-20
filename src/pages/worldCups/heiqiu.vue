<template>
  <div
    :style="style.root"
    class="hj-root">
    <img 
      class="root-topimg"
      :src="this.baseUrl + 'bg1.png'" />
  </div>
</template>

<script>
const wiw = window.innerWidth
export default {
  data() {
    return {
      style: {
        root: {
          width: wiw + 'px',
          height: window.innerHeight + 'px'
        }
      },
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/'
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/';
.hj-root {
  background-image: url('@{imgServerUrl}bg2.png');
  background-size: 745px 100px;
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  align-items: center;
  .root-topimg {
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
