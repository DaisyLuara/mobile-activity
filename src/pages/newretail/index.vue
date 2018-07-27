<template>
  <div class="root">
    <img 
      src="http://cdn.exe666.com/fe/marketing/new/bg-new.jpg"
    >
  </div>
</template>

<script>
import { $_wechat, wechatShareTrack } from 'services'
export default {
  data() {
    return {
      wxShareInfoValue: {
        title: '场景新媒体 赋能新零售',
        desc: '掌握全球领先智能科技  突破线下体验四大难点',
        imgUrl: 'http://cdn.exe666.com/fe/marketing/new/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  img {
    width: 100%;
    user-select: none;
  }
}
</style>

