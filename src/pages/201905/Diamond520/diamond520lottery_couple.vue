<template>
  <DiamondLottery />
</template>

<script>
import { reCalculateRem } from '@/mixins/reCalculateRem'
import DiamondLottery from '@/modules/diamondLottery'
const CDNURL = process.env.CDN_URL

export default {
  name: "Diamond520LotteryCouple",
  components: {
    DiamondLottery
  },
  mixins: [reCalculateRem],
  data () {
    return {
      CDNURL: CDNURL
    }
  }
}
</script>

<style lang="less" scoped>
</style>