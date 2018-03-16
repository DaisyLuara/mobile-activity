<template>
  <div class="spider-wrap" ref="wcpRoot">
    <div :style="topSpace">
      <div 
        :style="numberStyle" 
        v-for="(item, index) in powerData[0][1].toString().split('')" 
        :key="index">
        <img :src="'/static/wcp/' + item + '.png'" />
      </div>
    </div>

    <div :style="leftSpace">
      <div 
        :style="numberStyle" 
        v-for="(item, index) in powerData[4][1].toString().split('')" 
        :key="index">
        <img :src="'/static/wcp/' + item + '.png'" />
      </div>
    </div>

    <div :style="rightSpace">
      <div 
        :style="numberStyle" 
        v-for="(item, index) in powerData[1][1].toString().split('')" 
        :key="index">
        <img :src="'/static/wcp/' + item + '.png'" />
      </div>
    </div>

    <div :style="rightBottomSpace">
      <div 
        :style="numberStyle" 
        v-for="(item, index) in powerData[2][1].toString().split('')" 
        :key="index">
        <img :src="'/static/wcp/' + item + '.png'" />
      </div>
    </div>

    <div :style="leftBottomSpace">
      <div 
        :style="numberStyle" 
        v-for="(item, index) in powerData[3][1].toString().split('')" 
        :key="index">
        <img :src="'/static/wcp/' + item + '.png'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    powerData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      base: 0,
      count: 5,
      x0: 0,
      x1: 0,
      x2: 0,
      x3: 0,
      x4: 0,
      y1: 0,
      y2: 0,
      y3: 0,
      y4: 0,
      numberStyle: {
        display: 'inline-block',
        width: window.innerWidth * 0.05 + 'px',
        margin: '-' + window.innerWidth * 0.008 + 'px'
      },
      topSpace: {
        position: 'absolute',
        top: '-' + window.innerWidth * 0.06 + 'px',
        right: window.innerWidth * 0.47 + 'px'
      },
      leftSpace: {
        position: 'absolute',
        top: window.innerWidth * 0.19 + 'px',
        right: window.innerWidth * 0.79 + 'px'
      },
      rightSpace: {
        position: 'absolute',
        top: window.innerWidth * 0.19 + 'px',
        right: window.innerWidth * 0.14 + 'px'
      },
      rightBottomSpace: {
        position: 'absolute',
        bottom: '-' + window.innerWidth * 0.17 + 'px',
        right: window.innerWidth * 0.28 + 'px'
      },
      leftBottomSpace: {
        position: 'absolute',
        bottom: '-' + window.innerWidth * 0.17 + 'px',
        right: window.innerWidth * 0.665 + 'px'
      }
    }
  },
  mounted() {
    this.base = $(window).width() * 0.5
    this.init()
  },
  methods: {
    init() {
      let canvas = document.createElement('canvas')
      let rootDiv = this.$refs['wcpRoot']
      rootDiv.appendChild(canvas)
      canvas.height = this.base
      canvas.width = this.base + 8
      this.mCtx = canvas.getContext('2d')

      this.drawPolygon(this.mCtx)
      this.drawInner(this.mCtx)
      this.drawLines(this.mCtx)
      this.drawPoint(this.mCtx)
    },
    gdg(v) {
      return 2 * Math.PI / 360 * v
    },
    drawPolygon(ctx) {
      ctx.save()
      ctx.translate(4, 4)
      ctx.strokeStyle = '#37F8F8'
      ctx.lineWidth = '4'
      let w = this.base
      this.x0 = w / 2
      this.y0 = 0
      this.x1 = w
      this.y1 = w * Math.tan(this.gdg(36)) / 2
      this.x2 = w / 2 + w / 4 / Math.cos(this.gdg(36))
      this.y2 = w / 4 / (Math.cos(this.gdg(36)) * Math.tan(this.gdg(18)))
      this.x3 = w / 2 - w / 4 / Math.cos(this.gdg(36))
      this.y3 = w / 4 / (Math.cos(this.gdg(36)) * Math.tan(this.gdg(18)))
      this.x4 = 0
      this.y4 = w * Math.tan(this.gdg(36)) / 2

      ctx.beginPath()
      ctx.lineTo(this.x0, this.y0)
      ctx.lineTo(this.x1, this.y1)
      ctx.lineTo(this.x2, this.y2)
      ctx.lineTo(this.x3, this.y3)
      ctx.lineTo(this.x4, this.y4)
      ctx.closePath()
      ctx.stroke()
    },
    drawInner(ctx) {
      ctx.save()
      ctx.strokeStyle = '#37F8F8'
      ctx.lineWidth = '2'
      let w = this.base,
        ox = w / 2,
        oy = w / 2 * (1 / Math.tan(this.gdg(54)) + 1 / Math.tan(this.gdg(72)))
      for (let i = 1; i < 5; i++) {
        let px0 = (this.x0 - ox) * 0.2 * i + ox,
          py0 = (this.y0 - oy) * 0.2 * i + oy,
          px1 = (this.x1 - ox) * 0.2 * i + ox,
          py1 = (this.y1 - oy) * 0.2 * i + oy,
          px2 = (this.x2 - ox) * 0.2 * i + ox,
          py2 = (this.y2 - oy) * 0.2 * i + oy,
          px3 = (this.x3 - ox) * 0.2 * i + ox,
          py3 = (this.y3 - oy) * 0.2 * i + oy,
          px4 = (this.x4 - ox) * 0.2 * i + ox,
          py4 = (this.y4 - oy) * 0.2 * i + oy
        ctx.beginPath()
        ctx.lineTo(px0, py0)
        ctx.lineTo(px1, py1)
        ctx.lineTo(px2, py2)
        ctx.lineTo(px3, py3)
        ctx.lineTo(px4, py4)

        ctx.closePath()
        ctx.stroke()
        ctx.save()
      }
    },
    drawLines(ctx) {
      ctx.save()
      ctx.strokeStyle = '#37F8F8'
      ctx.lineWidth = '3'
      let w = this.base,
        ox = w / 2,
        oy = w / 2 * (1 / Math.tan(this.gdg(54)) + 1 / Math.tan(this.gdg(72))),
        px0 = this.x0 - ox + ox,
        py0 = this.y0 - oy + oy,
        px1 = this.x1 - ox + ox,
        py1 = this.y1 - oy + oy,
        px2 = this.x2 - ox + ox,
        py2 = this.y2 - oy + oy,
        px3 = this.x3 - ox + ox,
        py3 = this.y3 - oy + oy,
        px4 = this.x4 - ox + ox,
        py4 = this.y4 - oy + oy

      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(px0, py0)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(px1, py1)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(px2, py2)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(px3, py3)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(px4, py4)
      ctx.closePath()
      ctx.stroke()
    },
    drawPoint(ctx) {
      ctx.save()
      let w = this.base
      let ox = w / 2,
        oy = w / 2 * (1 / Math.tan(this.gdg(54)) + 1 / Math.tan(this.gdg(72))),
        px0 = (this.x0 - ox) * this.powerData[0][1] / 100 + ox,
        py0 = (this.y0 - oy) * this.powerData[0][1] / 100 + oy,
        px1 = (this.x1 - ox) * this.powerData[1][1] / 100 + ox,
        py1 = (this.y1 - oy) * this.powerData[1][1] / 100 + oy,
        px2 = (this.x2 - ox) * this.powerData[2][1] / 100 + ox,
        py2 = (this.y2 - oy) * this.powerData[2][1] / 100 + oy,
        px3 = (this.x3 - ox) * this.powerData[3][1] / 100 + ox,
        py3 = (this.y3 - oy) * this.powerData[3][1] / 100 + oy,
        px4 = (this.x4 - ox) * this.powerData[4][1] / 100 + ox,
        py4 = (this.y4 - oy) * this.powerData[4][1] / 100 + oy

      ctx.beginPath()
      ctx.lineTo(px0, py0)
      ctx.lineTo(px1, py1)
      ctx.lineTo(px2, py2)
      ctx.lineTo(px3, py3)
      ctx.lineTo(px4, py4)

      ctx.closePath()
      ctx.fillStyle = 'rgba(70,255,51,.6)'
      ctx.fill()
      ctx.stroke()
      ctx.restore()
      ctx.save()
      let point = new Image()
      point.src = '/static/wcp/point.png'
      point.onload = function() {
        ctx.drawImage(point, px0 - 10, py0 - 10, 20, 20)
        ctx.drawImage(point, px1 - 10, py1 - 10, 20, 20)
        ctx.drawImage(point, px2 - 10, py2 - 10, 20, 20)
        ctx.drawImage(point, px3 - 10, py3 - 10, 20, 20)
        ctx.drawImage(point, px4 - 10, py4 - 10, 20, 20)
      }
      ctx.restore()
    }
  }
}
</script>

<style lang="less" scoped>
.spider-wrap {
  padding: 10px;
  position: relative;
}
</style>
