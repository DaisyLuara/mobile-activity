<template>
  <div class="mts">
    <swiper ref="mySwiper" :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item, index) of imgUrls" :key="index">
        <img :src="imgUrls[index]" class="slide-pic" @click="handlePhotoClick">
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"/>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import "./swiper.less";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    imgUrls() {
      return [
        "http://cdn.exe666.com/fe/hidol/img/sample/1.jpg",
        "http://cdn.exe666.com/fe/hidol/img/sample/2.jpg",
        "http://cdn.exe666.com/fe/hidol/img/sample/3.jpg"
      ];
    }
  },
  methods: {
    handlePhotoClick() {}
  }
};
</script>

<style lang="less" scoped>
.swiper-pagination-bullets {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}
.mts {
  position: relative;
  width: 3.75rem;
  height: 1.35rem;
  .swiper {
    width: 3.75rem;
    height: 1.35rem;
    position: relative;
    .slide-pic {
      width: 3.75rem;
    }
    .swiper-pagination {
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
    }
  }
}
</style>
