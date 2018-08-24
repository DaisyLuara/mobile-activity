<template>
  <div 
    id="content"
    :style="style.root"
    class="content">
    <div/>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const IMGSERVER = 'http://p22vy0aug.bkt.clouddn.com/image/'
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMGSERVER + 'pandp/pk/',
      //微信分享
      wxShareInfoValue: {
        title: 'PK大乐斗',
        desc: 'PK大乐斗',
        link: '' + window.location.search,
        imgUrl: '',
        success: function() {
          wechatShareTrack()
        }
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
  font-size: 0;
  text-align: center;
}
.content {
  width: 100%;
  overflow-x: hidden;
}
</style>


