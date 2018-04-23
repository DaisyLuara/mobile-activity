<template>
  <div
    :style="style.root" 
    class="card-root">
      <div 
        v-if="control.currentMenu === 0"
        :style="style.pic">
      <img
        class="root-pic-inner"
        style="height: 100%;"
        :src="this.baseUrl + 'header.png'"
      />
     </div>
     <div
        :style="style.power"
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
          style="width: 100%"
          :src="this.baseUrl + 'power.png'" />
      </div>
 
    <game-menu />
    <div class="root-header" >

    </div>

    <div
      v-if="control.currentMenu === 0"
      :style="style.mid" 
      class="root-mid">

      <img
        :src="this.baseUrl + 'light-left.png'"
        class="mid-left"
      />

      <img 
        :src="this.baseUrl + 'light-right.png'"
        class="mid-right"
      />

     <img
        :src="this.baseUrl + 'scan.png'"
        class="mid-scan"
      />

      <img 
        :src="this.baseUrl + 'kuang.png'" 
        class="mid-case"
      />

    </div>

    <div
      v-if="control.currentMenu === 1"
      :style="style.mid" 
      class="root-mid">
      <img 
        style="width: 80%"
        :src="baseUrl + 'card/rule.png'" />
    </div>

    <div
      v-if="control.currentMenu === 2"
      :style="style.mid" 
      class="root-mid">
      <img 
        style="width: 80%"
        :src="baseUrl + 'card/next.png'" />
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
        pic: {
          position: 'absolute',
          zIndex: 10,
          left: '0',
          bottom: '0',
          top: '0',
          right: '0',
          margin: '0 auto',
          width: '100%',
          height: '10%'
        },
        power: {
          top: '0px'
        },
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
        powerStatus: false,
        currentMenu: 2
      }
    }
  },
  created() {
    document.title = '球星卡'
    this.style.mid.height = window.innerWidth * 1124 / 690 + 'px'
    this.style.bindWith = window.innerWidth * 0.65
    this.style.power.top =
      window.innerHeight - window.innerWidth * 0.8 * 0.2 + 'px'
    if ((window.innerHeight - window.innerWidth * 1124 / 690) / 2 > 0) {
      this.style.pic.top =
        (window.innerHeight - window.innerWidth * 1124 / 690) / 2 + 'px'
    }
  },
  methods: {
    handlePowerStatusChange() {
      if (this.control.powerStatus) {
        this.style.power.top =
          window.innerHeight - window.innerWidth * 0.8 * 0.2 + 'px'
      } else {
        this.style.power.top =
          window.innerHeight - window.innerWidth * 0.8 + 'px'
      }
      this.control.powerStatus = !this.control.powerStatus
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup';
@keyframes flash {
  from {
    top: -20%;
  }

  to {
    top: 120%;
  }
}
@keyframes scanFlash {
  from {
    top: -40%;
  }
  to {
    top: 120%;
  }
}
.card-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  .root-pic-inner {
    position: absolute;
    top: 1%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: auto;
  }
  .mid-power {
    position: absolute;
    width: 80%;
    left: 10%;
    min-height: 100px;
    transition: ease-in 0.2s;
    z-index: 10;
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
    background-color: #131314;
    .mid-left {
      position: absolute;
      left: 0;
      width: 5%;
      animation: flash infinite 1s;
      animation-timing-function: linear;
    }
    .mid-right {
      width: 10%;
      position: absolute;
      right: 0;
      width: 5%;
      animation: flash infinite 1s;
      animation-timing-function: linear;
    }

    .mid-scan {
      position: absolute;
      top: -40%;
      width: 69%;
      animation: 5s scanFlash forwards;
      animation-timing-function: linear;
      z-index: -1;
      animation-delay: 1s;
    }

    .mid-case {
      width: 90%;
    }
  }
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
}
</style>
