<template>
  <div :style="style.root">
    <Chart 
      :chartdata="chartdata" 
      :data-options="dataOptions" 
      :width="width"
    />
  </div>
</template>

<script>
import Chart from './chart'
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartdata: [90291, 9078, 7461, 5463, 3258, 2434, 834],
      dataOptions: [true, true, true, true, true, true, true],
      width: this.$innerWidth() * 1 / 3,
      style: {
        root: {
          width: this.$innerWidth() + 'px'
        }
      }
    }
  }
}
</script>
