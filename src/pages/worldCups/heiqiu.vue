<template>
  <div
    :style="style.root"
    class="hj-root">
    <img 
      class="root-topimg"
      :src="this.baseUrl + 'bg1.png'" />
    <div class="root-photo">
    </div>
    <div class="root-power">
      
    </div>
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
          height: window.innerHeight + 'px',
          backgroundSize: window.innerWidth + 'px ' + '100px'
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
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .root-topimg {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .root-power {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
