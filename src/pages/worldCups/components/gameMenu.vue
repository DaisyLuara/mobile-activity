<template>
  <div 
    :style="style.menu"
    class="menu-root">
    <img 
      class="checked"
      :src="this.baseUrl + 'menu-checked.png'" />
    <img 
      class="unchecked"
      :src="this.baseUrl + 'menu-normal.png'" />
    <img 
      class="unchecked"
      :src="this.baseUrl + 'menu-unlock.png'" />
    <img 
      class="unchecked"
      :src="this.baseUrl + 'menu-intro.png'" />
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/',
      style: {
        menu: {}
      }
    }
  },
  created() {
    this.style.menu.width = window.innerWidth * 0.2 + 'px'
  }
}
</script>

<style lang="less" scoped>
.menu-root {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 999;
  padding: 37% 0;
  align-items: flex-end;
  .checked {
    width: 100%;
  }
  .unchecked {
    width: 70%;
  }
}
</style>
