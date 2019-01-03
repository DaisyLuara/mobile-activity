<template>
  <div class="trend-photo" @click="handleTrendItemClick(avrid)">
    <img :src="image" class="item-photo">
    <div class="item-info">
      <div class="info-title">{{ title }}</div>
      <div class="info-location-date">{{ computedDate }}</div>
      <div class="act">活动</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TrendPhotoItem",
  props: {
    image: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    clientdate: {
      type: String,
      default: "1540965666000",
      required: true
    },
    avrid: {
      type: String,
      default: "",
      required: true
    }
  },
  computed: {
    computedDate() {
      let now = moment(new Date().getTime());
      let cld = moment(Number(this.clientdate));
      // console.log(cld);
      let diffyear = cld.diff(now, "years");
      let diffday = now.diff(cld, "days");
      if (diffyear >= 1) {
        return cld.format("YYYY-MM-DD HH:mm:ss");
      } else if (diffday <= 1) {
        return cld.format("HH:mm:ss");
      } else {
        return cld.format("MM-DD HH:mm:ss");
      }
      return "";
    }
  },
  methods: {
    handleTrendItemClick() {
      this.$router.push({
        name: "TrendsDetail",
        params: {
          mkey: this.$route.params.mkey
        },
        query: {
          avrid: this.avrid
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.trend-photo {
  position: relative;
  width: 1.71rem;
  height: 3.045rem;
  z-index: 30;
  overflow: hidden;
  .item-photo {
    width: 100%;
    height: 100%;
    border-radius: 0.1rem;
  }
  .item-info {
    position: relative;
    .info-title {
      width: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-location-date {
      width: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .act {
      position: absolute;
      right: 0.1rem;
      text-align: center;
      top: 0.12rem;
      width: 0.305rem;
      height: 0.17rem;
      border: 0.5px solid rgba(255, 255, 255, 1);
      border-radius: 0.09rem;
      font-size: 0.09rem;
      line-height: 0.17rem;
    }
    width: 100%;
    height: 0.41rem;
    background: rgba(57, 48, 104, 0.9);
    border-radius: 0px 0px 0.1rem 0.1rem;
    opacity: 0.9;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.13rem;
    color: white;
    padding: 0 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
}
</style>
