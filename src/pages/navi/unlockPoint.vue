<template>
  <div></div>
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
        String(padNum)
          .split("")
          .map((item, index) => {
            if (item === "1") {
              jumpRoute = routes[index];
            }
          });
        if (jumpRoute === "") {
          jumpRoute = "trends/index";
        }
        this.$router.push({
          name: "TrendsIndex",
          params: {
            mkey: mkey,
            mcode: mcode
          }
        });
        // const jumpUrl = `http://h5.xingstation.com/m/${mkey}/${mcode}/${jumpRoute}`;
        // console.log(jumpUrl);
        // window.location.href = jumpUrl;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
