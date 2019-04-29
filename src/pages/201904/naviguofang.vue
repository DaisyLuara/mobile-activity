<template>
  <div class="navi-root" />
</template>

<script>
const saasUnlockUrl =
  "http://h5.xingstation.com/marketing/unlockguofang?mkey=c241sa7m&mcode=v8";
import { getInfoById, splitParms } from "services";
export default {
  created() {
    const { id } = this.$route.query;
    if (!id) {
      return;
    } else {
      getInfoById(id).then(r => {
        if (r.parms) {
          const params = splitParms(r.parms);
          console.log(params);
          if (params.hasOwnProperty("rp")) {
            console.log("ok");
            const { id } = this.$route.query;
            window.location.href = `http://h5.xingstation.com/marketing/guofang?id=${id}`;
          } else {
            window.location.href = saasUnlockUrl;
          }
        } else {
          window.location.href = saasUnlockUrl;
        }
      });
    }
  }
};
</script>
