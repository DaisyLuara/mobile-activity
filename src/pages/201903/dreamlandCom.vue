<template>
  <div>
    <DreamLand
      v-if="Boolean(photo)"
      :loading-click="loadingClick"
      :paths="paths"
      :photo="photo"
      :params="parms"
    />
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
import DreamLand from '@/modules/dreamLand'
const cdnUrl = process.env.CDN_URL
export default {
  components: {
    DreamLand
  },
  mixins: [normalPages],
  data () {
    return {
      loadingClick: false,
      paths: [
        {
          scope: 6,
          paths: ['wc_1.png', 'wc_2.png', 'wc_3.png', 'wc_4.png', 'wc_5.png']
        },
        {
          scope: 12,
          paths: ['mc_1.png', 'mc_2.png', 'mc_3.png', 'mc_4.png', 'mc_5.png']
        }
      ],
      wxShareInfoValue: {
        title: '幻境奇缘',
        desc: '揭开你的身世之谜！',
        link: 'http://papi.xingstation.com/api/s/A11' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/dreamland/icon.png'
      }
    }
  },
}
</script>