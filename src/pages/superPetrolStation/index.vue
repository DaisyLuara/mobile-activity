<template>
  <div
    :style="style.root" 
    class="root">
  </div>
</template>

<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/superPetrolStation/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: '',
      iphoneX: false,
      wxShareInfoValue: {
        title: '这个七夕，我们一起领“证”吧！',
        desc: '星视度-七夕办证中心限时开放中',
        link: 'http://papi.xingstation.com/api/s/ADO' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/superPetrolStation/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/superPetrolStation';
.root {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.jpg');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
}
</style>
