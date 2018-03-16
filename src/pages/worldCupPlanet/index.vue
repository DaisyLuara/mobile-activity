<template>
  <div class="wcp-wrap" >
    <div class="header">
      <img class="header-img" src="/static/wcp/header.png" />
      <img class="card-img" :style="cardStyle" src="/static/wcp/card.png" />
    </div>
    <div class="power">
      <img class="power-bg" :style="powerBgStyle" src="/static/wcp/power.png"/>
      <Spider :powerData="bindData" :style="spiderStyle"/>
    </div>
    <div class="footer" :style="footerStyle">
      <img class="footer-img" src="/static/wcp/footer.png"/>
    </div>
  </div>
</template>

<script>
import Spider from './components/spider'
export default {
  components: {
    Spider
  },
  data() {
    return {
      bindData: [
        ['point1', 90],
        ['point2', 80],
        ['point3', 80],
        ['point4', 80],
        ['point5', 100]
      ],
      rootStyle: {
        minHeight: window.innerHeight + 'px'
      },
      footerStyle: {
        marginTop: '-' + window.innerWidth * 0.45 + 'px'
      },
      powerBgStyle: {
        marginTop: '-' + window.innerWidth * 0.2 + 'px'
      },
      cardStyle: {
        top: window.innerWidth * 32 / 75 + 'px'
      },
      spiderStyle: {
        position: 'absolute',
        top: window.innerWidth * 0.16 + 'px',
        padding: '0 25%',
        left: '-4px'
      }
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.wcp-wrap {
  width: 100%;
  background: url('/static/wcp/bg.png') repeat;
  background-size: 40px;
  position: relative;
  .header {
    z-index: 10;
    width: 100%;
    position: relative;
    .header-img {
      width: 100%;
    }
    .card-img {
      width: 100%;
      padding: 0 8%;
      position: absolute;
    }
  }
  .power {
    position: relative;
    z-index: 11;
    width: 100%;
  }
}
</style>
