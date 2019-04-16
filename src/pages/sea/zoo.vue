<template>
  <div/>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      link: [
        process.env.AD_API+'/api/s/o2j',
        process.env.AD_API+'/api/s/0v',
        process.env.AD_API+'/api/s/ERv',
        process.env.AD_API+'/api/s/8m'
      ]
      // '1'冰川世界'2'水族馆'3'熊猫'4'动物在哪
    }
  },
  mounted() {
    let scene = this.$route.query.scene
    let re_url = this.link[scene - 1] + window.location.search
    window.location.href = re_url
  }
}
</script>
<style lang="less" scoped>
</style>


