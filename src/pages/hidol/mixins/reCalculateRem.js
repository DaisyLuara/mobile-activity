export const reCalculateRem = {
  data() {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(() => {
          that.calculateRem()
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      this.calculateRem()
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    calculateRem() {
      let html = document.getElementsByTagName('html')[0]
      let fontSize = (this.screenWidth / 375) * 100
      html.setAttribute('style', 'font-size: ' + fontSize + 'px')
    }
  }
}
