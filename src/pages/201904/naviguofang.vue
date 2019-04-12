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
        if (r.parms) {
          const params = splitParms(r.parms);
          console.log(params);
          if (params.hasOwnProperty("rp")) {
            console.log("ok");
            window.location.href =
              "http://h5.xingstation.com/marketing/guofang";
          } else {
            window.location.href =
              "http://h5.xingstation.com/m/c241sa7m/v8/barrage/index";
          }
        } else {
          window.location.href =
            "http://h5.xingstation.com/m/c241sa7m/v8/barrage/index";
        }
      });
    }
  }
};
</script>
