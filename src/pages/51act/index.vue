<template>
  <div 
    class="act-root"
    :style="style.root">
    <img
      :style="style.logo"
      :src="this.baseUrl + 'logo.png'" />

    <img
      :style="style.people"
      :src="this.baseUrl + 'people.png'" />

    <img
      :style="style.bg"
      :src="this.baseUrl + 'bg.png'" />

    <input 
      v-model="bindPhoneNumber"
      placeholder="请输入手机号"
      :style="style.input"
      />

    <img
      @click="handleButtonClick"
      :style="style.button"
      :src="this.baseUrl + 'button.png'" />

    <img
      :style="style.bgadd" 
      :src="this.baseUrl + 'bg-add.png'" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/',
      style: {
        root: {
          height: window.innerHeight + 'px'
        },
        logo: {
          position: 'absolute',
          width: window.innerWidth + 'px',
          zIndex: '10',
          top: '0'
        },
        people: {
          position: 'absolute',
          width: window.innerWidth * 0.7 + 'px',
          left: window.innerWidth * 0.15 + 'px',
          zIndex: '10',
          top: window.innerWidth * 303 / 750 * 1.2 + 'px'
        },
        bgadd: {
          width: window.innerWidth + 'px',
          position: 'absolute',
          bottom: '0',
          right: '0'
        },
        bg: {
          width: window.innerWidth + 'px',
          position: 'absolute',
          top: '0'
        },
        input: {
          position: 'absolute',
          zIndex: '30',
          borderRadius: '20px',
          height: window.innerWidth * 0.8 * 94 / 604 + 'px',
          padding: '10px 20px',
          fontWeight: '300',
          margin: '0 auto',
          left: window.innerWidth * 0.1 + 'px',
          width: window.innerWidth * 0.8 + 'px',
          top:
            window.innerWidth * 303 / 750 * 1.2 +
            window.innerWidth * 0.7 * 434 / 624 * 1.1 +
            'px'
        },
        button: {
          zIndex: '30',
          position: 'absolute',
          width: window.innerWidth * 0.8 + 'px',
          left: window.innerWidth * 0.1 + 'px',
          top:
            window.innerWidth * 303 / 750 * 1.2 +
            window.innerWidth * 0.7 * 434 / 624 * 1.1 +
            window.innerWidth * 0.8 * 94 / 604 * 1.5 +
            'px'
        }
      },
      bindPhoneNumber: null
    }
  },
  mounted() {
    this.forbiddenTouch()
  },
  methods: {
    forbiddenTouch() {
      document.body.addEventListener(
        'touchmove',
        function(e) {
          e.preventDefault() //阻止默认的处理方式(阻止下拉滑动的效果)
        },
        { passive: false }
      ) //passive 参数不能省略，用来兼容ios和android
    },
    handleButtonClick() {}
  }
}
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}
.act-root {
  position: relative;
  background-color: #f7ead3;
}
</style>
