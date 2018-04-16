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

    <div
      v-show="this.phoneError"
      :style="style.errormsg">
      手机号有误，请重新输入
    </div>
    <input 
      :class="{ 'phoneError': this.phoneError}"
      @click="handlePhoneError"
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
        errormsg: {
          position: 'absolute',
          zIndex: '30',
          left: window.innerWidth * 0.1 + 'px',
          width: window.innerWidth * 0.8 + 'px',
          top:
            window.innerWidth * 303 / 750 * 1.2 +
            window.innerWidth * 0.7 * 434 / 624 * 1 +
            'px',
          textAlign: 'center',
          color: 'red'
        },
        input: {
          position: 'absolute',
          zIndex: '30',
          borderRadius: '20px',
          height: window.innerWidth * 0.8 * 94 / 604 + 'px',
          padding: '10px 20px',
          fontWeight: '300',
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
      bindPhoneNumber: null,
      phoneError: false
    }
  },
  methods: {
    handleButtonClick() {
      if (!/^1[345678]\d{9}$/.test(this.bindPhoneNumber)) {
        this.phoneError = true
        return
      } else {
        this.$router.push({
          name: '51actcp'
        })
      }
    },
    handlePhoneError() {
      this.phoneError = false
    }
  }
}
</script>

<style lang="less" scoped>
.phoneError {
  border: 1px solid red;
}
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
