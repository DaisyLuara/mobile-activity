<template>
  <div>
    <warrior />
  </div>
</template>
<script>
import warrior from '@/pages/201903/components/warrior'
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    warrior
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      //微信分享
      wxShareInfoValue: {
        title: "",
        desc: "",
        link: '',
        imgUrl: CDNURL + "/fe/image/warrior/icon.png"
      }
    }
  },
  mounted() { }
}
</script>

