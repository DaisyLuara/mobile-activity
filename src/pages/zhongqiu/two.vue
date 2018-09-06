<template>
  <div 
    :style="style.root"
    class="content"/>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      photo: null,
      //微信分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  }
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
}
img {
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #281765;
  // background-image: url('@{imgUrl}bg.png');
  // background-position: center top;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
</style>


