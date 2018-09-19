<template>
  <div
    :style="style.root" 
    class="root">
    
  </div>
</template>
<script>
import { Cookies, getInfoById, getWxUserInfo, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/national_day/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      photo: null,
      wxShareInfoValue: {
        title: '玩转世纪，世纪汇广场邀你嗨翻世纪',
        desc: '世纪汇广场美食节，狂欢就现在',
        link: 'http://papi.xingstation.com/api/s/73j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/national_day/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/national_day/';
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #ffe0bc;
}
</style>
