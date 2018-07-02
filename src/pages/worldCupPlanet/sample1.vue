<template>
  <div class="wcp-wrap" ref="wcpRoot">
    
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      mH: 400,
      mW: 400,
      mData: [
        ['point1', 77],
        ['point2', 72],
        ['point3', 46],
        ['point4', 50],
        ['point5', 80],
        ['point6', 90]
      ],
      mCount: 6,
      mCenter: 200,
      mRadius: 100,
      mAngle: Math.PI * 2 / 6,
      mCtx: null,
      mColorPolygon: '#B8B8B8',
      mColorLines: '#B8B8B8',
      mColorText: '#000000'
    }
  },
  mounted() {
    $('.wcp-wrap').css('height', $(window).height())
    this.init()
  },
  methods: {
    init() {
      let canvas = document.createElement('canvas')
      let rootDiv = this.$refs['wcpRoot']
      rootDiv.appendChild(canvas)
      canvas.height = this.mH
      canvas.width = this.mW
      this.mCtx = canvas.getContext('2d')

      this.drawPolygon(this.mCtx)
      this.drawLines(this.mCtx)
      this.drawText(this.mCtx)
      this.drawRegion(this.mCtx)
      this.drawCircle(this.mCtx)
    },
    drawPolygon(ctx) {
      ctx.save()

      ctx.strokeStyle = this.mColorPolygon
      let r = this.mRadius / this.mCount
      for (let i = 0; i < this.mCount; i++) {
        ctx.beginPath()
        let currR = r * (i + 1)
        for (let j = 0; j < this.mCount; j++) {
          let x = this.mCenter + currR * Math.cos(this.mAngle * j)
          let y = this.mCenter + currR * Math.sin(this.mAngle * j)

          ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }
      ctx.restore()
    },
    drawLines(ctx) {
      ctx.save()

      ctx.beginPath()
      ctx.strokeStyle = this.mColorLines

      for (let i = 0; i < this.mCount; i++) {
        let x = this.mCenter + this.mRadius * Math.cos(this.mAngle * i)
        let y = this.mCenter + this.mRadius * Math.sin(this.mAngle * i)
        ctx.moveTo(this.mCenter, this.mCenter)
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()
    },
    drawText(ctx) {
      ctx.save()

      let fontSize = this.mCenter / 12
      ctx.font = fontSize + 'px'
      ctx.fillStyle = this.mColorText

      for (let i = 0; i < this.mCount; i++) {
        let x = this.mCenter + this.mRadius * Math.cos(this.mAngle * i)
        let y = this.mCenter + this.mRadius * Math.sin(this.mAngle * i)

        if (this.mAngle * i >= 0 && this.mAngle * i <= Math.PI / 2) {
          ctx.fillText(this.mData[i][0], x, y + fontSize)
        } else if (
          this.mAngle * i > Math.PI / 2 &&
          this.mAngle * i <= Math.PI
        ) {
          ctx.fillText(
            this.mData[i][0],
            x - ctx.measureText(this.mData[i][0]).width,
            y + fontSize
          )
        } else if (
          this.mAngle * i > Math.PI &&
          this.mAngle * i <= Math.PI * 3 / 2
        ) {
          ctx.fillText(
            this.mData[i][0],
            x - ctx.measureText(this.mData[i][0]).width,
            y
          )
        } else {
          ctx.fillText(this.mData[i][0], x, y)
        }
      }

      ctx.restore()
    },
    drawRegion(ctx) {
      ctx.save()

      ctx.beginPath()
      for (let i = 0; i < this.mCount; i++) {
        let x =
          this.mCenter +
          this.mRadius * Math.cos(this.mAngle * i) * this.mData[i][1] / 100
        let y =
          this.mCenter +
          this.mRadius * Math.sin(this.mAngle * i) * this.mData[i][1] / 100
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.fill()
      ctx.restore()
    },
    drawCircle(ctx) {
      ctx.save()

      let r = this.mCenter / 18
      for (let i = 0; i < this.mCount; i++) {
        let x =
          this.mCenter +
          this.mRadius * Math.cos(this.mAngle * i) * this.mData[i][1] / 100
        let y =
          this.mCenter +
          this.mRadius * Math.sin(this.mAngle * i) * this.mData[i][1] / 100

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'
        ctx.fill()
      }

      ctx.restore()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
