<template>
  <div class="mHome">
    <router-view v-if="wechat === true"/>
    <div v-else class="remind">请在微信中打开</div>
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
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
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
    }
    // state code
    console.log("z:");
    console.log(this.z);
    this.handleLogin();
    console.log(this.$route.query);
  },
  methods: {
    async handleLogin() {
      const { code, state } = this.$route.query;
      if (code !== undefined && state !== undefined) {
        try {
          let r = await getUserInfoByCodeAndState(code, state);
          if (r.hasOwnProperty("data")) {
            if (r.data.hasOwnProperty("results")) {
              const loginState = {
                z: r.data.results.z
              };
              this.setLoginState(loginState);
            }
          } else {
            Toast(r.data.results);
          }
          console.dir(r);
        } catch (e) {
          Toast(e.message);
          console.dir(e);
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
