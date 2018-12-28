<template>
  <div class="mHome">
    <router-view v-if="wechat === true && this.z !== ''"/>
    <div v-else class="wx-remind">请在微信中打开</div>
  </div>
</template>

<script>
import { reCalculateRem } from "@/mixins/reCalculateRem";
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "mint-ui";
import {
  isInWechat,
  NaviToWechatAuth,
  getUserInfoByCodeAndState
} from "services";

export default {
  name: "mSiteHome",
  mixins: [reCalculateRem],
  computed: {
    ...mapGetters(["z"])
  },
  data() {
    return {
      // must change before production
      wechat: true
    };
  },
  created() {
    if (isInWechat() === true) {
      this.wechat = true;
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
