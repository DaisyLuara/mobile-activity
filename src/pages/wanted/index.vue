<template>
  <div 
    :style="style.root"
    class="root" 
  >
    <img
      :src="serverUrl + 'bg-phone.jpg'" 
      class="bg" 
    >
    <div
      v-show="shouldRemindShow"
      :style="style.remind" 
      class="input-remind"
    >
      请输入手机号码
    </div>
    <input 
      v-model="phoneValue"
      :style="style.input" 
      class="input" 
      maxlength="11"
      @click="hideRemind()" 
      @blur="showRemind()"
    >
    <img
      :src="serverUrl + 'button.png' + this.$qiniuCompress()"
      :style="style.button"
      class="button"
      @click="handlebuttonClick()"
    >
  </div>
</template>

<script>
import { validatePhone, $wechat } from 'services'
const serverUrl = process.env.CDN_URL
export default {
  data() {
    return {
      serverUrl: serverUrl + '/fe/marketing/wanted/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        remind: {
          width: this.$innerWidth() * 150 / 375 + 'px',
          height: this.$innerWidth() * 150 / 375 * 30 / 150 + 'px',
          position: 'absolute',
          top: this.$innerWidth() * 232 / 375 + 'px',
          left: '21%'
        },
        input: {
          width: this.$innerWidth() * 150 / 375 + 'px',
          height: this.$innerWidth() * 150 / 375 * 30 / 150 + 'px',
          position: 'absolute',
          top: this.$innerWidth() * 232 / 375 + 'px',
          left: '21%'
        },
        button: {
          left: '35%',
          top: this.$innerWidth() * 0.78 + 'px'
        }
      },
      shouldRemindShow: true,
      phoneValue: ''
    }
  },
  mounted() {
    $wechat().then(res => {
      res.forbidden()
    })
  },
  methods: {
    hideRemind() {
      this.shouldRemindShow = false
    },
    showRemind() {
      if (this.phoneValue === '') {
        this.shouldRemindShow = true
      }
    },
    handlebuttonClick() {
      if (validatePhone(this.phoneValue)) {
        let naviUrl =
          window.location.origin +
          '/marketing/wantedresult?id=' +
          String(this.$route.query.id) +
          '&price=' +
          String(this.$route.query.price)
        window.location.href = naviUrl
      } else {
        alert('输入的号码有误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: black;
  z-index: 10;
  .input-remind {
    text-align: center;
    line-height: 30px;
    z-index: 11;
  }
  .bg {
    width: 100%;
  }
  .input {
    background: transparent;
    z-index: 12;
    text-align: center;
  }
  .button {
    width: 30%;
    position: absolute;
  }
}
</style>
