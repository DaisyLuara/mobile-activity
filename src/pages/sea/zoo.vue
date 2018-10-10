<template>
  <div/>
</template>
<script>
const cdnUrl = process.env.CDN_URL
import { wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/',
      scene: null,
      link: {
        '1': 'http://papi.xingstation.com/api/s/o2j' + window.location.search, //冰川世界
        '2': 'http://papi.xingstation.com/api/s/0v' + window.location.search, //水族馆
        '3': 'http://papi.xingstation.com/api/s/ERv' + window.location.search, //熊猫
        '4': 'http://papi.xingstation.com/api/s/8m' + window.location.search //动物在哪
      },
      //http://xuhui.xiaooo.club/app/index.php?i=40&c=my&a=point&do=exchange
      //微信分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: '',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    let scene = this.$route.query.scene
    window.location.href = this.link[scene]
  }
}
</script>
<style lang="less" scoped>
</style>


