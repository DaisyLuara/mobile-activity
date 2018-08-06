<template>
  <div 
    :style="style.root"
    class="content">
  </div>
</template>
<script>
import { $wechat } from 'services'
export default {
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function() {}
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
.content {
  width: 100%;
  overflow-x: hidden;
}
</style>


