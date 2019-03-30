<template>
  <div
    class="trend-photo"
    @click="handleTrendItemClick(avrid)"
  >
    <div class="act">
      <img
        v-if="type === 'game'"
        :src="game"
      >
      <img
        v-if="type === 'alltop'"
        :src="alltop"
      >
      <img
        v-if="type === 'honour'"
        :src="honour"
      >
    </div>
    <img
      v-if="type === null"
      :src="image +'?imageView2/1/w/200/h/320/format/jpg/q/75|imageslim'"
      class="item-photo"
    >
    <img
      v-if="type !== null"
      :src="image"
      class="item-photo"
    >
    <div class="item-info">
      <div class="info-title">{{ title }}</div>
      <div class="info-location-date">{{ computedDate }}</div>
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
    },
    type: {
      type: String,
      default: " ",
      required: false
    }
  },
  data() {
    return {
      alltop: "https://cdn.xingstation.cn/fe/image/m/tag-toupiao.svg",
      game: "https://cdn.xingstation.cn/fe/image/m/tag-paihang.svg",
      honour: "https://cdn.xingstation.cn/fe/image/m/tag-xunzhang.svg"
    };
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
      } else if (moment(now).isSame(cld, "day")) {
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
  border-radius: 0.15rem;
  .act {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.44rem;
    height: 0.44rem;
    img {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
  .item-photo {
    height: 100%;
    border-radius: 0.15rem;
  }
  .item-info {
    position: relative;
    .info-title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.14rem;
      margin-bottom: 0.01rem;
    }
    .info-location-date {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(212, 212, 212, 1);
      font-size: 0.13rem;
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
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
