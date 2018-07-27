<template>
  <!-- eslint-disable -->
  <div 
    :style="style.menu"
    class="menu-root">
    <img 
      @click="handleMenuChange(0)"
      :class="{'checked': control.menu === 0, 'unchecked': control.menu !== 0}"
      :src="control.menu === 0 ? baseUrl + 'icon1_clicked.png' :  baseUrl + 'icon1.png'" />
    <img 
      @click="handleMenuChange(1)"
      :src="control.menu === 1 ? baseUrl + 'icon2_clicked.png' :  baseUrl + 'icon2.png'" 
      :class="{'checked': control.menu === 1, 'unchecked': control.menu !== 1}"/>
    <img 
      @click="handleMenuChange(2)"
      :src="control.menu === 2 ? baseUrl + 'icon3_clicked.png' :  baseUrl + 'icon3.png'" 
      :class="{'checked': control.menu === 2, 'unchecked': control.menu !== 2}"
    />
    <img 
      @click="handleMenuChange(3)"
      :src="control.menu === 3 ? baseUrl + 'icon4_clicked.png' :  baseUrl + 'icon4.png'" 
      :class="{'checked': control.menu === 3, 'unchecked': control.menu !== 3}"
      />
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/card/',
      style: {
        menu: {}
      },
      control: {
        menu: 0
      }
    }
  },
  created() {
    this.style.menu.width = window.innerWidth * 0.2 + 'px'
  },
  methods: {
    handleMenuChange(index) {
      this.control.menu = index
      this.$parent.SwitchMenu(index)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-root {
  height: 100%;
  position: absolute;
  right: -2%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 999;
  padding: 80% 0;
  align-items: flex-end;
  .checked {
    width: 100%;
  }
  .unchecked {
    width: 90%;
  }
}
</style>
