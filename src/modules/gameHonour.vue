<template>
  <!-- 勋章-联动节目 -->
  <div class="the-honour">
    <div
      v-for="(item,index) in projects.list"
      :key="index"
      :style="styleData.child"
    >
      <img
        v-show="Boolean(item.img)"
        :src="item.img"
      >
    </div>
  </div>
</template>
<script>
import { Cookies, getGameHonour } from "services";
import { normalPages } from "@/mixins/normalPages";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  props: {
    styleData: {
      type: Object,
      required: true
    },
    projects: {
      type: Object,
      required: true
    }
  },
  methods: {
    getGameHonour(bid, z) {
      getGameHonour(bid, z)
        .then(res => {
          res.results ? this.projectStatus(res.results.data) : console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    projectStatus(data) {
      data.map(r => {
        if (r.hid <= 0) {
          this.projects.list[r.xid].img = r.xtabicon;
        } else {
          this.projects.list[r.xid].img = r.xicon;
          this.projects.total--
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
img {
  max-width: 100%;
  position: relative;
}
.the-honour {
  display: block;
  width: 100%;
  position: relative;
}
</style>


