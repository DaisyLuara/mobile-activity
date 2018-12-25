<template>
  <div class="trend-photo" @click="handleTrendItemClick(avrid)">
    <img :src="image" class="item-photo">
    <div class="item-info">
      <div class="info-title">{{title}}</div>
      <div class="info-location-date">{{date}}</div>
    </div>
  </div>
</template>

<script>
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
    date: {
      type: String,
      default: "",
      required: true
    },
    avrid: {
      type: String,
      default: "",
      required: true
    }
  },
  methods: {
    handleTrendItemClick() {
      // this.$router.push({})
    }
  }
};
</script>


<style lang="less" scoped>
.trend-photo {
  position: relative;
  width: 3.42rem;
  height: 6.09rem;
  z-index: 30;
  overflow: hidden;
  .item-photo {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .item-info {
    width: 3.02rem;
    height: 0.82rem;
    background: rgba(57, 48, 104, 0.9);
    border-radius: 0px 0px 0.2rem 0.2rem;
    opacity: 0.9;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.26rem;
    color: white;
    padding: 0 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
}
</style>
