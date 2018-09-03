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
      base: IMG_SERVER + '/image/panda/',
      photo: null,
      //分享
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
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
</style>


