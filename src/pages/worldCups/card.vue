<template>
  <div
    :style="style.root" 
    class="card-root">
    <game-menu />
    <div class="root-header" />

    <div
      :style="style.mid" 
      class="root-mid">
      <!-- lighting animation -->
      <img
        :src="this.baseUrl + 'light-left.png'"
        class="mid-left"
      />

      <img 
        :src="this.baseUrl + 'light-right.png'"
        class="mid-right"
      />

      <!-- head reminder -->
      <img
        :src="this.baseUrl + 'header.png'"
        class="mid-header"
      />

      <!-- suitcase - -! -->
      <img 
        :src="this.baseUrl + 'kuang.png'" 
        class="mid-case"
      />

      <!-- your photo -->

      <!-- may the force be with you -->
      <div
        :class="{'show': this.control.powerStatus, 'hide': !this.control.powerStatus}"
        class="mid-power">
        <Spider 
          :powerData="bindData" 
          :width="style.bindWith"
          :style="style.spider"/>
        <img 
          @click="handlePowerStatusChange"
          class="power-img"
          :src="this.baseUrl + (this.control.powerStatus ? 'nav1.png' : 'nav2.png')"/>
        <img
          :src="this.baseUrl + 'power.png'" />
      </div>

    </div>
    <div class="root-bottom" />
  </div>
</template>

<script>
import GameMenu from './components/gameMenu'
import Spider from './components/spider'
export default {
  components: {
    GameMenu,
    Spider
  },
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
        spider: {
          position: 'absolute',
          left: '0',
          bottom: '0',
          top: '0',
          right: '0',
          margin: '0 auto'
        },
        bindWith: 0
      },
      bindData: [
        ['point1', 90],
        ['point2', 80],
        ['point3', 80],
        ['point4', 80],
        ['point5', 100]
      ],
      control: {
        powerStatus: false
      }
    }
  },
  created() {
    document.title = '球星卡'
    this.style.mid.height = window.innerWidth * 1124 / 690 + 'px'
    this.style.bindWith = window.innerWidth * 0.66
  },
  methods: {
    handlePowerStatusChange() {
      this.control.powerStatus = !this.control.powerStatus
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup';

.card-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  .root-mid {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-image: url('@{imgServerUrl}/bg_mid.png');
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .mid-left {
      position: absolute;
      left: 0;
      width: 5%;
    }
    .mid-right {
      width: 10%;
      position: absolute;
      right: 0;
      width: 5%;
    }
    .mid-header {
      position: absolute;
      top: -3%;
      width: 35%;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .mid-case {
      width: 90%;
    }
    .mid-power {
      position: absolute;
      width: 80%;
      min-height: 100px;
      transition: ease-in 0.2s;
      &.hide {
        bottom: -47%;
      }
      &.show {
        bottom: -11%;
      }
      .power-img {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 7%;
        margin: 0 auto;
        width: 15%;
      }
    }
  }
  .root-header {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url('@{imgServerUrl}/bg_top.png');
    background-size: cover;
    width: 100%;
  }
  .root-bottom {
    flex-grow: 1;
    flex-shrink: 1;
    background-image: url('@{imgServerUrl}/bg_bottom.png');
    background-size: cover;
    width: 100%;
  }
}
</style>
