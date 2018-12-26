<template>
  <div class="mHome">
    <router-view v-if="wechat === true"/>
    <div v-else class="remind">请在微信中打开</div>
  </div>
</template>

<script>
import { reCalculateRem } from "@/mixins/reCalculateRem";
import { mapGetters } from "vuex";
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
          console.dir(r);
        } catch (e) {
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
