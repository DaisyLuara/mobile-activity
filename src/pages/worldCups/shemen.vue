<template>
  <div 
    :style="style.root"
    class="root-sm">
    <div class="root-header" />
    <div 
      :style="style.mid"
      class="root-mid">
      <img
        class="mid-mj"
        :style="style.mj"
        :src="this.baseUrl + 'sm-mj.png'" />
      <img
        class="mid-tl"
        :style="style.tl"
        :src="this.baseUrl + 'sm-tl.png'" />
        <img
        class="mid-card"
        :style="style.card"
        :src="this.baseUrl + 'sm-card.png'" />
      
    </div>
    <div class="root-footer" />
  </div>
</template>

<script>
export default {
  created() {
    document.title = '吹气射门'
    this.style.mid.height = window.innerWidth * 1334 / 750 + 'px'
  },
  mounted() {},
  data() {
    return {
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/',
      style: {
        root: {
          minHeight: window.innerHeight + 'px',
          maxHeight: window.innerHeight + 'px'
        },
        mid: {},
        mj: {
          width: window.innerWidth * 200 / 750 + 'px'
        },
        tl: {
          width: window.innerWidth * 200 / 750 + 'px'
        },
        card: {
          width: window.innerWidth * 0.6 + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup';

.root-sm {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    background-image: url('@{imgServerUrl}/sm-bg.png');
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .mid-mj {
      position: absolute;
      bottom: 21.8%;
      left: 7%;
    }
    .mid-tl {
      position: absolute;
      bottom: 21.8%;
      right: 7%;
    }
    .mid-card {
      position: absolute;
      bottom: -22%;
    }
  }
  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    background-color: black;
  }
  .root-footer {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    background-color: black;
  }
}
</style>
