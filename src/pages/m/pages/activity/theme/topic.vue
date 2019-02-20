<template>
  <div class="activity-topic">
    <img
      v-if="actData && actData.image !== ''"
      :src="actData.image"
      class="main-photo"
    >
    <div class="progress">
      <img 
        :src="avatar" 
        class="avatar">
      <div class="text">
        答辩: {{ computedProgress }}/{{ calLenth }}题
      </div>
    </div>
    
    <TopicModule 
      @onProgressCal="calprogress" 
      @onCalLength="calLenth"/>
    <ActivityThemeGameBottom :show="shouldButtonShow"/>
  </div>
</template>

<script>
import TopicModule from "@/pages/m/pages/topic/index";
import ActivityThemeGameBottom from "@/pages/m/components/Activity/ActivityThemeGameBottom";
import { fetchActivityDetail } from "services";
import { mapGetters } from "vuex";
export default {
  components: {
    TopicModule,
    ActivityThemeGameBottom
  },
  data() {
    return {
      arr: [],
      actData: {
        image: ""
      }
    };
  },
  computed: {
    ...mapGetters(["avatar", "z"]),
    computedProgress() {
      let cal = 0;
      this.arr.map(ele => {
        if (ele.other1 !== "0" || ele.other2 !== "0") {
          cal++;
        }
      });
      return cal;
    },
    calLenth() {
      return this.arr.length;
    },
    shouldButtonShow() {
      if (this.$route.name === "TopicIndex") {
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.fetchHeader();
  },
  methods: {
    calprogress(arr) {
      this.arr = arr;
    },
    async fetchHeader() {
      let { acid } = this.$route.query;
      if (acid !== undefined) {
        const payload = {
          actid: acid,
          z: this.z,
          api: "json"
        };
        try {
          let r = await fetchActivityDetail(this, payload);
          this.actData = r.data.results;
          document.title = this.actData.title;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.activity-topic {
  position: relative;
  width: 100%;
  .main-photo {
    width: 100%;
  }
  .progress {
    width: 3.75rem;
    height: 0.65rem;
    background: rgba(109, 30, 255, 1);
    box-shadow: 0rem 0rem 0rem rgba(37, 5, 96, 0.37);
    opacity: 1;
    display: flex;
    flex-direction: row;
    padding: 0 0.16rem;
    align-items: center;
    .avatar {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      opacity: 1;
    }
    .text {
      font-size: 0.13rem;
      color: white;
      margin-left: 0.11rem;
    }
  }
}
</style>

