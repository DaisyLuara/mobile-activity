<template>
  <div class="mHome">
    <router-view v-if="wechat === true && z !== ''" />
    <div
      v-if="wechat !== true"
      class="wx-remind"
    >请在微信中打开</div>
    <BottomBar />
  </div>
</template>

<script>
import { reCalculateRem } from "@/mixins/reCalculateRem";
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "mint-ui";
import BottomBar from "@/pages/m/components/Static/BottomBar";
import {
  isInWechat,
  NaviToWechatAuth,
  getUserInfoByCodeAndState
} from "services";

export default {
  name: "MSiteHome",
  components: {
    BottomBar
  },
  mixins: [reCalculateRem],
  data() {
    return {
      // must change before production
      wechat: process.env.NODE_ENV === "production" ? false : true
    };
  },
  computed: {
    ...mapGetters(["z"])
  },
  created() {
    if (isInWechat() === true) {
      this.wechat = true;
      if (this.$route.name === "mSite404") {
        return;
      }
      this.handleLogin();
    }
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    async handleLogin() {
      const { code, state } = this.$route.query;
      if (code !== undefined && state !== undefined) {
        if (this.z !== "") {
          return;
        }
        try {
          let r = await getUserInfoByCodeAndState(code, state);
          if (typeof r.data.results === "object") {
            let savedLoginState = r.data.results;
            this.setLoginState(savedLoginState);
            window.location.reload();
          } else {
            // console.log(r);
            // Toast(r.data.results);
          }
        } catch (e) {
          // Toast(e.message);
          // console.log(e);
        }
      } else {
        if (this.z === "") {
          NaviToWechatAuth();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mHome {
  .wx-remind {
    font-size: 18px;
  }
}
</style>
