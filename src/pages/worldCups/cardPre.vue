<template>
  <div 
    :style="style.root" 
    class="cp-root">
    <div class="root-header" />
    <div
      :style="style.mid" 
      class="root-mid">
      <img :src="baseUrl + 'title.png'" />
    </div>
    <div class="root-bottom" />
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
          width: '100%',
          height: wih + 'px'
        },
        mid: {}
      },
      bindData: {},
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card_pr/'
    }
  },
  created() {
    document.title = '球星卡'
    this.style.mid.height = window.innerWidth * 1124 / 690 + 'px'
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup';

.cp-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url('@{imgServerUrl}/bg_top.png');
    background-size: cover;
    width: 100%;
    position: relative;
  }
  .root-bottom {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url('@{imgServerUrl}/bg_bottom.png');
    background-size: cover;
    width: 100%;
  }
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-image: url('@{imgServerUrl}/bg_mid.png');
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: #131314;
    overflow: hidden;
  }
}
</style>


