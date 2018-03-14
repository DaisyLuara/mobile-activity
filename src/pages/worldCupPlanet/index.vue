<template>
  <div class="wcp-wrap" ref="wcpRoot">
  </div>
</template>

<script>
export default {
  data() {
    return {
      base: 0,
      count: 5,
      mData: [
        ['point1', 77],
        ['point2', 72],
        ['point3', 46],
        ['point4', 50],
        ['point5', 80],
        ['point6', 90]
      ]
    }
  },
  mounted() {
    $('.wcp-wrap').css('height', $(window).height())
    this.base = $(window).width()
    this.init()
  },
  methods: {
    init() {
      let canvas = document.createElement('canvas')
      let rootDiv = this.$refs['wcpRoot']
      rootDiv.appendChild(canvas)
      canvas.height = this.base
      canvas.width = this.base
      this.mCtx = canvas.getContext('2d')

      this.drawPolygon(this.mCtx)
      this.drawPoint(this.mCtx)
    },
    drawPolygon(ctx) {
      let ang = Math.PI * 2 / this.count
      let r = this.base / 2
      ctx.save()
      ctx.strokeStyle = '#38FFFD'
      ctx.lineWidth = 2
      ctx.translate(r, r)
      ctx.moveTo(0, -r)
      ctx.beginPath()
      for (let i = 0; i < this.count; i++) {
        ctx.rotate(ang)
        ctx.lineTo(0, -r)
      }
      ctx.closePath()
      // ctx.fill()
      ctx.stroke()
      ctx.restore()
    },
    drawPoint(ctx) {
      let ang = Math.PI * 2 / this.count
      let r = this.base / 2
      ctx.save()
      ctx.fillStyle = 'rgba(255,0,0,.3)'
      ctx.strokeStyle = '#38FFFD'
      ctx.lineWidth = 1
      ctx.translate(r, r)
      ctx.moveTo(0, -r)
      ctx.beginPath()
      for (let i = 0; i < this.count; i++) {
        ctx.rotate(ang)
        ctx.lineTo(0, -r * this.mData[i][1] / 100)
        let imgObj = new Image()
        imgObj.src = '/static/wcp/point.png'
        imgObj.onload = () => {
          ctx.drawImage(imgObj, 0, r * this.mData[i][1] / 100)
        }
      }
      ctx.closePath()
      // ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
