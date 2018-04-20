<template>
  <div
    :style="style.root"
    class="hj-root">
    <!-- top img -->
    <img 
      class="root-topimg"
      :src="this.baseUrl + 'bg1.png'" />
    <!-- mid photo -->
    <div
      :style="style.photoOuter" 
      class="root-photo">
      <img 
        :style="style.logo"
        :src="this.baseUrl + 'logo.png'" />
      <img
        :style="style.remind"
        :src="this.baseUrl + 'remind.png'" />

    </div>
    <!-- power -->
    <div
      :style="style.power" 
      class="root-power">
      <div
        :style="style.powerItem" 
        class="power-item">

      </div>
      <div
        :style="style.powerItem" 
        class="power-item">

      </div>

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
          backgroundSize: wiw + 'px ' + '100px'
        },
        power: {
          width: wiw + 'px',
          height: 0.36 * wiw + 'px'
        },
        powerItem: {
          width: 0.36 * wiw + 'px',
          height: 0.36 * wiw + 'px'
        },
        photoOuter: {
          width: 55 / 75 * wiw + 'px',
          height: 970 / 566 * 55 / 75 * wiw + 'px',
          position: 'relative'
        },
        logo: {
          position: 'absolute',
          width: 0.506 * wiw + 'px',
          top: -(0.506 * wiw * 220 / 410 / 2) + 'px',
          left: (55 / 75 * wiw - 0.506 * wiw) / 2 + 'px'
        },
        remind: {
          position: 'absolute',
          width: 126 / 750 * wiw + 'px',
          left: (55 / 75 * wiw - 126 / 750 * wiw) / 2 + 'px',
          bottom: -(126 / 750 * wiw * 169 / 133 / 2) + 'px'
        }
      },
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/heijiu/',
      control: {}
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
  position: relative;
  z-index: 1;
  .root-topimg {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  .root-photo {
    z-index: 3;
    border: solid 3px #325f32;
    background-color: white;
  }
  .root-power {
    z-index: 4;
    position: absolute;
    bottom: 2%;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
