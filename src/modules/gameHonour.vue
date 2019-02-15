<template>
  <!-- 勋章-联动节目 -->
  <div class="the-honour">
    <ul :style="styleData.ul">
      <li
        v-for="(item,index) in projects"
        :key="index"
        :style="styleData.li"
      >
        <img
          v-show="Boolean(item.img)"
          :src="item.img"
        >
      </li>
    </ul>
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
    },
    bid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      z: null,
    }
  },
  watch: {
    userinfo() {
      if (!Cookies.get('z')) {
        this.z = this.userinfo.z
        this.getGameHonour(this.bid, this.userinfo.z);
        Cookies.set('z', this.userinfo.z)
      }
    }
    // belong() {
    //   this.getGameHonour(this.bid, '8b96bc7fba4c1176b3fc0861e94f22465c0f6a');
    // }
  },
  mounted() {
    if (Cookies.get('z')) {
      this.z = Cookies.get('z')
      this.getGameHonour(this.bid, this.z);
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
          this.projects[r.xid].img = r.xtabicon;
        } else {
          this.projects[r.xid].img = r.xicon;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>


