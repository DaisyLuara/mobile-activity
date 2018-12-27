<template>
  <div class="trends">
    <MyTrendsSwiper/>
    <div class="item-wrapper" v-for="(item, index) in trends" :key="index">
      <TrendPhoto :image="item.image" :title="item.title" :date="item.date" :avrid="item.avrid"/>
    </div>
  </div>
</template>

<script>
import TrendPhoto from "@/pages/m/components/ListItem/TrendPhoto";
import MyTrendsSwiper from "@/pages/m/components/Banner/MyTrendsSwiper";
export default {
  name: "trendsIndex",
  components: {
    TrendPhoto,
    MyTrendsSwiper
  },
  created() {
    console.log("trendindex");
  },
  data() {
    return {
      trends: [
        {
          image:
            "http://image.exe666.com/1007/image/SnHeadline_143_51_1492888516224.jpg",
          title: "一起畅享世界杯",
          date: "2018-10-11",
          avrid: "2856997"
        },
        {
          image:
            "http://image.exe666.com/1007/image/SnHeadline_143_51_1492888516224.jpg",
          title: "一起畅享世界杯",
          date: "2018-10-11",
          avrid: "2856997"
        },
        {
          image:
            "http://image.exe666.com/1007/image/SnHeadline_143_51_1492888516224.jpg",
          title: "一起畅享世界杯",
          date: "2018-10-11",
          avrid: "2856997"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.trends {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item-wrapper {
    width: 1.71rem;
    height: 3.045rem;
    margin: 0.1rem 0.08rem;
  }
}
</style>
