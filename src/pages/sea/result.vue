<template>
    <div class="content" :style="style.root">
        <div class="one">
            <img class="mImg" :src="mImg"/>
            <img class="press" :src="baseUrl + 'press.png'"/>
        </div>
        <div class="two">
            
        </div>
    </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'
const IMGURL = 'http://p22vy0aug.bkt.clouddn.com/image/'
export default {
  data() {
    return {
      baseUrl: IMGURL + 'sea/page2/'
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: '';
</style>
