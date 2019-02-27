<template>
  <div>
    <altMan />
  </div>
</template>
<script>
import altMan from '@/pages/201902/components/altMan'
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    altMan
  },
  data() {
    return {
      //微信分享
      wxShareInfoValue: {
        title: "万代TAMASHII NATIONS奥特曼英雄“魂”展首次空降上海",
        desc: "一起参与现场互动游戏，赢得大量奥特曼系列礼品",
        link: window.location.href,
        imgUrl: CDNURL + "/fe/image/altman/icon.png"
      }
    }
  },
  mounted() { }
}
</script>

