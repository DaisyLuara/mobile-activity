<template>
  <div></div>
</template>

<script>
import { Indicator } from "mint-ui";
import { getInfoById } from "services";
import { routes } from "@/pages/m/config/menuRoutes";

export default {
  mounted() {
    this.handleUnlock();
  },
  methods: {
    padNumber(num, fill) {
      var len = ("" + num).length;
      return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num;
    },
    async handleUnlock() {
      Indicator.open();
      const { id, code, state } = this.$route.query;
      const r = getInfoById(id, code, state);
      if (r.parms) {
        const params = splitParms(r.parms);
        if (params.hasOwnProperty("mkey") && params.hasOwnProperty("mcode")) {
          const ten = parseInt(mcode, 32).toString(10);
          const padNum = this.padNumber(ten, this.routes.length);
          let jumpRoute = "";
          padNum.spilt("").map((item, index) => {
            if (item === 1) {
              jumpRoute = routes[index];
            }
          });
          Indicator.close();
          const jumpUrl = `http://h5.xingstation.com/m/${mkey}/${mcode}/${jumpRoute}`;
          console.log(jumpUrl);
          // window.location.href = jumpUrl
        }
      }
    }
  }
};
</script>
