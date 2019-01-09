<template>
  <div class="wallet">
    <img 
      class="bg" 
      src="https://cdn.exe666.com/fe/image/m/wallet-no-bg.jpeg">
    
    <img
      v-if="loginState.gender === '1'"
      class="xo"
      src="https://cdn.exe666.com/fe/image/m/wallet-no-xo.png"
    >
    <img 
      v-else 
      class="xo" 
      src="https://cdn.exe666.com/fe/image/m/wallet-no-xo-boy.png">
    
    <img 
      :src="currentIcon" 
      class="icon">
      <!-- <div class="zan">+1</div> -->
  </div>
</template>

<script>
import { fetchRunPro } from "services";
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      resData: [],
      itv: null,
      count: 0
    };
  },
  created() {
    this.fetchMyData();
  },
  beforeDestroy() {
    clearInterval(this.itv);
  },
  computed: {
    ...mapGetters(["z", "loginState"]),
    currentP() {
      if (this.resData.length === 0) {
        return null;
      }
      return this.count % this.resData.length;
    },
    currentIcon() {
      if (this.currentP === null) {
        return "";
      }
      let n = this.resData[this.currentP].icon;
      return n;
    }
  },
  methods: {
    async fetchMyData() {
      try {
        let payload = {
          policy: "1",
          z: this.z,
          mkey: this.$route.params.mkey,
          api: "json"
        };
        let r = await fetchRunPro(payload);
        if (r.data.state === "40035") {
          this.$router.push({
            name: "mSite404"
          });
        }
        this.resData = r.data.results.data;
        this.itv = setInterval(() => {
          this.count++;
        }, 5000);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wallet {
  position: relative;
  min-height: 100vh;
  z-index: 10;
  margin-top: -0.64rem;
  .bg {
    position: relative;
    width: 100%;
    z-index: 20;
  }
  .xo {
    position: absolute;
    bottom: 0;
    width: 80%;
    margin-left: 10%;
    z-index: 30;
  }
  .icon {
    position: absolute;
    z-index: 60;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.08rem;
    top: 2.4rem;
    left: 1.575rem;
  }
  .zan {
    font-size: 0.14rem;
  }
}
</style>
