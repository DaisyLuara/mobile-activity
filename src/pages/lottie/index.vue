<template>
  <div
    id="root"
    :style="style.root">

  </div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  data() {
    return {
      style: {
        root: {
          width: '100%',
          height: window.innerHeight + 'px'
        }
      }
    }
  },
  mounted() {
    const el = document.getElementById('root')
    lottie.loadAnimation({
      container: el, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/static/lottie/data.json' // the path to the animation json
    })
  }
}
</script>



