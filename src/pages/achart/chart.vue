<template>
  <div 
    class="root"
    :style="style.root"
  >
    <div
      v-for="(item, index) in chartdata"
      :key="index"
      v-show="dataOptions[index]"
      :style="bindStyle[index]"
    >
      <span style="position: absolute; top: 0; right: 50%">test</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartdata: [90291, 9078, 7461, 5463, 3258, 2434, 834],
      dataOptions: [true, true, true, true, true, true, true],
      bindStyle: [],
      topWidth: [],
      cover: [],
      bindColors: [
        '#8FE5B8',
        '#0099FF',
        '#22B573',
        '#F8B62D',
        '#E80F9B',
        '#E83828',
        '#9E8047'
      ],
      height: 1500,
      width: this.$innerWidth(),
      hvw: 1500 / 880,
      sh: 160,
      dh: 320,
      sp: 10,
      style: {
        root: {}
      }
    }
  },
  created() {
    this.risizeCanvas()
    this.processStyle()
  },
  mounted() {
    this.recalculate()
  },
  watch: {
    dataOptions: function() {
      this.recalculate()
      this.processStyle()
    }
  },
  methods: {
    risizeCanvas() {
      this.height = this.width * this.hvw
      this.style.root = {
        height: this.height + 'px'
      }
    },
    recalculate() {
      let openNumbers = 5 + (1 + 1) * 2
      let openItems = 7
      for (let i = 0; i < this.dataOptions.length; i++) {
        if (!this.dataOptions[i]) {
          if (i >= 5) {
            openNumbers = openNumbers - 2
          } else {
            openNumbers--
          }
          openItems--
        }
      }
      let grid = openItems - 1
      let allHeight = 1500 - grid * this.sp
      this.sh = allHeight / openNumbers
      this.dh = this.sh * 2
    },
    processStyle() {
      let styleCollection = []

      for (let i = 0; i < this.bindColors.length; i++) {
        // calculate Cover widh
        if (i === 0) {
          this.cover[i] = this.width
        }

        if (i >= 1 && i < 5) {
          this.cover[i] =
            this.chartdata[i] / this.chartdata[i - 1] * this.cover[i - 1]
        }

        if (i === 5 || i === 6) {
          this.cover[i] = this.cover[i - 1]
        }

        // calculate top width
        // then set left & right border make it like a trapezoid

        // process style
        let styleObject = {
          backgroundColor: this.bindColors[i],
          width: i === 0 ? '100%' : Math.pow(0.6, i - 1) * 100 + '%',
          position: 'relative'
        }

        if (i > 4) {
          styleObject.height = this.dh / 1500 * this.height + 'px'
        } else if (i === 0) {
          styleObject.height = this.sh / 1500 * this.height + 'px'
          styleObject.borderTop =
            this.sh / 1500 * this.height + 'px solid ' + this.bindColors[i]
        } else {
          styleObject.height = this.sh / 1500 * this.height + 'px'
          styleObject.borderTop =
            this.sh / 1500 * this.height + 'px solid ' + this.bindColors[i]
          let cutWith = (this.width - this.cover[i]) / 2 * (i === 0 ? 1 : 0.6)
          styleObject.borderLeft = String(cutWith) + 'px solid white'
          styleObject.borderRight = String(cutWith) + 'px solid white'
        }
        styleCollection.push(styleObject)
      }
      this.bindStyle = styleCollection
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
