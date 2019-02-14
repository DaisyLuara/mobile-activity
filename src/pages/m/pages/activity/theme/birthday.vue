<template>
  <div class="birthday">
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchShopActivityProgress } from "services";

export default {
  data() {
    return {
      trends: [],
      isLoading: false,
      isAllLoaded: false,
      currentPage: 1,
      firstFetch: false
    };
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      if (this.isLoading || this.isAllLoaded) {
        return;
      }
      let payload = {
        api: "json",
        cp: this.currentPage,
        size: 10,
        awardkey: this.$route.query.awardkey,
        z: this.z
      };
      fetchShopActivityProgress(this, payload)
        .then(r => {
          if (r.data.state !== "1") {
            this.isAllLoaded = true;
            return;
          }
          if (r.data.results.pageIndex >= r.data.results.totalPage) {
            this.isAllLoaded = true;
          }
          let res = r.data.results.data;
          this.isLoading = false;
          this.trends = this.trends.concat(res);

          this.currentPage++;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        })
        .finally(() => {
          this.firstFetch = true;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.birthday {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
