<template>
  <div 
    :style="style.root"
    class="root-sm">

    <!-- photo press to save -->
    <img src="" class="root-real-photo" />

    <div class="root-head-img">

      <img :src="this.baseUrl + 'sm-header.png'" />


      <div 
        :style="style.headScore"
        class="head-score">
        <div v-for="(item, index) in score.toString()" :key="index" >
          <img :src="baseUrl + 'df/' + item + '.png'" />
        </div>
      </div>

      <div
        :style="style.headPlayer" 
        class="head-player">
        <div
          v-for="(item, index) in player.toString()" :key="index">
          <img
            :src="baseUrl + 'df/' + item + '.png'" />
        </div>
      </div>

      <div class="head-l">
        <img
          :style="style.leftArrow" 
          :src="this.baseUrl + 'sm-l-1.png'" />
      </div>

      <div class="head-r">
        <img
          :style="style.rightArrow" 
          :src="this.baseUrl + 'rm-r-1.png'" />
      </div>
    </div>

    <div class="root-header" />

    <div 
      :style="style.mid"
      class="root-mid">

      <!-- cover photo -->
      <img src="" />

      <div class="mid-l-s">
      </div>


      <div class="mid-r-s">
      </div>


      <div 
        class="mid-mj"
        :style="style.mj">
        <img
          style="position: absolute; z-index: 20"
          :src="this.baseUrl + 'sm-mj.png'" />

        <canvas 
          style="width: 100%; z-index: 20; position: absolute"
          id="canvas-left" />

        <canvas
          style="width: 100%; z-index: 30; position: absolute"
          id="canvas-left-min" />
          
        <div
          :style="style.mj1">
          <span
          style="display:inline-block"
          v-for="(item, index) in this.mj.toString()"
          :key="index">
            <img 
            :src="baseUrl + 'mt/' + item + '.png'" />
          </span>
        </div>
      </div>

      <div
        class="mid-tl"
        :style="style.tl">
        <img
          style="position: absolute; z-index: 20" 
          :src="this.baseUrl + 'sm-tl.png'" />

        <canvas 
          style="width: 100%; z-index: 20; position: absolute"
          id="canvas-right" />

        <canvas
          style="width: 100%; z-index: 30; position: absolute"
          id="canvas-right-min" />
        <div
          :style="style.tl1">
          <span
          style="display:inline-block"
          v-for="(item, index) in this.tl.toString()"
          :key="index">
            <img 
            :src="baseUrl + 'mt/' + item + '.png'" />
          </span>
        </div>

      </div>


      <img
        class="mid-card"
        :style="style.card"
        :src="this.baseUrl + 'sm-card.png'" />

      <img
        class="mid-card-text"
        :style="style.cardText"
        :src="this.baseUrl + 'word-1.png'" />
      
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
  mounted() {
    this.handleDrawCircleLeftBase()
    this.handleDrawCircleLeftMin()
    this.handleDrawCircleRightBase()
    this.handleDrawCircleRightMin()
  },
  methods: {
    processStartAngle(score) {
      return (score - 50) * 3 / 2 * Math.PI
    },
    processEndAngle(score) {},
    drawCircle(circleObj) {
      let ctx = circleObj.ctx
      ctx.beginPath()
      ctx.arc(
        circleObj.x,
        circleObj.y,
        circleObj.radius,
        circleObj.startAngle,
        circleObj.endAngle,
        true
      )
      //设定曲线粗细度
      ctx.lineWidth = circleObj.lineWidth
      //给曲线着色
      ctx.strokeStyle = circleObj.color
      //连接处样式
      // ctx.lineCap = 'round'
      //给环着色
      ctx.stroke()
      ctx.closePath()
    },
    handleDrawCircleLeftBase() {
      let canvasLeft = document.getElementById('canvas-left')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 50 * canvasLeft.width / 100,
        y: 48 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle =
        -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.mjadd / 100
      circleObj.endAngle = Math.PI * 2 * 0.5 - Math.PI * 1 / 4
      circleObj.color = '#e24464'
      this.drawCircle(circleObj)
    },
    handleDrawCircleLeftMin() {
      let canvasLeft = document.getElementById('canvas-left-min')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 50 * canvasLeft.width / 100,
        y: 48 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle = -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.mj / 100
      circleObj.endAngle = Math.PI * 3 / 4
      circleObj.color = '#22B5E7'
      this.drawCircle(circleObj)
    },
    handleDrawCircleRightBase() {
      let canvasLeft = document.getElementById('canvas-right')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 52.5 * canvasLeft.width / 100,
        y: 49 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle =
        -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.tladd / 100

      circleObj.endAngle = Math.PI * 3 / 4
      circleObj.color = '#e24464'
      this.drawCircle(circleObj)
    },
    handleDrawCircleRightMin() {
      let canvasLeft = document.getElementById('canvas-right-min')
      canvasLeft.width = window.innerWidth * 200 / 750
      canvasLeft.height = window.innerWidth * 200 / 750
      canvasLeft.zIndex = 30
      let clCtx = canvasLeft.getContext('2d')
      clCtx.globalCompositeOperation = 'destination-over'

      let circleObj = {
        ctx: clCtx,
        x: 52.5 * canvasLeft.width / 100,
        y: 49 * canvasLeft.width / 100,
        radius: 22 * canvasLeft.width / 100,
        lineWidth: 10 * canvasLeft.width / 100
      }
      circleObj.startAngle = -Math.PI * 5 / 4 + Math.PI * 3 / 2 * this.tl / 100

      circleObj.endAngle = Math.PI * 3 / 4
      circleObj.color = '#22B5E7'
      this.drawCircle(circleObj)
    }
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
        mj: {
          width: window.innerWidth * 200 / 750 + 'px'
        },
        tl: {
          width: window.innerWidth * 200 / 750 + 'px'
        },
        card: {
          width: window.innerWidth * 0.6 + 'px'
        },
        cardText: {
          width: window.innerWidth * 0.6 + 'px',
          zIndex: '40'
        },
        leftArrow: {
          position: 'absolute',
          top: window.innerWidth * 15 / 750 + 'px',
          left: window.innerWidth * 20 / 750 + 'px',
          width: window.innerWidth * 100 / 750 + 'px'
        },
        rightArrow: {
          position: 'absolute',
          top: window.innerWidth * 15 / 750 + 'px',
          right: window.innerWidth * 20 / 750 + 'px',
          width: window.innerWidth * 100 / 750 + 'px'
        },
        headScore: {
          position: 'absolute',
          top: window.innerWidth * 10 / 750 + 'px',
          right: window.innerWidth * 260 / 750 + 'px',
          width: '30px',
          display: 'flex',
          zIndex: '30'
        },
        headPlayer: {
          position: 'absolute',
          top: window.innerWidth * 50 / 750 + 'px',
          right: window.innerWidth * 340 / 750 + 'px',
          width: '30px',
          display: 'flex',
          zIndex: '30'
        },
        mj1: {
          position: 'absolute',
          top: window.innerWidth * 75 / 750 + 'px',
          left: window.innerWidth * 85 / 750 + 'px',
          width: window.innerWidth * 30 / 750 + 'px',
          zIndex: '30',
          display: 'flex'
        },
        mj2: {
          position: 'absolute',
          top: window.innerWidth * 80 / 750 + 'px',
          left: window.innerWidth * 100 / 750 + 'px',
          width: window.innerWidth * 20 / 750 + 'px',
          zIndex: '30'
        },
        tl1: {
          position: 'absolute',
          top: window.innerWidth * 75 / 750 + 'px',
          left: window.innerWidth * 90 / 750 + 'px',
          width: window.innerWidth * 30 / 750 + 'px',
          zIndex: '30',
          display: 'flex'
        }
      },
      score: 100,
      player: 1888,
      mj: 30,
      tl: 30,
      mjadd: 34,
      tladd: 45
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
  position: relative;
  .root-real-photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
  }
  .root-head-img {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
  }
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
    .mid-l-s {
      position: absolute;
      bottom: 0;
      width: 100px;
      height: 100px;
      z-index: 20;
      .circle {
        stroke: rgb(53, 157, 218);
        stroke-width: 5;
        fill: none;
      }
    }
    .mid-mj {
      position: absolute;
      bottom: 37.2%;
      left: 7%;
    }
    .mid-tl {
      position: absolute;
      bottom: 37.2%;
      right: 7%;
    }
    .mid-card {
      position: absolute;
      bottom: -22%;
    }
    .mid-card-text {
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
