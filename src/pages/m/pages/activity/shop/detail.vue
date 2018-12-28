<template>
  <div class="act-shop-detail">
    <img class="main-photo" :src="resData.image">
    <div class="main-text">{{resData.txt}}</div>

    <div class="main-button" @click="handleNaviToActList">查看更多商家活动</div>
  </div>
</template>

<script>
import { fetchActivityDetail } from "services";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      resData: {
        image: "",
        txt: ""
      }
    };
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted() {
    const { acid } = this.$route.query;
    if (acid !== undefined) {
      this.fetchShopActivityDetail(acid);
    }
  },
  methods: {
    fetchShopActivityDetail(acid) {
      const payload = {
        actid: acid,
        z: this.z,
        api: "json"
      };
      fetchActivityDetail(this, payload)
        .then(r => {
          this.resData = r.data.results;
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleNaviToActList() {
      this.$router.push({
        name: "ActivityShop",
        params: {
          ...this.$route.params
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.act-shop-detail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(243, 243, 243, 1);
  min-height: 100vh;
  .main-photo {
    width: 90%;
    margin-top: 20px;
  }
  .main-text {
    margin-top: 20px;
    width: 90%;
    font-size: 0.14rem;
    color: rgba(13, 13, 13, 1);
    line-height: 0.2rem;
  }
  .main-button {
    margin-top: 20px;
    width: 3.36rem;
    height: 0.47rem;
    border: 2px solid rgba(109, 30, 255, 1);
    opacity: 1;
    border-radius: 0.235rem;
    font-size: 0.14rem;
    line-height: 0.47rem;
    text-align: center;
    color: rgba(109, 30, 255, 1);
  }
}
</style>
