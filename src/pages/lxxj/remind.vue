<template>
  <div
    :style="style.root"
    class="remind-root"
  >
    <div 
      class="title"
    >
      <img
        :src="baseUrl + 'remind-title.png'" 
        class="title-word" 
      >
      <img
        :src="baseUrl + 'tc-close.png'" 
        class="title-close"
        @click="handleRemindShow"
      >
    </div>
    <img
      src="https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/shuoming.png"
      class="content"
    >
  </div>
</template>

<script>
const wiw = window.innerWidth
const wih = window.innerHeight
const baseUrl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/lxxj/'
export default {
  data() {
    return {
      baseUrl: baseUrl,
      style: {
        root: {
          width: 628 / 750 * wiw + 'px',
          height: 1078 / 1334 * wih + 'px',
          left: (1 - 628 / 750) / 2 * wiw + 'px',
          top: (1 - 1078 / 1334) / 2 * wih + 'px'
        }
      }
    }
  },
  methods: {
    handleRemindShow() {
      this.$parent.handleRemindShow()
    }
  }
}
</script>

<style lang="less" scoped>
.remind-root {
  position: absolute;
  z-index: 9000;
  top: 0;
  left: 0;
  background-color: #090201;
  border: #fcc96c 1.5px solid;
  border-radius: 8px;
  .title {
    width: 71%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #090201;
    position: fixed;
    margin-top: 0;
    margin: 0 7%;
    z-index: 9003;
    .title-word {
      width: 60%;
    }
    .title-close {
      width: 9%;
    }
  }
  .bg {
    width: 100%;
  }
  .content {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    padding: 5%;
  }
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
