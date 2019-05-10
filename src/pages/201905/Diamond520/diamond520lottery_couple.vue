<template>
  <div class="wrap">
    <img
      :src="`${CDNURL}/dimond520/photo_back_top.png`"
      class="back-top"
    >
    <DiamondLottery />
  </div>
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
@import "../../../assets/less/cdnUrl.less";
@import "../../../assets/less/diamond.less";

.back-top {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

</style>