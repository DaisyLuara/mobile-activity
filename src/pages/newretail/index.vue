<template>
  <div class="root">
    <img 
      src="http://cdn.xingstation.com/fe/marketing/new/bg-new.jpg"
    >
  </div>
</template>

<script>
import { $wechat, wechatShareTrack } from 'services'
export default {
  data() {
    return {
      wxShareInfoValue: {
        title: '场景新媒体 赋能新零售',
        desc: '掌握全球领先智能科技  突破线下体验四大难点',
        imgUrl: 'http://cdn.xingstation.com/fe/marketing/new/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    $wechat()
      .then(res => {
        res.share(this.wxShareInfoValue)
      })
      .catch(_ => {
        console.warn(_.message)
      })
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

