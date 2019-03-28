<template>
  <div class="navi-root"/>
</template>

<script>
import { getInfoById, splitParms } from "services";
export default {
  created() {
    const { id } = this.$route.query;
    if (!id) {
      return;
    } else {
      getInfoById(id).then(r => {
        const params = splitParms(r.parms);
        if (params.rp) {
          window.location.href =
            "http://h5.xingstation.com/m/d7mz317i/6498/wallet";
        } else {
          window.location.href =
            "http://h5.xingstation.com/m/d7mz317i/6498/barrage/index";
        }
      });
    }
  }
};
</script>
