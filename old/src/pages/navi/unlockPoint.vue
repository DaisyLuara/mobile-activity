<template>
  <div />
</template>

<script>
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
      try {
        const { id, code, state, mkey, mcode } = this.$route.query;
        const r = getInfoById(id, code, state);
        const ten = parseInt(mcode, 32).toString(10);
        const padNum = this.padNumber(ten, routes.length);
        console.log(padNum);
        let jumpRoute = "";
        const jumpIndex = String(padNum)
          .split("")
          .indexOf("1");
        if (jumpIndex === -1) {
          jumpRoute = "TrendsIndex";
        } else {
          jumpRoute = routes[jumpIndex];
        }
        this.$router.push({
          name: jumpRoute,
          params: {
            mkey: mkey,
            mcode: mcode
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
